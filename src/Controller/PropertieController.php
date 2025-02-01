<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class PropertieController extends AbstractController
{
    // Route pour récupérer les biens
    #[Route('/propertie', name: 'app_properties', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        // Récuperation des biens
        $rentals = [
            [ "id" => 1, "title" => "Appartement à Casablanca", "location" => "Maarif", "price" => 5000, "bedrooms" => 3, "type" => "Maison", "latitude" => 33.589886, "longitude" => -7.603869 ],
            [ "id" => 2, "title" => "Villa à Rabat", "location" => "Hay Riad", "price" => 12000, "bedrooms" => 3, "type" => "Maison", "latitude" => 34.020882, "longitude" => -6.841650 ],
            [ "id" => 3, "title" => "Studio à Marrakech", "location" => "Gueliz", "price" => 3000, "bedrooms" => 3, "type" => "Maison", "latitude" => 31.629472, "longitude" => -7.981084 ],
            [ "id" => 4, "title" => "Riad traditionnel", "location" => "Fès Médina", "price" => 7000, "bedrooms" => 4, "type" => "Riad", "latitude" => 34.033126, "longitude" => -4.999633 ],
            [ "id" => 5, "title" => "Appartement moderne", "location" => "Tanger", "price" => 6000, "bedrooms" => 2, "type" => "Appartement", "latitude" => 35.759465, "longitude" => -5.833954 ],
            [ "id" => 6, "title" => "Maison de campagne", "location" => "El Jadida", "price" => 4500, "bedrooms" => 3, "type" => "Maison", "latitude" => 33.254807, "longitude" => -8.506958 ],
            [ "id" => 7, "title" => "Appartement familial", "location" => "Agadir", "price" => 5000, "bedrooms" => 3, "type" => "Appartement", "latitude" => 30.427755, "longitude" => -9.598107 ],
            [ "id" => 8, "title" => "Villa luxueuse", "location" => "Oujda", "price" => 11000, "bedrooms" => 5, "type" => "Villa", "latitude" => 34.681390, "longitude" => -1.908580 ],
            [ "id" => 9, "title" => "Studio centre-ville", "location" => "Tétouan", "price" => 3200, "bedrooms" => 1, "type" => "Studio", "latitude" => 35.578445, "longitude" => -5.368374 ],
            [ "id" => 10, "title" => "Riad authentique", "location" => "Essaouira", "price" => 8000, "bedrooms" => 4, "type" => "Riad", "latitude" => 31.512541, "longitude" => -9.772585 ]
        ];  
        
        $response = new JsonResponse($rentals);
        
        return $response;
    }

    #[Route('/annonce/nouvelle', name: 'app_propertie_create_form', methods: ['GET'])]
    public function create_form(): Response
    {
        return $this->render('propertie/create.html.twig');
    }

    #[Route('/propertie', name: 'app_propertie_create', methods: ['POST'])]
    public function create(Request $request) : JsonResponse
    {
        // Récuperation des données
        $data = json_decode($request->getContent(), true);

        // Création d'un bien
        $propertie = [
            "id" => 11, "title" => $data['title'], "location" => $data['location'], "price" => $data['price'], "bedrooms" => $data['bedrooms'], "type" => $data['type'], "latitude" => $data['latitude'], "longitude" => $data['longitude']
        ];

        // Convertir le tableau en json
        json_encode($propertie);

        // Retourner un json contenant le bien
        return $this->json($propertie, Response::HTTP_CREATED);
    }

    // Route pour afficher un bien spécifique
    #[Route('/propertie/{id}', name: 'app_propertie_show', options:['id' => '\d+'])]
    public function show(int $id): Response
    {
        // Récuperation du bien
        $propertie = [
            "id" => 2, "title" => "Villa à Rabat", "location" => "Hay Riad", "price" => 12000, "bedrooms" => 3, "type" => "Maison", "latitude" => 34.020882, "longitude" => -6.841650
        ];
        
        // Convertir le tableau en json
        json_encode($propertie);

        // Retourner un json contenant le bien
        return $this->render('propertie/show.html.twig', [
            'propertie' => $propertie
        ]);
    }

    // Route pour modifier un bien
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

    // Route pour supprimer un bien
    #[Route('/annonce', name:"app_propertie_create")]
    public function annonce(Request $request): Response
    {
        return $this->render('propertie/create.html.twig') ;
    }
}
