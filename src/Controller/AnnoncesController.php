<?php

namespace App\Controller;

use App\Repository\BienRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class AnnoncesController extends AbstractController
{
    // Afficher les annonces de l'utilisateur authentifié
    #[Route('/annonces', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function annonces(BienRepository $bienRepository, SerializerInterface $serializer): Response
    {
        // Récupérer l'utilateur connecté
        $user = $this->getUser();
        // Récupérer uniquement ses biens
        $biens = $bienRepository->findByUserId($user->getId());

        // Retourner le user et ses biens
        $annonces = $serializer->serialize($biens, 'json', ['groups' => ['bien.index']]);
        
        // Décoder le JSON pour le passer à Twig
        $annoncesArray = json_decode($annonces, true);

        return $this->render("annonces/index.html.twig", [
            "annonces" => $annoncesArray
        ]);
    }

    #[Route('/annonce/create', name: 'app_bien_create_form', methods: ['GET'])]
    public function create_form(): Response
    {
        return $this->render('propertie/create.html.twig');
    }
    
}