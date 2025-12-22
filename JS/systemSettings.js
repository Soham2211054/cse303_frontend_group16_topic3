// fetch("../api/api.php?action=instructorAssignments")
//   .then(res => res.json())
//   .then(data => {

//     state.instructorAssignments = data.map(a => ({
//       instructorId: a.InstructorID,
//       courseId: a.CourseID,
//       assignedDate: a.AssingDate
//     }));

//     renderCurrentPage();
//   })
//   .catch(err => console.error("Instructor assignment error:", err));

fetch("../api/api.php?action=instructorAssignments")
  .then(res => res.json())
  .then(data => {

    state.instructorAssignments = data.map(row => ({
      instructorId: row.InstructorID,
      courseId: row.CourseID,
      assignedDate: row.AssingDate
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("Instructor assignment fetch error:", err);
  });
