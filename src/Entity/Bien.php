<?php

namespace App\Entity;

use App\Repository\BienRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BienRepository::class)]
class Bien
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['bien.index', 'bien.crate', 'conversation.index', 'admin.biens'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bien.index', 'bien.crate', 'conversation.index', 'admin.biens'])]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['bien.index', 'bien.crate', 'admin.biens'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['bien.index', 'bien.crate', 'conversation.index', 'admin.biens'])]
    private ?float $prix = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['bien.indx', 'bien.show','bien.crate', 'conversation.index', 'admin.biens'])]
    private ?string $adresse = null;
    
    #[ORM\Column(length: 50)]
    #[Groups(['bien.index','bien.crate', 'conversation.index', 'admin.biens'])]
    private ?string $ville = null;
    
    #[ORM\Column]
    #[Groups(['bien.index', 'bien.show','bien.crate', 'conversation.index', 'admin.biens'])]
    private ?float $surface = null;

    #[ORM\Column]
    #[Groups(['bien.index', 'bien.crate', 'conversation.index', 'admin.biens'])]
    private ?float $chambres = null;
    
    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['bien.index' , 'bien.crate', 'admin.biens'])]
    private ?string $status = null;

    #[ORM\Column(length: 50)]
    #[Groups(['bien.index' , 'bien.crate', 'conversation.index', 'admin.biens'])]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['bien.index' , 'bien.crate'])]
    private ?float $longtitude = null;

    #[ORM\Column]
    #[Groups(['bien.index' , 'bien.crate'])]
    private ?float $latitude = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['bien.index', 'admin.biens'])]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updated_at = null;

    /**
     * @var Collection<int, Image>
     */
    #[ORM\OneToMany(targetEntity: Image::class, mappedBy: 'bien_id')]
    #[Groups(['bien.index', 'admin.biens'])]
    private Collection $images;
    
    /**
     * @var Collection<int, Equipement>
     */
    #[ORM\ManyToMany(targetEntity: Equipement::class, mappedBy: 'bien')]
    #[Groups(['bien.show' ,'bien.crate', 'admin.biens'])]
    private Collection $equipements;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'bien')]
    private Collection $messages;

    /**
     * @var Collection<int, Favori>
     */
    #[ORM\OneToMany(targetEntity: Favori::class, mappedBy: 'bien')]
    private Collection $favoris;

    #[ORM\ManyToOne(inversedBy: 'biens')]
    #[Groups(['admin.biens'])]
    private ?User $proprietaire = null;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->equipements = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->favoris = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }

    public function getSurface(): ?float
    {
        return $this->surface;
    }

    public function setSurface(float $surface): static
    {
        $this->surface = $surface;

        return $this;
    }

    public function getChambres(): ?float
    {
        return $this->chambres;
    }

    public function setChambres(float $chambres): static
    {
        $this->chambres = $chambres;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getLongtitude(): ?float
    {
        return $this->longtitude;
    }

    public function setLongtitude(float $longtitude): static
    {
        $this->longtitude = $longtitude;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeInterface $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setBienId($this);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getBienId() === $this) {
                $image->setBienId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Equipement>
     */
    public function getEquipements(): Collection
    {
        return $this->equipements;
    }

    public function addEquipement(Equipement $equipement): static
    {
        if (!$this->equipements->contains($equipement)) {
            $this->equipements->add($equipement);
            $equipement->addBien($this);
        }

        return $this;
    }

    public function removeEquipement(Equipement $equipement): static
    {
        if ($this->equipements->removeElement($equipement)) {
            $equipement->removeBien($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setBien($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getBien() === $this) {
                $message->setBien(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Favori>
     */
    public function getFavoris(): Collection
    {
        return $this->favoris;
    }

    public function addFavori(Favori $favori): static
    {
        if (!$this->favoris->contains($favori)) {
            $this->favoris->add($favori);
            $favori->setBien($this);
        }

        return $this;
    }

    public function removeFavori(Favori $favori): static
    {
        if ($this->favoris->removeElement($favori)) {
            // set the owning side to null (unless already changed)
            if ($favori->getBien() === $this) {
                $favori->setBien(null);
            }
        }

        return $this;
    }

    public function getProprietaire(): ?User
    {
        return $this->proprietaire;
    }

    public function setProprietaire(?User $proprietaire): static
    {
        $this->proprietaire = $proprietaire;

        return $this;
    }
}
