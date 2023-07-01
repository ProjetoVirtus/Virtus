import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuração do nextAuth
export default NextAuth({ 
  // Provedores
  providers: [
    // Provedor de credenciais, email e senha
    CredentialsProvider({
      name: "credentials",
      authorize: async (credentials) => {
        // Comunicação com o back-end para verificar o login
        const response = await fetch(process.env.BACKEND_URL + "/auth/signin", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
        });
        // Se a resposta não for 200, ou o usuário errou sua credencial ou deu algo de errado no servidor
        if (response.status !== 200) {
          return null;
        }

        // Espera pelo usuário
        const user = await response.json();

        // Retorna o usuáro, para que possamos usar algumas informações no visual
        return user
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // Primeira vez que o jwt callback é executado, o objeto do usuário é disponivel
      if (user) {
        token = {...user}
      }

      return token;
    },
   session: async function ({ session, token }) {
    // Método para ver se o perfil do usuário 
     const userInformation = await fetch(process.env.BACKEND_URL + "/users/" + token.id, {
       method: "GET",
       headers: {"X-API-KEY": process.env.BACKEND_KEY}
     });
     const updatedToken = await userInformation.json()

     if (token) {
      // Atualiza as informações do usuário na sessão
      // Desculpa pela repetição :(
       session.user = {
         id: updatedToken.id || token.id,
         email: updatedToken.email || token.email,
         firstName: updatedToken.firstName || token.firstName,
         lastName: updatedToken.lastName || token.lastName,
         professional: updatedToken.professional || token.professional,
         aobcode: updatedToken.aobcode || token.aobcode,
         atuationArea: updatedToken.atuationArea || token.atuationArea,
         expiresIn: updatedToken.expiresIn || token.expiresIn,
         sessionRecord: updatedToken.sessionRecord || token.sessionRecord,
       };
     }

     return session;
   },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  pages: {
    signIn: "/login",
  },
});
