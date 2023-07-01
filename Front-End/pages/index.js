import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const BackgroundComponent = dynamic(() => import("../components/background"), {
  ssr: false,
});

const FeatureComponent = dynamic(
  () => import("../components/index/feature-component"),
  {
    ssr: false,
  }
);
const ServicesComponent = dynamic(
  () => import("../components/index/service-component"),
  {
    ssr: false,
  }
);

import { BiSearch } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { FaSignLanguage } from "react-icons/fa";
import { FaExpandAlt } from "react-icons/fa";

import Questions from "../assets/images/questions.svg";
import Services from "../assets/images/services.svg";
import SearchIconSVG from "@/components/svg/SearchIconSVG";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

// Lista de funcionalidades da plataforma
const Features = [
  {
    Icon: BsCheckLg,
    Name: "Facilidade de uso",
    Description:
      "Nossa plataforma utiliza uma linguagem simples e direta, facilitando o acesso a orientações legais e a participação em discussões.",
  },
  {
    Icon: FaComments,
    Name: "Conexão com a comunidade e especialistas do direito",
    Description:
      "Os usuários podem se conectar com outros usuários que estão passando por situações semelhantes às suas e com profissionais do direito que podem fornecer orientação jurídica personalizada",
  },
  {
    Icon: FaSignLanguage,
    Name: "Acessibilidade",
    Description:
      "Nossa plataforma foi projetada para tornar o acesso à justiça mais fácil e acessível a todos, permitindo que pessoas com diferentes perfis e recursos possam encontrar respostas para seus questionamentos legais de forma simples e descomplicada",
  },
  {
    Icon: FaExpandAlt,
    Name: "Flexibilidade",
    Description:
      "Nossa plataforma permite que os usuários acessem as sugestões jurídicas e a comunidade a qualquer hora e em qualquer lugar, por meio de computadores, smartphones ou tablets",
  },
];

// Lista de serviços da plataforma
const ServicesList = [
  {
    Icon: Services,
    Name: "Serviços",
    Description:
      "Conectamos você a advogados especializados e suporte da comunidade para ajudar com suas necessidades jurídicas",
    Path: "/servicos",
  },
  {
    Icon: Questions,
    Name: "Discussões",
    Description:
      "Junte-se à nossa comunidade para obter suporte e orientação em questões jurídicas",
    Path: "/discussoes",
  },
];

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter()

  function onSubmit(data) {
    router.push(`/discussoes?page=1&title=${data.search}`)
  }

  return (
    <>
      <BackgroundComponent className="grid min-h-screen place-content-center overflow-x-hidden pt-8">
        <div className="flex w-screen gap-16 px-5 max-lg:flex-col max-lg:items-center md:px-16 lg:justify-between">
          <div className="grid place-content-start">
            {/* VIRTUS!!! */}
            <h1 className="text-7xl font-bold text-blue-500">VIRTUS</h1>
            <h2 className="max-w-lg text-xl">
              Conecte-se a usuários a profissionais do direito para encontrar
              soluções para problemas legais. Informando a sua situação, você
              recebe sugestões jurídicas personalizadas.
            </h2>

            {/* Caixa de pesquisar */}
            <div className="relative mt-2 w-full max-w-lg place-self-center">
              <SearchIconSVG className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-400" />
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <input
              {...register("search")}
                type="text"
                placeholder="Pesquise algo aqui.."
                className="w-full rounded-md border border-none bg-gray-100 dark:bg-slate-900 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:dark:bg-slate-800"
              />
              </form>
            </div>
          </div>

          {/* Lista de funcionalidades da plataforma */}
          <ul className="mb-52 grid list-none gap-5 gap-y-10 md:grid-cols-2">
            {Features.map((feature) => {
              return (
                <li key={uuidv4()}>
                  <FeatureComponent {...feature} />
                </li>
              );
            })}
          </ul>
        </div>
      </BackgroundComponent>

      {/* Lista de serviços da plataforma */}
      <div className="grid place-content-center justify-items-center gap-5 bg-blue-500 px-5 py-5 md:px-16 lg:grid-cols-2">
        {ServicesList.map((service) => {
          return <ServicesComponent key={uuidv4()} {...service} />;
        })}
      </div>
    </>
  );
}
