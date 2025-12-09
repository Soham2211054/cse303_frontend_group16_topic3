function renderCourses() {
    let tableContent = '';
    let tableHeader = '';
    
    // Filter courses based on search query
    let filteredCourses = state.courses;
    if (state.searchQuery) {
        filteredCourses = state.courses.filter(course => 
            course.title.toLowerCase().includes(state.searchQuery) ||
            course.category.toLowerCase().includes(state.searchQuery) ||
            course.instructor.toLowerCase().includes(state.searchQuery)
        );
    }
    
    if (state.currentRole === 'student') {
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search courses..." value="${state.searchQuery}">
                </div>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Instructor</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filteredCourses.map(course => `
                    <tr>
                        <td>${course.title}</td>
                        <td>${course.category}</td>
                        <td>${course.difficulty}</td>
                        <td>${course.instructor || ''}</td>
                        <td>${course.rating} ⭐</td>
                        <td>
                            <button class="action-btn view-btn" data-type="courses" data-id="${course.id}"><i class="fas fa-eye"></i> View</button>
                            <button class="action-btn"><i class="fas fa-plus"></i> Enroll</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    } else if (state.currentRole === 'instructor') {
        const myCourses = filteredCourses.filter(c => c.instructor === state.currentUser.name);
        
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search your courses..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="courses"><i class="fas fa-plus"></i> Add Course</button>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Enrollments</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${myCourses.map(course => {
                    const enrollments = state.enrollments.filter(e => e.courseId === course.id).length;
                    return `
                        <tr>
                            <td>${course.title}</td>
                            <td>${course.category}</td>
                            <td>${course.difficulty}</td>
                            <td>${enrollments}</td>
                            <td>${course.rating} ⭐</td>
                            <td>
                                <button class="action-btn edit-btn" data-type="courses" data-id="${course.id}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="action-btn view-btn" data-type="courses" data-id="${course.id}"><i class="fas fa-chart-bar"></i> Analytics</button>
                                <button class="action-btn delete delete-btn" data-type="courses" data-id="${course.id}"><i class="fas fa-trash"></i> Delete</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    } else if (state.currentRole === 'admin') {
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search courses..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="courses"><i class="fas fa-plus"></i> Add Course</button>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Instructor</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filteredCourses.map(course => `
                    <tr>
                        <td>${course.title}</td>
                        <td>${course.category}</td>
                        <td>${course.difficulty}</td>
                        <td>${course.instructor}</td>
                        <td>${course.rating} ⭐</td>
                        <td>Active</td>
                        <td>
                            <button class="action-btn edit-btn" data-type="courses" data-id="${course.id}"><i class="fas fa-edit"></i> Edit</button>
                            <button class="action-btn delete delete-btn" data-type="courses" data-id="${course.id}"><i class="fas fa-trash"></i> Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }
    
    return `
        <h2 class="page-title"><i class="fas fa-book"></i> ${state.currentRole === 'student' ? 'Browse Courses' : state.currentRole === 'instructor' ? 'My Courses' : 'Course Management'}</h2>
        <div class="table-container">
            ${tableHeader}
            <table>
                ${tableContent}
            </table>
        </div>
    `;
}
