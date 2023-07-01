import Link from "next/link";
import Image from "next/image";

export default function ServiceComponent({ Icon, Name, Description, Path }) {
  return (
    <div className="flex h-[250px]">
      <div className="max-w-[250px] min-w-[100px] bg-blue-50 dark:bg-slate-700 rounded-l-lg">
        <Image className="h-full w-full" src={Icon.src} alt={Name} width={250} height={250} />
      </div>
      <div className="justify-center gap-2 bg-blue-100 dark:bg-slate-800 h-full flex flex-col items-start p-8 rounded-r-lg max-w-xs">
        <h2 className="font-bold text-xl ">{Name}</h2>
        <p className="text-sm">{Description}</p>
        <Link className="text-sm mt-auto bg-blue-500 text-white px-9 py-2 rounded-full" href={Path}>Acessar</Link>
      </div>
    </div>
  );
}
