function loadInstructorStudentProgress() {

  if (!state.currentUser || state.currentUser.role !== 'instructor') return;

  fetch(`../api/api.php?action=instructorStudentProgress&instructorId=${state.currentUser.id}`)
    .then(res => res.json())
    .then(data => {

      state.studentProgress = data.map(p => ({
        loginId: p.loginId,
        enrolledCourses: p.enrolledCourses || 'N/A',
        averageProgress: p.averageProgress || 0,
        lastActivity: p.lastActivity || 'N/A'
      }));

      renderCurrentPage();
    })
    .catch(err => console.error(err));
}
