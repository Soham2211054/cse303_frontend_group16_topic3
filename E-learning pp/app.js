// app.js - main application glue for Elearning pages
// This file uses shared state from state.js and per-table renderers

// DOM handles (assigned in init)
let navbar, navLinks, userInfo, mainContent, loginPage, loginForm, roleOptions, modal, modalTitle, modalBody, closeModal, cancelBtn, saveBtn;

// Role-based navigation structure
const roleNavigation = {
    student: [
        { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'profile', name: 'My Profile', icon: 'fas fa-user' },
        { id: 'courses', name: 'Browse Courses', icon: 'fas fa-book' },
        { id: 'content', name: 'Course Content', icon: 'fas fa-file-alt' },
        { id: 'progress', name: 'My Progress', icon: 'fas fa-chart-line' },
        { id: 'assessments', name: 'Assessments', icon: 'fas fa-tasks' },
        { id: 'certificates', name: 'Certificates', icon: 'fas fa-award' }
    ],
    instructor: [
        { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'profile', name: 'My Profile', icon: 'fas fa-user' },
        { id: 'courses', name: 'My Courses', icon: 'fas fa-book' },
        { id: 'content', name: 'Content Management', icon: 'fas fa-file-alt' },
        { id: 'students', name: 'Student Progress', icon: 'fas fa-user-graduate' },
        { id: 'assessments', name: 'Assessments', icon: 'fas fa-tasks' }
    ],
    admin: [
        { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { id: 'users', name: 'User Management', icon: 'fas fa-users' },
        { id: 'courses', name: 'Course Management', icon: 'fas fa-book' },
        { id: 'content', name: 'Content Management', icon: 'fas fa-file-alt' },
        { id: 'enrollments', name: 'Enrollments & Progress', icon: 'fas fa-chart-line' },
        { id: 'performance', name: 'Performance Reports', icon: 'fas fa-chart-bar' },
        { id: 'settings', name: 'System Settings', icon: 'fas fa-cogs' }
    ]
};

// Initialize application: find DOM nodes, wire events, do auto-login if needed
function init() {
    // state is provided by state.js as window.state
    if (!window.state) {
        console.error('state not found — please ensure state.js is loaded before app.js');
    }

    navbar = document.getElementById('navbar');
    navLinks = document.getElementById('navLinks');
    userInfo = document.getElementById('userInfo');
    mainContent = document.getElementById('mainContent');
    loginPage = document.getElementById('loginPage');
    loginForm = document.getElementById('loginForm');
    roleOptions = document.querySelectorAll('.role-option');
    modal = document.getElementById('modal');
    modalTitle = document.getElementById('modalTitle');
    modalBody = document.getElementById('modalBody');
    closeModal = document.getElementById('closeModal');
    cancelBtn = document.getElementById('cancelBtn');
    saveBtn = document.getElementById('saveBtn');

    // Determine initial role or saved user
    const initialRole = window.initialRole || document.body.dataset.initialRole || null;
    const savedUser = localStorage.getItem('currentUser');

    // Pages where we should not auto-login using localStorage
    const currentPage = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const disableAutoLoginPages = ['login.html', 'elearning.html', 'index.html', ''];

    if (loginPage) selectRole('student');

    if (initialRole) {
        let user = savedUser ? JSON.parse(savedUser) : null;
        if (!user || user.role !== initialRole) user = window.state.users.find(u => u.role === initialRole);

        if (user) {
            window.state.currentUser = user;
            window.state.currentRole = initialRole;
            window.state.currentPage = 'dashboard';
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMainInterface();
        } else if (savedUser) {
            window.state.currentUser = JSON.parse(savedUser);
            window.state.currentRole = window.state.currentUser.role;
            showMainInterface();
        } else {
            showLoginPage();
        }
    } else if (savedUser && !disableAutoLoginPages.includes(currentPage)) {
        // Auto-login from previous saved user (unless on login page)
        window.state.currentUser = JSON.parse(savedUser);
        window.state.currentRole = window.state.currentUser.role;
        showMainInterface();
    } else {
        showLoginPage();
    }

            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-book"></i></div>
                    <div class="card-title">My Courses</div>
                    <div class="card-value">${myCourses}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <div class="card-title">Total Students</div>
                    <div class="card-value">${totalStudents}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-star"></i></div>
                    <div class="card-title">Average Rating</div>
                    <div class="card-value">4.7</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-comments"></i></div>
                    <div class="card-title">Pending Questions</div>
                    <div class="card-value">5</div>
                </div>
            </div>
        `;
    } else if (window.state.currentRole === 'admin') {
        const totalUsers = window.state.users.length;
        const totalCourses = window.state.courses.length;
        const activeEnrollments = window.state.enrollments.filter(e => e.status === 'In Progress').length;

        stats = `
            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <div class="card-title">Total Users</div>
                    <div class="card-value">${totalUsers}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-book"></i></div>
                    <div class="card-title">Total Courses</div>
                    <div class="card-value">${totalCourses}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="card-title">Active Enrollments</div>
                    <div class="card-value">${activeEnrollments}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-heartbeat"></i></div>
                    <div class="card-title">System Health</div>
                    <div class="card-value">98%</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="page-header">
            <h2 class="page-title"><i class="fas fa-tachometer-alt"></i> Dashboard</h2>
            <div class="page-actions">
                <button class="btn btn-danger logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </div>
        </div>
        ${stats}
        <div class="table-container">
            <div class="table-header">
                <h3><i class="fas fa-history"></i> Recent Activity</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.state.activityLogs.map(log => `
                        <tr>
                            <td>${log.activity}</td>
                            <td>${log.timestamp}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderProfile() {
    const u = window.state.currentUser || {};
    return `
        <h2 class="page-title"><i class="fas fa-user"></i> My Profile</h2>
        <div class="table-container">
            <table>
                <tbody>
                    <tr><th>Name</th><td>${u.name || ''}</td></tr>
                    <tr><th>Login ID</th><td>${u.loginId || ''}</td></tr>
                    <tr><th>Role</th><td>${u.role || ''}</td></tr>
                    ${u.goals ? `<tr><th>Learning Goals</th><td>${u.goals}</td></tr>` : ''}
                    ${u.interests ? `<tr><th>Interests</th><td>${u.interests}</td></tr>` : ''}
                    ${u.expertise ? `<tr><th>Expertise</th><td>${u.expertise}</td></tr>` : ''}
                    ${u.qualification ? `<tr><th>Qualification</th><td>${u.qualification}</td></tr>` : ''}
                </tbody>
            </table>
        </div>
    `;
}

function renderProgress() {
    const myEnrollments = window.state.enrollments.filter(e => e.studentId === window.state.currentUser.id);
    return `
        <h2 class="page-title"><i class="fas fa-chart-line"></i> My Progress</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Enrollment Date</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Time Spent</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${myEnrollments.map(enrollment => {
                        const course = window.state.courses.find(c => c.id === enrollment.courseId) || {};
                        return `
                            <tr>
                                <td>${course.title || 'Unknown'}</td>
                                <td>${enrollment.enrollmentDate}</td>
                                <td>${enrollment.status}</td>
                                <td>
                                    <div class="progress-container"><div class="progress-bar" style="width: ${enrollment.progress}%;"></div></div>
                                    <small>${enrollment.progress}%</small>
                                </td>
                                <td>${Math.floor(enrollment.progress * 1.5)} hours</td>
                                <td>
                                    <button class="action-btn"><i class="fas fa-play"></i> Continue</button>
                                    <button class="action-btn view-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-info-circle"></i> Details</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderEnrollments() {
    let filteredEnrollments = window.state.currentRole === 'student' ? window.state.enrollments.filter(e => e.studentId === window.state.currentUser.id) : window.state.enrollments.slice();
    if (window.state.searchQuery) {
        const q = window.state.searchQuery;
        filteredEnrollments = filteredEnrollments.filter(enrollment => {
            const student = window.state.users.find(u => u.id === enrollment.studentId) || {};
            const course = window.state.courses.find(c => c.id === enrollment.courseId) || {};
            return (student.name && student.name.toLowerCase().includes(q)) || (course.title && course.title.toLowerCase().includes(q)) || (enrollment.CurrentStatus && enrollment.CurrentStatus.toLowerCase().includes(q)) || String(enrollment.progress).includes(q);
        });
    }

    return `
        <h2 class="page-title"><i class="fas fa-chart-line"></i> Enrollments & Progress</h2>
        <div class="table-container">
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search enrollments..." value="${window.state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="enrollments"><i class="fas fa-plus"></i> Add Enrollment</button>
            </div>
            <table>
                <thead>
                    <tr>
                        ${window.state.currentRole === 'student' ? `
                            <th>Course</th>
                            <th>Lesson Completion</th>
                            <th>Time Spent (hrs)</th>
                            <th>Enrollment Date</th>
                            <th>Current Status</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        ` : `
                            <th>Student</th>
                            <th>Course</th>
                            <th>Enrollment Date</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        `}
                    </tr>
                </thead>
                <tbody>
                    ${filteredEnrollments.map(enrollment => {
                        const student = window.state.users.find(u => u.id === enrollment.studentId) || {};
                        const course = window.state.courses.find(c => c.id === enrollment.courseId) || {};

                        if (window.state.currentRole === 'student') {
                            return `
                                <tr>
                                    <td>${course.title}</td>
                                    <td>${enrollment.LessonCompletationStatus || 'N/A'}</td>
                                    <td>${enrollment.TimeSpend != null ? enrollment.TimeSpend : '0'}</td>
                                    <td>${enrollment.enrollmentDate}</td>
                                    <td>${enrollment.CurrentStatus || enrollment.status || 'N/A'}</td>
                                    <td>${enrollment.progress}%</td>
                                    <td>
                                        <button class="action-btn view-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-info-circle"></i> Details</button>
                                        <button class="action-btn"><i class="fas fa-play"></i> Continue</button>
                                    </td>
                                </tr>
                            `;
                        }

                        return `
                            <tr>
                                <td>${student.name}</td>
                                <td>${course.title}</td>
                                <td>${enrollment.enrollmentDate}</td>
                                <td>${enrollment.status}</td>
                                <td>${enrollment.progress}%</td>
                                <td>
                                    <button class="action-btn view-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-info-circle"></i> Details</button>
                                    <button class="action-btn delete delete-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-trash"></i> Delete</button>
                                </td>
                            </tr>
                        `;

                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderPerformance() {
    return `
        <h2 class="page-title"><i class="fas fa-chart-bar"></i> Performance Reports</h2>
        <div class="table-container">
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search reports..." value="${window.state.searchQuery}">
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Strengths</th>
                        <th>Weaknesses</th>
                        <th>Recommendations</th>
                        <th>Generated Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.state.performanceReports.map(report => {
                        const student = window.state.users.find(u => u.id === report.studentId) || {};
                        return `
                            <tr>
                                <td>${student.name || ''}</td>
                                <td>${report.strengths}</td>
                                <td>2023-05-01</td>
                                <td>
                                    <button class="action-btn view-btn" data-type="performanceReports" data-id="${report.id}"><i class="fas fa-file-alt"></i> Full Report</button>
                                    <button class="action-btn"><i class="fas fa-download"></i> Export</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderSettings() {
    return `
        <h2 class="page-title"><i class="fas fa-cogs"></i> System Settings</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Setting</th>
                        <th>Current Value</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>User Registration</td>
                        <td>Enabled</td>
                        <td>Allow new users to register</td>
                        <td><button class="action-btn edit-btn" data-type="settings" data-id="1"><i class="fas fa-edit"></i> Edit</button></td>
                    </tr>
                    <tr>
                        <td>Course Creation</td>
                        <td>Instructors Only</td>
                        <td>Who can create courses</td>
                        <td><button class="action-btn edit-btn" data-type="settings" data-id="2"><i class="fas fa-edit"></i> Edit</button></td>
                    </tr>
                    <tr>
                        <td>Certificate Auto-generation</td>
                        <td>Enabled</td>
                        <td>Automatically generate certificates upon course completion</td>
                        <td><button class="action-btn edit-btn" data-type="settings" data-id="3"><i class="fas fa-edit"></i> Edit</button></td>
                    </tr>
                    <tr>
                        <td>AI Performance Analysis</td>
                        <td>Enabled</td>
                        <td>Use AI to analyze student performance</td>
                        <td><button class="action-btn edit-btn" data-type="settings" data-id="4"><i class="fas fa-edit"></i> Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Wire up init()
document.addEventListener('DOMContentLoaded', init);
// Shared app.js for Elearning role-specific pages
// renderCourses is now implemented in courses.js
    if (navbar) navbar.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'block';
    
    updateNavigation();
    renderCurrentPage();
}

// Update navigation based on user role
function updateNavigation() {
    // Clear existing navigation
    if (!navLinks) return;
    navLinks.innerHTML = '';
    
    // Add navigation links based on role
    const links = roleNavigation[state.currentRole];
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = `nav-link ${link.id === state.currentPage ? 'active' : ''}`;
        a.setAttribute('data-page', link.id);
        a.innerHTML = `<i class="${link.icon}"></i> ${link.name}`;
        navLinks.appendChild(a);
    });
    
    // Append a logout link to navigation
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.className = 'nav-link logout-nav';
    logoutLink.setAttribute('data-page', 'logout');
    logoutLink.id = 'navLogout';
    logoutLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
    navLinks.appendChild(logoutLink);

    // Update user info
    if (!userInfo) return;
    userInfo.innerHTML = `
        <div class="role-badge ${state.currentRole}-badge">
            <i class="fas fa-${state.currentRole === 'student' ? 'user-graduate' : state.currentRole === 'instructor' ? 'chalkboard-teacher' : 'user-shield'}"></i>
            ${state.currentRole.toUpperCase()}
        </div>
        <span>${state.currentUser.name}</span>
        <button class="logout-btn" id="logoutBtn">
            <i class="fas fa-sign-out-alt"></i> Logout
        </button>
    `;
}

// Navigate to a page
function navigateToPage(pageId) {
    state.currentPage = pageId;
    updateNavigation();
    renderCurrentPage();
}

// Render the current page based on state
function renderCurrentPage() {
    let pageContent = '';
    
    switch(state.currentPage) {
        case 'dashboard':
            pageContent = renderDashboard();
            break;
        case 'profile':
            pageContent = renderProfile();
            break;
        case 'courses':
            pageContent = renderCourses();
            break;
        case 'content':
            pageContent = renderContent();
            break;
        case 'progress':
            pageContent = renderProgress();
            break;
        case 'assessments':
            pageContent = renderAssessments();
            break;
        case 'certificates':
            pageContent = renderCertificates();
            break;
        case 'students':
            pageContent = renderStudents();
            break;
        case 'users':
            pageContent = renderUsers();
            break;
        case 'enrollments':
            pageContent = renderEnrollments();
            break;
        case 'performance':
            pageContent = renderPerformance();
            break;
        case 'settings':
            pageContent = renderSettings();
            break;
        default:
            pageContent = renderDashboard();
    }
    
    if (mainContent) mainContent.innerHTML = pageContent;
}

// Open modal for adding new items
function openAddModal(itemType) {
    state.editingItem = null;
    modalTitle.innerHTML = `<i class="fas fa-plus-circle"></i> Add New ${getItemTypeName(itemType)}`;
    modalBody.innerHTML = generateForm(itemType);
    modal.style.display = 'flex';
}

// Close modal
function closeModalWindow() {
    modal.style.display = 'none';
    state.editingItem = null;
}

// Handle saving items from modal
function handleSave() {
    const itemType = document.getElementById('itemType').value;
    const formData = getFormData(itemType);
    
    if (state.editingItem) {
        // Update existing item
        updateItem(itemType, state.editingItem.id, formData);
    } else {
        // Add new item
        addItem(itemType, formData);
    }
    
    closeModalWindow();
    renderCurrentPage();
}

// Get form data based on item type
function getFormData(itemType) {
    const formData = {};
    const inputs = modalBody.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.id !== 'itemType') {
            formData[input.id] = input.value;
        }
    });
    
    return formData;
}

// Add new item to state
function addItem(itemType, data) {
    const newId = state[itemType].length > 0 ? Math.max(...state[itemType].map(item => item.id)) + 1 : 1;
    const newItem = { id: newId, ...data };
    
    // Add role-specific data
    if (itemType === 'users') {
        newItem.role = state.currentRole === 'admin' ? data.role : state.currentRole;
    }
    
    state[itemType].push(newItem);
    alert(`${getItemTypeName(itemType)} added successfully!`);
}

// Update existing item in state
function updateItem(itemType, id, data) {
    const index = state[itemType].findIndex(item => item.id === id);
    if (index !== -1) {
        state[itemType][index] = { ...state[itemType][index], ...data };
        alert(`${getItemTypeName(itemType)} updated successfully!`);
    }
}

// Delete item from state
function deleteItem(itemType, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        state[itemType] = state[itemType].filter(item => item.id !== id);
        alert(`${getItemTypeName(itemType)} deleted successfully!`);
        renderCurrentPage();
    }
}

// View item details
function viewItem(itemType, id) {
    const item = state[itemType].find(item => item.id === id);
    if (item) {
        // For enrollments, show a richer modal that reflects student_progress_enrollment_t
        if (itemType === 'enrollments') {
            const student = state.users.find(u => u.id === item.studentId) || { name: 'Unknown' };
            const course = state.courses.find(c => c.id === item.courseId) || { title: 'Unknown' };

            modalTitle.innerHTML = `<i class="fas fa-info-circle"></i> Enrollment Details`;
            modalBody.innerHTML = `
                <div class="detail-grid">
                    <div><strong>Student:</strong></div><div>${student.name} (${item.studentId})</div>
                    <div><strong>Course:</strong></div><div>${course.title} (${item.courseId})</div>
                    <div><strong>Lesson Completion Status:</strong></div><div>${item.LessonCompletationStatus || 'N/A'}</div>
                    <div><strong>Time Spent (hrs):</strong></div><div>${item.TimeSpend != null ? item.TimeSpend : '0'}</div>
                    <div><strong>Enrollment Date:</strong></div><div>${item.enrollmentDate || 'N/A'}</div>
                    <div><strong>Current Status:</strong></div><div>${item.CurrentStatus || item.status || 'N/A'}</div>
                    <div><strong>Progress:</strong></div><div>${item.progress != null ? item.progress + '%' : 'N/A'}</div>
                </div>
            `;
            modal.style.display = 'flex';
            return;
        }

        let details = '';
        for (const [key, value] of Object.entries(item)) {
            if (key !== 'id') {
                details += `<p><strong>${key}:</strong> ${value}</p>`;
            }
        }
        alert(`Details:\n\n${details}`);
    }
}

// Edit item
function editItem(itemType, id) {
    const item = state[itemType].find(item => item.id === id);
    if (item) {
        state.editingItem = item;
        modalTitle.innerHTML = `<i class="fas fa-edit"></i> Edit ${getItemTypeName(itemType)}`;
        modalBody.innerHTML = generateForm(itemType, item);
        modal.style.display = 'flex';
    }
}

// Get display name for item type
function getItemTypeName(itemType) {
    const names = {
        'courses': 'Course',
        'users': 'User',
        'content': 'Content',
        'quizzes': 'Quiz',
        'enrollments': 'Enrollment'
    };
    
    return names[itemType] || 'Item';
}

// Generate form based on item type
function generateForm(itemType, item = null) {
    let formHTML = `<input type="hidden" id="itemType" value="${itemType}">`;
    
    switch(itemType) {
        case 'courses':
            formHTML += `
                <div class="form-group">
                    <label for="title">Course Title</label>
                    <input type="text" id="title" class="form-control" value="${item ? item.title : ''}" required>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" class="form-control" required>
                        <option value="Programming" ${item && item.category === 'Programming' ? 'selected' : ''}>Programming</option>
                        <option value="Web Development" ${item && item.category === 'Web Development' ? 'selected' : ''}>Web Development</option>
                        <option value="Data Science" ${item && item.category === 'Data Science' ? 'selected' : ''}>Data Science</option>
                        <option value="Mathematics" ${item && item.category === 'Mathematics' ? 'selected' : ''}>Mathematics</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="difficulty">Difficulty</label>
                    <select id="difficulty" class="form-control" required>
                        <option value="Beginner" ${item && item.difficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="Intermediate" ${item && item.difficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="Advanced" ${item && item.difficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="instructor">Instructor</label>
                    <input type="text" id="instructor" class="form-control" value="${item ? item.instructor : ''}" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" class="form-control" rows="3">${item ? item.description : ''}</textarea>
                </div>
            `;
            break;
            
        case 'users':
            formHTML += `
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" class="form-control" value="${item ? item.name : ''}" required>
                </div>
                <div class="form-group">
                    <label for="loginId">Login ID</label>
                    <input type="text" id="loginId" class="form-control" value="${item ? item.loginId : ''}" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" value="${item ? item.password : ''}" required>
                </div>
            `;
            
            if (state.currentRole === 'admin') {
                formHTML += `
                    <div class="form-group">
                        <label for="role">Role</label>
                        <select id="role" class="form-control" required>
                            <option value="student" ${item && item.role === 'student' ? 'selected' : ''}>Student</option>
                            <option value="instructor" ${item && item.role === 'instructor' ? 'selected' : ''}>Instructor</option>
                            <option value="admin" ${item && item.role === 'admin' ? 'selected' : ''}>Admin</option>
                        </select>
                    </div>
                `;
            }
            
            formHTML += `
                <div class="form-group">
                    <label for="goals">Learning Goals</label>
                    <input type="text" id="goals" class="form-control" value="${item ? item.goals || '' : ''}">
                </div>
                <div class="form-group">
                    <label for="interests">Interests</label>
                    <input type="text" id="interests" class="form-control" value="${item ? item.interests || '' : ''}">
                </div>
            `;
            break;
            
        case 'content':
            formHTML += `
                <div class="form-group">
                    <label for="title">Content Title</label>
                    <input type="text" id="title" class="form-control" value="${item ? item.title : ''}" required>
                </div>
                <div class="form-group">
                    <label for="type">Content Type</label>
                    <select id="type" class="form-control" required>
                        <option value="Video" ${item && item.type === 'Video' ? 'selected' : ''}>Video</option>
                        <option value="PDF" ${item && item.type === 'PDF' ? 'selected' : ''}>PDF</option>
                        <option value="Presentation" ${item && item.type === 'Presentation' ? 'selected' : ''}>Presentation</option>
                        <option value="Assignment" ${item && item.type === 'Assignment' ? 'selected' : ''}>Assignment</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="courseId">Course</label>
                    <select id="courseId" class="form-control" required>
                        ${state.courses.map(course => `<option value="${course.id}" ${item && item.courseId === course.id ? 'selected' : ''}>${course.title}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" class="form-control" rows="3">${item ? item.description : ''}</textarea>
                </div>
            `;
            break;
            
        default:
            formHTML += `<p>Form for ${itemType} not implemented yet.</p>`;
    }
    
    return formHTML;
}

// Page rendering functions (same as inline script; kept concise here but complete in file)
// ...existing code for renderDashboard, renderProfile, renderCourses, renderContent, renderProgress, renderAssessments, renderCertificates, renderStudents, renderUsers, renderEnrollments, renderPerformance, renderSettings ...

// We'll re-add the full render implementations to keep the app functional

function renderDashboard() {
    let stats = '';

    if (state.currentRole === 'student') {
        const enrolledCourses = state.enrollments.filter(e => e.studentId === state.currentUser.id).length;
        const completedCourses = state.enrollments.filter(e => 
            e.studentId === state.currentUser.id && e.status === 'Completed'
        ).length;
        const avgScore = (state.scores
            .filter(s => s.studentId === state.currentUser.id)
            .reduce((acc, curr, _, arr) => acc + curr.score / arr.length, 0) || 0);

        stats = `
            <div class="dashboard-cards">
                <div class="card" onclick="navigateToPage('enrollments')" style="cursor:pointer" title="View my enrollments">
                    <div class="card-icon"><i class="fas fa-book"></i></div>
                    <div class="card-title">Enrolled Courses</div>
                    <div class="card-value">${enrolledCourses}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="card-title">Completed Courses</div>
                    <div class="card-value">${completedCourses}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="card-title">Average Score</div>
                    <div class="card-value">${avgScore.toFixed(1)}%</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-clock"></i></div>
                    <div class="card-title">Study Hours</div>
                    <div class="card-value">42</div>
                </div>
            </div>
        `;
    } else if (state.currentRole === 'instructor') {
        const myCourses = state.courses.filter(c => c.instructor === state.currentUser.name).length;
        const totalStudents = state.enrollments
            .filter(e => state.courses
                .filter(c => c.instructor === state.currentUser.name)
                .map(c => c.id)
                .includes(e.courseId)
            ).length;
        
        stats = `
            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-book"></i></div>
                    <div class="card-title">My Courses</div>
                    <div class="card-value">${myCourses}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <div class="card-title">Total Students</div>
                    <div class="card-value">${totalStudents}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-star"></i></div>
                    <div class="card-title">Average Rating</div>
                    <div class="card-value">4.7</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-comments"></i></div>
                    <div class="card-title">Pending Questions</div>
                    <div class="card-value">5</div>
                </div>
            </div>
        `;
    } else if (state.currentRole === 'admin') {
        const totalUsers = state.users.length;
        const totalCourses = state.courses.length;
        const activeEnrollments = state.enrollments.filter(e => e.status === 'In Progress').length;
        
        stats = `
            <div class="dashboard-cards">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <div class="card-title">Total Users</div>
                    <div class="card-value">${totalUsers}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-book"></i></div>
                    <div class="card-title">Total Courses</div>
                    <div class="card-value">${totalCourses}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="card-title">Active Enrollments</div>
                    <div class="card-value">${activeEnrollments}</div>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-heartbeat"></i></div>
                    <div class="card-title">System Health</div>
                    <div class="card-value">98%</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="page-header">
            <h2 class="page-title"><i class="fas fa-tachometer-alt"></i> Dashboard</h2>
            <div class="page-actions">
                <button class="btn btn-danger logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</button>
            </div>
        </div>
        ${stats}
        <div class="table-container">
            <div class="table-header">
                <h3><i class="fas fa-history"></i> Recent Activity</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.activityLogs.map(log => `
                        <tr>
                            <td>${log.activity}</td>
                            <td>${log.timestamp}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderProfile() {
    return `
        <h2 class="page-title"><i class="fas fa-user"></i> My Profile</h2>
        <div class="table-container">
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>${state.currentUser.name}</td>
                    </tr>
                    <tr>
                        <th>Login ID</th>
                        <td>${state.currentUser.loginId}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>${state.currentUser.role}</td>
                    </tr>
                    ${state.currentUser.goals ? `
                        <tr>
                            <th>Learning Goals</th>
                            <td>${state.currentUser.goals}</td>
                        </tr>
                    ` : ''}
                    ${state.currentUser.interests ? `
                        <tr>
                            <th>Interests</th>
                            <td>${state.currentUser.interests}</td>
                        </tr>
                    ` : ''}
                    ${state.currentUser.expertise ? `
                        <tr>
                            <th>Expertise</th>
                            <td>${state.currentUser.expertise}</td>
                        </tr>
                    ` : ''}
                    ${state.currentUser.qualification ? `
                        <tr>
                            <th>Qualification</th>
                            <td>${state.currentUser.qualification}</td>
                        </tr>
                    ` : ''}
                </tbody>
            </table>
        </div>
    `;
}

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
                    `
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

// renderContent moved to content.js

function renderProgress() {
    const myEnrollments = state.enrollments.filter(e => e.studentId === state.currentUser.id);
    
    return `
        <h2 class="page-title"><i class="fas fa-chart-line"></i> My Progress</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Enrollment Date</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Time Spent</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${myEnrollments.map(enrollment => {
                        const course = state.courses.find(c => c.id === enrollment.courseId);
                        return `
                            <tr>
                                <td>${course.title}</td>
                                <td>${enrollment.enrollmentDate}</td>
                                <td>${enrollment.status}</td>
                                <td>
                                    <div class="progress-container">
                                        <div class="progress-bar" style="width: ${enrollment.progress}%;"></div>
                                    </div>
                                    <small>${enrollment.progress}%</small>
                                </td>
                                <td>${Math.floor(enrollment.progress * 1.5)} hours</td>
                                <td>
                                    <button class="action-btn"><i class="fas fa-play"></i> Continue</button>
                                    <button class="action-btn view-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-info-circle"></i> Details</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// renderAssessments is implemented in assessments.js

// renderCertificates is implemented in certificates.js

// renderStudents is implemented in students.js
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

// renderUsers is implemented in users.js

function renderEnrollments() {
    // If student, only show enrollments for the logged-in student; otherwise show all
    let filteredEnrollments = state.currentRole === 'student'
        ? state.enrollments.filter(e => e.studentId === state.currentUser.id)
        : state.enrollments.slice();

    // Apply search filter to the already role-filtered enrollments
    if (state.searchQuery) {
        const q = state.searchQuery;
        filteredEnrollments = filteredEnrollments.filter(enrollment => {
            const student = state.users.find(u => u.id === enrollment.studentId) || {};
            const course = state.courses.find(c => c.id === enrollment.courseId) || {};
            return (
                (student.name && student.name.toLowerCase().includes(q)) ||
                (course.title && course.title.toLowerCase().includes(q)) ||
                (enrollment.CurrentStatus && enrollment.CurrentStatus.toLowerCase().includes(q)) ||
                String(enrollment.progress).includes(q)
            );
        });
    }
    
    return `
        <h2 class="page-title"><i class="fas fa-chart-line"></i> Enrollments & Progress</h2>
        <div class="table-container">
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search enrollments..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="enrollments"><i class="fas fa-plus"></i> Add Enrollment</button>
            </div>
            <table>
                <thead>
                    <tr>
                        ${state.currentRole === 'student' ? `
                            <th>Course</th>
                            <th>Lesson Completion</th>
                            <th>Time Spent (hrs)</th>
                            <th>Enrollment Date</th>
                            <th>Current Status</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        ` : `
                            <th>Student</th>
                            <th>Course</th>
                            <th>Enrollment Date</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        `}
                    </tr>
                </thead>
                <tbody>
                    ${filteredEnrollments.map(enrollment => {
                        const student = state.users.find(u => u.id === enrollment.studentId) || {};
                        const course = state.courses.find(c => c.id === enrollment.courseId) || {};

                        if (state.currentRole === 'student') {
                            return `
                                <tr>
                                    <td>${course.title}</td>
                                    <td>${enrollment.LessonCompletationStatus || 'N/A'}</td>
                                    <td>${enrollment.TimeSpend != null ? enrollment.TimeSpend : '0'}</td>
                                    <td>${enrollment.enrollmentDate}</td>
                                    <td>${enrollment.CurrentStatus || enrollment.status || 'N/A'}</td>
                                    <td>${enrollment.progress}%</td>
                                    <td>
                                        <button class="action-btn view-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-info-circle"></i> Details</button>
                                        <button class="action-btn"><i class="fas fa-play"></i> Continue</button>
                                    </td>
                                </tr>
                            `;
                        }

                        return `
                            <tr>
                                <td>${student.name}</td>
                                <td>${course.title}</td>
                                <td>${enrollment.enrollmentDate}</td>
                                <td>${enrollment.status}</td>
                                <td>${enrollment.progress}%</td>
                                <td>
                                    <button class="action-btn view-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-info-circle"></i> Details</button>
                                    <button class="action-btn delete delete-btn" data-type="enrollments" data-id="${enrollment.id}"><i class="fas fa-trash"></i> Delete</button>
                                </td>
                            </tr>
                        `;

                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderPerformance() {
    return `
        <h2 class="page-title"><i class="fas fa-chart-bar"></i> Performance Reports</h2>
        <div class="table-container">
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search reports..." value="${state.searchQuery}">
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Strengths</th>
                        <th>Weaknesses</th>
                        <th>Recommendations</th>
                        <th>Generated Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.performanceReports.map(report => {
                        const student = state.users.find(u => u.id === report.studentId);
                        return `
                            <tr>
                                <td>${student.name}</td>
                                <td>${report.strengths}</td>
                                <td>2023-05-01</td>
                                <td>
                                    <button class="action-btn view-btn" data-type="performanceReports" data-id="${report.id}"><i class="fas fa-file-alt"></i> Full Report</button>
                                    <button class="action-btn"><i class="fas fa-download"></i> Export</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderSettings() {
    return `
        <h2 class="page-title"><i class="fas fa-cogs"></i> System Settings</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Setting</th>
                        <th>Current Value</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>User Registration</td>
                        <td>Enabled</td>
                        <td>Allow new users to register</td>
                        <td>
                            <button class="action-btn edit-btn" data-type="settings" data-id="1"><i class="fas fa-edit"></i> Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Course Creation</td>
                        <td>Instructors Only</td>
                        <td>Who can create courses</td>
                        <td>
                            <button class="action-btn edit-btn" data-type="settings" data-id="2"><i class="fas fa-edit"></i> Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Certificate Auto-generation</td>
                        <td>Enabled</td>
                        <td>Automatically generate certificates upon course completion</td>
                        <td>
                            <button class="action-btn edit-btn" data-type="settings" data-id="3"><i class="fas fa-edit"></i> Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <td>AI Performance Analysis</td>
                        <td>Enabled</td>
                        <td>Use AI to analyze student performance</td>
                        <td>
                            <button class="action-btn edit-btn" data-type="settings" data-id="4"><i class="fas fa-edit"></i> Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Expose API if needed (not necessary but helpful for debugging)
// window.ElearningApp = { state, renderCurrentPage };
