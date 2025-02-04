<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ImageController extends AbstractController
{
    // Afficher les annonces de l'utilisateur authentifié
    #[Route('/image', methods: ['POST'])]
    public function images(Request $request): JsonResponse
    {
        $jsonResponse = [
            'message' => 'Données reçues',
            'data' => $request->getContent()
        ];
        return new JsonResponse($jsonResponse, Response::HTTP_OK, [], true);
    }

    
}