fetch("../api/api.php?action=assessments")
  .then(res => res.json())
  .then(data => {

    state.assessments = data.map(a => ({
      quizId: a.QuizID,
      courseTitle: a.CourseTitle ?? "N/A",
      score: a.SubmittedAnswer ?? "N/A",
      feedback: a.Feedback ?? "No feedback",
      date: a.QuizDate ?? "-"
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("Assessments fetch error:", err);
  });
