import Link from "next/link";
import dynamic from "next/dynamic";

const BackgroundComponent = dynamic(() => import("../components/background"), {
  ssr: false,
});

export default function Page404() {
  // Quando o usuário tenta acessar uma página que não existe
  return (
    <>
      <BackgroundComponent className="min-h-screen grid place-content-center gap-2.5 text-center p-4">
        <h2 className="text-8xl font-bold">404</h2>
        <p className="font-semibold text-xl">
          Oops! Essa pagina não foi encontrada
        </p>
        <p className="text-lg">
          Talvez a página que você estava procurando não existe ou foi deletada
        </p>
        <Link
          className="border border-blue-500 p-2 rounded-lg w-[200px] place-self-center"
          href="/"
        >
          Voltar à pagina inicial
        </Link>
      </BackgroundComponent>
    </>
  );
}
