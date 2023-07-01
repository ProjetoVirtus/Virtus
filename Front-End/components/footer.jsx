import Link from "next/link";

const Options = [
  { Name: "Home", Path: "/" },
  { Name: "Quem Somos", Path: "/quem-somos" },
  { Name: "Serviços", Path: "/servicos" },
];

export default function Footer() {
  return (
    <footer className="p-10 bg-blue-500">
      <ul className="list-none border-t flex items-center justify-center gap-3 mb-6 pt-6">
        {Options.map((option) => {
          return (
            <li key={option.Name}>
              <Link
                className="font-semibold transition text-white hover:text-slate-800 text-sm"
                href={option.Path}
              >
                {option.Name}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="text-center text-xs text-white">© PROJETO DEMO DAY 2023</p>
    </footer>
  );
}
