<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250123042935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE amenitie (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE amenitie_propertie (amenitie_id INT NOT NULL, propertie_id INT NOT NULL, INDEX IDX_44DCEED082164978 (amenitie_id), INDEX IDX_44DCEED05B0B1EA4 (propertie_id), PRIMARY KEY(amenitie_id, propertie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, propertie_id_id INT NOT NULL, locataire_id_id INT NOT NULL, content LONGTEXT NOT NULL, rating INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_5F9E962AFBA3D680 (propertie_id_id), INDEX IDX_5F9E962AF9C41DCF (locataire_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payment (id INT AUTO_INCREMENT NOT NULL, reservation_id_id INT NOT NULL, amount DOUBLE PRECISION NOT NULL, status VARCHAR(100) NOT NULL, method VARCHAR(100) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_6D28840D3C3B4EF0 (reservation_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE propertie (id INT AUTO_INCREMENT NOT NULL, owner_id_id INT NOT NULL, title LONGTEXT NOT NULL, description LONGTEXT NOT NULL, adresse VARCHAR(255) NOT NULL, city VARCHAR(100) NOT NULL, type VARCHAR(100) NOT NULL, surface_area DOUBLE PRECISION NOT NULL, rooms INT NOT NULL, bathrooms INT NOT NULL, status VARCHAR(100) NOT NULL, longitude DOUBLE PRECISION NOT NULL, latitude DOUBLE PRECISION NOT NULL, prix_day DOUBLE PRECISION DEFAULT NULL, price_month DOUBLE PRECISION DEFAULT NULL, INDEX IDX_C4F865C48FDDAB70 (owner_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE propertie_image (id INT AUTO_INCREMENT NOT NULL, propertie_id_id INT NOT NULL, image_url VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_41DA4C88FBA3D680 (propertie_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reservation (id INT AUTO_INCREMENT NOT NULL, propertie_id_id INT NOT NULL, locataire_id_id INT NOT NULL, check_in DATE NOT NULL, check_out DATE NOT NULL, total_price DOUBLE PRECISION NOT NULL, status VARCHAR(100) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_42C84955FBA3D680 (propertie_id_id), INDEX IDX_42C84955F9C41DCF (locataire_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, phone VARCHAR(50) NOT NULL, individual TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE amenitie_propertie ADD CONSTRAINT FK_44DCEED082164978 FOREIGN KEY (amenitie_id) REFERENCES amenitie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE amenitie_propertie ADD CONSTRAINT FK_44DCEED05B0B1EA4 FOREIGN KEY (propertie_id) REFERENCES propertie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962AFBA3D680 FOREIGN KEY (propertie_id_id) REFERENCES propertie (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962AF9C41DCF FOREIGN KEY (locataire_id_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D3C3B4EF0 FOREIGN KEY (reservation_id_id) REFERENCES reservation (id)');
        $this->addSql('ALTER TABLE propertie ADD CONSTRAINT FK_C4F865C48FDDAB70 FOREIGN KEY (owner_id_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE propertie_image ADD CONSTRAINT FK_41DA4C88FBA3D680 FOREIGN KEY (propertie_id_id) REFERENCES propertie (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955FBA3D680 FOREIGN KEY (propertie_id_id) REFERENCES propertie (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955F9C41DCF FOREIGN KEY (locataire_id_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE amenitie_propertie DROP FOREIGN KEY FK_44DCEED082164978');
        $this->addSql('ALTER TABLE amenitie_propertie DROP FOREIGN KEY FK_44DCEED05B0B1EA4');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962AFBA3D680');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962AF9C41DCF');
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D3C3B4EF0');
        $this->addSql('ALTER TABLE propertie DROP FOREIGN KEY FK_C4F865C48FDDAB70');
        $this->addSql('ALTER TABLE propertie_image DROP FOREIGN KEY FK_41DA4C88FBA3D680');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955FBA3D680');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955F9C41DCF');
        $this->addSql('DROP TABLE amenitie');
        $this->addSql('DROP TABLE amenitie_propertie');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP TABLE propertie');
        $this->addSql('DROP TABLE propertie_image');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
