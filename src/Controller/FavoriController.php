<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Bien;
use App\Entity\Favori;
use App\Repository\FavoriRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

final class FavoriController extends AbstractController
{

    #[Route('/favoris', name: 'app_favoris', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function favoris(FavoriRepository $favoriRepository, SerializerInterface $serializerInterface): Response
    {
        $user = $this->getUser();
        $favoris = $favoriRepository->findBy(['user' => $user]);
        // return $this->json($favoris, 200, [], ['groups' => 'favoris.index']);
        $data = $serializerInterface->serialize($favoris, 'json', ['groups' => 'favoris.index']);

        return $this->render('favoris/index.html.twig', [
            'data' => $data
        ]);
    }

    #[Route('/favori/{id}', name: 'app_favori_add', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function index(Bien $bien,FavoriRepository $favoriRepository, EntityManagerInterface $em): Response
    {
        $user = $this->getUser();

        // Vérifier si le bien est déjà en favori pour cet utilisateur
        $existingFavori = $favoriRepository->findOneBy([
            'user' => $user,
            'bien' => $bien
        ]);

        if ($existingFavori) {
            $em->remove($existingFavori);
            $em->flush();

            return $this->json(['message' => 'Ce bien est déjà dans vos favoris'], 200);
        }

        // Créer un favori
        $favori = new Favori();
        $favori->setUser($user);
        $favori->setBien($bien);
        $favori->setCreatedAt(new \DateTime());
        $favori->setUpdatedAt(new \DateTime());

        // Sauvegarder le favori
        $em->persist($favori);
        $em->flush();

        return $this->json(['message' => 'Bien ajouté aux favoris'], 200);
    }

    #[Route('/favori/check/{id}', name: 'app_favori_check', methods: ['GET'])]
    public function checkFavori(Bien $bien, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        $favori = $em->getRepository(Favori::class)->findOneBy(['user' => $user, 'bien' => $bien]);

        return $this->json(['isFavorited' => $favori !== null]);
    }

    #[Route('/favori/{id}', name: 'app_favori_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_USER')]
    public function delete(Favori $favori, EntityManagerInterface $em): Response
    {
        $em->remove($favori);
        $em->flush();

        return $this->json(['message' => 'Favori supprimé'], 200);
    }

}