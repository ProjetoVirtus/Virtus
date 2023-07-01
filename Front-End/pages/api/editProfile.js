import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
    // Usaremos o método "PUT" para atualizar a informação
    if (req.method !== "PUT") {
        res.status(405).json({ message: "Metodo não permitido" });
        return;
    }

    // Verifica se existe uma sessão
    const user = await getToken({req})

    if (!user) {
        res.status(401).json({message: "Operação não autorizada"})
        return
    }

    // Envia a mensagem para o back-end com as informações editadas pelo usuário
    const response = await fetch(`${process.env.BACKEND_URL}/users/edit/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({
            ["firstName"]: req.body.firstName, 
            ["lastName"]: req.body.lastName,
        }),
        headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
    })

    // Resposta do back-end
    const responseBody = await response.json();

    if (response.status !== 200) {
        const errorMessage = responseBody.message || "Um erro desconhecido aconteceu, tente novamente mais tarde";
        res.status(responseBody.status).json({ message: errorMessage });
        return;
    }

    res.status(200).json({ message: "Perfil atualizado com sucesso" });
}