<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TestController extends AbstractController
{

    #[Route(path: '/test', name: 'test_route')]
    public function test(Request $request): Response
    {
        return $this->render('test.html.twig');
    }
}