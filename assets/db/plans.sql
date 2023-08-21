-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Nov-2021 às 13:41
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Estrutura da tabela `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `verification` int(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `plans`
--

INSERT INTO `plans` (`id`, `name`, `verification`, `status`, `description`) VALUES
(1, 'Black', 1, 1, '<p><span class=\"advantage-plan filter\"></span>Filtro de distancia</p>\r\n<p><span class=\"advantage-plan filter\"></span>Filtro de Idade</p>\r\n<p><span class=\"advantage-plan filter\"></span>Filtro de Cidade</p>\r\n<p><span class=\"advantage-plan filter\"></span>Filtro de caracteristicas</p>\r\n<p><span class=\"advantage-plan return\"></span>Retorno livre</p>\r\n<p><span class=\"advantage-plan super\"></span>10 Super Like por dia</p>\r\n<p><span class=\"advantage-plan like\"></span>Likes Ilimitados</p>\r\n<p><span class=\"advantage-plan boost\"></span>2 Boost por mês</p>\r\n<p><span class=\"advantage-plan block\"></span>Bloquear Idade</p>\r\n<p><span class=\"advantage-plan block\"></span>Bloquear distancia</p>\r\n<p><span class=\"advantage-plan desactive\"></span>Desativar visualização de mensagem</p>\r\n<p><span class=\"advantage-plan eye\"></span>Somente pessoas que eu curtir podem me ver</p>\r\n<p><span class=\"advantage-plan annunce\"></span>Sem anúncios</p>\r\n<p><span class=\"advantage-plan send\"></span>Enviar mensagem antes do Flyrt</p>\r\n<p><span class=\"advantage-plan like\"></span>Prioridade nas curtidas</p>\r\n<p><span class=\"advantage-plan message\"></span>Mensagens prioritárias</p>\r\n<p><span class=\"advantage-plan eye\"></span>Pode visualizar as pessoas que flyrtaram com você</p>\r\n'),

(2, 'Gold', 1, 1, '<p><span class=\"advantage-plan filter-black\"></span>Filtro de distancia</p>\r\n<p><span class=\"advantage-plan filter-black\"></span>Filtro de Idade</p>\r\n<p><span class=\"advantage-plan filter-black\"></span>Filtro de Cidade</p>\r\n<p><span class=\"advantage-plan return-black\"></span>Retorno livre</p>\r\n<p><span class=\"advantage-plan super-black\"></span>3 Super Like por dia</p>\r\n<p><span class=\"advantage-plan like-black\"></span>Likes Ilimitados</p>\r\n<p><span class=\"advantage-plan boost-black\"></span>1 Boost por mês</p>\r\n<p><span class=\"advantage-plan block-black\"></span>Bloquear Idade</p>\r\n<p><span class=\"advantage-plan block-black\"></span>Bloquear distancia</p>\r\n<p><span class=\"advantage-plan desactive-black\"></span>Desativar visualização de mensagem</p>\r\n<p><span class=\"advantage-plan eye-black\"></span>Somente pessoas que eu curtir podem me ver</p>\r\n<p><span class=\"advantage-plan annunce-black\"></span>Sem anúncios</p>\r\n');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
