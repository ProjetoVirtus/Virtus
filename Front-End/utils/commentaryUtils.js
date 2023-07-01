export async function markAsSolution(commentaryId, postId) {
  const response = await fetch("/api/solution/PUT", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      commentaryId: commentaryId,
    }),
  });


  return response.status === 200
}

export async function removeSolution(postId) {
  const response = await fetch("/api/solution/DELETE/" + postId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response.status === 204
}

export async function createCommentary(postId, content) {
  const response = await fetch("/api/commentary/POST", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      content,
    }),
  });

  return response.status === 201;
}

export async function editCommentary(postId, commentaryId, content) {
  const response = await fetch("/api/commentary/PUT", {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      postId,
      commentaryId,
      content
    })
  })


  return response.status === 200
}