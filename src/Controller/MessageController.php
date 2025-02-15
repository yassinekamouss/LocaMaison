<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\BienRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class MessageController extends AbstractController
{
    #[Route('/messages', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function images(Request $request, MessageRepository $messageRepository, SerializerInterface $serializer): Response
    {
        $user = $this->getUser();
        if($user === null){
            return new JsonResponse(['message' => 'Vous devez être connecté pour accéder à cette ressource'], Response::HTTP_UNAUTHORIZED);
        }

        $messages = $messageRepository->findUserConversations($user);

    
        // Transformer les messages en structure de conversation
        $conversations = [];

        foreach ($messages as $message) {
            $otherUser = $message->getSender() === $user ? $message->getReceiver() : $message->getSender();
            $bienId = $message->getBien()->getId();

            $key = $otherUser->getId() . '-' . $bienId;

            if (!isset($conversations[$key])) {
                $conversations[$key] = [
                    'bien' => [
                        'id' => $message->getBien()->getId(),
                        'titre' => $message->getBien()->getTitre(),
                        'prix' => $message->getBien()->getPrix(),
                        'adresse' => $message->getBien()->getAdresse(),
                        'ville' => $message->getBien()->getVille(),
                        'type' => $message->getBien()->getType(),
                    ],
                    'user' => [
                        'id' => $otherUser->getId(),
                        'nom' => $otherUser->getNom(),
                        'prenom' => $otherUser->getPrenom(),
                    ],
                    'messages' => [],
                ];
            }

            $conversations[$key]['messages'][] = [
                'id' => $message->getId(),
                'sender' => [
                    'id' => $message->getSender()->getId(),
                    'nom' => $message->getSender()->getNom(),
                    'prenom' => $message->getSender()->getPrenom(),
                ],
                'contenu' => $message->getContenu(),
                'created_at' => $message->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        // Sérialisation en JSON
        $jsonConversations = $serializer->serialize(array_values($conversations), 'json');

        return $this->render('messages/index.html.twig', [
            'conversations' => $jsonConversations,
        ]);
    }

    #[Route('/message', name: 'send_message', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function sendMessage(
        Request $request, 
        EntityManagerInterface $entityManager, 
        UserRepository $userRepository, 
        BienRepository $bienRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
    
        // Vérification des données requises
        if (!isset($data['sender_id'], $data['bien_id'], $data['contenu'])) {
            return new JsonResponse(['error' => 'Données invalides'], 400);
        }
    
        // Récupération des entités
        $sender = $this->getUser();
        $bien = $bienRepository->find($data['bien_id']);
    
        if (!$sender || !$bien) {
            return new JsonResponse(['error' => 'Expéditeur ou bien non trouvé'], 404);
        }
    
        // Récupération du receiver (destinataire)
        if (!isset($data['receiver_id']) || empty($data['receiver_id'])) {
            // Si receiver_id n'est pas précisé, on récupère le propriétaire du bien
            $receiver = $bien->getProprietaire(); 
        } else {
            // Si receiver_id est fourni, on récupère directement l'utilisateur correspondant
            $receiver = $userRepository->find($data['receiver_id']);
        }
    
        if (!$receiver) {
            return new JsonResponse(['error' => 'Destinataire non trouvé'], 404);
        }
    
        // Création du message
        $message = new Message();
        $message->setSender($sender);
        $message->setReceiver($receiver);
        $message->setBien($bien);
        $message->setContenu($data['contenu']);
        $message->setCreatedAt(new \DateTime());
    
        // Sauvegarde en base de données
        $entityManager->persist($message);
        $entityManager->flush();
    
        return new JsonResponse([
            'id' => $message->getId(),
            'contenu' => $message->getContenu(),
            'created_at' => $message->getCreatedAt()->format('Y-m-d H:i:s')
        ], 201);
    }
    
}