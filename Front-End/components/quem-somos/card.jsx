import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

export default function CardComponent({ Icon, Nome, Role, Github, Linkedin }) {  
  return (
    <div className="flex gap-4">
      <Image src={Icon} className="rounded-full w-32 h-32 border dark:border-white border-slate-800" alt={Nome} />
      <div className="flex flex-col">
        <p className="text-gray-700 font-semibold sm:text-lg dark:text-white">{Nome}</p>
        <p className="text-blue-500">{Role}</p>
        <div className="flex mt-auto gap-4">
          <a href={Github} target="_blank">
            <AiFillGithub fill={"gray"} className="w-5 h-5" />
          </a>

          <a href={Linkedin} target="_blank">
            <BsLinkedin fill={"gray"} className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
