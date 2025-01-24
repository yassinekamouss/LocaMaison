<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250124002241 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE amenitie CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NULL');
        $this->addSql('ALTER TABLE comments CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NULL');
        $this->addSql('ALTER TABLE payment CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NULL');
        $this->addSql('ALTER TABLE propertie CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NULL');
        $this->addSql('ALTER TABLE propertie_image CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NULL');
        $this->addSql('ALTER TABLE reservation CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME NULL');
        $this->addSql('ALTER TABLE user CHANGE created_at created_at DATETIME NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE updated_at updated_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
        $this->addSql('ALTER TABLE payment CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
        $this->addSql('ALTER TABLE propertie CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
        $this->addSql('ALTER TABLE propertie_image CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
        $this->addSql('ALTER TABLE comments CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
        $this->addSql('ALTER TABLE amenitie CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
        $this->addSql('ALTER TABLE `user` CHANGE created_at created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL');
    }
}
