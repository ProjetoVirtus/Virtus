import { useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";

export default function SolutionComponent({
  id,
  createdAt,
  content,
  edited,
  user,
  onClick,
  postOwner
}) {
  const postDate = new Date(createdAt);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = postDate.toLocaleDateString("pt-BR", options);

  const { data } = useSession();

  return (
    <div className="rounded-md border border-green-500 md:w-[700px]">
      <div>
        <div className="flex items-center gap-2 p-4">
          <AiOutlineUser className="rounded-full border border-green-500 p-2" size={60} />
          <p className="font-bold">{user.firstName || "Usuário sem nome"}</p>
          <p className="ml-auto">{formattedDate}</p>
        </div>
      </div>
      <div className="grid border-t border-green-500">
        <div className="p-4">
          <p className="font-bold">Comentário</p>
          <h1 className="text-content">{content}</h1>
        </div>
      </div>
      {postOwner.id === data?.user?.id && (
        <div className="flex border-t border-green-500 p-4">
          <button onClick={() => onClick()} className="rounded-md bg-red-500 px-3 py-2 text-white">
            Remover Solução
          </button>
        </div>
      )}
    </div>
  );
}
