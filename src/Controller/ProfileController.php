<?php

namespace App\Controller;

use App\Form\ProfileType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

final class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'profile')]
    #[IsGranted("ROLE_USER")]
    public function index(Request $request, EntityManagerInterface $em): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(ProfileType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $imageFile = $form->get('profileImage')->getData();

            if($imageFile) {
                $newFilename = uniqid().'.'.$imageFile->guessExtension();
                try{
                    $imageFile->move(
                        $this->getParameter('profile_images_directory'),
                        $newFilename
                    );

                    $user->setProfileImage($newFilename);
                }catch(FileException $e){
                    $this->addFlash('danger', 'Erreur lors de l\'upload de l\'image');
                    return $this->redirectToRoute('profile');
                }
            }

            $em->persist($user);
            $em->flush();
            
            $this->addFlash('success', 'Profil mis à jour avec succès!');

            return $this->redirectToRoute('profile');
        }
        return $this->render('profile/index.html.twig', [
            'form' => $form,
            'user' => $user,
        ]);
    }
}