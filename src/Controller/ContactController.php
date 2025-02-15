<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\EmailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class ContactController extends AbstractController
{
    public function __construct()
    {
    }

    #[Route('/contact', name: 'contact')]
    public function index(Request $request, EntityManagerInterface $em): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $contact->setStatus('unread');
            $contact->setIsReplied(false);
            $contact->setCreatedAt(new \DateTime());
            $em->persist($contact);
            $em->flush();


            $this->addFlash('success', 'Votre message a bien été envoyé !');

            return $this->redirectToRoute('contact');
        }

       
        return $this->render('contact/index.html.twig', [
            'form' => $form
        ]);
    }

    #[Route('/contacts/{contact}/mark-read', name: 'contact_modify', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function modify(Contact $contact, Request $request, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data || !isset($data['status'])) {
            return $this->json(['error' => 'Données manquantes ou invalides'], 400);
        }
        
        // Mettez à jour le statut
        $contact->setStatus($data['status']);
        
        $em->flush();
        
        return $this->json($contact, 200, []);
    }

    #[Route('/contacts/{contact}/reply', name: 'contact_reply', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function replyToMessage(
        Request $request, 
        Contact $contact, 
        EntityManagerInterface $em, 
        EmailService $emailService // Injection du service d'email
    ): Response {
        $data = json_decode($request->getContent(), true);

        // Vérifier si les champs requis sont présents
        if (!isset($data['recipientEmail'], $data['subject'], $data['content'])) {
            return $this->json(['error' => 'Données manquantes'], 400);
        }

        // Envoyer l'email
        $emailService->sendReply(
            $data['recipientEmail'],
            $data['subject'],
            $data['content']
        );

        // Mettre à jour le message comme répondu et lu
        $contact->setIsReplied(true);
        $contact->setStatus('read');

        $em->flush();

        return $this->json(['success' => true], 200 ,[]);
    }


}