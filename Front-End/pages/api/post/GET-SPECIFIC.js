export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Metodo não permitido" });
    return
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/post/${req.body.id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
    }
  );

  const responseBody = await response.json()
  res.status(200).json({ data: responseBody });
}
