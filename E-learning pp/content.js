function renderContent() {
    let tableContent = '';
    let tableHeader = '';

    // Filter content based on search query
    let filteredContent = state.content;
    if (state.searchQuery) {
        filteredContent = state.content.filter(item => 
            item.title.toLowerCase().includes(state.searchQuery) ||
            item.type.toLowerCase().includes(state.searchQuery)
        );
    }
    
    if (state.currentRole === 'student') {
        const myEnrollments = state.enrollments.filter(e => e.studentId === state.currentUser.id);
        const myCourses = state.courses.filter(c => 
            myEnrollments.some(e => e.courseId === c.id)
        );
        const myContent = filteredContent.filter(cont => 
            myCourses.some(c => c.id === cont.courseId)
        );
        
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search content..." value="${state.searchQuery}">
                </div>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Content Title</th>
                    <th>Type</th>
                    <th>Instructor</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${myContent.map(cont => {
                    const course = state.courses.find(c => c.id === cont.courseId);
                    return `
                        <tr>
                            <td>${course.title}</td>
                            <td>${cont.title}</td>
                            <td>${cont.type}</td>
                            <td>${cont.instructor}</td>
                            <td>
                                <button class="action-btn view-btn" data-type="content" data-id="${cont.id}"><i class="fas fa-eye"></i> View</button>
                                <button class="action-btn"><i class="fas fa-download"></i> Download</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    } else if (state.currentRole === 'instructor') {
        const myCourses = state.courses.filter(c => c.instructor === state.currentUser.name);
        const myContent = filteredContent.filter(cont => 
            myCourses.some(c => c.id === cont.courseId)
        );
        
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search your content..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="content"><i class="fas fa-plus"></i> Add Content</button>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Content Title</th>
                    <th>Type</th>
                    <th>Upload Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${myContent.map(cont => {
                    const course = state.courses.find(c => c.id === cont.courseId);
                    return `
                        <tr>
                            <td>${course.title}</td>
                            <td>${cont.title}</td>
                            <td>${cont.type}</td>
                            <td>2023-04-15</td>
                            <td>
                                <button class="action-btn edit-btn" data-type="content" data-id="${cont.id}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="action-btn delete delete-btn" data-type="content" data-id="${cont.id}"><i class="fas fa-trash"></i> Delete</button>
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
                    <input type="text" class="search-input" placeholder="Search content..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="content"><i class="fas fa-plus"></i> Add Content</button>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Content Title</th>
                    <th>Type</th>
                    <th>Instructor</th>
                    <th>Upload Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${filteredContent.map(cont => {
                    const course = state.courses.find(c => c.id === cont.courseId);
                    return `
                        <tr>
                            <td>${course.title}</td>
                            <td>${cont.title}</td>
                            <td>${cont.type}</td>
                            <td>${cont.instructor}</td>
                            <td>2023-04-15</td>
                            <td>Approved</td>
                            <td>
                                <button class="action-btn"><i class="fas fa-search"></i> Review</button>
                                <button class="action-btn delete delete-btn" data-type="content" data-id="${cont.id}"><i class="fas fa-trash"></i> Delete</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    }
    
    return `
        <h2 class="page-title"><i class="fas fa-file-alt"></i> ${state.currentRole === 'student' ? 'Course Content' : 'Content Management'}</h2>
        <div class="table-container">
            ${tableHeader}
            <table>
                ${tableContent}
            </table>
        </div>
    `;
}
