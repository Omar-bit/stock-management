-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 19. Sep 2023 um 20:04
-- Server-Version: 5.7.24
-- PHP-Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `vape111`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `clients`
--

CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `tel_client` varchar(12) DEFAULT '',
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `clients`
--

INSERT INTO `clients` (`id_client`, `nom`, `tel_client`, `statue`) VALUES
(1, 'Passagé', '00000000', 1),
(2, 'Passager', '00000000', 1),
(3, 'bouazzaa', '28814441', 0),
(4, 'taha ben khlifa', '22537817', 1),
(5, 'ilyess', '26786044', 1),
(6, 'bilel chaarana', '28646620', 1),
(7, 'rouge client', '29863123', 1),
(8, 'gamha', '98184589', 1),
(9, 'krifa mohamed', '25284804', 1),
(10, 'mehdi', '53573045', 1),
(11, 'ayman client', '20964164', 1),
(12, '242', '0783', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `id_four` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `tel_four` varchar(12) DEFAULT NULL,
  `pays` varchar(50) DEFAULT 'Tunisie',
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `fournisseurs`
--

INSERT INTO `fournisseurs` (`id_four`, `nom`, `tel_four`, `pays`, `statue`) VALUES
(1, 'Fournisseur 0', '12481563', 'tunisie', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `liste_prod`
--

CREATE TABLE `liste_prod` (
  `id_prod` varchar(50) NOT NULL,
  `id_v` int(11) NOT NULL,
  `qte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `liste_prod`
--

INSERT INTO `liste_prod` (`id_prod`, `id_v`, `qte`) VALUES
('013', 13, 1),
('014', 13, 1),
('015', 13, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `produits`
--

CREATE TABLE `produits` (
  `id_prod` varchar(50) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `img` varchar(256) NOT NULL,
  `qte` int(11) DEFAULT NULL,
  `prix` decimal(9,3) DEFAULT NULL,
  `id_four` int(11) NOT NULL,
  `statue` tinyint(1) NOT NULL DEFAULT '1',
  `prix_achat` decimal(9,0) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `produits`
--

INSERT INTO `produits` (`id_prod`, `nom`, `img`, `qte`, `prix`, `id_four`, `statue`, `prix_achat`) VALUES
('01', 'accu 3000', 'defaultImg.png', -1, '20.000', 1, 0, '0'),
('012', 'shinigami', '2994072319_939516813171721_1007508341613281544_n.jpg', 97, '7.000', 1, 1, '1'),
('013', 'vingo', 'defaultImg.png', 92, '7.000', 1, 1, '0'),
('014', 'vodka', 'defaultImg.png', 97, '7.000', 1, 1, '0'),
('015', 'f.m sunset', 'defaultImg.png', 98, '7.000', 1, 1, '0'),
('016', 'FM HAPPY', 'defaultImg.png', 98, '7.000', 1, 1, '0'),
('017', 'KING KOBA', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('018', 'FM CARAIBES', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('019', 'BUBLE BUE', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('02', 'coil', 'defaultImg.png', 99, '2.000', 1, 1, '0'),
('020', 'CITRON VERT', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('021', 'HENDO', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('022', 'FM DESIT', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('023', 'POLARIS', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('024', 'FRUIT ROUGE', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('025', 'RED WEDDING', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('026', 'RED WEDDING', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('027', 'KAY', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('029', 'BLUE OIL', 'defaultImg.png', 97, '7.000', 1, 1, '0'),
('03', 'accu 2500', 'defaultImg.png', 4, '20.000', 1, 1, '0'),
('030', 'FRUIT ROUGE G', 'defaultImg.png', 97, '7.000', 1, 1, '0'),
('031', 'PINACOLADA', 'defaultImg.png', 97, '7.000', 1, 1, '0'),
('033', 'BANGO', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('034', 'MINASAWA', 'defaultImg.png', 97, '7.000', 1, 1, '0'),
('036', 'RAGNAROGUE', 'defaultImg.png', 12, '7.000', 1, 1, '0'),
('037', 'NAGASHI', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('038', 'MOJITO', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('039', 'URAKEN', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('04', 'shigueri', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('040', 'KAMI', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('042', 'FM BAHAMS', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('045', 'RAG 0', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('046', 'SHIVA', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('047', 'SWEET CHEN', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('048', 'SWEET CHEN', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('049', 'DIABLO OIL', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('05', 'red oil', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('050', 'FM DIABLO', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('051', 'HIZAGIRI', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('052', 'TOSHIMURA', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('053', 'KUROKO', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('054', 'MAWASHI', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('056', 'MISTERY', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('057', 'USHERO', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('058', 'FM RAINBOW', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('06', 'valkyrie', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('061', 'COSMOPOLITON', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('062', 'FM SUNNY', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('063', 'FURY', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('064', 'SHINIGAMI 0', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('066', 'KANSETSU', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('067', 'ONI', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('068', 'SILICONE', '594072319_939516813171721_1007508341613281544_n.jpg', 15, '12.000', 1, 1, '0'),
('07', 'shaken', 'defaultImg.png', 99, '7.000', 1, 1, '0'),
('071', 'RING', '4994072319_939516813171721_1007508341613281544_n.jpg', 21, '2.000', 1, 1, '0'),
('072', 'meche vape', 'defaultImg.png', 63, '11.000', 1, 1, '0'),
('08', 'phoenix', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('09', 'green oil', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('1', 'prod1', '5760-7601508_blue-splash-png-blue-paint-splash-png.png', 107, '12.000', 1, 0, '0'),
('10', 'yellow oil', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('100', 'gourmand', 'defaultImg.png', 99, '10.000', 1, 1, '0'),
('101', '3mara', 'defaultImg.png', 2999, '1.000', 1, 1, '0'),
('11', 'purple oil', 'defaultImg.png', 0, '7.000', 1, 1, '0'),
('12', 'liquide ananas', '591000_F_357525977_3vZlhK0h9JdYnwhPQ8bPpKXdXB7w9EA3.jpg', 193, '12.000', 1, 0, '0'),
('13', 'liquide toffe7', '2Download.jpeg', 6, '12.000', 1, 0, '0'),
('73', 'mvv2', 'defaultImg.png', 1, '180.000', 1, 1, '0'),
('74', 'mvp', 'defaultImg.png', 1, '180.000', 1, 1, '0'),
('75', 'gtx 80 vaporesso', 'defaultImg.png', 6, '100.000', 1, 1, '0'),
('76', 'sky solo plus', 'defaultImg.png', 3, '100.000', 1, 1, '0'),
('77', 'puff 7k', 'defaultImg.png', 9, '45.000', 1, 1, '0'),
('78', 'drag x ', 'defaultImg.png', 1, '160.000', 1, 1, '0'),
('79', 'puff 8k', 'defaultImg.png', 7, '40.000', 1, 1, '0'),
('80', 'accu 3000', 'defaultImg.png', 6, '20.000', 1, 1, '0'),
('81', 'charger daccu', 'defaultImg.png', 2, '35.000', 1, 1, '0'),
('82', 'zeus x bleu', 'defaultImg.png', 1, '120.000', 1, 1, '0'),
('83', 'puma', 'defaultImg.png', 1, '160.000', 1, 1, '0'),
('84', 'dead rabbit v2 rda ', 'defaultImg.png', 1, '75.000', 1, 1, '0'),
('86', 'puff 12k', 'defaultImg.png', 1, '60.000', 1, 1, '0'),
('87', 'pret a vape 100ml', 'defaultImg.png', 5, '15.000', 1, 1, '0'),
('88', 'pyrex', 'defaultImg.png', 23, '12.000', 1, 1, '0'),
('89', 'coil', 'defaultImg.png', 20, '2.000', 1, 1, '0'),
('90', 'ato mech', 'defaultImg.png', 6, '40.000', 1, 1, '0'),
('gfhgfh', 'fghfghfg', 'defaultImg.png', 3, '16.000', 1, 1, '19');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `tel_u` varchar(12) DEFAULT NULL,
  `mdp` varchar(50) NOT NULL,
  `role` enum('admin','vendeur','comptable') NOT NULL,
  `statue` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `nom`, `tel_u`, `mdp`, `role`, `statue`) VALUES
(1, 'HAMZA', '21927680', '98528971', 'admin', 1),
(2, '3arfi', '15151515', '123', 'vendeur', 0),
(3, 'gamha', '98184589', 'amine06300', 'vendeur', 1),
(4, 'gamha', '98184589', 'amine06300', 'vendeur', 0),
(5, 'hs', '', '123456', 'comptable', 1),
(6, 'hs', '', '123456', 'comptable', 0),
(7, 'hhhh', '98528971', '852741963', 'vendeur', 0),
(8, 'rhy', '98528971', '98528971', 'vendeur', 1),
(9, 'test', '0', '1234', 'vendeur', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ventes`
--

CREATE TABLE `ventes` (
  `id_v` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `prix_tot` decimal(15,3) DEFAULT NULL,
  `prix_donnee` decimal(15,3) NOT NULL,
  `remise` decimal(6,3) NOT NULL DEFAULT '0.000',
  `id_utilisateur` int(11) NOT NULL,
  `date_v` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `ventes`
--

INSERT INTO `ventes` (`id_v`, `id_client`, `prix_tot`, `prix_donnee`, `remise`, `id_utilisateur`, `date_v`) VALUES
(13, 9, '21.000', '3.000', '0.000', 1, '2023-09-18 04:57:59');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_client`);

--
-- Indizes für die Tabelle `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`id_four`);

--
-- Indizes für die Tabelle `liste_prod`
--
ALTER TABLE `liste_prod`
  ADD PRIMARY KEY (`id_prod`,`id_v`),
  ADD KEY `liste_prod_ibfk_2` (`id_v`);

--
-- Indizes für die Tabelle `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `id_four` (`id_four`);

--
-- Indizes für die Tabelle `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`);

--
-- Indizes für die Tabelle `ventes`
--
ALTER TABLE `ventes`
  ADD PRIMARY KEY (`id_v`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `clients`
--
ALTER TABLE `clients`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `fournisseurs`
--
ALTER TABLE `fournisseurs`
  MODIFY `id_four` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id_v` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `liste_prod`
--
ALTER TABLE `liste_prod`
  ADD CONSTRAINT `liste_prod_ibfk_1` FOREIGN KEY (`id_prod`) REFERENCES `produits` (`id_prod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liste_prod_ibfk_2` FOREIGN KEY (`id_v`) REFERENCES `ventes` (`id_v`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `produits`
--
ALTER TABLE `produits`
  ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_four`) REFERENCES `fournisseurs` (`id_four`);

--
-- Constraints der Tabelle `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_client`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ventes_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
