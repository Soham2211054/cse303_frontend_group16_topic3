fetch("../api/api.php?action=viewReports")
  .then(res => res.json())
  .then(data => {

    state.reports = data.map(r => ({
      reportId: r.ReportID,
      aiReport: r.AIGeneratedReport ?? "N/A",
      manualReport: r.ManualReport ?? "N/A",
      completionRate: r.CourseCompletationRate ?? "N/A",
      engagement: r.Engagement ?? "N/A",
      popularity: r.CoursePopularity ?? "N/A"
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("View Report fetch error:", err);
  });

