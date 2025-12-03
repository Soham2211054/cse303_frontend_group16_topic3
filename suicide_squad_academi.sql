-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2025 at 03:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `suicide_squad_academi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_t`
--

CREATE TABLE `admin_t` (
  `AdminID` char(7) NOT NULL,
  `AdminName` varchar(20) NOT NULL,
  `AdminEmail` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_t`
--

CREATE TABLE `course_t` (
  `CourseID` char(7) NOT NULL,
  `AssignedInstructorID` char(7) NOT NULL,
  `CourseTitle` varchar(30) DEFAULT NULL,
  `CourseDescription` varchar(60) DEFAULT NULL,
  `Category` varchar(30) DEFAULT NULL,
  `DifficultyLevel` varchar(20) DEFAULT NULL,
  `PreRequisite` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructor_t`
--

CREATE TABLE `instructor_t` (
  `InstructorID` char(7) NOT NULL,
  `InstructorName` varchar(30) DEFAULT NULL,
  `InstructorEmail` varchar(30) DEFAULT NULL,
  `InstructorExperience` varchar(30) DEFAULT NULL,
  `Qualification` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_t`
--

CREATE TABLE `student_t` (
  `StudentID` int(7) NOT NULL,
  `StudentName` varchar(30) NOT NULL,
  `StudentAge` int(11) DEFAULT NULL,
  `StudentEmail` varchar(50) DEFAULT NULL,
  `Interests` varchar(100) DEFAULT NULL,
  `LearningGoal` varchar(100) DEFAULT NULL,
  `ContactNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_t`
--
ALTER TABLE `admin_t`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `course_t`
--
ALTER TABLE `course_t`
  ADD PRIMARY KEY (`CourseID`,`AssignedInstructorID`),
  ADD KEY `COURSE_SELF_FK` (`PreRequisite`);

--
-- Indexes for table `instructor_t`
--
ALTER TABLE `instructor_t`
  ADD PRIMARY KEY (`InstructorID`);

--
-- Indexes for table `student_t`
--
ALTER TABLE `student_t`
  ADD PRIMARY KEY (`StudentID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_t`
--
ALTER TABLE `course_t`
  ADD CONSTRAINT `COURSE_SELF_FK` FOREIGN KEY (`PreRequisite`) REFERENCES `course_t` (`CourseID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
