<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
class RegistrationController extends AbstractController
{
    public function __construct(private EmailVerifier $emailVerifier)
    {
    }

    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var string $plainPassword */
            $plainPassword = $form->get('plainPassword')->getData();

            // encode the plain password
            $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

            // Récupérer les rôles sélectionnés et les assigner à l'utilisateur
            $roles = $form->get('roles')->getData();
            $user->setRoles($roles); // Assurez-vous que setRoles() peut accepter un tableau

            // Définir les dates createdAt et updatedAt
            $user->setCreatedAt(new \DateTimeImmutable());
            $user->setUpdatedAt(new \DateTime);

            // Définir le statut de l'utilisateur
            $user->setIsVerified(false);

            $entityManager->persist($user);
            $entityManager->flush();

            // generate a signed url and email it to the user
            
            $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
            (new TemplatedEmail())
            ->from(new Address('noreply@locamaison.com', 'LocaMaison Support'))
                ->to((string) $user->getEmail())
                ->subject('Please Confirm your Email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
            );

            // Ajout d'un message flash
            $this->addFlash('success', 'Un email a été envoyé pour confirmer votre compte.');

            return $this->redirectToRoute('app_register');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request,UserRepository $userRepository, TranslatorInterface $translator, Security $security): Response
    {
        $id = $request->query->get('id') ;
        $user = $userRepository->find($id);

        // Tester si l'utilisateur n'existe pas :
        if (!$user) {
            $this->addFlash('verify_email_error', $translator->trans('user.not_found', [], 'VerifyEmailBundle'));
            return $this->redirectToRoute('app_register');
        }

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            /** @var User $user */
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));

            return $this->redirectToRoute('app_register');
        }

        $security->login($user, 'debug.App\Security\UserAuthenticator');
        return $this->redirectToRoute('app_home');
    }

}
