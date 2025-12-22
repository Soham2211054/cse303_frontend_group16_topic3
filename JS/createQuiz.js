// Fetch quizzes from API and populate state
fetch('../api/api.php?action=quizzes')
  .then(res => res.json())
  .then(data => {
    state.quizzes = data.map(q => ({
      id: q.QuizID,
      title: q.QuizTitle ?? 'Untitled',
      totalMarks: q.TotalMarks ?? '-',
      courseId: q.CourseID ?? '-',
      date: q.QuizDate ?? '-',
      duration: q.QuizDuration ?? '-'
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error('Quizzes fetch error:', err);
  });
