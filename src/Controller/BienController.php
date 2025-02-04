<?php

namespace App\Controller;

use App\Entity\Bien;
use App\Entity\Equipement;
use App\Entity\Image;
use App\Repository\BienRepository;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class BienController extends AbstractController
{
    private $entityManager;
    private $slugger;

    // constructor
    public function __construct(EntityManagerInterface $entityManager, SluggerInterface $slugger)
    {
        $this->entityManager = $entityManager;
        $this->slugger = $slugger;
    }
    // Route pour récupérer les biens
    #[Route('/biens', name: 'app_biens', methods: ['GET'])]
    public function index(SerializerInterface $serializer, BienRepository $bienRepository): JsonResponse
    {
        // Récuperation des biens
        $biens = $bienRepository->findAll();

        // Sérialiser les biens
        $jsonBiens = $serializer->serialize($biens, 'json', ['groups' => ['bien.index']]);

        return new JsonResponse($jsonBiens, Response::HTTP_OK, [], true);  
    }

    #[Route('/bien', name: 'app_propertie_create', methods: ['POST'])]
    public function createBien(Request $request): JsonResponse
    {
        // Récupérer les données de la requête
        $bien = new Bien();
        $user = $this->getUser() ?? null;

        $bien->setTitre($request->request->get('titre'));
        $bien->setType($request->request->get('type'));
        $bien->setDescription($request->request->get('description'));
        $bien->setPrix((float)$request->request->get('prix'));
        $bien->setSurface((float)$request->request->get('surface'));
        $bien->setChambres((int)$request->request->get('chambres'));
        $bien->setAdresse($request->request->get('address'));
        $bien->setLatitude((float)$request->request->get('latitude'));
        $bien->setLongtitude((float)$request->request->get('longtitude'));
        $bien->setVille($request->request->get('ville'));
        $bien->setStatus('En attent');
        $bien->setCreatedAt(new \DateTime());
        $bien->setUpdatedAt(new \DateTime());
        $bien->setProprietaire($user);

        // Récupérer les équipements
        $equipements = $request->request->all('equipements');
        foreach ($equipements as $equipement) {
            // Récupérer l'équipement de la bdd
            $bien_equipement = $this->entityManager->getRepository(Equipement::class)->find($equipement);
            // Ajouter l'équipement au bien
            if($bien_equipement)
                $bien->addEquipement($bien_equipement);
        }

        // Récupérer les images
        $images = $request->files->get('images');

        // stcocker les images dans /public/uploads et dans la bdd
        $imageUrls = [];

        if (!empty($images)) {
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/';

            foreach ($images as $image) {
                if ($image instanceof UploadedFile) {
                    $newFilename = uniqid() . '.' . $image->guessExtension();
                    $image->move($uploadDir, $newFilename);
                    $imageUrls[] = $newFilename;
                }
            }
        }

         // Enregistrer les images en base de données
        foreach ($imageUrls as $url) {
            $image = new Image();
            $image->setUrl($url);
            $bien->addImage($image);
            $this->entityManager->persist($image);
        }

        $this->entityManager->persist($bien);
        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Bien créé avec succès'
        ], Response::HTTP_CREATED);
}

    // Route pour afficher un bien spécifique
    #[Route('/bien/{id}', name: 'app_bien_show', options:['id' => '\d+'])]
    public function show(Bien $bien, SerializerInterface $serializer): Response
    {
        // Sérialiser le bien avec ses images
        $jsonBien = $serializer->serialize($bien, 'json', ['groups' => ['bien.index', 'bien.show']]);
    
        // Décoder le JSON pour le passer à Twig
        $bienArray = json_decode($jsonBien, true);
    
        // Passer les données à Twig
        return $this->render('propertie/show.html.twig', [
            'bien' => $bienArray
        ]);
    }

    // Route pour modifier un bien
    #[Route('/propertie/{id}/edit', name: 'app_propertie_edit')]
    public function edit(int $id): Response
    {
        // Récuperation du bien
        $rental = [
            "id"=> $id, "title"=> "Appartement à Casablanca", "location"=> "Maarif", "price"=> 5000, "bedrooms"=> 3, "type"=> "Maison"
        ];

        // Convertir le tableau en json
        json_encode($rental);

        // Retourner un json contenant le bien
        return $this->json($rental);
    }
    
}
