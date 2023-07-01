import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export default function PostCardComponent({
  caseData,
  description,
  id,
  professionalNeeded,
  title,
  user,
  createdAt,
  solution,
}) {
  const postDate = new Date(createdAt);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = postDate.toLocaleDateString("pt-BR", options);

  return (
    <div className="before:g-slate-200 flex flex-col rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 max-[400px]:w-[300px]">
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 p-6">
        <div>
          <AiOutlineUser
            className="rounded-full border border-slate-200 dark:border-slate-700 p-2"
            size={60}
          />
        </div>
        <div className="md:flex w-full">
          <div className="grid place-content-start">
            <p className="truncate text-lg font-semibold">
              {user.firstName ?? "Usuário sem nome"}
            </p>
            <p className="truncate">{caseData.caseName}</p>
          </div>
          <p className="ml-auto">{formattedDate}</p>
        </div>
      </div>

      <div className="flex flex-col border-b border-slate-200 dark:border-slate-700 p-6">
        <p className="text-lg font-semibold">Sobre o caso</p>
        <p className="line-clamp-3 min-h-[80px]">{title}</p>
      </div>

      <div className="flex justify-between p-6 max-md:flex-col max-md:gap-2 max-md:text-center">
        <Link
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          href={`/discussoes/${id}`}
        >
          Acessar
        </Link>
        <div
          className={`rounded-md border px-4 py-2 ${
            solution
              ? "border-green-500 text-green-500"
              : "border-red-500 text-red-500"
          }`}
        >
          {solution ? "Resolvido" : "Não resolvido"}
        </div>
      </div>
    </div>
  );
}
