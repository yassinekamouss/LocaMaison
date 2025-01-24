<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

class TestController extends AbstractController
{
    #[Route(path: '/', name: 'app_home')]
    public function index(Request $request): Response
    {
        return $this->render('test.html.twig');
    }

    #[Route(path: '/locataire', name: 'test_route')]
    #[IsGranted('ROLE_LOCATAIRE')]
    public function test(): Response
    {
        return new Response('Hello Locataire');
    }    

    #[Route(path: '/test', name: 'test_route')]
    public function mailtest(MailerInterface $mailer): Response
    {
       return new Response('hello test');
    }
}