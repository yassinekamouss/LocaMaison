<?php

namespace App\Entity;

use App\Repository\EquipementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ORM\Entity(repositoryClass: EquipementRepository::class)]
class Equipement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['equipement.index', 'bien.show', 'admin.biens'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['equipement.index', 'bien.show', 'admin.biens'])]
    private ?string $nom = null;

    /**
     * @var Collection<int, Bien>
     */
    #[ORM\ManyToMany(targetEntity: Bien::class, inversedBy: 'equipements')]
    #[Ignore]
    private Collection $bien;

    public function __construct()
    {
        $this->bien = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, Bien>
     */
    public function getBien(): Collection
    {
        return $this->bien;
    }

    public function addBien(Bien $bien): static
    {
        if (!$this->bien->contains($bien)) {
            $this->bien->add($bien);
        }

        return $this;
    }

    public function removeBien(Bien $bien): static
    {
        $this->bien->removeElement($bien);

        return $this;
    }

}
