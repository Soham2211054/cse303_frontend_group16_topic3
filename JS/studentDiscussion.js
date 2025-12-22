fetch("../api/api.php?action=studentDiscussions")
  .then(res => res.json())
  .then(data => {
n    // Normalize API response into `state.discussions` with `id` property so the rest of the app can operate on it
    state.discussions = (data || []).map(d => ({
      id: d.DiscussionID,
      title: d.DiscussionTitle,
      studentId: d.StudentID,
      instructorId: d.InstructorID,
      topic: d.Topic,
      date: d.DiscussionDate,
      duration: d.TimeSpend,
      courseId: d.CourseID
    }));

n    // Backwards-compatibility alias (some views may still reference studentDiscussions)
    state.studentDiscussions = state.discussions;

n    renderCurrentPage(); // refresh table
  })
  .catch(err => {
    console.error("Discussion fetch error:", err);
  });
