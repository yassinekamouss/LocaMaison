<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class PropertieApiController extends AbstractController
{
    #[Route('/api/propertie', name: 'api_properties', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        $rentals = [
            [ "id" => 1, "title" => "Appartement à Casablanca", "location" => "Maarif", "price" => 5000, "bedrooms" => 3, "type" => "Maison", "latitude" => 33.589886, "longitude" => -7.603869 ],
            [ "id" => 2, "title" => "Villa à Rabat", "location" => "Hay Riad", "price" => 12000, "bedrooms" => 3, "type" => "Maison", "latitude" => 34.020882, "longitude" => -6.841650 ],
            [ "id" => 3, "title" => "Studio à Marrakech", "location" => "Gueliz", "price" => 3000, "bedrooms" => 3, "type" => "Maison", "latitude" => 31.629472, "longitude" => -7.981084 ],
            [ "id" => 4, "title" => "Riad traditionnel", "location" => "Fès Médina", "price" => 7000, "bedrooms" => 4, "type" => "Riad", "latitude" => 34.033126, "longitude" => -4.999633 ],
            [ "id" => 5, "title" => "Appartement moderne", "location" => "Tanger", "price" => 6000, "bedrooms" => 2, "type" => "Appartement", "latitude" => 35.759465, "longitude" => -5.833954 ],
            [ "id" => 6, "title" => "Maison de campagne", "location" => "El Jadida", "price" => 4500, "bedrooms" => 3, "type" => "Maison", "latitude" => 33.254807, "longitude" => -8.506958 ],
            [ "id" => 7, "title" => "Appartement familial", "location" => "Agadir", "price" => 5000, "bedrooms" => 3, "type" => "Appartement", "latitude" => 30.427755, "longitude" => -9.598107 ],
            [ "id" => 8, "title" => "Villa luxueuse", "location" => "Oujda", "price" => 11000, "bedrooms" => 5, "type" => "Villa", "latitude" => 34.681390, "longitude" => -1.908580 ],
            [ "id" => 9, "title" => "Studio centre-ville", "location" => "Tétouan", "price" => 3200, "bedrooms" => 1, "type" => "Studio", "latitude" => 35.578445, "longitude" => -5.368374 ],
            [ "id" => 10, "title" => "Riad authentique", "location" => "Essaouira", "price" => 8000, "bedrooms" => 4, "type" => "Riad", "latitude" => 31.512541, "longitude" => -9.772585 ]
        ];  
        
        $response = new JsonResponse($rentals);
        
        return $response;
    
    }
}