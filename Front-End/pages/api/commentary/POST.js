import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Método não permitido" });
    return
  }

  const user = await getToken({ req });

  if (!user) {
    res.status(401).json({ message: "Operação não autorizada" });
    return
  }

  const postId = req.body.postId;
  const content = req.body.content;

  const response = await fetch(
    `${process.env.BACKEND_URL}/comment/${postId}/${user.id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json","X-API-KEY": process.env.BACKEND_KEY },
      body: JSON.stringify({
        content,
      }),
    }
  );

  if (response.status !== 201) {
    res.status(response.status).json({ message: response.message });
    return
  }

  res.status(201).json({ message: "Comentário publicado com sucesso" });
}
