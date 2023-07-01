import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Metodo não permitido" });
    return
  }

  let { page = 1, caseId, title = "" } = req.query;
  let currentPage = (page - 1).toString();
  currentPage = isNaN(currentPage) ? 0 : currentPage
  let currentTitle = title !== "undefined" ? title : ""

  const user = await getToken({req})
  let cases = caseId.split(",").map(Number)

  if (!user?.isProfessional) {
    cases = []
  }
  if (cases[0] === 0) {
    cases = []
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/post?page=${currentPage}&search=${currentTitle}&cases=${cases}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
    }
  );

  const responseBody = await response.json();
  res
    .status(200)
    .json({
      data: responseBody.content,
      totalPages: responseBody.totalPages,
      currentPage: responseBody.number + 1,
      empty: responseBody.empty,
    });
}
