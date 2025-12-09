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
