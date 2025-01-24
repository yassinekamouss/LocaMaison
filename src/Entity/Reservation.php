<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Propertie $propertie_id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $locataire_id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeImmutable $check_in = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeImmutable $check_out = null;

    #[ORM\Column]
    private ?float $total_price = null;

    #[ORM\Column(length: 100)]
    private ?string $status = null;

    #[ORM\Column]
    private ?\DateTimeImmutable  $createdAt = null;

    #[ORM\Column]
    private ?\DateTime  $updatedAt = null;

    /**
     * @var Collection<int, Payment>
     */
    #[ORM\OneToMany(targetEntity: Payment::class, mappedBy: 'reservation_id')]
    private Collection $payments;

    public function __construct()
    {
        $this->payments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPropertieId(): ?Propertie
    {
        return $this->propertie_id;
    }

    public function setPropertieId(?Propertie $propertie_id): static
    {
        $this->propertie_id = $propertie_id;

        return $this;
    }

    public function getLocataireId(): ?User
    {
        return $this->locataire_id;
    }

    public function setLocataireId(?User $locataire_id): static
    {
        $this->locataire_id = $locataire_id;

        return $this;
    }

    public function getCheckIn(): ?\DateTimeImmutable
    {
        return $this->check_in;
    }

    public function setCheckIn(\DateTimeImmutable $check_in): static
    {
        $this->check_in = $check_in;

        return $this;
    }

    public function getCheckOut(): ?\DateTimeImmutable
    {
        return $this->check_out;
    }

    public function setCheckOut(\DateTimeImmutable $check_out): static
    {
        $this->check_out = $check_out;

        return $this;
    }

    public function getTotalPrice(): ?float
    {
        return $this->total_price;
    }

    public function setTotalPrice(float $total_price): static
    {
        $this->total_price = $total_price;

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

    /**
     * @return Collection<int, Payment>
     */
    public function getPayments(): Collection
    {
        return $this->payments;
    }

    public function addPayment(Payment $payment): static
    {
        if (!$this->payments->contains($payment)) {
            $this->payments->add($payment);
            $payment->setReservationId($this);
        }

        return $this;
    }

    public function removePayment(Payment $payment): static
    {
        if ($this->payments->removeElement($payment)) {
            // set the owning side to null (unless already changed)
            if ($payment->getReservationId() === $this) {
                $payment->setReservationId(null);
            }
        }

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
