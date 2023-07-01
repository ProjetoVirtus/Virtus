export function paginate(page, totalPages) {
    page = parseInt(page);
  totalPages = parseInt(totalPages);

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (page === 1 || page === 2) {
    return [1, 2, 3, "dots", totalPages];
  }
  if (page === 3) {
    return [1, 2, page, page + 1, "dots", totalPages];
  }
  if (page === totalPages - 2) {
    return [1, "dots", page - 1, page, page + 1, totalPages];
  }
  if (page === totalPages - 1) {
    return [1, "dots", page - 1, page, totalPages];
  }
  if (page === totalPages) {
    return [
      1,
      "dots",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  if (page <= 3 || page >= totalPages - 2) {
    console.log("h");
    return [1, "dots", page - 1, page, page + 1, "...", totalPages];
  }

  return [1, "dots", page - 1, page, page + 1, "dots", totalPages];
}