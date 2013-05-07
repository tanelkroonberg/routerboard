-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 06, 2013 at 01:18 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `routerboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
CREATE TABLE IF NOT EXISTS `group` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(25) NOT NULL,
  `group_description` text NOT NULL,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `group_name`, `group_description`, `deleted`) VALUES
(1, 'Integrated solutions', 'These products are provided complete with cases, power adapters and packaged inside individual product boxes. Ready to use and preconfigured with the most basic functionality so you can plug-in and use.', 0),
(2, 'RouterBOARD', 'Small integrated routers running RouterOS. The RouterBOARD devices are sold as they are, choose case, adapters and interfaces separately. Perfect for assembling your own systems as they offer the biggest customization options', 0),
(3, 'Enclosures', 'Indoor and outdoor cases and boxes for using with RouterBOARD devices. Choose based on intended place of use, the RouterBOARD model, and the type of connections you will need (USB, antenna holes etc)', 0),
(4, 'Interfaces', 'Wireless radio cards for expanding the functionality of RouterBOARD devices and PCs running RouterOS. Choose based on frequency, output power and connector type.', 0),
(5, 'Accessories', 'These devices are made for MikroTik products - power adapters, pigtails and PoE injectors.', 0),
(6, 'Product archive', 'These products are not manufactured anymore, and are listed here only for reference.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `image_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `url` varchar(255) NOT NULL,
  `position` int(11) NOT NULL,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`image_id`, `product_id`, `url`, `position`, `deleted`) VALUES
(1, 1, 'c18.png', -240, 0),
(2, 2, 'c17.png', -320, 0),
(3, 3, 'c18.png', -320, 0),
(4, 4, 'c15.png', 0, 0),
(5, 5, 'c18.png', -80, 0),
(6, 6, 'c15.png', -160, 0),
(7, 7, 'c7.png', -400, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(25) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `group_id` int(10) unsigned NOT NULL,
  `info` varchar(255) NOT NULL,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `code`, `name`, `description`, `price`, `group_id`, `info`, `deleted`) VALUES
(1, 'RBSEXTANTG5HPnD', 'SEXTANT G 5HPnD', 'The SEXTANT is a 18dBi 5GHz antenna with a built in RB911G router. It has two polarizations to give you all benefits of 2x2 MIMO in 802.11n. \r\n\r\nInside is the high power RB911 dual chain wireless device, with high performance, high output power, and a Gigabit Ethernet port, to fully \r\nutilize the benefit of 802.11n high speed wireless. \r\n\r\nEasy to use and quick to deploy, SEXTANT is ideal for point to point links. \r\n\r\nPackage contains SEXTANTG5PHnD, mounting kit, PoE injector, power adapter', '110.00', 1, '18dBi dual pol', 0),
(2, 'RB260GS', 'RB260GS', 'The RB260GS is a small SOHO switch. It has five Gigabit Ethernet ports and one SFP cage powered by an Atheros Switch Chip. \r\n\r\nTested and recommended to use with MikroTik SFP modules: S-85DLC05D, S-31DLC20D and S-35/53LC20D (not included) \r\n\r\nIt is powered by an operating system designed specifically for MikroTik Switch products - SwOS. \r\n\r\nSwOS is configurable from your web browser. It gives you all the basic functionality for a managed switch, plus more: Allows to manage port-to-port forwarding, apply MAC filter, configure \r\nVLANs, mirror traffic, apply bandwidth limitation and even adjust some MAC and IP header fields.', '39.95', 1, 'Gigabit switch', 0),
(3, 'RB912UAG-5HPnD', 'RB912UAG-5HPnD', 'The RB912UAG-5HPnD is very versatile device. It''s \r\nsmall wireless router with an integrated high power wireless card and an additional miniPCIe slot for 802.11 wireless, or 3G card. The Gigabit port helps to utilize the full potential of 802.11n wireless speeds. \r\n\r\nThe integrated wireless card is capable of up to 1000mW output power. It has built in 16kV ESD protection on both the Ethernet and the \r\nMMCX ports', '79.00', 2, '1000mW 5Ghz', 0),
(4, 'CA411-711', 'CA411-711', 'CA411-711 is new indoor case for RB411 and RB711 series. It has changeable front panels, so you can choose one that fits the product that you actually use. Also, case is higher to accommodate high-power wireless cards and has wall mounting holes on the back.', '15.00', 3, 'fits RB411 and RB711', 0),
(5, 'S-31DLC20D', 'S-31DLC20D', 'S-31DLC20D is a 1.25G SFP transceiver with a 1310nm Dual LC connector, for up to 20 kilometer Single Mode fiber connections, with DDM \r\n\r\nUnits are tested and compatible with RB260GS,RB2011LS, RB2011LS-IN, RB2011UAS-IN, RB2011UAS-RM, RB2011UAS-2HnD, RB2011UAS-2HnD-IN, and CCR1036-12G-4S. Units are compatible with non-MikroTik SFP devices as well.', '29.00', 4, '20KM, Single Mode', 0),
(6, '12POW', '12POW', '12V 0.5A Power Supply \r\n\r\nFits RB750', '9.00', 5, '12V 0.5A', 0),
(7, 'IAMP4', 'RB14', 'RouterBOARD 14 miniPCI to PCI Adapter for using four miniPCI cards inside regular PC with PCI slots. Doesn''t require any drivers.', NULL, 6, 'miniPCI to PCI', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deleted` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`);
SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
