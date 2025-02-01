<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'profile')]
    #[IsGranted("ROLE_USER")]
    public function index(): Response
    {
        return $this->render('profile/index.html.twig');
    }

    // Afficher les annonces de l'utilisateur authentifié
    #[Route('/mes-annonces', methods: ['GET'])]
    public function annonces(): Response
    {
        // Récupérer l'utilateur connecté
        $user = $this->getUser();

        // Récupérer les annonces de l'utilisateur connecté
        // $annonces = $user->getAnnonces();
        $annonces = [
            "id" => 2, "title" => "Villa à Rabat", "location" => "Hay Riad", "price" => 12000, "bedrooms" => 3, "type" => "Maison", "latitude" => 34.020882, "longitude" => -6.841650,
            "id" => 6, "title" => "Maison de campagne", "location" => "El Jadida", "price" => 4500, "bedrooms" => 3, "type" => "Maison", "latitude" => 33.254807, "longitude" => -8.506958,
            "id" => 7, "title" => "Appartement familial", "location" => "Agadir", "price" => 5000, "bedrooms" => 3, "type" => "Appartement", "latitude" => 30.427755, "longitude" => -9.598107,
            "id" => 8, "title" => "Villa luxueuse", "location" => "Oujda", "price" => 11000, "bedrooms" => 5, "type" => "Villa", "latitude" => 34.681390, "longitude" => -1.908580
            
        ];
        return $this->render("annonces/index.html.twig" , [
            "annonces" => $annonces
        ]);
    }
}
