-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Tempo de geração: 27/11/2023 às 00:27
-- Versão do servidor: 11.1.2-MariaDB-1:11.1.2+maria~ubu2204
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `countCarbo`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `validation_code` int(11) DEFAULT NULL,
  `validation` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `login`, `password`, `validation_code`, `validation`, `status`) VALUES
(1, 'admin', 'ricardoraks1003@gmail.com', 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `category_foods`
--

CREATE TABLE `category_foods` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `category_foods`
--

INSERT INTO `category_foods` (`id`, `name`) VALUES
(1, 'Frutas'),
(2, 'Massas');

-- --------------------------------------------------------

--
-- Estrutura para tabela `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `category_foods_id` int(11) NOT NULL,
  `weight_measure_food_id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `measure` text DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `kcal` int(11) DEFAULT NULL,
  `carbohydrate` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `foods`
--

INSERT INTO `foods` (`id`, `category_foods_id`, `weight_measure_food_id`, `name`, `measure`, `weight`, `kcal`, `carbohydrate`, `description`, `status`) VALUES
(15, 1, 1, 'Maça', 'MERHV3htdnMwQkRNWlFGcTRTVGo6OjEyOjr/Z+TDwpqI8Ov6XUapKETW', 80, 47, 12, 'M1dIWTdudS8xaDNJSVFWbkdlSytzS3VuOjoxMjo6cLdxoRLFFkJyIyEc0rjX+A==', 1),
(16, 1, 1, 'Abacaxi', 'MERHQXdtN3cxRjdBaHNWdlMrST06OjEyOjrzP/1o4Uu6M1dRV4j6LzMp', 200, 492, 84, NULL, 1),
(17, 1, 1, 'Abacate', 'MEQ3U2cyLzMzQnJNSVFrclV1Yno2cjczMkE9PTo6MTI6OsFF4Dmd5ycMeKsnmdkfZTg=', 92, 148, 7, 'M1g2S25SZVRpUkxFWlI5L1crL25vdm50M0lsK0RpMEpiTTM5ZEZ0N1NhNlMwdGJ0MEZIY0QwSlNVOXFjcW55OVo2bXNjNDk5RW40SE9iV3BEQkkvaUlrNmQ0WUR1N1YyYUEzSnU2NG9McVFDQzBYVTVPTE5uamtNZFpKUGszYVh1TWYyc0ZtWVVBMmgzeFFiVWVRM2tUNTAxdHcwaFN1WGlQbFc3WDhCNmxTNFJMZUxYdXBGNk1wR1BqdkdxN2RCUnhpNU50NTFPV2t1cUl0d0dxdHp6QXhlc2RvVVR2L09pR2lnZXdSRzVjWDNib0Rzb2hHWDNLK2N4a1lRTmxlOFk3aFRaQ21UVGRCS0R5aEMzeXdMcCswRlh3b0JRbjJkMXJZS2g1enhTK0d0WElPRW9jQk9ZaWY2eVJTY2JKalZDczVmZS9naWMvdjJQRlh2NXVXWTVWNld3ajVNRjhHV2l1MHhiN0NRSGNFdHk0TG1xWnhwRVhwT0U2QVN0ZFlTRDFPcElEOWJmMXlKQW41Z29uRklnZkhwcE9BVWRMUWZQWkltdnhLK2tRWnBzaEJhdnFjSGJTbFBhbUQ0Y1N6WlVxOExjZkxOS0U5eXQ5ZHRHaVVudzNWbEtDU2Vua2xGUkV6elAwL0ZYc3NaM3N6V3VKTXRlRnVPbkJZQWY4dHBrcmF2N0w3UmxDTEd0UGRWL3h1TFhlem1jUUNwNGxmd2pyMVYvTnMxa09oQ1NWN2pJaStGZkJIRXV4M1BkUmdGTDQwRXBHVndsWnhnZXZ1VGhjSTVsY0czL09MR3d6K1ZzazJudXdJUkhpSVdJbmk0ODZpUUlGb2xVVTFKdXJnWmNTcTI4YjM0SnpRVDlQS0J4MEg2RVZnQU9aeXRXVEQ4ZXlsN3NENjJlWUs5QVJrUkk4dGFoRGFGcEI4Vzk5S3pRWnNVWmREWElINnYwSFZrem11M2hydVBSWWlvQXE5blFBMnJQTGlpUGZscTV4WjJLTVhhczl0d2h1SE1NMkUrSFV5N09DVnVVSkxBNFVwUzBSZkJxaFFBK1p4RjZCTzl0cHM0WDBGN1RmK3BnTDdGQTdpbXViei84RXJJMUMxNERsb0g1dUN4eDFhWWh1UVMwa3pRei93N2ViMFhVMGpnTmtPUUlmWTJxVzUvOTNsVjlVR01GdGQvS0VmTkNiZDhCUFRQcEJNVmFZbFgwQW9mdGdEd085VHY4Z0ZxN2EvWlFpVWFnQjZmRlRzR1R5R1Y6OjEyOjpuLaL37WDQ+TVGPWTU5ZyY', 1),
(18, 1, 1, 'Acerola', 'MERHVHpYUDkxQnJJWlJ4dVUvYm44Ym89OjoxMjo683LEZRim4rZd0Y0plP3Ksg==', 12, 4, 1, NULL, 1),
(19, 1, 1, 'Ameixa preta seca', 'MERHVHpYUDkxQnJJWlFISWkrZnIvZz09OjoxMjo6jVGQA67AWhEusljvzMqKnw==', 5, 12, 3, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `hours`
--

CREATE TABLE `hours` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `hour` time DEFAULT NULL,
  `min_carbohydrate` int(11) DEFAULT NULL,
  `max_carbohydrate` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `notification` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `hours`
--

INSERT INTO `hours` (`id`, `users_id`, `hour`, `min_carbohydrate`, `max_carbohydrate`, `description`, `notification`) VALUES
(5, 6, '10:00:00', 0, 250, 'dFhTVjEzdjMwUkU9OjoxMjo6ic6TgacQdp+Y0eBtKq/MXg==', 0),
(6, 6, '11:45:00', NULL, NULL, 'cVg2VXdtancybDdkSkI1cUF1WGo1YjdybVpoa1VEa0piTVR5OjoxMjo6D1B6G0az2UJsI/3PZuLdgA==', 0),
(7, 6, '12:00:00', 0, 500, 'c3RKVmcyNzh4Z3JJOjoxMjo6Rks11p07u2FPnJjahA4MLw==', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `image_foods`
--

CREATE TABLE `image_foods` (
  `id` int(11) NOT NULL,
  `foods_id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `image_foods`
--

INSERT INTO `image_foods` (`id`, `foods_id`, `name`) VALUES
(11, 16, '089d17e073d69e797c657c620bde78b03875f91f.jpg'),
(13, 18, '7a3df220754368e857e62b8038109801b7962b6f.jpg'),
(14, 19, '5ecaf86b6c4f46ded83acd7d4ed8d0d29af8dde4.jpg'),
(27, 17, 'dc4331a02890ad7c7493863506b83b91fb4ddb73.jpg'),
(29, 15, '66165b12e87cf4b3105d9d859ffa5bba10afa1a8.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `menu_admin`
--

CREATE TABLE `menu_admin` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `menu_upa` int(11) DEFAULT NULL,
  `menu_umf` int(11) DEFAULT NULL,
  `menu_collaborator` int(11) DEFAULT NULL,
  `menu_report` int(11) DEFAULT NULL,
  `menu_families_species` int(11) DEFAULT NULL,
  `menu_tree` int(11) DEFAULT NULL,
  `menu_pp` int(11) DEFAULT NULL,
  `menu_sp` int(11) DEFAULT NULL,
  `menu_validate` int(11) DEFAULT NULL,
  `menu_equip` int(11) DEFAULT NULL,
  `menu_situation` int(11) DEFAULT NULL,
  `menu_activities` int(11) DEFAULT NULL,
  `menu_geo_reference` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `email`, `password`, `create_date`, `status`) VALUES
(6, 'Ricardo Alexandre', 'Klos de Souza', 'azNpRndtajkyZ3pNTGg4NkVyT3gzN3owMkpobURTOEthQT09OjoxMjo6Ai6RLcfdw6LXT+HD1bDj7A==', 'MW5MU3dpTDloVWZPSkY4OEZMSGorZTJvM01RekZuNVZQSjZnS2hnbEd2emYzWkxybVFTZUhnPT06OjEyOjojzKiX0OgR9DD6+L9lInCb', '2023-11-22 22:57:44', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_foods`
--

CREATE TABLE `user_foods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `user_foods`
--

INSERT INTO `user_foods` (`id`, `user_id`, `food_id`) VALUES
(23, 6, 17),
(24, 6, 16),
(25, 6, 18),
(26, 6, 19),
(27, 6, 15);

-- --------------------------------------------------------

--
-- Estrutura para tabela `weight_measure_food`
--

CREATE TABLE `weight_measure_food` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Despejando dados para a tabela `weight_measure_food`
--

INSERT INTO `weight_measure_food` (`id`, `name`) VALUES
(1, 'G/ML');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `category_foods`
--
ALTER TABLE `category_foods`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_foods_category_foods1_idx` (`category_foods_id`),
  ADD KEY `fk_foods_weight_measure_food1_idx` (`weight_measure_food_id`);

--
-- Índices de tabela `hours`
--
ALTER TABLE `hours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hours_users1_idx` (`users_id`);

--
-- Índices de tabela `image_foods`
--
ALTER TABLE `image_foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_image_foods_foods1_idx` (`foods_id`);

--
-- Índices de tabela `menu_admin`
--
ALTER TABLE `menu_admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_menu_admin_admin1_idx` (`admin_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `user_foods`
--
ALTER TABLE `user_foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `weight_measure_food`
--
ALTER TABLE `weight_measure_food`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `category_foods`
--
ALTER TABLE `category_foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `hours`
--
ALTER TABLE `hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `image_foods`
--
ALTER TABLE `image_foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `menu_admin`
--
ALTER TABLE `menu_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `user_foods`
--
ALTER TABLE `user_foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `weight_measure_food`
--
ALTER TABLE `weight_measure_food`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `fk_foods_category_foods1` FOREIGN KEY (`category_foods_id`) REFERENCES `category_foods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_foods_weight_measure_food1` FOREIGN KEY (`weight_measure_food_id`) REFERENCES `weight_measure_food` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `hours`
--
ALTER TABLE `hours`
  ADD CONSTRAINT `fk_hours_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `image_foods`
--
ALTER TABLE `image_foods`
  ADD CONSTRAINT `fk_image_foods_foods1` FOREIGN KEY (`foods_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `menu_admin`
--
ALTER TABLE `menu_admin`
  ADD CONSTRAINT `fk_menu_admin_admin1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `user_foods`
--
ALTER TABLE `user_foods`
  ADD CONSTRAINT `user_foods_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_foods_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
