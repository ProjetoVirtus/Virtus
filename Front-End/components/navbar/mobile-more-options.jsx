import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Options = [
  { Name: "Serviços", Path: "/servicos" },
  { Name: "Quem Somos", Path: "/quem-somos" },
];

export default function MobileNavigationOptions({ Visible, callback }) {
  const { data } = useSession();

  return (
    <div
      className={`z-[2] md:hidden w-screen px-8 transition-all fixed top-20 ${
        Visible ? "left-[50%] translate-x-[-50%]" : "left-[100%]"
      }`}
    >
      <ul className="list-none text-center bg-white dark:bg-slate-900 border rounded-md w-full">
        {Options.map((option) => {
          return (
            <li key={option.Name} className="p-4">
              <Link href={option.Path}>{option.Name}</Link>
            </li>
          );
        })}

        <li className={`p-4 border-t ${data && "hidden"}`}>
          <Link href="/login">Login</Link>
        </li>
        <li className={`p-4 ${data && "hidden"}`}>
          <Link href="/signup">Cadastre-se</Link>
        </li>
        <li className={`p-4 ${!data && "hidden"}`}>
          <button className="w-full h-full" onClick={() => callback()}>
            Editar Perfil
          </button>
        </li>
        <li
          className={`p-4 ${
            !data && "hidden"
          } flex items-center justify-center`}
        >
          Sessão:&nbsp;
          <b className="font-bold text-sm line-clamp-1">
            {data?.user?.firstName && data?.user?.lastName
              ? data.user.firstName + " " + data.user.lastName
              : data?.user?.email}
          </b>
        </li>
        <li className={`p-4 ${!data && "hidden"} border-t`}>
          <button onClick={() => signOut()}>Sair</button>
        </li>
      </ul>
    </div>
  );
}
