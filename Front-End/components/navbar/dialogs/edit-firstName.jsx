import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function ErrorComponent(props) {
  return <span className="text-xs text-red-500" {...props} />;
}

export default function EditFirstNameComponent({ visible, callback }) {
  const { data, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formulario, setFormulario] = useState({
    firstName: "",
    lastName: "",
  });

  async function onSubmit(input) {
    const response = await fetch("/api/editProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (response.status !== 200) {
      return;
    }

    const updatedUser = {
      ...data.user,
      firstName: input.firstName || data.user.firstName,
      lastName: input.lastName || data.user.lastName,
    };

    update({ user: updatedUser });
    callback();
  }

  function changeProperty(name, value) {
    setFormulario((valorAnterior) => {
      return { ...valorAnterior, [name]: value };
    });
  }

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${!visible && "hidden"}`}
    >
      <div className="fixed inset-0 h-full w-full bg-black opacity-40"></div>
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg dark:bg-slate-800">
          <div className="flex justify-end">
            <button
              className="rounded-md p-2 text-gray-400"
              onClick={() => callback()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mx-auto max-w-sm space-y-3 py-3 text-center">
            <h2 className="text-lg font-medium">Editar perfil</h2>
            <p className="text-[15px]">
              Aplique as alterações do seu perfil aqui. Clique em salvar
              alterações após o termini da edição.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col place-content-start text-left gap-2">
                <div>
                  <input
                    type="text"
                    placeholder="Insira seu nome aqui"
                    className="mt-2 block place-self-strech w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    aria-label="Seu nome"
                    {...register("firstName", {
                      required: "Por favor, não deixe este campo vazio",
                    })}
                  />
                  {errors.firstName && (
                    <ErrorComponent>{errors.firstName.message}</ErrorComponent>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Insira seu sobrenome aqui"
                    className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 transition focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    aria-label="Seu sobrenome"
                    {...register("lastName", {
                      required: "Por favor, não deixe este campo vazio",
                    })}
                  />
                  {errors.lastName && (
                    <ErrorComponent>{errors.lastName.message}</ErrorComponent>
                  )}
                </div>
              </div>
              <button className="mt-3 block w-full rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-medium text-white">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
