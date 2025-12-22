fetch("../api/api.php?action=courseContent")
  .then(res => res.json())
  .then(data => {

    state.courseContents = data.map(item => ({
      contentId: item.ContentID,
      courseId: item.CourseID,
      courseTitle: item.Course,
      contentTitle: item.ContentTitle,
      type: item.Type,
      instructor: item.InstructorName ?? "N/A",
      uploadDate: item.UploadDate ?? "N/A"
    }));

    renderCurrentPage(); // render content table
  });
