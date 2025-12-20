fetch("/cse303_frontend_group16_topic3/api/api.php?action=browseCourses")
  .then(res => res.json())
  .then(data => {
    const body = document.getElementById("courseTableBody");
    body.innerHTML = "";

    data.forEach(course => {
      body.innerHTML += `
        <tr>
          <td>${course.CourseID}</td>
          <td>${course.CourseTitlle}</td>
          <td>${course.CourseCetagory}</td>
          <td>${course.DifficultyLvl}</td>
          <td>${course.PreRequisiteCourseID ?? "-"}</td>
          <td>${course.InstructorName ?? "-"}</td>
          <td>${course.Rating ?? "N/A"} ⭐</td>
          <td>
            <a href="#">View</a> |
            <a href="#">Enroll</a>
          </td>
        </tr>
      `;
    });
  });
