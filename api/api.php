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
