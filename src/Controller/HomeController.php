<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    // Home page
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig');
    }


    #[Route('/about', name: 'app_about')]
    public function about(): Response
    {
        return $this->render('test.html.twig');
    }

    #[Route('/test', name: 'app_test' , methods:'POST')]
    public function uploadImage(Request $request): JsonResponse
    {
        // Récupérer le fichier envoyé
        /** @var UploadedFile $file */
        $file = $request->files->get('image');

        // Vérifier si un fichier a été envoyé
        if (!$file) {
            return new JsonResponse(['error' => 'Aucun fichier reçu.'], Response::HTTP_BAD_REQUEST);
        }

        // Valider le type de fichier (optionnel)
        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            return new JsonResponse(['error' => 'Type de fichier non autorisé.'], Response::HTTP_BAD_REQUEST);
        }

        // Générer un nom de fichier unique
        $newFilename = uniqid() . '.' . $file->guessExtension();

        // Déplacer le fichier vers le dossier public/uploads
        $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/';
        $file->move($uploadDir, $newFilename);

        // Retourner une réponse JSON avec le chemin du fichier
        return new JsonResponse([
            'message' => 'Fichier uploadé avec succès!',
            'filePath' => '/uploads/' . $newFilename,
        ]);
    }

}