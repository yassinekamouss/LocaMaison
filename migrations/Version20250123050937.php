<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250123050937 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE amenitie CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE updated_at updated_at VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE comments CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE updated_at updated_at VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE payment CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE updated_at updated_at VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE propertie ADD created_at VARCHAR(255) NOT NULL, ADD updated_at VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE propertie_image CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE updated_at updated_at VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE reservation CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE updated_at updated_at VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE phone phone VARCHAR(50) NOT NULL, CHANGE created_at created_at VARCHAR(255) NOT NULL, CHANGE updated_at updated_at VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `user` CHANGE phone phone VARCHAR(15) NOT NULL, CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE payment CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE propertie DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE propertie_image CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE reservation CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE comments CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE amenitie CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }
}
