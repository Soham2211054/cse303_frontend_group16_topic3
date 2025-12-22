fetch("../api/api.php?action=performanceReport")
  .then(res => res.json())
  .then(data => {

    state.performanceReports = data.map(r => ({
      reportId: r.PerformenceReportID,
      insights: r.AIgeneratedInsights ?? "N/A",
      recommendations: r.LearningRecommendations ?? "N/A",
      strengthsWeaknesses: r.StudentsStrengthAndWeakness ?? "N/A"
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("Performance Report fetch error:", err);
  });



