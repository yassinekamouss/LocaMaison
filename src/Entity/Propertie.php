<?php

namespace App\Entity;

use App\Repository\PropertieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PropertieRepository::class)]
class Propertie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    #[ORM\Column(length: 100)]
    private ?string $city = null;

    #[ORM\Column(length: 100)]
    private ?string $type = null;

    #[ORM\Column]
    private ?float $surface_area = null;

    #[ORM\Column]
    private ?int $rooms = null;

    #[ORM\Column]
    private ?int $bathrooms = null;

    #[ORM\Column(length: 100)]
    private ?string $status = null;

    #[ORM\Column]
    private ?float $longitude = null;

    #[ORM\Column]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $prix_day = null;

    #[ORM\Column(nullable: true)]
    private ?float $price_month = null;

    #[ORM\ManyToOne(inversedBy: 'properties')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner_id = null;

    /**
     * @var Collection<int, Amenitie>
     */
    #[ORM\ManyToMany(targetEntity: Amenitie::class, mappedBy: 'properties')]
    private Collection $amenities;

    /**
     * @var Collection<int, PropertieImage>
     */
    #[ORM\OneToMany(targetEntity: PropertieImage::class, mappedBy: 'propertie_id')]
    private Collection $propertieImages;

    /**
     * @var Collection<int, Comments>
     */
    #[ORM\OneToMany(targetEntity: Comments::class, mappedBy: 'propertie_id')]
    private Collection $comments;

    /**
     * @var Collection<int, Reservation>
     */
    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'propertie_id')]
    private Collection $reservations;

    #[ORM\Column]
    private ?\DateTimeImmutable  $createdAt = null;

    #[ORM\Column]
    private ?\DateTime  $updatedAt = null;

    public function __construct()
    {
        $this->amenities = new ArrayCollection();
        $this->propertieImages = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

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

    public function getSurfaceArea(): ?float
    {
        return $this->surface_area;
    }

    public function setSurfaceArea(float $surface_area): static
    {
        $this->surface_area = $surface_area;

        return $this;
    }

    public function getRooms(): ?int
    {
        return $this->rooms;
    }

    public function setRooms(int $rooms): static
    {
        $this->rooms = $rooms;

        return $this;
    }

    public function getBathrooms(): ?int
    {
        return $this->bathrooms;
    }

    public function setBathrooms(int $bathrooms): static
    {
        $this->bathrooms = $bathrooms;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): static
    {
        $this->longitude = $longitude;

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

    public function getPrixDay(): ?float
    {
        return $this->prix_day;
    }

    public function setPrixDay(float $prix_day): static
    {
        $this->prix_day = $prix_day;

        return $this;
    }

    public function getPriceMonth(): ?float
    {
        return $this->price_month;
    }

    public function setPriceMonth(?float $price_month): static
    {
        $this->price_month = $price_month;

        return $this;
    }

    public function getOwnerId(): ?User
    {
        return $this->owner_id;
    }

    public function setOwnerId(?User $owner_id): static
    {
        $this->owner_id = $owner_id;

        return $this;
    }

    /**
     * @return Collection<int, Amenitie>
     */
    public function getAmenities(): Collection
    {
        return $this->amenities;
    }

    public function addAmenity(Amenitie $amenity): static
    {
        if (!$this->amenities->contains($amenity)) {
            $this->amenities->add($amenity);
            $amenity->addProperty($this);
        }

        return $this;
    }

    public function removeAmenity(Amenitie $amenity): static
    {
        if ($this->amenities->removeElement($amenity)) {
            $amenity->removeProperty($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, PropertieImage>
     */
    public function getPropertieImages(): Collection
    {
        return $this->propertieImages;
    }

    public function addPropertieImage(PropertieImage $propertieImage): static
    {
        if (!$this->propertieImages->contains($propertieImage)) {
            $this->propertieImages->add($propertieImage);
            $propertieImage->setPropertieId($this);
        }

        return $this;
    }

    public function removePropertieImage(PropertieImage $propertieImage): static
    {
        if ($this->propertieImages->removeElement($propertieImage)) {
            // set the owning side to null (unless already changed)
            if ($propertieImage->getPropertieId() === $this) {
                $propertieImage->setPropertieId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comments>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comments $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setPropertieId($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getPropertieId() === $this) {
                $comment->setPropertieId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setPropertieId($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getPropertieId() === $this) {
                $reservation->setPropertieId(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTime $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->createdAt = new \DateTimeImmutable(); 
        $this->updatedAt = new \DateTime();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updatedAt = new \DateTime(); 
    }
}
