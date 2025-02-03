<?php

namespace App\Controller;

use App\Entity\Bien;
use App\Repository\BienRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class BienController extends AbstractController
{
    // Route pour récupérer les biens
    #[Route('/biens', name: 'app_biens', methods: ['GET'])]
    public function index(SerializerInterface $serializer, BienRepository $bienRepository): JsonResponse
    {
        // Récuperation des biens
        $biens = $bienRepository->findAll();

        // Sérialiser les biens
        $jsonBiens = $serializer->serialize($biens, 'json', ['groups' => ['bien.index']]);

        return new JsonResponse($jsonBiens, Response::HTTP_OK, [], true);  
    }

    #[Route('/bien', name: 'app_propertie_create', methods: ['POST'])]
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
    #[Route('/bien/{id}', name: 'app_bien_show', options:['id' => '\d+'])]
    public function show(Bien $bien, SerializerInterface $serializer): Response
    {
        // Sérialiser le bien avec ses images
        $jsonBien = $serializer->serialize($bien, 'json', ['groups' => ['bien.index', 'bien.show']]);
    
        // Décoder le JSON pour le passer à Twig
        $bienArray = json_decode($jsonBien, true);
    
        // Passer les données à Twig
        return $this->render('propertie/show.html.twig', [
            'bien' => $bienArray
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
    
}
