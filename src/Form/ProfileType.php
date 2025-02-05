<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class , [
                'attr' => ['disabled' => true],
            ])
            ->add('nom', TextType::class , [
                'attr' => ['disabled' => true],
            ])
            ->add('prenom', TextType::class , [
                'attr' => ['disabled' => true],
            ])
            ->add('phone',TextType::class , [
                'attr' => ['disabled' => true],
            ])
            ->add('bio', TextareaType::class, [
                'attr' => ['rows' => 5, 'disabled' => true],
            ])
            ->add('ville', TextType::class , [
                'attr' => ['disabled' => true],
            ])
            ->add('adresse', TextType::class , [
                'attr' => ['disabled' => true],
            ])
            ->add('profileImage' , FileType::class, [
                'mapped' => false,
                'required' => false,
                'attr' => ['accept' => 'image/*', 'disabled' => true],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
