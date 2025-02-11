<?php

namespace App\Repository;

use App\Entity\Bien;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Bien>
 */
class BienRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bien::class);
    }



    //    /**
    //     * @return Bien[] Returns an array of Bien objects
    //     */
       public function findByUserId($id): array
       {
           return $this->createQueryBuilder('b')
               ->andWhere('b.proprietaire = :id')
               ->setParameter('id', $id)
               ->orderBy('b.id', 'ASC')
               ->getQuery()
               ->getResult()
           ;
       }

       public function getNewPropertiesLastWeek(): array
       {
           $qb = $this->createQueryBuilder('b')
               ->select('SUBSTRING(b.created_at, 1, 10) as dateCreation, COUNT(b.id) as count')
               ->where('b.created_at >= :lastWeek')
               ->setParameter('lastWeek', new \DateTime('-7 days'))
               ->groupBy('dateCreation')
               ->orderBy('dateCreation', 'ASC');
   
           $result = $qb->getQuery()->getResult();
           
           // Initialiser un tableau pour les 7 jours
           $days = array_fill(0, 7, 0);
           
           // Remplir avec les données réelles
           foreach ($result as $row) {
               $dayIndex = (int)(new \DateTime($row['dateCreation']))->format('w');
               $days[$dayIndex] = (int)$row['count'];
           }
           
           return $days;
       }
   
       public function getPropertiesByCity(): array
       {
           return $this->createQueryBuilder('b')
               ->select('b.ville, COUNT(b.id) as count')
               ->groupBy('b.ville')
               ->getQuery()
               ->getResult();
       }

    //    public function findOneBySomeField($value): ?Bien
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
