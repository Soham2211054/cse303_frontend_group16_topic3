fetch("../api/api.php?action=certificates")
  .then(res => res.json())
  .then(data => {

    state.certificates = data.map(c => ({
      course: c.Course,
      completionDate: c.IssueDate ?? "-",
      certificateId: c.CertificateID
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("Certificates fetch error:", err);
  });
