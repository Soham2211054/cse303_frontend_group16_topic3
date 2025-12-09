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
