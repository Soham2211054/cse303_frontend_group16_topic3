fetch("../api/api.php?action=adminEnrollmentsProgress")
  .then(res => res.json())
  .then(data => {

    state.adminEnrollments = data.map(row => ({
      student: row.StudentName,
      course: row.CourseTitle,
      enrollmentDate: row.EnrollmentDate,
      status: row.CurrentStatus ?? "N/A",
      progress: row.LessonCompletationStatus ?? "N/A"
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("Enrollment & Progress fetch error:", err);
  });
