<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Bien;
use App\Entity\Favori;
use Doctrine\ORM\EntityManagerInterface;

final class FavoriController extends AbstractController
{
    // Home page
    #[Route('/favori/{id}', name: 'app_fovorie_add', methods: ['POST'])]
    public function index(Bien $bien, EntityManagerInterface $em): Response
    {
        $user = $this->getUser();

        // Créer un fovori
        $favori = new Favori();
        $favori->setUser($user);
        $favori->setBien($bien);

        // Sauvegarder le favori
        $em->persist($favori);
        $em->flush();

        return $this->json(['message' => 'Bien ajouté aux favoris'], 200);
    }

}