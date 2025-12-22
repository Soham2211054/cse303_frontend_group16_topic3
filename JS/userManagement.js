fetch("../api/api.php?action=userManagement")
  .then(res => res.json())
  .then(data => {

    state.users = data.map(u => ({
      name: u.Name,
      loginId: u.LoginID,
      role: u.Role,
      registrationDate: u.RegistrationDate
    }));

    renderCurrentPage();
  })
  .catch(err => console.error("User Management Error:", err));
