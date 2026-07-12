-- sdu_db.sql - versi yang sudah diperbaiki untuk Aiven MySQL
-- Primary key sudah dipindahkan ke dalam CREATE TABLE

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for table `harga_sampah`
-- --------------------------------------------------------

CREATE TABLE `harga_sampah` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kategori` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=7;

INSERT INTO `harga_sampah` (`id`, `kategori`, `harga`) VALUES
(1, 'plastik', 250),
(2, 'kardus', 250),
(3, 'botol', 700),
(4, 'kaleng', 500),
(5, 'Besi', 1000),
(6, 'pecah_belah', 600);

-- --------------------------------------------------------
-- Table structure for table `transaksi`
-- --------------------------------------------------------

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `keterangan` text NOT NULL,
  `berat` int(11) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `harga100gr` int(11) NOT NULL,
  `totalharga` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=29;

INSERT INTO `transaksi` (`id`, `user_id`, `kategori`, `keterangan`, `berat`, `lokasi`, `harga100gr`, `totalharga`, `status`, `created_at`, `latitude`, `longitude`, `foto`) VALUES
(1, 0, 'Besi', 'Besi Pagar', 15000, 'Lubeg', 500, 75000, '', '2026-06-17 18:20:35', 0.00000000, 0.00000000, ''),
(2, 0, 'Kaleng', 'Kaleng Bekas', 10000, 'Jati', 700, 70000, '', '2026-06-17 18:20:35', 0.00000000, 0.00000000, ''),
(3, 6, 'Besi', 'Besi trali jendela', 20000, 'Lubuk begalung', 500, 100000, 'Dijemput', '2026-06-18 09:44:23', 0.00000000, 0.00000000, ''),
(4, 6, 'Kaleng', 'Kaleng Minuman Lebaran', 3000, 'Khatib Sulaiman', 700, 21000, 'Selesai', '2026-06-18 10:19:56', 0.00000000, 0.00000000, ''),
(5, 8, 'Karton', 'Karton makanan', 14000, 'Sawahlunto', 200, 28000, 'Selesai', '2026-06-18 09:44:35', 0.00000000, 0.00000000, ''),
(7, 8, 'Plastik', 'botol minuman', 20000, 'kubang sirakuk', 300, 60000, 'Dijemput', '2026-06-23 02:41:33', 0.00000000, 0.00000000, ''),
(8, 8, 'kaleng', 'Kaleng minuman', 9000, 'Talawi', 1000, 90000, 'Selesai', '2026-06-19 20:11:59', 0.00000000, 0.00000000, ''),
(9, 8, 'kaleng', 'Kaleng lebaran', 9000, 'talawi timur', 1000, 90000, 'Selesai', '2026-06-23 02:41:38', 0.00000000, 0.00000000, ''),
(10, 8, 'kardus', 'kardus indomie', 1000, 'Silungkang', 300, 3000, 'Menunggu', '2026-06-23 02:40:58', 0.00000000, 0.00000000, ''),
(11, 8, 'kaleng', 'Kaleng Minuman bear brand', 1000, 'silungkang ', 500, 5000, 'Dijemput', '2026-06-23 02:49:50', 0.00000000, 0.00000000, ''),
(12, 8, 'kardus', 'Kardus mie ayam', 10000, 'Padang Barat', 300, 30000, 'Diproses', '2026-06-25 14:56:28', -0.94708300, 100.41718100, ''),
(13, 8, 'kaleng', 'Kaleng Lebaran Idul ADHa ', 20000, 'Lubuk Begalung', 500, 100000, 'Selesai', '2026-06-25 17:42:02', -0.95881060, 100.39786836, ''),
(14, 9, 'kaleng', 'Kaleng KUE', 19900, 'Pangkalan Kerinci ', 500, 99500, 'Dijemput', '2026-06-23 14:27:21', 0.38781088, 101.85906850, ''),
(15, 9, 'plastik', 'Plastik Asoy', 3000, 'Belakang UPI', 300, 9000, 'Selesai', '2026-06-25 14:40:30', -0.96017180, 100.39586123, '1782292365241-79688752.jpg'),
(16, 8, 'kardus', 'Kardus Indomie', 10000, 'Kubang Sirakuk atas di depan kelok 16', 250, 25000, 'Diproses', '2026-06-25 14:56:26', -0.94632395, 100.37290689, '1782325505085-803557957.png'),
(17, 8, 'kaleng', 'Kaleng lebaran', 20000, 'Kubang Sirakuk atas di depan kelok 16', 500, 100000, 'Dijemput', '2026-06-25 17:41:56', 0.39463501, 101.85983281, '1782326416432-82374578.jpeg'),
(18, 12, 'kaleng', 'Kaleng Minuman', 6500, 'Rusun Sawahlunto Kaliang.net', 500, 32500, 'Selesai', '2026-06-24 19:45:16', 0.39233075, 101.85935030, '1782330123404-322067.jpg'),
(19, 12, 'plastik', 'Plastik Asoy ', 4000, 'Rusun Sawahlunto Kaliang.net', 300, 12000, 'Dijemput', '2026-06-24 19:45:13', 0.39386867, 101.85982833, '1782330232794-689160191.jpeg'),
(20, 12, 'kardus', 'Kardus Jajanan', 11000, 'Rusun Sawahlunto Kaliang.net', 250, 27500, 'Selesai', '2026-06-26 20:02:07', 0.39563808, 101.86530176, '1782330268652-474747752.jpeg'),
(21, 8, 'plastik', 'Plastik Asoy', 4800, 'Kubang Sirakuk atas di depan kelok 16', 300, 14400, 'Diproses', '2026-06-26 20:01:59', 0.45693988, 101.45342641, '1782411416937-542113370.png'),
(26, 8, 'kaleng', 'Kaleng kue lebaran', 10000, 'Kubang Sirakuk atas di depan kelok 16', 500, 50000, 'Menunggu', '2026-07-09 07:14:23', -1.00005874, 100.36800168, '1783581263369-120020580.png'),
(27, 8, 'kaleng', 'Kaleng kue lebaran', 10000, 'Kubang Sirakuk atas di depan kelok 16', 500, 50000, 'Menunggu', '2026-07-09 07:14:23', -1.00005874, 100.36800168, '1783581263398-83972769.png'),
(28, 8, 'plastik', 'asoy', 1900, 'Kubang Sirakuk atas di depan kelok 16', 250, 4750, 'Menunggu', '2026-07-11 16:50:38', -0.92520750, 100.39605661, '1783788638312-927938109.png');

-- --------------------------------------------------------
-- Table structure for table `user`
-- --------------------------------------------------------

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `alamat` text NOT NULL,
  `foto_profil` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=16;

INSERT INTO `user` (`id`, `nama`, `no_hp`, `password`, `role`, `created_at`, `alamat`, `foto_profil`) VALUES
(6, 'Roihan', '089633698200', 'user', 'user', '2026-06-17 17:13:19', '', ''),
(7, 'roihan admin', '083808421427', 'admin', 'admin', '2026-06-26 22:09:01', 'Jl.Sutomo Padang', '1782511741553-213434745.jpg'),
(8, 'jamale', '888888888888', 'jamal', 'user', '2026-07-11 16:52:09', 'Kubang Sirakuk atas di depan kelok 16', '1782417277199-10560471.jpeg'),
(9, 'Budi', '111111111111', 'budi', 'user', '2026-06-23 13:23:39', '', ''),
(12, 'Fajar', '222222222222', 'fajar', 'user', '2026-06-24 19:28:11', 'Rusun Sawahlunto Kaliang.net', '1782329291003-5923465.JPG');

COMMIT;