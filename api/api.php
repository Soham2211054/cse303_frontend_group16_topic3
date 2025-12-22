<?php
require "db.php";

$action = $_GET['action'] ?? '';

if ($action === 'browseCourses') {

    $sql = "
        SELECT 
            c.CourseID,
            c.CourseTitlle,
            c.CourseCetagory,
            c.DifficultyLvl,
            c.PreRequisiteCourseID,
            i.InstructorName,
            ROUND(AVG(r.Rating), 1) AS Rating
        FROM course_t c
        LEFT JOIN instructor_t i 
            ON c.InstructorID = i.InstructorID
        LEFT JOIN review_t r 
            ON c.CourseID = r.CourseID
        GROUP BY c.CourseID
    ";

    $result = $conn->query($sql);
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

elseif ($action === 'courseContent') {

    $sql = "
        SELECT
            ci.ContentID,
            ci.CourseID,
            c.CourseTitlle AS Course,
            
            COALESCE(
                ca.AssingmentTitle,
                'Course Material'
            ) AS ContentTitle,

            CASE
                WHEN cp.ContentID IS NOT NULL THEN 'PDF'
                WHEN cv.ContentID IS NOT NULL THEN 'Video'
                WHEN cpr.ContentID IS NOT NULL THEN 'Presentation'
                WHEN ca.ContentID IS NOT NULL THEN 'Assignment'
                ELSE 'Unknown'
            END AS Type,

            i.InstructorName,
            ci.UploadDate

        FROM content_item_t ci
        JOIN course_t c 
            ON ci.CourseID = c.CourseID
        LEFT JOIN instructor_t i 
            ON c.InstructorID = i.InstructorID

        LEFT JOIN content_pdf_t cp 
            ON ci.ContentID = cp.ContentID
        LEFT JOIN content_video_t cv 
            ON ci.ContentID = cv.ContentID
        LEFT JOIN content_presentation_t cpr 
            ON ci.ContentID = cpr.ContentID
        LEFT JOIN content_assingment_t ca 
            ON ci.ContentID = ca.ContentID
    ";

    $result = $conn->query($sql);
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

elseif ($action === 'studentDiscussions') {

    $sql = "
        SELECT
            d.DiscussionID,
            d.DiscussionTitle,
            d.StudentID,
            d.InstructorID,
            d.Topic,
            d.DiscussionDate,
            d.TimeSpend,
            d.CourseID
        FROM discussion_post_t d
        ORDER BY d.DiscussionDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'myProgress') {

    $sql = "
        SELECT
            sp.StudentID,
            sp.CourseID,
            c.CourseTitlle AS Course,
            sp.EnrollmentDate,
            sp.LessonCompletationStatus,
            sp.CurrentStatus,
            sp.TimeSpend
        FROM student_progress_enrollment_t sp
        JOIN course_t c ON sp.CourseID = c.CourseID
        ORDER BY sp.EnrollmentDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'assessments') {

    $sql = "
        SELECT
            q.QuizID,
            c.CourseTitlle AS CourseTitle,
            sc.SubmittedAnswer,
            sc.Feedback,
            q.QuizDate
        FROM quiz_t q
        LEFT JOIN course_t c 
            ON q.CourseID = c.CourseID
        LEFT JOIN score_t sc
            ON q.QuizID = sc.QuizID
        ORDER BY q.QuizDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'quizzes') {

    $sql = "
        SELECT
            q.QuizID,
            q.QuizTitle,
            q.TotalMarks,
            q.CourseID,
            q.QuizDate,
            q.QuizDuration
        FROM quiz_t q
        ORDER BY q.QuizDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);

}

elseif ($action === 'performanceReport') {

    $sql = "
        SELECT
            pr.PerformenceReportID,
            pr.AIgeneratedInsights,
            pr.LearningRecommendations,
            pr.StudentsStrengthAndWeakness
        FROM performence_report_t pr
        ORDER BY pr.PerformenceReportID
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'giveReview') {

    $sql = "
        SELECT
            ReviewTopic,
            Rating,
            Comment,
            ReviewDate
        FROM review_t
        ORDER BY ReviewDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'certificates') {

    $sql = "
        SELECT
            cert.CertificateID,
            c.CourseTitlle AS Course,
            cert.IssueDate
        FROM certificate_t cert
        JOIN course_t c 
            ON cert.CourseID = c.CourseID
        ORDER BY cert.IssueDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

// elseif ($action === 'instructorCourses') {

//     // TEMP instructor ID (replace with session later)
//     $instructorId = $_GET['instructorId'] ?? 'INS001';

//     $sql = "
//         SELECT
//             c.CourseID,
//             c.CourseTitlle,
//             c.CourseCetagory,
//             c.DifficultyLvl,
//             c.PreRequisiteCourseID,
//             COUNT(sp.StudentID) AS Enrollments,
//             ROUND(AVG(r.Rating), 1) AS Rating
//         FROM course_t c
//         LEFT JOIN student_progress_enrollment_t sp
//             ON c.CourseID = sp.CourseID
//         LEFT JOIN review_t r
//             ON c.CourseID = r.CourseID
//         WHERE c.InstructorID = '$instructorId'
//         GROUP BY c.CourseID
//     ";

//     $result = $conn->query($sql);
//     $data = [];

//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $data[] = $row;
//         }
//     }

//     echo json_encode($data);
// }

// elseif ($action === 'instructorMyCourses') {

//     $instructorId = $_GET['instructorId'] ?? '';

//     $sql = "
//         SELECT
//             c.CourseID,
//             c.CourseTitlle,
//             c.CourseCetagory,
//             c.DifficultyLvl,
//             c.PreRequisiteCourseID,
//             COUNT(spe.StudentID) AS Enrollments
//         FROM course_t c
//         LEFT JOIN student_progress_enrollment_t spe
//             ON c.CourseID = spe.CourseID
//         WHERE c.InstructorID = '$instructorId'
//         GROUP BY c.CourseID
//     ";

//     $result = $conn->query($sql);
//     $data = [];

//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $data[] = $row;
//         }
//     }

//     echo json_encode($data);
// }

elseif ($action === 'myCourses') {

    $sql = "
        SELECT 
            c.CourseID,
            c.CourseTitlle AS CourseTitle,
            c.CourseCetagory AS Category,
            c.DifficultyLvl AS Difficulty,
            c.PreRequisiteCourseID,
            COUNT(DISTINCT spe.StudentID) AS Enrollments,
            AVG(r.Rating) AS Rating
        FROM course_t c
        LEFT JOIN student_progress_enrollment_t spe 
            ON c.CourseID = spe.CourseID
        LEFT JOIN review_t r 
            ON c.CourseID = r.CourseID
        GROUP BY 
            c.CourseID,
            c.CourseTitlle,
            c.CourseCetagory,
            c.DifficultyLvl,
            c.PreRequisiteCourseID;
    ";

    $result = $conn->query($sql);
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}


elseif ($action === 'instructorStudentProgress') {

    $instructorId = $_GET['instructorId'] ?? '';

    $sql = "
        SELECT
            s.StudentID AS loginId,
            COUNT(DISTINCT spe.CourseID) AS enrolledCourses,
            ROUND(AVG(
                CASE
                    WHEN spe.CurrentStatus = 'Completed' THEN 100
                    ELSE 0
                END
            ), 2) AS averageProgress,
            MAX(al.ActivityDate) AS lastActivity
        FROM course_t c
        INNER JOIN student_progress_enrollment_t spe
            ON c.CourseID = spe.CourseID
        INNER JOIN student_t s
            ON spe.StudentID = s.StudentID
        LEFT JOIN activity_log_t al
            ON al.StudentID = s.StudentID
        WHERE c.InstructorID = ?
        GROUP BY s.StudentID
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $instructorId);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}


elseif ($action === 'userManagement') {

    $sql = "
        SELECT 
            StudentID AS LoginID,
            StudentName AS Name,
            'student' AS Role,
            '2023-01-15' AS RegistrationDate
        FROM student_t

        UNION ALL

        SELECT 
            InstructorID AS LoginID,
            InstructorName AS Name,
            'instructor' AS Role,
            '2023-01-15' AS RegistrationDate
        FROM instructor_t

        UNION ALL

        SELECT 
            AdminID AS LoginID,
            AdminName AS Name,
            'admin' AS Role,
            '2023-01-15' AS RegistrationDate
        FROM admin_t
    ";

    $result = $conn->query($sql);
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

// elseif ($action === 'adminPerformanceReports') {

//     $sql = "
//         SELECT
//             pr.PerformenceReportID,
//             s.StudentName,
//             pr.StudentsStrengthAndWeakness,
//             pr.LearningRecommendations,
//             pr.AIgeneratedInsights,
//             CURDATE() AS GeneratedDate
//         FROM performence_report_t pr
//         JOIN student_t s ON pr.StudentID = s.StudentID
//         ORDER BY pr.PerformenceReportID
//     ";

//     $result = $conn->query($sql);
//     $data = [];

//     if ($result) {
//         while ($row = $result->fetch_assoc()) {
//             $data[] = $row;
//         }
//     }

//     echo json_encode($data);
// }

elseif ($action === 'viewReports') {

    $sql = "
        SELECT
            r.ReportID,
            r.AIGeneratedReport,
            r.ManualReport,
            r.CourseCompletationRate,
            r.Engagement,
            r.CoursePopularity
        FROM report_t r
        ORDER BY r.ReportID
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'instructorAssignments') {

    $sql = "
        SELECT
            a.InstructorID,
            c.CourseID,
            a.AssingDate
        FROM assing_task_t a
        INNER JOIN instructor_t i ON a.InstructorID = i.InstructorID
        INNER JOIN course_t c ON c.InstructorID = i.InstructorID
        WHERE a.Role = 'instructor'
        ORDER BY a.AssingDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}

elseif ($action === 'adminEnrollmentsProgress') {

    $sql = "
        SELECT
            s.StudentName,
            c.CourseTitlle AS CourseTitle,
            spe.EnrollmentDate,
            spe.CurrentStatus,
            spe.LessonCompletationStatus
        FROM student_progress_enrollment_t spe
        INNER JOIN student_t s ON spe.StudentID = s.StudentID
        INNER JOIN course_t c ON spe.CourseID = c.CourseID
        ORDER BY spe.EnrollmentDate DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);
}














