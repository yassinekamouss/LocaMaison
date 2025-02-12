<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['bien.index', 'admin.biens'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bien.index', 'admin.biens'])]
    private ?string $url = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    private ?Bien $bien_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getBienId(): ?Bien
    {
        return $this->bien_id;
    }

    public function setBienId(?Bien $bien_id): static
    {
        $this->bien_id = $bien_id;

        return $this;
    }
}
