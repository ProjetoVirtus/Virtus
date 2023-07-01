import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Método não permitido" });
    return;
  }

  const user = await getToken({ req });

  if (!user) {
    res.status(401).json({ message: "Operação não autorizada" });
    return;
  }

  const { postId } = req.query;

  const response = await fetch(
    `${process.env.BACKEND_URL}/post/solution/${user.id}/${postId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
    }
  );

  if (response.status !== 204) {
    res.status(response.status).json({ message: response.message });
    return;
  }

  res.status(204).json({ message: "Solução removida com sucesso" });
}
