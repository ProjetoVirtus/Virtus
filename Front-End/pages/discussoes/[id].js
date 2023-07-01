import BackgroundComponent from "@/components/background";
import SpinningProgressCircle from "@/components/svg/spinning-progress-circle";
import {
  markAsSolution,
  removeSolution,
  createCommentary,
} from "@/utils/commentaryUtils";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";

const CommentaryComponent = dynamic(
  () => import("../../components/discussoes/CommentaryComponent"),
  {
    ssr: false,
  }
);

const SolutionComponent = dynamic(
  () => import("../../components/discussoes/SolutionComponent"),
  {
    ssr: false,
  }
);

function ErrorComponent(props) {
  return <span className="text-xs text-red-500" {...props} />;
}

export default function SpecificPost({ specificPost }) {
  const [isClient, SetIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm();
  const { errors } = formState;

  const router = useRouter();
  const { data } = useSession();

  const postDate = new Date(specificPost.createdAt);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = postDate.toLocaleDateString("pt-BR", options);

  // Essa função evita o "hydration error" do Next
  useEffect(() => {
    SetIsClient(() => true);
  }, []);

  return (
    <BackgroundComponent className="grid justify-center gap-8 p-4 pb-32 dark:bg-slate-800">
      <h1 className="text-3xl font-bold">{specificPost.title}</h1>
      {/* Elemento da publicação mãe */}
      <div className="rounded-md border md:w-[700px]">
        <div>
          <div className="flex items-center gap-2 p-4">
          <AiOutlineUser className="rounded-full border p-2" size={60} />
          <p className="font-bold truncate max-md:max-w-[100px]">{specificPost.postOwner.firstName || "Usuário sem nome"}</p>
          <p className="ml-auto">{isClient && formattedDate}</p>
        </div>
        </div>
        <div className="grid border-t">
          <div className="p-4">
            <p className="font-bold">Descrição do caso</p>
            <h2 className="break-words text-content">{specificPost.description}</h2>
          </div>
        </div>
        <div className="flex border-t p-4">
          <div className="rounded-md bg-blue-500 px-3 py-2 text-white">
            {specificPost.caseData.caseName}
          </div>

          <div
            className={`ml-auto rounded-md border px-3 py-2 ${
              specificPost.solution !== null
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
          >
            {specificPost.solution !== null ? "Resolvido" : "Não Resolvido"}
          </div>
        </div>
      </div>

      {specificPost.solution !== null && (
        <>
          <h3 className="text-3xl font-bold text-green-500">Solução</h3>
          <SolutionComponent
            {...specificPost.solution}
            postOwner={specificPost.postOwner}
            onClick={async () => {
              await removeSolution(specificPost.id);
              router.reload();
            }}
          />
        </>
      )}

      <h3 className="text-3xl font-bold text-blue-500">Respostas</h3>

      <ul className="grid list-none gap-4">
        {specificPost.comments.map((comment) => {
          return (
            <li key={comment.id}>
              <CommentaryComponent
                {...comment}
                postOwnerId={specificPost.postOwner.id}
                postId={specificPost.id}
                onClick={async (commentaryId) => {
                  await markAsSolution(commentaryId, specificPost.id);
                  router.reload();
                }}
              />
            </li>
          );
        })}
      </ul>

      <div>
        <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
          Comentário:
        </label>
        {data ? (
          <>
            <form
              className="grid gap-2"
              noValidate
              onSubmit={handleSubmit(async (data) => {
                setLoading(() => true);
                const sucess = await createCommentary(
                  specificPost.id,
                  data.content
                );

                if (!sucess) {
                  setError("content", {
                    type: "error",
                    message:
                      "Algo de errado aconteceu com a publicação do comentário, por favor tente novamente mais tarde",
                  });

                  setLoading(() => false);
                  return;
                }

                router.reload();
              })}
            >
              <div>
                <textarea
                  placeholder="Descreva o seu comentário aqui"
                  className="mt-2 block min-h-[250px] w-full resize-none rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                  {...register("content", {
                    required: "Por favor, não deixe esse campo vazio",
                  })}
                ></textarea>
                {errors.content && (
                  <ErrorComponent>{errors.content.message}</ErrorComponent>
                )}
              </div>
              <button
                disabled={loading}
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-white"
              >
                {loading && <SpinningProgressCircle />}
                <span>Realizar comentário</span>
              </button>
            </form>
          </>
        ) : (
          <div className="mt-2 block min-h-[250px] w-full resize-none rounded-lg border border-gray-200 bg-slate-200 px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400">
            <p>Você precisa estar logado para realizar essa ação.</p>{" "}
            <Link className="text-blue-500 hover:underline" href="/login">
              Entre na sua sessão
            </Link>{" "}
            ou{" "}
            <Link className="text-blue-500 hover:underline" href="/signup">
              crie uma nova conta.
            </Link>
          </div>
        )}
      </div>
      <div className="mb-32" />
    </BackgroundComponent>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { req } = context;
  const response = await fetch(`${process.env.BACKEND_URL}/post/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "X-API-KEY": process.env.BACKEND_KEY },
  });

  if (response.status !== 200) {
    return {
      notFound: true,
    };
  }

  const specificPost = await response.json();
  return { props: { specificPost } };
}