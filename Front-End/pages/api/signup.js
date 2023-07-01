export default async function handler(req, res) {
  // Usaremos o método "POST" para o registro do usuário
  if (req.method !== "POST") {
    res.status(405).json({ message: "Metodo não permitido" });
    return;
  }
  // Não tem motivos de salvar o codigo OAB e area de atuação se o usuário não for um profissional
  if (!req.body.isProfessional) {
    req.body.OABCode = null
    req.body.actuationArea = null
  }

  // Comunicação com o back-end com o formulário que o usuário preencheu
  const response = await fetch(process.env.BACKEND_URL + "/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
    body: JSON.stringify({
        ...req.body
    }),
  });

  // Se algo der errado
  if (response.status !== 201) {
    const responseBody = await response.json();
    const errorMessage =
      responseBody.message ||
      "Um erro desconhecido aconteceu, tente novamente mais tarde";
    res.status(response.status).json({ message: errorMessage });
    return;
  }
  
  res.status(201).json({ message: "Conta criada com sucesso" });
}
