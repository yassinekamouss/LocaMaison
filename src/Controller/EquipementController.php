<?php

namespace App\Controller;

use App\Repository\EquipementRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;

final class EquipementController extends AbstractController
{
    // Afficher les annonces de l'utilisateur authentifié
    #[Route('/equipements', methods: ['GET'])]
    public function equipements(EquipementRepository $equipementRepository, SerializerInterface $serializer): JsonResponse
    {
        // Réccupérer les équipements
        $equipements = $equipementRepository->findAll();

        // Encoder les équipements
        $jsonEquipements = $serializer->serialize($equipements, 'json', ['groups' => ['equipement.index']]);

        // Retourner les équipements
        return new JsonResponse($jsonEquipements, Response::HTTP_OK, [], true);
    }

    
}