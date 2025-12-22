fetch("../api/api.php?action=myProgress&studentId=STD001")
  .then(res => res.json())
  .then(data => {

    state.myProgress = data.map(p => ({
      studentId: p.StudentID,
      courseId: p.CourseID,
      course: p.Course,
      enrollmentDate: p.EnrollmentDate,
      lessonStatus: p.LessonCompletationStatus ?? "N/A",
      completion: p.CurrentStatus ?? "0%",
      score: "N/A",
      timeSpent: p.TimeSpend ?? "0"
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("My Progress fetch error:", err);
  });
