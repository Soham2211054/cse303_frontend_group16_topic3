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
