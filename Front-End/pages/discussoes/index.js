import PostListComponent from "@/components/discussoes/PostListComponent";
import SearchIconSVG from "@/components/svg/SearchIconSVG";
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const BackgroundComponent = dynamic(
  () => import("../../components/background"),
  {
    ssr: false,
  }
);
const filterOptions = [
  { id: 1, name: "Família" },
  { id: 2, name: "Consumidor" },
  { id: 3, name: "Previdência" },
  { id: 4, name: "Trabalhista" },
];

export default function Discussoes({ isProfessional }) {
  const [filter, setFilter] = useState([]);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  function onFilterChecked(id) {
    if (filter.includes(id)) return;
    setFilter((previous) => {
      return [...previous, id];
    });
  }

  function toRemoveFilter(id) {
    setFilter((previous) => {
      return previous.filter((value) => value !== id);
    });
  }

  function onSubmit(data) {
    router.query.title = data.search;
    router.push(router, null, { shallow: true });
  }

  return (
    <BackgroundComponent className="grid min-h-screen justify-center overflow-hidden">
      <div className="grid w-screen gap-8 p-4 max-sm:place-content-center">
        <div className="relative max-w-lg place-self-center max-sm:w-10/12 sm:w-full">
          <SearchIconSVG className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-400" />
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={router.query.title}
              type="text"
              placeholder="Pesquise algo aqui.."
              className="w-full rounded-md border border-none bg-gray-100 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white dark:bg-slate-900 focus:dark:bg-slate-800"
              {...register("search")}
            />
          </form>
        </div>

        {/* TODO: COLOCAR O FILTRO PARA O PROFISSIONAL E MOSTRAR BLOCOS INCENTIVANDO O USUARIO A CRIAR UMA CONTA CASO NÃO TENHA */}
        <div className="mb-36 grid w-full  gap-16 p-8">
          <div className="grid w-full gap-16">
            <div className="max-w-lg place-self-center bg-blue-500 text-white">
              <div className="flex gap-8 p-4 max-md:grid">
                <div className="p-4">
                  <div className="grid gap-4 text-white">
                    <p className="max-w-sm text-lg font-semibold">
                      Quer se juntar a uma dicussão?
                    </p>
                    <p className="max-w-xs">
                      Compartilhe a sua situação e encontre sugestões de
                      soluções criando uma nova publicação!
                    </p>
                    <Link
                      href="/servicos"
                      className="group mt-4 flex items-center gap-2"
                    >
                      Começar uma nova publicação{" "}
                      <BsArrowRight className="transition group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>

              {isProfessional == true && (
                <>
                  <div className="px-8">
                    <div className="border-t" />
                  </div>

                  <div className="grid justify-self-start p-4">
                    <p className="max-w-sm p-4 text-lg font-semibold">
                      Filtros
                    </p>
                    {filterOptions.map((option) => {
                      return (
                        <label
                          className="flex items-center gap-2 px-2"
                          key={option.id}
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox rounded-full border-gray-400 text-blue-500 focus:ring-blue-500 duration-150"
                            name={option.name}
                            value={option.id.toString()}
                            onChange={(e) => {
                              e.target.checked
                                ? onFilterChecked(e.target.value)
                                : toRemoveFilter(e.target.value);
                            }}
                          />
                          {option.name}
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <PostListComponent query={filter} />
          </div>
        </div>
      </div>
    </BackgroundComponent>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const user = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProfessional = user?.isProfessional ?? false;

  return {
    props: {
      isProfessional,
    },
  };
}
