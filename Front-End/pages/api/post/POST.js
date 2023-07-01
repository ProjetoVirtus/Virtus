import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Metodo não permitido" });
    return;
  }

  const user = await getToken({ req });

  if (!user) {
    res.status(401).json({ message: "Operação não autorizada" });
    return
  }

  const response = await fetch(`${process.env.BACKEND_URL}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
    body: JSON.stringify({
      user_id: user.id,
      caseId: req.body.caseId,
      title: req.body.title,
      description: req.body.description,
      professionalNeeded: req.body.professionalNeeded,
    }),
  });
  
  if (response.status !== 201) {
    const errorMessage =
      response.statusText ||
      "Um erro desconhecido aconteceu, tente novamente mais tarde";
    res.status(response.status).json({ message: errorMessage });
    return
  }

  const responseBody = await response.json()

  res.status(201).json({ id: responseBody.id });
}
