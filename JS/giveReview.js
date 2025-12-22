fetch("../api/api.php?action=giveReview")
  .then(res => res.json())
  .then(data => {

    state.reviews = data.map(r => ({
      topic: r.ReviewTopic,
      rating: r.Rating ?? "N/A",
      comment: r.Comment ?? "",
      date: r.ReviewDate ?? "-"
    }));

    renderCurrentPage();
  })
  .catch(err => {
    console.error("Give Review fetch error:", err);
  });
