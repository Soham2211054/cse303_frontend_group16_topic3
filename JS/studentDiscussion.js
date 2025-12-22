fetch("../api/api.php?action=studentDiscussions")
  .then(res => res.json())
  .then(data => {

    state.studentDiscussions = data.map(d => ({
      discussionId: d.DiscussionID,
      title: d.DiscussionTitle,
      studentId: d.StudentID,
      instructorId: d.InstructorID,
      topic: d.Topic,
      date: d.DiscussionDate,
      duration: d.TimeSpend,
      courseId: d.CourseID
    }));

    renderCurrentPage(); // refresh table
  })
  .catch(err => {
    console.error("Discussion fetch error:", err);
  });
