-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 14 oct. 2023 à 00:23
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `online_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `Country`
--

DROP TABLE IF EXISTS `Country`;
CREATE TABLE IF NOT EXISTS `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `flag` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `prefix` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `Country`
--

INSERT INTO `Country` (`id`, `name`, `flag`, `code`, `prefix`, `createdAt`, `updatedAt`, `active`) VALUES
(1, 'United State of Amercia', 'BRW', 'USA', '1', '2023-10-05 02:19:36', '2023-10-05 02:19:36', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Currency`
--

DROP TABLE IF EXISTS `Currency`;
CREATE TABLE IF NOT EXISTS `Currency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `currency`
--

INSERT INTO `Currency` (`id`, `name`, `code`, `label`, `description`, `createdAt`, `updatedAt`, `active`) VALUES
(1, 'US Dollar', 'USD', '$', 'American Central Bank', '2023-10-05 04:23:03', '2023-10-05 04:23:03', 1),
(2, 'EURO', 'EUR', 'euro', 'European central bank', '2023-10-14 01:16:57', '1900-01-13 01:17:04', 1),
(3, 'POUNDS', 'GBP', 'pounds', 'United Kingdom Central Bank', '2023-10-14 01:19:39', '2023-10-14 00:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
CREATE TABLE IF NOT EXISTS `Payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fees` double DEFAULT '0',
  `fees_type` varchar(255) DEFAULT 'number',
  `countryId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `countryId` (`countryId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `Payment`
--

INSERT INTO `Payment` (`id`, `name`, `description`, `fees`, `fees_type`, `countryId`, `createdAt`, `updatedAt`, `active`) VALUES
(1, 'CASH', 'Customer should paid by cash money', 0, 'number', NULL, '2023-10-05 04:20:37', '2023-10-05 04:20:37', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Role`
--

DROP TABLE IF EXISTS `Role`;
CREATE TABLE IF NOT EXISTS `Role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `Role`
--

INSERT INTO `Role` (`id`, `title`, `slug`, `description`, `createdAt`, `updatedAt`, `active`) VALUES
(1, 'Customer', 'client', 'User who can request for transfert', '2023-10-05 02:14:19', '2023-10-05 02:14:19', 1),
(2, 'Administrator', 'admin', 'User who have all priviledges', '2023-10-05 02:15:28', '2023-10-05 02:15:28', 1),
(3, 'Manager', 'manager', 'User who can manage customer', '2023-10-13 21:36:35', '1900-01-12 21:36:43', 1);

-- --------------------------------------------------------

--
-- Contraintes pour la table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
