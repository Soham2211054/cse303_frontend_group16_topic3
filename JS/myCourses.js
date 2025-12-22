// // TEMP instructor ID (same as api.php)
// const instructorId = "INS001";

// fetch(`../api/api.php?action=instructorCourses&instructorId=${instructorId}`)
//   .then(res => res.json())
//   .then(data => {

//     state.myCourses = data.map(c => ({
//       courseId: c.CourseID,
//       title: c.CourseTitlle,
//       category: c.CourseCetagory,
//       difficulty: c.DifficultyLvl,
//       prerequisite: c.PreRequisiteCourseID ?? "None",
//       enrollments: c.Enrollments ?? 0,
//       rating: c.Rating ?? "N/A"
//     }));

//     renderCurrentPage();
//   })
//   .catch(err => {
//     console.error("My Courses fetch error:", err);
//   });

// fetch(`../api/api.php?action=instructorMyCourses&instructorId=${state.currentUser.id}`)
//   .then(res => res.json())
//   .then(data => {

//     state.myCourses = data.map(c => ({
//       courseId: c.CourseID,
//       title: c.CourseTitlle,
//       category: c.CourseCetagory,
//       difficulty: c.DifficultyLvl,
//       prerequisite: c.PreRequisiteCourseID ?? 'None',
//       enrollments: c.Enrollments ?? 0,
//       rating: 'N/A'
//     }));

//     renderCurrentPage();
//   })
//   .catch(err => {
//     console.error("My Courses fetch error:", err);
//   });

// fetch("../api/api.php?action=myCourses")
//   .then(res => res.json())
//   .then(data => {

//     state.myCourses = data.map(course => ({
//       id: course.CourseID,
//       title: course.CourseTitle,
//       category: course.CourseCategory,
//       difficulty: course.Difficulty,
//       enrollments: course.Enrollments ?? 0,
//       rating: course.Rating ?? "N/A",
//       prerequisiteCourseIds: course.PreRequisiteCourseID
//         ? [course.PreRequisiteCourseID]
//         : []
//     }));

//     renderCurrentPage(); // THIS is the key
//   });

fetch("../api/api.php?action=myCourses")
  .then(res => res.json())
  .then(data => {

    const mappedCourses = Array.isArray(data) ? data.map(course => ({
      id: course.CourseID,
      title: course.CourseTitle,          // ⚠️ FIXED spelling
      category: course.Category,          // ⚠️ FIXED alias
      difficulty: course.Difficulty,
      enrollments: course.Enrollments ?? 0,
      rating: course.Rating ?? "N/A",
      prerequisiteCourseIds: course.PreRequisiteCourseID
        ? [course.PreRequisiteCourseID]
        : []
    })) : [];

    // ✅ IMPORTANT
    state.myCourses = mappedCourses;
    state.courses = mappedCourses;

    renderCurrentPage();
  });
