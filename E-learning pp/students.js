function renderStudents() {
    const myCourses = state.courses.filter(c => c.instructor === state.currentUser.name);
    const myEnrollments = state.enrollments.filter(e => 
        myCourses.some(c => c.id === e.courseId)
    );
    
    // Get unique students
    const studentIds = [...new Set(myEnrollments.map(e => e.studentId))];
    const students = state.users.filter(u => 
        studentIds.includes(u.id) && u.role === 'student'
    );
    
    return `
        <h2 class="page-title"><i class="fas fa-user-graduate"></i> Student Progress</h2>
        <div class="table-container">
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search students..." value="${state.searchQuery}">
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Login ID</th>
                        <th>Enrolled Courses</th>
                        <th>Average Progress</th>
                        <th>Last Activity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => {
                        const studentEnrollments = myEnrollments.filter(e => e.studentId === student.id);
                        const avgProgress = studentEnrollments.length > 0 ? 
                            studentEnrollments.reduce((acc, curr) => acc + curr.progress, 0) / studentEnrollments.length : 0;
                        
                        return `
                            <tr>
                                <td>${student.name}</td>
                                <td>${student.loginId}</td>
                                <td>${studentEnrollments.length}</td>
                                <td>${avgProgress.toFixed(1)}%</td>
                                <td>2023-05-15</td>
                                <td>
                                    <button class="action-btn view-btn" data-type="users" data-id="${student.id}"><i class="fas fa-chart-line"></i> Progress</button>
                                    <button class="action-btn"><i class="fas fa-envelope"></i> Message</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}
