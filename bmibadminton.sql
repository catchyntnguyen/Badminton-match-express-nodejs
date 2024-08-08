-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 08, 2024 at 05:04 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bmibatminton`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Đơn'),
(2, 'Đôi');

-- --------------------------------------------------------

--
-- Table structure for table `matches_detail`
--

CREATE TABLE `matches_detail` (
  `id` int NOT NULL,
  `categoriesID` int NOT NULL,
  `scoreT1` int DEFAULT NULL,
  `status` int NOT NULL,
  `dateStart` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `dateEnd` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `player` varchar(200) COLLATE utf8mb3_unicode_ci NOT NULL,
  `coreT2` int DEFAULT NULL,
  `time` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `location` varchar(200) COLLATE utf8mb3_unicode_ci NOT NULL,
  `timePlay` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `matches_detail`
--

INSERT INTO `matches_detail` (`id`, `categoriesID`, `scoreT1`, `status`, `dateStart`, `dateEnd`, `player`, `coreT2`, `time`, `location`, `timePlay`) VALUES
(44, 1, 2, 3, '2024-06-15', '', '{\"user\":[28,32]}', 3, '16:30', '', 2),
(45, 2, 0, 3, '2024-06-14', '', '{\"user\":[29,30]}', 0, '17:00', 'Sân lio 2 Gần trường', NULL),
(46, 1, 0, 1, '2024-06-14', '', '{\"user\":[31]}', 0, '16:00', 'Sân lio 1 Gần trường', NULL),
(47, 1, 0, 3, '2024-06-14', '', '{\"user\":[30,32]}', 0, '12:00', 'Sân lio 1 Gần trường', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `img` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `height` int DEFAULT NULL,
  `bmi` float DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `calo` int DEFAULT NULL,
  `role` int NOT NULL,
  `status` int DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `img`, `height`, `bmi`, `weight`, `calo`, `role`, `status`, `phoneNumber`) VALUES
(28, 'Nguyễn Trần Khắc Duy', 'ntkd@gmail.com', '123', NULL, 175, 24.49, 75, 328, 0, NULL, 348378112),
(29, 'Cao Hoàng Thành', 'cht@gmail.com', '123', NULL, 165, 22.04, 60, NULL, 0, NULL, 348378111),
(30, 'Nguyễn Quốc Thành ', 'nqt@gmail.com', '123', NULL, 175, 19.59, 60, NULL, 0, NULL, 348378114),
(31, 'Trần Thị Hồng Ngọc', 'tthn@gmail.com', '123', NULL, 160, 19.53, 50, NULL, 0, NULL, 348478115),
(32, 'forbugs', 'forbugs@gmail.com', '123123', NULL, 175, 29.39, 90, 328, 0, NULL, 990022456);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matches_detail`
--
ALTER TABLE `matches_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_matches_detail_categoriesID` (`categoriesID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `matches_detail`
--
ALTER TABLE `matches_detail`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches_detail`
--
ALTER TABLE `matches_detail`
  ADD CONSTRAINT `fk_matches_detail_categoriesID` FOREIGN KEY (`categoriesID`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
