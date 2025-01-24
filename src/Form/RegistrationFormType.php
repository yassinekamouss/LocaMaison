<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('last_Name', TextType::class, [
                'attr' => [
                    'class' => 'mb-3 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-black focus:border-black transition-all',
                    'placeholder' => 'Votre nom',
                ],
                'label' => 'Nom',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a your last name',
                    ])
                ],
            ])
            ->add('first_Name', TextType::class, [
                'attr' => [
                    'class' => 'mb-3 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-black focus:border-black transition-all',
                    'placeholder' => 'Votre prénom',
                ],
                'label' => 'Prénom',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a your first name',
                    ])
                ],
            ])
            ->add('email', EmailType::class, [
                'attr' => [
                    'class' => 'mb-2 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-black focus:border-black transition-all',
                    'placeholder' => 'exemple@exemple.com',
                ],
                'label' => 'Email',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a valid email address',
                    ])
                ],
            ])    
            ->add('plainPassword', PasswordType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => [
                    'class' => 'mb-3 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-black focus:border-black transition-all',
                    'autocomplete' => 'new-password',
                    'placeholder' => 'Votre mot de passe',
                ],
                'label' => 'Mot de passe',
                'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a password',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Your password should be at least {{ limit }} characters',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])
            ->add('roles', ChoiceType::class, [
                'choices' => [
                    'Pour réserver un logement pour mes séjours' => 'ROLE_LOCATAIRE',
                    'Pour proposer mon logement à la location' => 'ROLE_PROPRIETAIRE',
                ],
                'expanded' => true,
                'multiple' => true,
                'label' => 'Vous êtes ici :',
            ])
            ->add('phone', TelType::class, [
                'attr' => [
                    'class' => 'mb-3 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-1 focus:ring-black focus:border-black transition-all',
                    'placeholder' => '(+212) 6 12 34 56 78',
                ],
                'label' => 'Téléphone',
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'mapped' => false,
                'constraints' => [
                    new IsTrue([
                        'message' => 'Vous devez accepter nos conditions d\'utilisation.',
                    ]),
                ],
                'label_attr' => [
                    'class' => 'ml-2 text-sm font-medium text-gray-900', 
                ],
                'attr' => [
                    'class' => 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500',
                ],
                'label' => 'Accepter les conditions d\'utilisation',
            ])            
            ->add('save', SubmitType::class, [
                'attr' => [
                    'class' => 'mb-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all',
                ],
                'label' => 'S\'inscrire',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
