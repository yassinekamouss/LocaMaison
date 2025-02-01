<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TestController extends AbstractController
{

    #[Route(path: '/api/all', methods: ['POST'])]
    public function create(Request $request): Response
    {
        // return new Response($request->getContent());
        return $this->json(['message' => 'All is right!']);
    }
}