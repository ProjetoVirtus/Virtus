import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { BiMessageEdit } from "react-icons/bi";
import SpinningProgressCircle from "../svg/spinning-progress-circle";
import { editCommentary } from "@/utils/commentaryUtils";
import { useRouter } from "next/router";

function ErrorComponent(props) {
  return <span className="text-xs text-red-500" {...props} />;
}

export default function CommentaryComponent({
  id,
  createdAt,
  content,
  edited,
  user,
  onClick,
  postOwnerId,
  postId,
}) {
  const router = useRouter()
  const [editMessage, setEditedMessage] = useState("")
  const [editState, setEditState] = useState(false);
  const [loading, setLoading] = useState(false);
  const postDate = new Date(createdAt);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = postDate.toLocaleDateString("pt-BR", options);
  const { register, handleSubmit, formState, setError } = useForm();
  const { errors } = formState;

  const { data } = useSession();

  async function onSubmit(data) {
    setLoading(() => true)

    const sucess = await editCommentary(postId, id, data.content)
    if (!sucess) {
      setError("content", {
        type: "error",
        message: "Algo deu erro com a edição de comentário, por favor tente novamente mais tarde"
      })

      setLoading(() => false)
      return
    } 

    router.push(router.asPath, null, {shallow: true})
    setEditedMessage(() => data.content)
    setEditState(() => false)
    setLoading(() => false)
  }

  return (
    <div className="rounded-md border max-[350px]:w-[300px] md:w-[700px]">
      <div>
        <div className="flex items-center gap-2 p-4">
          <div className="h-[60px] w-[60px]">
            <AiOutlineUser className="rounded-full border p-2" size={60} />
          </div>
          <p className="truncate font-bold max-sm:max-w-[100px]">
            {user.firstName || "Usuário sem nome"}
          </p>
          <p className="ml-auto">{formattedDate}</p>
          {user.id === data?.user?.id && (
            <>
              <button
                className="h-6 w-6"
                onClick={() =>
                  setEditState((previous) => {
                    return !previous;
                  })
                }
              >
                <BiMessageEdit className="h-full w-full" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="grid border-t">
        <div className="p-4">
          <p className="font-bold">Comentário {(edited === true || editMessage) && "(editado)"}</p>
          {editState ? (
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <textarea
                  {...register("content", {
                    required: "Por favor, não deixe esse campo vazio"
                  })}
                  className="mt-2 block min-h-[125px] w-full resize-none rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
                {errors.content && <ErrorComponent>{errors.content.message}</ErrorComponent>}
              </div>
              <button
                disabled={loading}
                className="flex items-center gap-2 place-self-end rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
              >
                {loading && <SpinningProgressCircle />}
                Editar comentário
              </button>
            </form>
          ) : (
            <p className="text-content">{!editMessage ? content : editMessage}</p>
          )}
        </div>
      </div>
      {data?.user?.id === postOwnerId && (
        <div className="flex border-t p-4">
          <button
            onClick={() => onClick(id)}
            className="rounded-md bg-green-500 px-3 py-2 text-white"
          >
            Marcar como solução
          </button>
        </div>
      )}
    </div>
  );
}
