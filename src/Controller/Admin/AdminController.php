<?php

namespace App\Controller\Admin;

use App\Repository\BienRepository;
use App\Repository\ContactRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class AdminController extends AbstractController
{

    #[Route('/admin/dashboard', name: 'admin_dashboard')]
    #[IsGranted('ROLE_ADMIN')]
    
    public  function index(BienRepository $bienRepository, UserRepository $userRepository): Response
    {
        // Récupérer le nombre de bien enregistré (dans la table bien)
        $totalBiens = $bienRepository->count([]);
        $biensActifs = $bienRepository->count(['status' => 'disponible']);
        $totalUsers = $userRepository->count([]);

        // Données pour le graphique "Nouveaux biens par jour"
        $newPropertiesData = [
            'labels' => ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
            'datasets' => [
                [
                    'label' => 'Nouveaux biens',
                    'data' => $bienRepository->getNewPropertiesLastWeek(),
                    'borderColor' => 'rgb(59, 130, 246)',
                    'tension' => 0.4
                ]
            ]
        ];

        // Données pour le graphique "Répartition par ville"
        $cityDistribution = $bienRepository->getPropertiesByCity();
        $cityData = [
            'labels' => array_column($cityDistribution, 'ville'),
            'datasets' => [
                [
                    'data' => array_column($cityDistribution, 'count'),
                    'backgroundColor' => [
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(168, 85, 247)',
                        'rgb(239, 68, 68)'
                    ]
                ]
            ]
        ];

        // Récupération des derniers utilisateurs
        $recentUsers = $userRepository->findBy([], ['createdAt' => 'DESC'], 5);
        $recentUsersData = array_map(function($user) {
            return [
                'id' => $user->getId(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'createdAt' => $user->getCreatedAt() instanceof \DateTimeInterface 
                                ? $user->getCreatedAt()->format('Y-m-d H:i:s')
                                : null
            ];
        }, $recentUsers);

        // Récupération des derniers biens
        $recentProperties = $bienRepository->findBy([], ['created_at' => 'DESC'], 5);
        $recentPropertiesData = array_map(function($bien) {
            return [
                'id' => $bien->getId(),
                'titre' => $bien->getTitre(),
                'createdAt' =>$bien->getCreatedAt() instanceof \DateTimeInterface 
                                ? $bien->getCreatedAt()->format('Y-m-d H:i:s')
                                : null,
                // 'image' => $bien->getImage()
            ];
        
        }, $recentProperties);

        $data = [
            'stats' => [
                'totalProperties' => $totalBiens,
                'activeProperties' => $biensActifs,
                'totalUsers' => $totalUsers,
                'dailyVisits' => 87 
            ],
            'propertyData' => $newPropertiesData,
            'cityData' => $cityData,
            'recentUsers' => $recentUsersData,
            'recentProperties' => $recentPropertiesData
        ];

        return $this->render('admin/index.html.twig',[
            'data' => $data
        ]);
    }

    #[Route('/admin/users', name: 'admin_dashboard_users')]
    #[isGranted('ROLE_ADMIN')]
    public function users(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAllUsersWithPropertyCount();
        return $this->render('admin/users.html.twig',[
            'data' => $users
        ]);
    }
    
    #[Route('/admin/biens', name: 'admin_dashboard_biens')]
    #[isGranted('ROLE_ADMIN')]
    public function biens(Request $request, BienRepository $bienRepository, SerializerInterface $serializer): Response
    {
        $biens = $bienRepository->findAll();
        $data = $serializer->serialize($biens, 'json', ['groups' => 'admin.biens']);
        return $this->render('admin/biens.html.twig',[
            'data' => $data
        ]);
    }

    #[Route('/admin/support', name: 'admin_dashboard_support')]
    #[isGranted('ROLE_ADMIN')]
    public function support(Request $request, ContactRepository $contactRepository, SerializerInterface $serializer): Response
    {
        
        $contacts = $contactRepository->findAll();
        $data = $serializer->serialize($contacts, 'json');
        
        return $this->render('admin/support.html.twig',[
            'data' => $data
        ]);
    }
    
    #[Route('/admin/rapport', name: 'admin_dashboard_rapport')]
    #[isGranted('ROLE_ADMIN')]
    public function rapport(): Response
    {
        return $this->render('admin/rapport.html.twig');
    }

}