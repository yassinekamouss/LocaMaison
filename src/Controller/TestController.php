<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Bien;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class TestController extends AbstractController
{

    #[Route(path: '/test', methods: ['GET'])]
    public function create(Request $request): Response
    {
        return $this->render('test.html.twig', [
            'controller_name' => 'TestController',
        ]);
    }


    #[Route(path: '/bienn/{id}',name:'myroute', methods: ['GET'])]
    public function test(Bien $bien, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        // Récupérer le bien avec l'id {id} et ses images associées et equipements et retourner une réponse JSON
        $jsonBien = $serializer->serialize($bien, 'json', ['groups' => 'bien.index']);
        return JsonResponse::fromJsonString($jsonBien);
    }
}