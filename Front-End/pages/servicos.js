import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { MdElderly, MdFamilyRestroom, MdOutlineMoreHoriz, MdWork } from "react-icons/md";
import { GrMore, GrUserWorker } from "react-icons/gr";
import ServiceOptionComponent from "@/components/servicos/ServiceOptionComponent";
import { HiShoppingCart } from "react-icons/hi";
import { useState } from "react";
import SubmitButton from "@/components/buttons/submit-button";
import AlertComponent from "@/components/servicos/AlertComponent";
import LoadingButton from "@/components/buttons/loading-button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

const BackgroundComponent = dynamic(() => import("@/components/background"), {
  ssr: false,
});

// Opções de serviços
const optionsContainer = [
  { id: 1, icon: MdFamilyRestroom, title: "Família" },
  { id: 2, icon: HiShoppingCart, title: "Consumidor" },
  { id: 3, icon: MdElderly, title: "Previdência" },
  { id: 4, icon: MdWork, title: "Trabalhista" },
  { id: 0, icon: MdOutlineMoreHoriz, title: "Outros" }
];

function ErrorComponent(props) {
  return <span className="text-xs text-red-500" {...props} />;
}

export default function Servicos() {
  const router = useRouter();
  // Indica se o usuário está com uma duvida ou requer um advogado
  const [caseOption, setCaseOption] = useState(null);
  // Tipo de questão, se relaciona com optionsContainer
  const [professionalNeeded, setProfessionalNeeded] = useState(false);
  // Estado de carregamento
  const [loadingState, setLoadingState] = useState(false);
  // Estado de rro
  const [errorState, setErrorState] = useState("");

  const { register, handleSubmit, formState, setError, clearErrors } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    setLoadingState(() => true);

    if (caseOption === null) {
      setError("caseId", {
        type: "required",
        message: "Você precisa escolher uma das opções"
      })

      setLoadingState(() => false)
      return
    }

    const finalForm = {
      ...data,
      caseId: caseOption,
      professionalNeeded,
    };


    const response = await fetch("/api/post/POST", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalForm),
    });

    if (response.status !== 201) {
      const errorMessage = response.statusText || "Houve um erro na hora de publicar, por favor tente novamente mais tarde";
      setErrorState(errorMessage);
      setLoadingState(() => false);
      return;
    }

    const responseBody = await response.json()

    router.push(`/discussoes/${responseBody.id}`)  }
  return (
    <>
      <BackgroundComponent className="grid min-h-screen place-content-center gap-10 pb-16">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-32 grid place-content-center gap-4"
          noValidate
        >
          <div className="grid gap-4 rounded-md bg-slate-50 p-4 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">Com oque podemos te ajudar?</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {/* Opções de serviços */}
              {optionsContainer.map((option) => {
                return (
                  <ServiceOptionComponent
                    key={option.title}
                    Icon={option.icon}
                    Title={option.title}
                    onClick={() =>
                      setCaseOption(() => {
                        clearErrors("caseId")
                        return option.id;
                      })
                    }
                    Active={caseOption === option.id}
                  />
                );
              })}
            </div>
            {errors.caseId && <ErrorComponent>{errors.caseId.message}</ErrorComponent>}
          </div>

          {/* Componente de erro */}
          <AlertComponent visible={errorState} message={errorState} />

          <div className="grid gap-4 rounded-md bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-base font-bold text-center">Tipo de dúvida</p>

            {/* Container que contém os checkboxes que indicam o tipo de dúvida do usuário */}
            <div className="flex justify-center gap-8">
              <div className="flex gap-1">
                <input
                  checked={!professionalNeeded}
                  onChange={() => setProfessionalNeeded(false)}
                  type="radio"
                  id="question"
                  className="form-radio border-gray-400 text-blue-500 focus:ring-blue-500 duration-150"
                ></input>
                <label htmlFor="question">Dúvida</label>
              </div>
              <div className="flex gap-1">
                <input
                  checked={professionalNeeded}
                  onChange={() => setProfessionalNeeded(true)}
                  type="radio"
                  id="professionalNeeded"
                  className="form-radio border-gray-400 text-blue-500 focus:ring-blue-500 duration-150"
                ></input>
                <label htmlFor="professionalNeeded">
                  Solicitar advogado
                </label>
              </div>
            </div>

            {/* Área de texto, o usuário vai descrever a sua situação aqui */}
            <div>
              <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                Título:
              </label>
              <input
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                placeholder="Digite o título aqui"
                {...register("title", {
                  required: "Por favor, não deixe esse campo vazio",
                })}
              ></input>
              {errors.title && (
                <ErrorComponent>{errors.title.message}</ErrorComponent>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                Descrição:
              </label>
              <textarea
                placeholder="Descreva a sua situação aqui"
                className="mt-2 block min-h-[250px] w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                {...register("description", {
                  required: "Por favor, não deixe esse campo vazio",
                })}
              ></textarea>
              {errors.description && (
                <ErrorComponent>{errors.description.message}</ErrorComponent>
              )}
            </div>

            {/* Botão de enviar */}
            {loadingState ? (
              <LoadingButton />
            ) : (
              <SubmitButton Text={"Realizar pergunta"} />
            )}
          </div>
        </form>
      </BackgroundComponent>
    </>
  );
}

// Checa no servidor se o usuário tem uma sessão
// Caso tenha o usuário será redirecionado para a página home
export async function getServerSideProps(context) {
  const session = !!(await getServerSession(context.req, context.res, authOptions))

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
