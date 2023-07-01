import dynamic from "next/dynamic";

import DanielRibeiro from "../assets/images/integrantes/daniel.png";
import EduardaRibas from "../assets/images/integrantes/eduarda-ribas.png";
import JoaoVitor from "../assets/images/integrantes/joao-vitor.png";
import MatheusVieira from "../assets/images/integrantes/matheus-vieira.png";
import PauloVitor from "../assets/images/integrantes/paulo-vitor.png";
import GabrielPinheiro from "../assets/images/integrantes/gabriel-pinheiro.png";
import RomuloBrito from "../assets/images/integrantes/romulo-brito.png"

const CardComponent = dynamic(() => import("@/components/quem-somos/card"), {
  ssr: false,
});
const BackgroundComponent = dynamic(() => import("@/components/background"), {
  ssr: false,
});

// Arrays com todos os membros do projeto
const TeamMembers = [
  {
    Nome: "Daniel Ribeiro",
    Role: "Banco de dados",
    Icon: DanielRibeiro,
    Github: "https://github.com/favelatec",
    Linkedin: "https://www.linkedin.com/in/daniel-ribeiro-b1b015263",
  },
  {
    Nome: "Eduarda Ribas",
    Role: "Desenvolvimento Web Front-End",
    Icon: EduardaRibas,
    Github: "https://github.com/dudaribas",
    Linkedin: "https://www.linkedin.com/in/eduarda-ribas",
  },
  {
    Nome: "Gabriel Pinheiro",
    Role: "Desenvolvimento Web Back-End",
    Icon: GabrielPinheiro,
    Github: "https://github.com/Gabriel1Pinheiro",
    Linkedin: "https://www.linkedin.com/in/gabriel-pinheiro-4b7472265/",
  },
  {
    Nome: "João Vitor",
    Role: "Banco de dados",
    Icon: JoaoVitor,
    Github: "https://github.com/Joaomaciel03",
    Linkedin: "https://www.linkedin.com/in/joaovitormaciel",
  },
  {
    Nome: "Matheus Vieira",
    Role: "Desenvolvimento Web Fullstack",
    Icon: MatheusVieira,
    Github: "https://github.com/MatheusVSN",
    Linkedin: "https://www.linkedin.com/in/matheus-vieira-bb1a19267/",
  },
  {
    Nome: "Paulo Vitor",
    Role: "Desenvolvimento Web Back-End",
    Icon: PauloVitor,
    Github: "https://github.com/PauloVLSecDev",
    Linkedin: "https://www.linkedin.com/in/paulo-vitor-meira-170121266/",
  },
  {
    Nome: "Rômulo Brito",
    Role: "Financeiro",
    Icon: RomuloBrito,
    Github: "https://github.com/romulobrp",
    Linkedin: "https://www.linkedin.com/in/r%C3%B4mulo-brito-491a54208/",
  },
];

export default function QuemSomos() {
  return (
    <>
      <BackgroundComponent className="min-h-screen grid place-content-center">
        <div className="flex flex-col p-4">

          {/* Quem somos */}
          <h2 className="font-bold text-3xl">Quem somos?</h2>
          <p className="max-w-sm sm:max-w-3xl lg:max-w-6xl">
            Somos uma equipe apaixonada de desenvolvedores que combinam
            tecnologia e conhecimento jurídico para criar uma plataforma
            inovadora. Nosso objetivo é tornar o acesso à justiça mais fácil e
            acessível para todos, conectando as pessoas a advogados experientes
            e oferecendo suporte da comunidade.
          </p>

          {/* Todos os membros do projeto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-12 mb-40 gap-8">
            {TeamMembers.map((member) => {
              return <CardComponent key={member.Nome} {...member} />;
            })}
          </div>
        </div>
      </BackgroundComponent>
    </>
  );
}
