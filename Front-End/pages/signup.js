import Image from "next/image";

import VirtusBackgroundImage from "../assets/images/virtus-background.png";
import { FiUser } from "react-icons/fi";
import { GoLaw } from "react-icons/go";
import InputMask from "react-input-mask-next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import AlertComponent from "@/components/login/error";
import SpinningProgressCircle from "@/components/svg/spinning-progress-circle";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {getServerSession} from "next-auth"

import { authOptions  } from "./api/auth/[...nextauth]"

const GenreList = [
  { id: 1, label: "Masculino" },
  { id: 2, label: "Feminino" },
  { id: 3, label: "Outros" },
  { id: 0, label: "Prefiro não informar" },
];

const actuationAreaList = [
  { id: 1, text: "Família" },
  { id: 2, text: "Consumidor" },
  { id: 3, text: "Previdência" },
  { id: 4, text: "Trabalhista" },
  { id: 0, text: "Outros" },
];

function ErrorComponent(props) {
  return <span className="text-xs text-red-500" {...props} />;
}

export default function LoginPage() {
  const router = useRouter()
  const [estadoPessoa, setPessoaEstado] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    if (data.phoneNumber.includes("_")) {
      setError("phoneNumber", {
        type: "invalid",
        message: "Número de celular invalido",
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("password", {
        type: "invalid",
        message: "As senhas não se coincidem",
      });
      return;
    }
    setLoading(true);

    const finalForms = {
      ...data,
      isProfessional: estadoPessoa,
    };

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalForms),
    });

    // Se o status for diferente de 200, então algo de errado aconteceu
    if (response.status !== 201) {
      const responseBody = await response.json();
      const errorMessage =
        responseBody.message || "Houve um erro na hora de criar a conta";
      setErrorState(errorMessage);
      setLoading(false);
      return;
    }

    // Se for sucesso, chamamos a função do nextAuth para logar o usuário automaticamente
    // Caso não de sucesso, o erro irá alertar o usuário para ele logar na página de login
    signIn("credentials", {
      email: finalForms.email,
      password: finalForms.password,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push("/");
      } else {
        setErrorState(
          "Sua conta foi cadastrada com sucesso, porém não foi possível fazer o login automaticamente. Acesse a página de login e entre com sua conta."
        );
        setLoading(false);
      }
    });
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex min-h-screen justify-center">
        <Image
          src={VirtusBackgroundImage}
          className="object-cover max-lg:hidden lg:w-2/5"
          alt=""
        />

        <div className="mx-auto flex w-full max-w-3xl items-center p-8 lg:w-3/5 lg:px-12">
          <div className="w-full">
            <div className="mb-4 inline-flex">
              <Link
                href="/"
                className="flex w-full transform items-center gap-4 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <AiOutlineLeft className="h-5 w-5" />
                <span>Voltar a página inicial</span>
              </Link>
            </div>
            <h1 className="text-2xl font-semibold capitalize tracking-wider text-gray-800 dark:text-white">
              Inicie sua jornada aqui!
            </h1>

            <p className="my-4 text-gray-500 dark:text-gray-400">
              Vamos configurar a sua conta para que você possa ter acesso as
              discussões e serviços. Possui uma conta?{" "}
              <Link href="/login" className="text-blue-500">
                Inicie a sua sessão aqui
              </Link>
            </p>

            <AlertComponent visible={errorState} message={errorState} />

            <div className="mt-6">
              <h1 className="text-gray-500 dark:text-gray-300">
                Selecione qual a sua situação
              </h1>

              <div className="mt-3 md:-mx-2 md:flex md:items-center">
                <button
                  onClick={() =>
                    setPessoaEstado(() => {
                      return false;
                    })
                  }
                  className={`flex w-full justify-center rounded-lg border px-6 py-3 text-white transition focus:outline-none md:mx-2 md:w-auto ${
                    !estadoPessoa ? "bg-blue-500" : "border-blue-500"
                  }`}
                >
                  <FiUser
                    className={`h-6 w-6 ${estadoPessoa ? "text-blue-500" : ""}`}
                  />
                  <span
                    className={`mx-2 ${estadoPessoa ? "text-blue-500" : ""}`}
                  >
                    Cliente
                  </span>
                </button>

                <button
                  onClick={() =>
                    setPessoaEstado(() => {
                      return true;
                    })
                  }
                  className={`mt-4 flex w-full justify-center rounded-lg border px-6 py-3 text-white transition focus:outline-none dark:border-blue-400 dark:text-blue-400 md:mx-2 md:mt-0 md:w-auto ${
                    estadoPessoa ? "bg-blue-500" : "border-blue-500"
                  }`}
                >
                  <GoLaw
                    className={`h-6 w-6 ${
                      !estadoPessoa ? "text-blue-500" : ""
                    }`}
                  />
                  <span
                    className={`mx-2 ${!estadoPessoa ? "text-blue-500" : ""}`}
                  >
                    Profissional do direito
                  </span>
                </button>
              </div>
            </div>

            <form
              className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Número de celular:
                </label>
                <InputMask
                  {...register("phoneNumber", {
                    required: "Não deixe esse campo incompleto",
                  })}
                  type="tel"
                  placeholder="+55 (99) 99999-9999"
                  mask="+55 (99) 99999-9999"
                  autoComplete="tel-national"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
                {errors.phoneNumber && (
                  <ErrorComponent>{errors.phoneNumber.message}</ErrorComponent>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Endereço e-mail:
                </label>
                <input
                  {...register("email", {
                    required: "Não deixe esse campo incompleto",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Por favor, insira um endereço de e-mail válido",
                    },
                  })}
                  type="email"
                  placeholder="nome@exemplo.com"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
                {errors.email && (
                  <ErrorComponent>{errors.email.message}</ErrorComponent>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Senha:
                </label>
                <input
                  {...register("password", {
                    required: "Não deixe esse campo incompleto",
                  })}
                  type="password"
                  placeholder="Insira a sua senha"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
                {errors.password && (
                  <ErrorComponent>{errors.password.message}</ErrorComponent>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Confirme sua senha:
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Não deixe esse campo incompleto",
                  })}
                  type="password"
                  placeholder="Repita a sua senha"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                />
                {errors.password && (
                  <ErrorComponent>{errors.password.message}</ErrorComponent>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Selecione seu gênero:{" "}
                </label>
                <select
                  {...register("gender", {
                    required: "Não deixe esse campo incompleto",
                  })}
                  defaultValue=""
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                >
                  <option value="" disabled>
                    Selecionar Gênero
                  </option>
                  {GenreList.map((genero) => {
                    return (
                      <option key={genero.id} value={genero.id}>
                        {genero.label}
                      </option>
                    );
                  })}
                </select>
                {errors.gender && (
                  <ErrorComponent>{errors.gender.message}</ErrorComponent>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                  Data de nascimento:{" "}
                </label>
                <input
                  {...register("birth", {
                    required: "Não deixe esse campo incompleto",
                  })}
                  type="date"
                  className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                ></input>
                {errors.birth && (
                  <ErrorComponent>{errors.birth.message}</ErrorComponent>
                )}
              </div>

              {estadoPessoa && (
                <>
                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Selecione sua area de atuação:{" "}
                    </label>
                    <select
                      {...register("actuationArea", {
                        required: "Não deixe esse campo incompleto",
                      })}
                      defaultValue=""
                      className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    >
                      <option value="" disabled>
                        Selecionar Área
                      </option>
                      {actuationAreaList.map((area) => {
                        return (
                          <option key={area.id} value={area.text}>
                            {area.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Insira seu código OAB:
                    </label>
                    <input
                      {...register("OABCode", {
                        required: "Não deixe esse campo incompleto",
                        maxLength: 6,
                      })}
                      type="number"
                      placeholder="XXXXXX"
                      className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>
                </>
              )}

              <button
                disabled={loading}
                className="flex gap-2 w-full transform items-center justify-between rounded-lg bg-blue-500 px-6 py-3 text-sm capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Cadastrar</span>
                {loading ? (
                  <SpinningProgressCircle />
                ) : (
                  <AiOutlineRight className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = !!(await getServerSession(context.req, context.res, authOptions))

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
