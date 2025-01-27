<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PropertieController extends AbstractController
{
    #[Route('/propertie', name: 'app_propertie')]
    public function index(Request $request): Response
    {
        // Récuperation des biens
        $rentals = [
            [ "id"=> 1, "title"=> "Appartement à Casablanca", "location"=> "Maarif", "price"=> 5000, "bedrooms"=> 3, "type"=> "Maison" ],
            [ "id"=> 2, "title"=> "Villa à Rabat", "location"=> "Hay Riad", "price"=> 12000, "bedrooms"=> 3, "type"=> "Maison" ],
            [ "id"=> 3, "title"=> "Studio à Marrakech", "location"=> "Gueliz", "price"=> 3000, "bedrooms"=> 3, "type"=> "Maison" ],
            [ "id"=> 4, "title"=> "Appartement moderne", "location"=> "Paris", "price"=> 1500, "bedrooms"=> 2, "type"=> "Appartement" ],
            [ "id"=> 5, "title"=> "Maison de campagne", "location"=> "Lyon", "price"=> 2200, "bedrooms"=> 3, "type"=> "Maison" ],
            [ "id"=> 6, "title"=> "Studio centre-ville", "location"=> "Marseille", "price"=> 900, "bedrooms"=> 1, "type"=> "Studio" ],
            [ "id"=> 7, "title"=> "Appartement moderne", "location"=> "Paris", "price"=> 1500, "bedrooms"=> 2, "type"=> "Appartement" ],
            [ "id"=> 8, "title"=> "Maison de campagne", "location"=> "Lyon", "price"=> 2200, "bedrooms"=> 3, "type"=> "Maison" ],
            [ "id"=> 9, "title"=> "Studio centre-ville", "location"=> "Marseille", "price"=> 900, "bedrooms"=> 1, "type"=> "Studio" ],
            [ "id"=> 10, "title"=> "Studio centre-ville", "location"=> "Marseille", "price"=> 900, "bedrooms"=> 1, "type"=> "Studio" ],
            [ "id"=> 11, "title"=> "Appartement moderne", "location"=> "Paris", "price"=> 1500, "bedrooms"=> 2, "type"=> "Appartement" ],
            [ "id"=> 12, "title"=> "Maison de campagne", "location"=> "Lyon", "price"=> 2200, "bedrooms"=> 3, "type"=> "Maison" ],
            [ "id"=> 13, "title"=> "Studio centre-ville", "location"=> "Marseille", "price"=> 900, "bedrooms"=> 1, "type"=> "Studio" ]
        ];

        // Convertir le tableau en json
        json_encode($rentals);

        // Retourner un json contenant les biens
        return $this->json($rentals);
    }

    #[Route('/propertie/{id}', name: 'app_propertie_show')]
    public function show(int $id): Response
    {
        // Récuperation du bien
        $rental = [
            "id"=> $id, "title"=> "Appartement à Casablanca", "location"=> "Maarif", "price"=> 5000, "bedrooms"=> 3, "type"=> "Maison"
        ];

        // Convertir le tableau en json
        json_encode($rental);

        // Retourner un json contenant le bien
        return $this->json($rental);
    }

    #[Route('/propertie/{id}/edit', name: 'app_propertie_edit')]
    public function edit(int $id): Response
    {
        // Récuperation du bien
        $rental = [
            "id"=> $id, "title"=> "Appartement à Casablanca", "location"=> "Maarif", "price"=> 5000, "bedrooms"=> 3, "type"=> "Maison"
        ];

        // Convertir le tableau en json
        json_encode($rental);

        // Retourner un json contenant le bien
        return $this->json($rental);
    }
}
