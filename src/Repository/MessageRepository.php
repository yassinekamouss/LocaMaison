<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function findUserConversations(int $userId)
    {
        return $this->createQueryBuilder('m')
                    ->select('m, MAX(m.createdAt) as HIDDEN lastMessageTime')
                    ->leftJoin('m.sender', 'u1')
                    ->leftJoin('m.receiver', 'u2')
                    ->leftJoin('m.bien', 'b')
                    ->where('m.sender = :userId OR m.receiver = :userId')
                    ->groupBy('b.id, u1.id, u2.id, m.id') // Ajoutez toutes les colonnes non agrégées ici
                    ->orderBy('lastMessageTime', 'DESC')
                    ->setParameter('userId', $userId)
                    ->getQuery()
                    ->getResult();
    }

    //    /**
    //     * @return Message[] Returns an array of Message objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Message
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
