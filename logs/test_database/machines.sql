-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Júl 05. 19:43
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `repont`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `machines`
--

CREATE TABLE `machines` (
  `machine_name` varchar(11) DEFAULT NULL,
  `location` varchar(8) DEFAULT NULL,
  `installation_date` varchar(10) DEFAULT NULL,
  `status` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- A tábla adatainak kiíratása `machines`
--

INSERT INTO `machines` (`machine_name`, `location`, `installation_date`, `status`) VALUES
('MACHINE-001', 'Budapest', '2020-11-18', 'Active'),
('MACHINE-002', 'Budapest', '2020-08-02', 'Active'),
('MACHINE-003', 'Szeged', '2023-02-15', 'Inactive'),
('MACHINE-004', 'Szeged', '2021-01-18', 'Inactive'),
('MACHINE-005', 'Pécs', '2023-09-11', 'Inactive'),
('MACHINE-006', 'Győr', '2020-08-06', 'Active'),
('MACHINE-007', 'Debrecen', '2023-03-11', 'Active'),
('MACHINE-008', 'Szeged', '2022-08-30', 'Inactive'),
('MACHINE-009', 'Szeged', '2021-09-10', 'Active'),
('MACHINE-010', 'Debrecen', '2022-03-18', 'Inactive'),
('MACHINE-011', 'Debrecen', '2023-01-18', 'Inactive'),
('MACHINE-012', 'Szeged', '2021-03-24', 'Inactive'),
('MACHINE-013', 'Pécs', '2023-01-08', 'Active'),
('MACHINE-014', 'Budapest', '2020-09-22', 'Active'),
('MACHINE-015', 'Győr', '2020-06-28', 'Inactive'),
('MACHINE-016', 'Budapest', '2020-02-03', 'Inactive'),
('MACHINE-017', 'Szeged', '2020-08-20', 'Inactive'),
('MACHINE-018', 'Győr', '2020-11-11', 'Active'),
('MACHINE-019', 'Szeged', '2021-05-20', 'Active'),
('MACHINE-020', 'Budapest', '2021-05-05', 'Active'),
('MACHINE-021', 'Budapest', '2021-02-23', 'Active'),
('MACHINE-022', 'Pécs', '2020-10-06', 'Active'),
('MACHINE-023', 'Debrecen', '2021-08-21', 'Inactive'),
('MACHINE-024', 'Debrecen', '2020-07-30', 'Inactive'),
('MACHINE-025', 'Budapest', '2021-11-24', 'Active'),
('MACHINE-026', 'Szeged', '2020-02-04', 'Inactive'),
('MACHINE-027', 'Szeged', '2022-11-27', 'Active'),
('MACHINE-028', 'Szeged', '2022-10-16', 'Inactive'),
('MACHINE-029', 'Debrecen', '2020-09-15', 'Active'),
('MACHINE-030', 'Szeged', '2023-04-16', 'Inactive'),
('MACHINE-031', 'Győr', '2022-11-19', 'Inactive'),
('MACHINE-032', 'Szeged', '2020-05-03', 'Inactive'),
('MACHINE-033', 'Budapest', '2021-08-12', 'Inactive'),
('MACHINE-034', 'Pécs', '2021-11-11', 'Active'),
('MACHINE-035', 'Szeged', '2020-12-20', 'Inactive'),
('MACHINE-036', 'Pécs', '2020-04-19', 'Inactive'),
('MACHINE-037', 'Debrecen', '2022-12-08', 'Inactive'),
('MACHINE-038', 'Győr', '2021-02-20', 'Active'),
('MACHINE-039', 'Szeged', '2020-04-05', 'Inactive'),
('MACHINE-040', 'Budapest', '2021-07-28', 'Inactive'),
('MACHINE-041', 'Győr', '2022-05-29', 'Active'),
('MACHINE-042', 'Budapest', '2020-09-08', 'Inactive'),
('MACHINE-043', 'Budapest', '2020-06-23', 'Active'),
('MACHINE-044', 'Debrecen', '2022-02-03', 'Active'),
('MACHINE-045', 'Budapest', '2022-08-08', 'Active'),
('MACHINE-046', 'Pécs', '2023-05-24', 'Active'),
('MACHINE-047', 'Debrecen', '2022-02-02', 'Active'),
('MACHINE-048', 'Győr', '2023-06-15', 'Active'),
('MACHINE-049', 'Győr', '2020-05-19', 'Active'),
('MACHINE-050', 'Győr', '2023-03-09', 'Inactive');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
