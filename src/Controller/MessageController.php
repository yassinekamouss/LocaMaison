<?php

namespace App\Controller;

use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;

final class MessageController extends AbstractController
{
    #[Route('/messages', methods: ['GET'])]
    public function images(Request $request, MessageRepository $messageRepository, SerializerInterface $serializer): Response
    {
        // $user = $this->getUser();
        // if($user === null){
        //     return new JsonResponse(['message' => 'Vous devez être connecté pour accéder à cette ressource'], Response::HTTP_UNAUTHORIZED);
        // }

        $messages = $messageRepository->findUserConversations(1);

        $conversations = $serializer->serialize($messages, 'json', ['groups' => 'conversation.index']);


        // return new JsonResponse($conversations, Response::HTTP_OK, [], true);

        return $this->render('messages/index.html.twig', [
            'conversations' => $conversations,
        ]);
    }

    
}