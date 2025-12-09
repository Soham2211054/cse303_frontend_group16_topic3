-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2025 at 07:07 PM
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
-- Table structure for table `activity_log_t`
--

CREATE TABLE `activity_log_t` (
  `ActivityID` varchar(7) NOT NULL,
  `ActivityTime` time DEFAULT NULL,
  `ActivityDate` date DEFAULT NULL,
  `QuizAttempt` int(10) DEFAULT NULL,
  `ActivityName` tinytext DEFAULT NULL,
  `StudentID` varchar(7) DEFAULT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `AdminID` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity_type_t`
--

CREATE TABLE `activity_type_t` (
  `ActivityID` varchar(7) DEFAULT NULL,
  `ActivityType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `assing_task_t`
--

CREATE TABLE `assing_task_t` (
  `AdminID` varchar(7) DEFAULT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `StudentID` varchar(7) DEFAULT NULL,
  `Role` tinytext DEFAULT NULL,
  `AssingDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certificate_t`
--

CREATE TABLE `certificate_t` (
  `CertificateID` varchar(7) NOT NULL,
  `IssueDate` date DEFAULT NULL,
  `CourseID` varchar(7) NOT NULL,
  `StudentID` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commemnt_t`
--

CREATE TABLE `commemnt_t` (
  `StudentID` varchar(7) DEFAULT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `DiscussionID` varchar(7) NOT NULL,
  `CommentTime` time DEFAULT NULL,
  `CommentDate` date DEFAULT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_assingment_t`
--

CREATE TABLE `content_assingment_t` (
  `ContentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `AssingmentNum` decimal(25,0) DEFAULT NULL,
  `AssingmentTitle` text DEFAULT NULL,
  `AssingmentUpDate` date DEFAULT NULL,
  `AssignmentSubDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_item_t`
--

CREATE TABLE `content_item_t` (
  `ContentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `UploadDate` date DEFAULT NULL,
  `FileType` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_pdf_t`
--

CREATE TABLE `content_pdf_t` (
  `ContentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `PDFLink` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_presentation_t`
--

CREATE TABLE `content_presentation_t` (
  `ContentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `PresentationLink` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `content_video_t`
--

CREATE TABLE `content_video_t` (
  `ContentID` varchar(7) NOT NULL,
  `CourseID` varchar(7) NOT NULL,
  `InstructorID` varchar(7) DEFAULT NULL,
  `VideoLink` text DEFAULT NULL
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
-- Table structure for table `performence_report_t`
--

CREATE TABLE `performence_report_t` (
  `PerformenceReportID` varchar(7) NOT NULL,
  `AIgeneratedInsights` text DEFAULT NULL,
  `LearningRecommendations` text DEFAULT NULL,
  `StudentsStrengthAndWeakness` text DEFAULT NULL,
  `StudentID` varchar(7) NOT NULL
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
-- Table structure for table `report_t`
--

CREATE TABLE `report_t` (
  `CourseID` varchar(7) NOT NULL,
  `ReportID` varchar(7) NOT NULL,
  `AIGeneratedReport` text DEFAULT NULL,
  `ManualReport` text DEFAULT NULL,
  `CourseCompletationRate` text DEFAULT NULL,
  `Engagement` int(100) DEFAULT NULL,
  `CoursePopularity` varchar(30) DEFAULT NULL,
  `AdminID` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review_t`
--

CREATE TABLE `review_t` (
  `ReviewTopic` varchar(100) NOT NULL,
  `StudentID` varchar(7) DEFAULT NULL,
  `CourseID` varchar(7) DEFAULT NULL,
  `Rating` decimal(5,0) DEFAULT NULL,
  `Comment` tinytext DEFAULT NULL,
  `ReviewDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `score_t`
--

CREATE TABLE `score_t` (
  `StudentID` varchar(7) NOT NULL,
  `QuizID` varchar(7) NOT NULL,
  `SubmittedAnswer` text DEFAULT NULL,
  `Feedback` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_contact_number_t`
--

CREATE TABLE `student_contact_number_t` (
  `StudentID` varchar(7) NOT NULL,
  `ContactNumber` decimal(11,0) NOT NULL
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
-- Indexes for table `activity_log_t`
--
ALTER TABLE `activity_log_t`
  ADD PRIMARY KEY (`ActivityID`),
  ADD KEY `ActivityLog_FK` (`StudentID`),
  ADD KEY `ActivityLog_FK2` (`InstructorID`),
  ADD KEY `ActivityLog_FK3` (`AdminID`);

--
-- Indexes for table `activity_type_t`
--
ALTER TABLE `activity_type_t`
  ADD PRIMARY KEY (`ActivityType`),
  ADD KEY `ActivityType_FK` (`ActivityID`);

--
-- Indexes for table `admin_t`
--
ALTER TABLE `admin_t`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `assing_task_t`
--
ALTER TABLE `assing_task_t`
  ADD KEY `Asssing_Task_FK` (`AdminID`),
  ADD KEY `Assing_Task_FK2` (`InstructorID`),
  ADD KEY `Assing_Task_FK3` (`StudentID`);

--
-- Indexes for table `certificate_t`
--
ALTER TABLE `certificate_t`
  ADD PRIMARY KEY (`CertificateID`),
  ADD KEY `Certificate_FK` (`CourseID`),
  ADD KEY `Certificate_FK2` (`StudentID`);

--
-- Indexes for table `commemnt_t`
--
ALTER TABLE `commemnt_t`
  ADD KEY `Comment_FK` (`StudentID`),
  ADD KEY `Comment_FK2` (`InstructorID`),
  ADD KEY `Comment_FK3` (`DiscussionID`);

--
-- Indexes for table `content_assingment_t`
--
ALTER TABLE `content_assingment_t`
  ADD KEY `Content_Assingment_FK` (`CourseID`),
  ADD KEY `Content_Assingment_FK2` (`InstructorID`),
  ADD KEY `Content_Assingment_FK3` (`ContentID`);

--
-- Indexes for table `content_item_t`
--
ALTER TABLE `content_item_t`
  ADD PRIMARY KEY (`ContentID`),
  ADD KEY `CONTENT_TIME_FK` (`CourseID`);

--
-- Indexes for table `content_pdf_t`
--
ALTER TABLE `content_pdf_t`
  ADD KEY `Content_pdf_FK` (`CourseID`),
  ADD KEY `Content_pdf_FK2` (`InstructorID`),
  ADD KEY `Content_pdf_FK3` (`ContentID`);

--
-- Indexes for table `content_presentation_t`
--
ALTER TABLE `content_presentation_t`
  ADD KEY `Content_Presentation_FK` (`CourseID`),
  ADD KEY `Content_Presentation_FK2` (`InstructorID`),
  ADD KEY `Content_Presenation_FK3` (`ContentID`);

--
-- Indexes for table `content_video_t`
--
ALTER TABLE `content_video_t`
  ADD KEY `Content_Video_FK` (`CourseID`),
  ADD KEY `Content_Video_FK2` (`InstructorID`),
  ADD KEY `Content_Video_FK3` (`ContentID`);

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
-- Indexes for table `performence_report_t`
--
ALTER TABLE `performence_report_t`
  ADD PRIMARY KEY (`PerformenceReportID`),
  ADD KEY `PerformenceReport_FK` (`StudentID`);

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
-- Indexes for table `report_t`
--
ALTER TABLE `report_t`
  ADD PRIMARY KEY (`ReportID`),
  ADD KEY `Report_FK` (`CourseID`),
  ADD KEY `Report_FK2` (`AdminID`);

--
-- Indexes for table `review_t`
--
ALTER TABLE `review_t`
  ADD PRIMARY KEY (`ReviewTopic`),
  ADD KEY `Review_FK` (`StudentID`),
  ADD KEY `Review_FK2` (`CourseID`);

--
-- Indexes for table `score_t`
--
ALTER TABLE `score_t`
  ADD KEY `Score_FK` (`StudentID`),
  ADD KEY `Score_FK2` (`QuizID`);

--
-- Indexes for table `student_contact_number_t`
--
ALTER TABLE `student_contact_number_t`
  ADD PRIMARY KEY (`ContactNumber`),
  ADD KEY `Student_Contact_NUmber_T_FK` (`StudentID`);

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
-- Constraints for table `activity_log_t`
--
ALTER TABLE `activity_log_t`
  ADD CONSTRAINT `ActivityLog_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `ActivityLog_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`),
  ADD CONSTRAINT `ActivityLog_FK3` FOREIGN KEY (`AdminID`) REFERENCES `admin_t` (`AdminID`);

--
-- Constraints for table `activity_type_t`
--
ALTER TABLE `activity_type_t`
  ADD CONSTRAINT `ActivityType_FK` FOREIGN KEY (`ActivityID`) REFERENCES `activity_log_t` (`ActivityID`);

--
-- Constraints for table `assing_task_t`
--
ALTER TABLE `assing_task_t`
  ADD CONSTRAINT `Assing_Task_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`),
  ADD CONSTRAINT `Assing_Task_FK3` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `Asssing_Task_FK` FOREIGN KEY (`AdminID`) REFERENCES `admin_t` (`AdminID`);

--
-- Constraints for table `certificate_t`
--
ALTER TABLE `certificate_t`
  ADD CONSTRAINT `Certificate_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Certificate_FK2` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`);

--
-- Constraints for table `commemnt_t`
--
ALTER TABLE `commemnt_t`
  ADD CONSTRAINT `Comment_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `Comment_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`),
  ADD CONSTRAINT `Comment_FK3` FOREIGN KEY (`DiscussionID`) REFERENCES `discussion_post_t` (`DiscussionID`);

--
-- Constraints for table `content_assingment_t`
--
ALTER TABLE `content_assingment_t`
  ADD CONSTRAINT `Content_Assingment_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Content_Assingment_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`),
  ADD CONSTRAINT `Content_Assingment_FK3` FOREIGN KEY (`ContentID`) REFERENCES `content_item_t` (`ContentID`);

--
-- Constraints for table `content_item_t`
--
ALTER TABLE `content_item_t`
  ADD CONSTRAINT `CONTENT_TIME_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`);

--
-- Constraints for table `content_pdf_t`
--
ALTER TABLE `content_pdf_t`
  ADD CONSTRAINT `Content_pdf_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Content_pdf_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`),
  ADD CONSTRAINT `Content_pdf_FK3` FOREIGN KEY (`ContentID`) REFERENCES `content_item_t` (`ContentID`);

--
-- Constraints for table `content_presentation_t`
--
ALTER TABLE `content_presentation_t`
  ADD CONSTRAINT `Content_Presenation_FK3` FOREIGN KEY (`ContentID`) REFERENCES `content_item_t` (`ContentID`),
  ADD CONSTRAINT `Content_Presentation_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Content_Presentation_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`);

--
-- Constraints for table `content_video_t`
--
ALTER TABLE `content_video_t`
  ADD CONSTRAINT `Content_Video_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Content_Video_FK2` FOREIGN KEY (`InstructorID`) REFERENCES `instructor_t` (`InstructorID`),
  ADD CONSTRAINT `Content_Video_FK3` FOREIGN KEY (`ContentID`) REFERENCES `content_item_t` (`ContentID`);

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
-- Constraints for table `performence_report_t`
--
ALTER TABLE `performence_report_t`
  ADD CONSTRAINT `PerformenceReport_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`);

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
-- Constraints for table `report_t`
--
ALTER TABLE `report_t`
  ADD CONSTRAINT `Report_FK` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`),
  ADD CONSTRAINT `Report_FK2` FOREIGN KEY (`AdminID`) REFERENCES `admin_t` (`AdminID`);

--
-- Constraints for table `review_t`
--
ALTER TABLE `review_t`
  ADD CONSTRAINT `Review_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `Review_FK2` FOREIGN KEY (`CourseID`) REFERENCES `course_t` (`CourseID`);

--
-- Constraints for table `score_t`
--
ALTER TABLE `score_t`
  ADD CONSTRAINT `Score_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`),
  ADD CONSTRAINT `Score_FK2` FOREIGN KEY (`QuizID`) REFERENCES `quiz_t` (`QuizID`);

--
-- Constraints for table `student_contact_number_t`
--
ALTER TABLE `student_contact_number_t`
  ADD CONSTRAINT `Student_Contact_NUmber_T_FK` FOREIGN KEY (`StudentID`) REFERENCES `student_t` (`StudentID`);

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
