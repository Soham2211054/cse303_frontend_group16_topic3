-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2025 at 09:16 PM
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
  `AdminID` varchar(7) NOT NULL,
  `AdminName` tinytext DEFAULT NULL,
  `AdminEmail` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_item_t`
--

CREATE TABLE `content_item_t` (
  `ContentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `UploadDate` date DEFAULT NULL,
  `FileType` varchar(10) DEFAULT NULL,
  `ContentLink` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course_t`
--

CREATE TABLE `course_t` (
  `CourseID` varchar(7) NOT NULL,
  `CourseTitlle` tinytext DEFAULT NULL,
  `CourseDiscription` text DEFAULT NULL,
  `CourseCetagory` text DEFAULT NULL,
  `DifficultyLvl` tinytext DEFAULT NULL,
  `PreRequisiteCourseID` varchar(7) DEFAULT NULL,
  `InstructorID` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discussion_post_t`
--

CREATE TABLE `discussion_post_t` (
  `DiscussionID` varchar(7) NOT NULL,
  `DiscussionTitle` text DEFAULT NULL,
  `StudentID` varchar(7) DEFAULT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `Topic` text DEFAULT NULL,
  `DiscussionDate` date DEFAULT NULL,
  `TimeSpend` decimal(10,0) DEFAULT NULL,
  `CourseID` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instructor_t`
--

CREATE TABLE `instructor_t` (
  `InstructorID` varchar(7) NOT NULL,
  `InstructorName` tinytext DEFAULT NULL,
  `InstructorEmail` varchar(30) DEFAULT NULL,
  `Experience` varchar(55) DEFAULT NULL,
  `Qualifications` text DEFAULT NULL,
  `InstructorPassword` varchar(22) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_question_t`
--

CREATE TABLE `quiz_question_t` (
  `QuizID` varchar(7) NOT NULL,
  `QuestionNo` int(10) NOT NULL,
  `QuestionMark` int(100) NOT NULL,
  `QuestionAns` varchar(100) NOT NULL,
  `Question` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_t`
--

CREATE TABLE `quiz_t` (
  `QuizID` varchar(7) NOT NULL,
  `QuizTitle` text DEFAULT NULL,
  `TotalMarks` int(100) DEFAULT NULL,
  `CourseID` varchar(7) DEFAULT NULL,
  `QuizDate` date DEFAULT NULL,
  `QuizDuration` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_progress_enrollment_t`
--

CREATE TABLE `student_progress_enrollment_t` (
  `StudentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `LessonCompletationStatus` tinytext DEFAULT NULL,
  `TimeSpend` float DEFAULT NULL,
  `EnrollmentDate` date DEFAULT NULL,
  `CurrentStatus` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_t`
--

CREATE TABLE `student_t` (
  `StudentID` varchar(7) NOT NULL,
  `StudentName` text DEFAULT NULL,
  `StudentPassword` varchar(22) DEFAULT NULL,
  `LearingGoals` text DEFAULT NULL,
  `Interersts` text DEFAULT NULL,
  `StudentEmail` varchar(30) DEFAULT NULL
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
-- Indexes for table `content_item_t`
--
ALTER TABLE `content_item_t`
  ADD PRIMARY KEY (`ContentID`),
  ADD KEY `CONTENT_TIME_FK` (`CourseID`);

--
-- Indexes for table `course_t`
--
ALTER TABLE `course_t`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `Course_FK` (`PreRequisiteCourseID`),
  ADD KEY `Course_FK2` (`InstructorID`);

--
-- Indexes for table `discussion_post_t`
--
ALTER TABLE `discussion_post_t`
  ADD PRIMARY KEY (`DiscussionID`),
  ADD KEY `DiscussionPost_FK` (`StudentID`),
  ADD KEY `DiscussionPost_FK2` (`InstructorID`);

--
-- Indexes for table `instructor_t`
--
ALTER TABLE `instructor_t`
  ADD PRIMARY KEY (`InstructorID`);

--
-- Indexes for table `quiz_question_t`
--
ALTER TABLE `quiz_question_t`
  ADD PRIMARY KEY (`QuestionNo`,`QuestionMark`,`QuestionAns`,`Question`),
  ADD KEY `Quiz_Question_FK` (`QuizID`);

--
-- Indexes for table `quiz_t`
--
ALTER TABLE `quiz_t`
  ADD PRIMARY KEY (`QuizID`),
  ADD KEY `Quiz_FK` (`CourseID`);

--
-- Indexes for table `student_progress_enrollment_t`
--
ALTER TABLE `student_progress_enrollment_t`
  ADD KEY `STUDENT_PROGRESENROLLMENT_FK` (`StudentID`),
  ADD KEY `STUDENT_PROGRESENROLLMENT_FK2` (`CourseID`);

--
-- Indexes for table `student_t`
--
ALTER TABLE `student_t`
  ADD PRIMARY KEY (`StudentID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `content_item_t`
--
ALTER TABLE `content_item_t`
  ADD CONSTRAINT `CONTENT_TIME_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`);

--
-- Constraints for table `course_t`
--
ALTER TABLE `course_t`
  ADD CONSTRAINT `Course_FK` FOREIGN KEY (`PreRequisiteCourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Course_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`);

--
-- Constraints for table `discussion_post_t`
--
ALTER TABLE `discussion_post_t`
  ADD CONSTRAINT `DiscussionPost_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `DiscussionPost_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`);

--
-- Constraints for table `quiz_question_t`
--
ALTER TABLE `quiz_question_t`
  ADD CONSTRAINT `Quiz_Question_FK` FOREIGN KEY (`QuizID`) REFERENCES `quiz_t` (`QuizID`);

--
-- Constraints for table `quiz_t`
--
ALTER TABLE `quiz_t`
  ADD CONSTRAINT `Quiz_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`);

--
-- Constraints for table `student_progress_enrollment_t`
--
ALTER TABLE `student_progress_enrollment_t`
  ADD CONSTRAINT `STUDENT_PROGRESENROLLMENT_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `STUDENT_PROGRESENROLLMENT_FK2` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
