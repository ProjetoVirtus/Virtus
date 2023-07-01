import Image from "next/image";

import VirtusBackgroundImage from "../assets/images/virtus-background.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import AlertComponent from "@/components/login/error";
import SpinningProgressCircle from "@/components/svg/spinning-progress-circle";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]"

function ErrorComponent(props) {
  return <span className="text-xs text-red-500" {...props} />;
}

export default function LoginPage() {
  const [errorState, setErrorState] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const router = useRouter()

  async function onSubmit(data) {
    setLoading(true);

    signIn("credentials", { ...data, redirect: false }).then(
      ({ ok, error }) => {
        if (ok) {
          router.push("/");
        } else {
          setErrorState("Email ou senha estão incorretos");
          setLoading(false);
        }
      }
    );
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
              Inicie sua sessão aqui!
            </h1>

            <p className="my-4 text-gray-500 dark:text-gray-400">
              Não possui uma conta?{" "}
              <Link href="/signup" className="text-blue-500">
                Crie sua conta aqui
              </Link>
            </p>

            <AlertComponent visible={errorState} message={errorState} />

            <form
              className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
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

              <button
                disabled={loading}
                className="flex gap-2 w-full transform items-center justify-between rounded-lg bg-blue-500 px-6 py-3 text-sm capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Login</span>
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
