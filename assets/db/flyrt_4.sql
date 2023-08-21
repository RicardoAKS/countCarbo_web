-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Nov-2021 às 16:00
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

--
-- Extraindo dados da tabela `personalinformations`
--

INSERT INTO `personalinformations` (`id`, `users_id`, `name`, `hairColor`, `eyeColor`, `childrens`, `likeTrip`, `maritalStatus`, `smoke`, `drink`, `academicFormation`, `profession`, `height`, `lookingFor`, `monthlyIncome`, `apresentationPhrase`) VALUES
(1, 1, 'Ricardo Alexandre Klos de Souza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 'Cristina Aparecide Stank', NULL, NULL, NULL, NULL, NULL, 'czNDVXduZjgyd3JJOjoxMjo6PxZI5Ac4V/uaH2loW5oeCA==', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 3, 'Alan de Souza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 4, 'João Gabriel Ramos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 5, 'Jeferson Gustavo Paes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 6, 'Amanda Emanuele de Jesus', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 7, 'Nicolas Alexandre Martins', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 8, 'Rafael Branco ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 9, 'Silas Felipe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 10, 'Alisson Arruda da Silva', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 11, 'Prislaine Cordova Matos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 12, 'Guilherme N. Tomio', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 13, 'Bruna Rosa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 14, 'Melissa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 20, NULL, 'b25DVjEzdjMzUkdOSmdCcVVPdz06OjEyOjo+cBDuWnalVhyXrLhmPIHx', 'b25DVjEzdjMzUkdOSUI5b1YvSHQ6OjEyOjp5gL7/qbqdrCf6GLR7CwIp', 'MHc9PTo6MTI6Oh4kuTQnluQvt3TN5spPlUo=', 'c242THhuVHQwRjdESkV4bVMrM3EvdnY2MEpWclJ5az06OjEyOjomkKhDYyETMmI7ejCNrHLn', 'b25DVnduNzJuUitFOjoxMjo6Fd2T3mtRCvSKJKbEGSdLLQ==', 'dFhTSTEzdjMwUkdOTlExNVEvRT06OjEyOjr1vK5xHxXk5byAQtWaBYET', 'cDJPRDBtLzgyd3JJS0FsbFZ1WT06OjEyOjoLlFmBn1t5kTwm8v/cBl5z', 'c21TV3htancyZ3lOQmdObVV1L242N1E9OjoxMjo6/B8JoLNvZmA1U36s+ht7PQ==', 'cEh5VzBYL3FkdC9mTEFNPTo6MTI6OtAxZX4j0xbWQIhOXhSdrac=', 'MENmVTo6MTI6OvvqAvkUP5Ehuaqq3XQfaBk=', NULL, NULL, NULL),
(20, 21, NULL, 'dDNTVXpuLzEzUkU9OjoxMjo6yB583wyATm1LYqcpjM3ZTg==', 'c1dPRDEzVT06OjEyOjp5m8QmYhHQLOBB5lat5hr/', 'MHc9PTo6MTI6Oh4kuTQnluQvt3TN5spPlUo=', 'c242THhuVHQwRjdES2t4bVIvYWk3N3BhRklJPTo6MTI6Oi++AEdNlVqDfQQ1VmXvV3g=', 'Separado(a)', 'ckdTUDEzVzUwd3pJTkJsdVRQZm44cjczelpRPTo6MTI6OmlY4iXfPss+4wx/0gqhDo4=', 'cDJPRDBtLzgyd3JJS0FsbFZ1WT06OjEyOjoLlFmBn1t5kTwm8v/cBl5z', 'dGRKUHdIVHcxaEdORlI1a1JPcng3TEwyMTVCbVNqWUVhOTcyOjoxMjo6RiIWvHi6NhXesM/zRacgNg==', 'cEdLU3duM3dkdC9mTEFNPTo6MTI6Ola6XvZpPxpx/EF6m4pLAmI=', 'MENmWDo6MTI6OmdpyhQndQAIN/hqb1cZegY=', NULL, NULL, NULL),
(24, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 35, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`cityId`, `ufId`, `idasaas`, `walletId`, `flyrts`, `photo`, `username`, `password`, `sex`, `phone`, `validationcode`, `validation`, `ageDate`, `blockage`, `bio`, `preference`, `email`, `validateemail`, `status`, `invisible`, `latitude`, `longitude`, `push_notifications_token`) VALUES
(4496, 24, 'cus_000004747381', NULL, 2, 'c118e9663a430e9777b40de2abaa83d4bacb1310.jpg', 'czNpRndtajkybDdzS1FselErM203YjY1OHAxbFVHd0JZSXJBSVE1dFRRPT06OjEyOjp3oC9NLOtrzrULmhjXvH3y', 'MW5MU3dpTDloVWZPSkY4OEZMSGorZTJvM01RekZuNVZQSjZnS2hnbEd2emYzWkxybVFTZUhnPT06OjEyOjojzKiX0OgR9DD6+L9lInCb', 'masc', 'MVNqZm1pT3NqRW1hZGw0PTo6MTI6Ogb8gtg3Ufx+zPZxBalmKuY=', '8635', '1', '2002-03-10', '0', 'bFhTVjEzOD06OjEyOjoSfcz2TlzFfEVJC8NQLqRT', 'woman', 'azNpRndtajkyZ3pNTGg4NkVyT3gzN3owMkpobURTOEthQT09OjoxMjo6Ai6RLcfdw6LXT+HD1bDj7A==', '1', '0', NULL, '-27.8200345', '-50.3218369', NULL),
(4496, 24, 'cus_000004747744', NULL, 10, '5ae05140bf339055707a9eb3dd62663d497d306a.jpg', 'bFhpSXluVHgxQi9lSkE9PTo6MTI6OnhTjmgChm+obdRaFNSdOLs=', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'fem', 'eVNqVmlqcWdqRWVVZkVFeUc3cTc6OjEyOjq+4FpODTNzEWecRA2s9dYv', '9038', '1', '2002-03-10', '0', NULL, 'man', 'bFhpSXluVHgxQi9lSkE9PTo6MTI6OnhTjmgChm+obdRaFNSdOLs=', '1', '0', NULL, '-27.8200829', '-50.3218527', NULL),
(4496, 24, NULL, NULL, 1, '0f60f7c8fc1b7ac6e604bd0e92482813cfdd818c.jpg', 'Z0gySHpXRHczaDg9OjoxMjo6eI+zdm5BJKIMIBzfPsVzYg==', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', 'eVNYZmlqcWdqRWVVZkVFeUY3cTc6OjEyOjptJuAyYFzTUon/6zyg7P0o', '4191', '1', '2003-01-14', '0', 'aEhDRDo6MTI6OhB1VTpiOdE4DLcx7Ysq/Ro=', 'woman', 'Z0gySHpXRHczaDg9OjoxMjo6eI+zdm5BJKIMIBzfPsVzYg==', '1', '0', NULL, '-27.8200316', '-50.3218329', NULL),
( 4496, 24, NULL, NULL, 0, 'd3877470954af7cf0024c33f1316ba2a1657d7f3.jpg', 'aTM2T3pRPT06OjEyOjpCrfcSAsf2yHbSxAOPS0um', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', 'eVNYZmlqcWdqRWVZZkVFeUc3cTc6OjEyOjoZaH/2+4ghV+SErBnH/glJ', '8833', '1', '2002-12-01', '0', 'cjM2SjBHbnExRitORkJsdUF1L24rTHIxbUE9PTo6MTI6OloY4DEwDDASOp7gZXItU8s=', 'woman', 'aTM2T3pRPT06OjEyOjpCrfcSAsf2yHbSxAOPS0um', '1', '0', NULL, '-27.8200316', '-50.3218329', NULL),
( 4496, 24, NULL, NULL, 0, 'a919616fab6838ea0377a8304aef21424edbfa05.jpg', 'Z25tVHdISDcxQTNlOjoxMjo6TbjMSRZXYpkg8l+E2N8g5Q==', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', 'eVNYZmlqcWdqRWVVZkVFNEc3Qzc6OjEyOjpnFdFXCjwy9WAWwc7lQeHP', '3459', '1', '1985-05-28', '0', 'Z25tVHdISDcxQTNlOjoxMjo6TbjMSRZXYpkg8l+E2N8g5Q==', 'woman', 'Z25tVHdISDcxQTNlOjoxMjo6TbjMSRZXYpkg8l+E2N8g5Q==', '1', '0', NULL, '-27.8200316', '-50.3218329', NULL),
(4496, 24, 'cus_000004747732', NULL, 10, '17138f7eaa6316bbee932f79e1ec5dd13822846f.jpg', 'Z0h5SHpYNzQzQXJlOjoxMjo6o4dnZAKIZRQ1q3z/9ujEiA==', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'fem', 'eVNYUmlqcWdqRWVVZkVFeUc3cTc6OjEyOjrGgVT+Wh7xz/Xn4ycyu5uX', '1655', '1', '1999-11-02', '0', 'c1hTVXhYL3d3UkdOSUFKLzRTRHQ6OjEyOjo/Qbr/wP8S5JPXn/wHFr8P', 'man', 'Z0h5SHpYNzQzQXJlOjoxMjo6o4dnZAKIZRQ1q3z/9ujEiA==', '1', '0', NULL, '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 0, '76c6cbe8c97c07d423bfd3832eca7fed3cca1212.jpg', 'nicholas', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', '(54) 99999-9999', '2888', '1', '2001-09-13', '0', '', 'woman', '', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 1, 'fa96e0e13c4de828d2cc6d4c635438ec938fde5b.jpg', 'branco', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', '(38) 99499-9999', '8695', '1', '1996-09-23', '0', '', 'two', 'branco', '1', '0', '0', '-27.8200498', '-50.3218189', NULL),
(4496, 24, NULL, NULL, 0, 'MVhTQW15ei9nVS9QY2cxdFE3YTMrdXVwZ2NScEZTOEJQTS95ZUVOMFRxN1IzSmUydzFPWlJBTVlFb0U9OjoxMjo6HwrzrlvWmDp9wGVhWEFQ9g==', 'a21pS3dtaz06OjEyOjoNj51cLndkOuGv7cyyfWUa', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', 'MVNmZm15T2hqRWVWZkZRPTo6MTI6OoCufUOGIv6icHYAqQoE4i8=', '6146', '1', '1996-08-25', '0', NULL, 'woman', 'a21pS3dtaz06OjEyOjoNj51cLndkOuGv7cyyfWUa', '0', '0', NULL, '-27.8143725', '-50.3172349', NULL),
(4496, 24, NULL, NULL, 0, 'b3304dc20ff015faf0172116cf5816cd90de9865.jpg', 'alissu', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', '(94) 92847-2383', '9727', '1', '1993-07-10', '0', '', 'woman', '', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 12, 'ba43edf99fb7e3b562b4baf1900e00c5d9d1c3a1.jpg', 'pris', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'fem', '(98) 94359-8349', '3556', '1', '1996-12-31', '0', '', 'man', '', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 1, '4fab128a8e51882b2cbe22542ce289db9d94e274.jpg', 'gui', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', '(93) 95859-8345', '6446', '1', '1985-12-22', '0', '', 'woman', '', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 11, NULL, 'bruna', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'fem', '(93) 98249-8329', '9312', '1', '1999-03-15', '0', '', 'man', 'bruna', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 7, 'fe9f0ad35044ecca92ab0d7fd6ff40207c6752dd.jpg', 'melissa', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'fem', '(49) 99403-9859', '5036', '1', '2002-03-10', '0', '', 'man', '', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 11, NULL, 'todos', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'other', '(49) 99872-6873', '4436', '1', '2002-03-10', '0', '', 'two', '', '1', '0', '0', '-27.8143725', '-50.3172349', NULL),
(4496, 24, NULL, NULL, 10, 'ab291314a4d3f4fbc409c0a4aa71dddcb389f417.png', 'teste pereira da silva', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'other', '(49) 99959-7764', '4953', '1', '2002-03-10', '0', 'eae', 'two', 'roberto123@gmail.com', '1', '0', '0', '-27.8200316', '-50.3218329', NULL),
(4496, 24, 'cus_000004753855', NULL, NULL, 'aENIUXdpNnRoay9KSkZ3N0U3T3lxYi80Z2NnN1FYUlFOSm54ZUVrZ1RhM1FqYzNxa0FpWEh3TVlFb0U9OjoxMjo6N67vqLflZUEvQeq7KpblrQ==', 'bFhTVjEzKzV4UnZmSUFWNVF3PT06OjEyOjpldd6Nx7/U5PYRE0YbWYsT', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', 'eVNYZmlqcWdqRWVlY2tFL0Y3cTY6OjEyOjrURXwkDsQWbt0XvWYu4eRk', '5559', '1', '2002-03-10', '0', 'bFg3RzEzL3F3Ui9ESVFNclE2UGg3Ykxwelo1dFVTMERiTXM9OjoxMjo6/XMlJzuBuVHCU6ekzXXfDw==', 'bG42THduUT06OjEyOjpRwjkOEKHo0B5os538KZsp', 'tininhaasa', '0', NULL, NULL, '-27.8200316', '-50.3218329', NULL),
(4579, 24, NULL, NULL, 0, 'MVNqUXdTdXNoVXVhY1FrOFJydmdyTC83aWNBeUUzaFZZSm1oZVJndkcvcmZpOEt3a1FYTUdnTUNESUU9OjoxMjo636vgyM+UC913jSQ/n70FAw==', 'bFhTVjEzKzUwUnVOSmg1aVV2ZnQrS240MzVocjo6MTI6OuGWXHR1ilz/4qhlGum6Cq4=', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'masc', 'eVNYZmlqcWdqRWFWZkVFNEVidTc6OjEyOjr8SD0y0raCsuQTn2G2uDRE', '4175', '1', '2002-03-10', '0', 'bFg3RzEzL3F3Ui9ESVFNPTo6MTI6OjWlHYOSc65lr6KirVWEVQw=', 'bG42THduUT06OjEyOjpRwjkOEKHo0B5os538KZsp', '', '0', NULL, NULL, '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 12, NULL, 'bFhTVjEzKzUwUkdOTmdselRRPT06OjEyOjoyLaoYXh6jvrG+aMNxaYn4', 'MVNHRXh5cXBoRXViZGx3ekYrWGhyTzZvajhRNUVYVUFaSnYxS0U1MEdhMkZpNUN4d2xYS0dnPT06OjEyOjpB736EtLRa/xGTCnYDLtk3', 'other', 'MVNqZm1pT3NqRW1hZGw4PTo6MTI6OuGt7hp9UHLvkojJXrhfpf4=', '6016', '1', '2002-03-10', '0', NULL, 'bFdhSjo6MTI6OoKDjoC6xbWnLlHGynyk2Nw=', 'bFhTVjEzL1p3UnZlTVFrbFFlenY6OjEyOjo57h6Q4I2JB5xLaQ2drifL', '0', NULL, NULL, '-27.8200316', '-50.3218329', NULL),
(4496, 24, NULL, NULL, 0, NULL, 'cG5DRTBYUDgyVjdpS3dsdlF3PT06OjEyOjrr+uc9ucMSGcDXIgXoVZna', 'MW5MU3dpTDloVWZPSkY4OEZMSGorZTJvM01RekZuNVZQSjZnS2hnbEd2emYzWkxybVFTZUhnPT06OjEyOjojzKiX0OgR9DD6+L9lInCb', 'masc', 'MVNqZm1pT2dqRWVVZkZVPTo6MTI6OpcG7ZgHzsNkrpsFoSohG/c=', '4399', '1', '2002-03-10', '0', NULL, 'bG42THduUT06OjEyOjpRwjkOEKHo0B5os538KZsp', 'am4rRHgzdlowaFBNTEFBbFFlenY6OjEyOjpYa7GrKfvFD7cdXStVuLNP', '0', NULL, NULL, '-27.8143725', '-50.3172349', NULL),
(4496, 24, NULL, NULL, 1, 'MXlUVWx5LzZna3FWY1Y0NkVyU3pwdU9yMkpReUVpaFZZWnJ4SzBnbUhheUQycEN4bUZYTEhRTVlFb0U9OjoxMjo6EqIPYRiaf4dpbKATL1pKEA==', 'c25DVXdnPT06OjEyOjqKJeKVXwDYwh/RlU5sJ2tL', 'MW5MU3dpTDloVWZPSkY4OEZMSGorZTJvM01RekZuNVZQSjZnS2hnbEd2emYzWkxybVFTZUhnPT06OjEyOjojzKiX0OgR9DD6+L9lInCb', 'fem', 'MVNqZm1pT2dqRWVVZkZRPTo6MTI6OnBXgVpNz0318OW9+jsYlO8=', '3694', '1', '2002-03-10', '0', NULL, 'akhDSTo6MTI6Ot3b1sOgexanr+cFwNBpUrU=', 'a25DVXdscisyQi9FS1VKb1RlND06OjEyOjpMp5RjPCF0dmVvwDHyqMWy', '0', NULL, NULL, '-27.8143725', '-50.3172349', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
