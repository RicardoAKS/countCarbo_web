-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Nov-2021 às 21:19
-- Versão do servidor: 10.4.10-MariaDB
-- versão do PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `flyrt`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `plans_details`
--

CREATE TABLE `plans_details` (
  `id` int(11) NOT NULL,
  `idplan` int(11) NOT NULL,
  `price` varchar(45) DEFAULT NULL,
  `installment` int(11) DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `discount` varchar(45) DEFAULT NULL,
  `signature` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `plans_details`
--

INSERT INTO `plans_details` (`id`, `idplan`, `price`, `installment`, `days`, `discount`, `signature`) VALUES
(25, 1, '19.90', 1, 30, '0', 1),
(26, 2, '17.90', 1, 30, '0', 1),
(28, 2, '48.33', 3, 90, '0', 0),
(29, 2, '86.94', 6, 180, '0', 0),
(30, 2, '156.48', 12, 360, '0', 0),
(31, 1, '53.73', 3, 90, '0', 0),
(32, 1, '96.72', 6, 180, '0', 0),
(33, 1, '174.12', 12, 360, '0', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `plans_details`
--
ALTER TABLE `plans_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_plans_details_plans1_idx` (`idplan`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `plans_details`
--
ALTER TABLE `plans_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `plans_details`
--
ALTER TABLE `plans_details`
  ADD CONSTRAINT `fk_plans_details_plans1` FOREIGN KEY (`idplan`) REFERENCES `plans` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
