// Shared app.js for Elearning role-specific pages
// Application State
const state = {
    currentUser: null,
    currentRole: null,
    currentPage: 'dashboard',
    searchQuery: '',
    editingItem: null,
    // Mock data for demonstration
    users: [
        { id: 1, name: 'John Student', loginId: '2211054', password: '1234', role: 'student', goals: 'Learn programming', interests: 'Web Development' },
        { id: 2, name: 'Jane Instructor', loginId: '2211054', password: '1234', role: 'instructor', expertise: 'Computer Science', qualification: 'PhD' },
        { id: 3, name: 'Admin User', loginId: '2211054', password: '1234', role: 'admin' },
        { id: 4, name: 'Alice Johnson', loginId: '2211054', password: '1234', role: 'student', goals: 'Data Science', interests: 'Machine Learning' },
        { id: 5, name: 'Bob Smith', loginId: '2211054', password: '1234', role: 'instructor', expertise: 'Mathematics', qualification: 'MSc' }
    ],
    courses: [
        { id: 1, title: 'Introduction to Programming', category: 'Programming', difficulty: 'Beginner', instructor: 'Jane Instructor', rating: 4.5, description: 'Learn the basics of programming' },
        { id: 2, title: 'Advanced Web Development', category: 'Web Development', difficulty: 'Advanced', instructor: 'John Doe', rating: 4.8, description: 'Master advanced web development concepts' },
        { id: 3, title: 'Data Science Fundamentals', category: 'Data Science', difficulty: 'Intermediate', instructor: 'Bob Smith', rating: 4.3, description: 'Introduction to data science and analytics' }
    ],
    enrollments: [
        { id: 1, studentId: 1, courseId: 1, enrollmentDate: '2023-01-15', status: 'In Progress', progress: 65 },
        { id: 2, studentId: 1, courseId: 2, enrollmentDate: '2023-02-10', status: 'Completed', progress: 100 },
        { id: 3, studentId: 4, courseId: 3, enrollmentDate: '2023-03-05', status: 'In Progress', progress: 30 }
    ],
    content: [
        { id: 1, courseId: 1, title: 'Introduction Video', type: 'Video', instructor: 'Jane Instructor', description: 'Welcome to the course' },
        { id: 2, courseId: 1, title: 'Programming Basics PDF', type: 'PDF', instructor: 'Jane Instructor', description: 'Fundamental programming concepts' },
        { id: 3, courseId: 2, title: 'HTML & CSS Tutorial', type: 'Video', instructor: 'John Doe', description: 'Web development basics' }
    ],
    quizzes: [
        { id: 1, courseId: 1, title: 'Programming Basics Quiz', questions: 10, totalMarks: 100, description: 'Test your programming knowledge' },
        { id: 2, courseId: 2, title: 'Web Development Quiz', questions: 15, totalMarks: 150, description: 'Advanced web development quiz' }
    ],
    scores: [
        { id: 1, studentId: 1, quizId: 1, score: 85, feedback: 'Good understanding of basics' },
        { id: 2, studentId: 1, quizId: 2, score: 92, feedback: 'Excellent performance' }
    ],
    performanceReports: [
        { id: 1, studentId: 1, strengths: 'Problem solving, Algorithm design', weaknesses: 'Debugging complex code', recommendations: 'Practice more debugging exercises' }
    ],
    activityLogs: [
        { id: 1, userId: 1, activity: 'Logged in', timestamp: '2023-05-01 09:15:00' },
        { id: 2, userId: 1, activity: 'Enrolled in course', timestamp: '2023-05-01 09:30:00' },
        { id: 3, userId: 2, activity: 'Uploaded new content', timestamp: '2023-05-02 10:20:00' }
    ],
    certificates: [
        { id: 1, studentId: 1, courseId: 2, issueDate: '2023-04-15', certificateId: 'CERT-0001' }
    ]
};

// DOM elements will be assigned in init()
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

// Initialize the application
function init() {
    // Assign DOM elements now that DOM is parsed
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

    // Check for initial role from the page (student/instructor/admin)
    const initialRole = window.initialRole || document.body.dataset.initialRole || null;
    const savedUser = localStorage.getItem('currentUser');

    // If this is the login page, make sure a default role is selected
    const currentPage = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const disableAutoLoginPages = ['login.html', 'elearning.html', 'index.html', ''];

    if (loginPage) {
        // Only set default role if there is a login page visible
        selectRole('student');
    }

    if (initialRole) {
        let user = savedUser ? JSON.parse(savedUser) : null;
        if (!user || user.role !== initialRole) {
            user = state.users.find(u => u.role === initialRole);
        }

        if (user) {
            state.currentUser = user;
            state.currentRole = initialRole;
            state.currentPage = 'dashboard';
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMainInterface();
        } else if (savedUser) {
            state.currentUser = JSON.parse(savedUser);
            state.currentRole = state.currentUser.role;
            showMainInterface();
        } else {
            showLoginPage();
        }
    } else if (savedUser && !disableAutoLoginPages.includes(currentPage)) {
        // Only auto-login with saved user if we're NOT on a login page
        state.currentUser = JSON.parse(savedUser);
        state.currentRole = state.currentUser.role;
        showMainInterface();
    } else {
        showLoginPage();
    }

    setupEventListeners();
}

// Helper to select a role option programmatically
function selectRole(role) {
    if (!roleOptions || roleOptions.length === 0) return;
    roleOptions.forEach(o => {
        if (o.getAttribute('data-role') === role) {
            o.classList.add('selected');
        } else {
            o.classList.remove('selected');
        }
    });
}

// Set focus to username for quick login
function focusLoginUsername() {
    const usernameEl = document.getElementById('username');
    if (usernameEl) {
        setTimeout(() => usernameEl.focus(), 120);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Role selection
    roleOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectRole(option.getAttribute('data-role'));
        });
    });

    // Login form submission
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // Modal events
    if (closeModal) closeModal.addEventListener('click', closeModalWindow);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModalWindow);
    if (saveBtn) saveBtn.addEventListener('click', handleSave);

    // Logout button (will be added dynamically)
    document.addEventListener('click', function(e) {
        const isLogoutTarget = e.target && (
            e.target.id === 'logoutBtn' ||
            e.target.classList.contains('logout-btn') ||
            (e.target.closest && e.target.closest('.logout-btn')) ||
            e.target.id === 'navLogout' ||
            e.target.classList.contains('logout-nav')
        );

        if (isLogoutTarget) {
            handleLogout();
        }
    });

    // Navigation clicks (will be added dynamically)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('nav-link') && e.target.id !== 'navLogout') {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            navigateToPage(pageId);
        }
    });

    // Search functionality (will be added dynamically)
    document.addEventListener('input', function(e) {
        if (e.target && e.target.classList.contains('search-input')) {
            state.searchQuery = e.target.value.toLowerCase();
            renderCurrentPage();
        }
    });

    // Add button clicks (will be added dynamically)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-btn')) {
            const itemType = e.target.getAttribute('data-type');
            openAddModal(itemType);
        }
    });

    // Delete button clicks (will be added dynamically)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const itemType = e.target.getAttribute('data-type');
            deleteItem(itemType, itemId);
        }
    });

    // View and Edit button clicks (will be added dynamically)
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.classList.contains('view-btn') || e.target.classList.contains('edit-btn'))) {
            const action = e.target.classList.contains('view-btn') ? 'view' : 'edit';
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const itemType = e.target.getAttribute('data-type');

            if (action === 'view') {
                viewItem(itemType, itemId);
            } else {
                editItem(itemType, itemId);
            }
        }
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const username = usernameEl ? usernameEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value : '';
    const selectedRole = document.querySelector('.role-option.selected');
    
    if (!selectedRole) {
        alert('Please select a role');
        return;
    }

    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    const role = selectedRole.getAttribute('data-role');
    
    // Simple authentication (in a real app, this would be a server call)
    const user = state.users.find(u => 
        u.loginId === username && u.password === password && u.role === role
    );
    
    if (user) {
        state.currentUser = user;
        state.currentRole = role;
        state.currentPage = 'dashboard';
        
        // Save to localStorage for demo persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showMainInterface();
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Handle logout
function handleLogout() {
    state.currentUser = null;
    state.currentRole = null;
    localStorage.removeItem('currentUser');
    showLoginPage();
}

// Show login page
function showLoginPage() {
    if (loginPage) loginPage.style.display = 'flex';
    if (navbar) navbar.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    
    // Reset form
    if (loginForm) loginForm.reset();
    if (roleOptions) roleOptions.forEach(o => o.classList.remove('selected'));

    // Default role for login page
    selectRole('student');

    // Focus the username field for better UX
    focusLoginUsername();
}

// Show main interface after login
function showMainInterface() {
    if (loginPage) loginPage.style.display = 'none';
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
                <div class="card">
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

function renderAssessments() {
    let tableContent = '';
    let tableHeader = '';
    
    if (state.currentRole === 'student') {
        const myScores = state.scores.filter(s => s.studentId === state.currentUser.id);
        
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search assessments..." value="${state.searchQuery}">
                </div>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Quiz</th>
                    <th>Course</th>
                    <th>Score</th>
                    <th>Feedback</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${myScores.map(score => {
                    const quiz = state.quizzes.find(q => q.id === score.quizId);
                    const course = state.courses.find(c => c.id === quiz.courseId);
                    return `
                        <tr>
                            <td>${quiz.title}</td>
                            <td>${course.title}</td>
                            <td>${score.score}%</td>
                            <td>${score.feedback}</td>
                            <td>2023-05-10</td>
                            <td>
                                <button class="action-btn view-btn" data-type="scores" data-id="${score.id}"><i class="fas fa-eye"></i> Review</button>
                                <button class="action-btn"><i class="fas fa-redo"></i> Retake</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    } else if (state.currentRole === 'instructor') {
        const myCourses = state.courses.filter(c => c.instructor === state.currentUser.name);
        const myQuizzes = state.quizzes.filter(q => 
            myCourses.some(c => c.id === q.courseId)
        );
        
        tableHeader = `
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search quizzes..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="quizzes"><i class="fas fa-plus"></i> Add Quiz</button>
            </div>
        `;
        
        tableContent = `
            <thead>
                <tr>
                    <th>Quiz</th>
                    <th>Course</th>
                    <th>Questions</th>
                    <th>Total Marks</th>
                    <th>Average Score</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${myQuizzes.map(quiz => {
                    const course = state.courses.find(c => c.id === quiz.courseId);
                    const scores = state.scores.filter(s => s.quizId === quiz.id);
                    const avgScore = scores.length > 0 ? 
                        scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length : 0;
                    
                    return `
                        <tr>
                            <td>${quiz.title}</td>
                            <td>${course.title}</td>
                            <td>${quiz.questions}</td>
                            <td>${quiz.totalMarks}</td>
                            <td>${avgScore.toFixed(1)}%</td>
                            <td>
                                <button class="action-btn edit-btn" data-type="quizzes" data-id="${quiz.id}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="action-btn view-btn" data-type="quizzes" data-id="${quiz.id}"><i class="fas fa-chart-bar"></i> Results</button>
                                <button class="action-btn delete delete-btn" data-type="quizzes" data-id="${quiz.id}"><i class="fas fa-trash"></i> Delete</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    }
    
    return `
        <h2 class="page-title"><i class="fas fa-tasks"></i> Assessments</h2>
        <div class="table-container">
            ${tableHeader}
            <table>
                ${tableContent}
            </table>
        </div>
    `;
}

function renderCertificates() {
    const completedEnrollments = state.enrollments.filter(
        e => e.studentId === state.currentUser.id && e.status === 'Completed'
    );
    
    return `
        <h2 class="page-title"><i class="fas fa-award"></i> My Certificates</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Completion Date</th>
                        <th>Certificate ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${completedEnrollments.map(enrollment => {
                        const course = state.courses.find(c => c.id === enrollment.courseId);
                        const certificate = state.certificates.find(c => c.courseId === enrollment.courseId && c.studentId === state.currentUser.id);
                        return `
                            <tr>
                                <td>${course.title}</td>
                                <td>${enrollment.enrollmentDate}</td>
                                <td>${certificate ? certificate.certificateId : 'Pending'}</td>
                                <td>
                                    <button class="action-btn view-btn" data-type="certificates" data-id="${certificate ? certificate.id : ''}"><i class="fas fa-eye"></i> View</button>
                                    <button class="action-btn"><i class="fas fa-download"></i> Download</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

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

function renderUsers() {
    // Filter users based on search query
    let filteredUsers = state.users;
    if (state.searchQuery) {
        filteredUsers = state.users.filter(user => 
            user.name.toLowerCase().includes(state.searchQuery) ||
            user.loginId.toLowerCase().includes(state.searchQuery) ||
            user.role.toLowerCase().includes(state.searchQuery)
        );
    }
    
    return `
        <h2 class="page-title"><i class="fas fa-users"></i> User Management</h2>
        <div class="table-container">
            <div class="table-header">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" placeholder="Search users..." value="${state.searchQuery}">
                </div>
                <button class="btn add-btn" data-type="users"><i class="fas fa-plus"></i> Add User</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Role</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredUsers.map(user => `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.loginId}</td>
                            <td>${user.role}</td>
                            <td>2023-01-15</td>
                            <td>Active</td>
                            <td>
                                <button class="action-btn edit-btn" data-type="users" data-id="${user.id}"><i class="fas fa-edit"></i> Edit</button>
                                <button class="action-btn delete delete-btn" data-type="users" data-id="${user.id}"><i class="fas fa-trash"></i> Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderEnrollments() {
    // Filter enrollments based on search query
    let filteredEnrollments = state.enrollments;
    if (state.searchQuery) {
        filteredEnrollments = state.enrollments.filter(enrollment => {
            const student = state.users.find(u => u.id === enrollment.studentId);
            const course = state.courses.find(c => c.id === enrollment.courseId);
            return (
                student.name.toLowerCase().includes(state.searchQuery) ||
                course.title.toLowerCase().includes(state.searchQuery)
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
                        <th>Student</th>
                        <th>Course</th>
                        <th>Enrollment Date</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredEnrollments.map(enrollment => {
                        const student = state.users.find(u => u.id === enrollment.studentId);
                        const course = state.courses.find(c => c.id === enrollment.courseId);
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
