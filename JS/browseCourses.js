fetch("../api/api.php?action=browseCourses")
  .then(res => res.json())
  .then(data => {

    state.courses = data.map(course => ({
      id: course.CourseID,
      title: course.CourseTitlle,
      category: course.CourseCetagory,
      difficulty: course.DifficultyLvl,
      instructor: course.InstructorName ?? "N/A",
      rating: course.Rating ?? "N/A",
      prerequisiteCourseIds: course.PreRequisiteCourseID
        ? [course.PreRequisiteCourseID]
        : []
    }));

    renderCurrentPage(); // THIS is the key
  });
