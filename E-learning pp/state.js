// Application state moved out of app.js to keep responsibilities separate
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
    enrollments: [], // Will be loaded from backend after login
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

// expose state on window for easier debugging and for other modules
window.state = state;
