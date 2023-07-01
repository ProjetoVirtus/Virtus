import { useState } from "react";
import VirtusLogoComponent from "./svg/VirtusLogo";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";
import EditFirstNameComponent from "./navbar/dialogs/edit-firstName";
import ThemeSelector from "./navbar/theme-selector";
import { BiSearch } from "react-icons/bi";
import OpenNavbarSVG from "./svg/OpenNavbarSVG";
import CloseNavbarSVG from "./svg/ClosenavbarSVG";

const ProfileDropDown = ({ dynamicClass, callback }) => {
  const [state, setState] = useState(false);
  const { data } = useSession();

  return (
    <div className={`relative ${dynamicClass}`}>
      <div className="flex items-center space-x-4">
        <button
          className={`h-10 w-10 rounded-full outline-none ${
            state ? "ring-2 ring-blue-500 ring-offset-2" : ""
          }`}
          onClick={() => setState(!state)}
        >
          <AiOutlineUser className="h-full w-full rounded-full" />
        </button>
        <div className="lg:hidden">
          <span className="block">{data?.user?.firstName || "Sem nome"}</span>
          <span className="block text-sm">{data?.user?.email}</span>
        </div>
      </div>
      <ul
        className={`right-0 top-12 mt-5 space-y-5 bg-white dark:bg-slate-800 lg:absolute lg:mt-0 lg:w-52 lg:space-y-0 lg:rounded-md lg:border lg:text-sm lg:shadow-md ${
          state ? "" : "lg:hidden"
        }`}
      >
        {data ? (
          <>
            <li>
              <button
                onClick={() => callback()}
                className="block w-full rounded-md text-left hover:text-blue-500 lg:p-2.5"
              >
                Editar usuário
              </button>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="block w-full rounded-md text-left hover:text-blue-500 lg:p-2.5"
              >
                Sair
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="block w-full rounded-md text-left lg:p-2.5"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="block w-full rounded-md text-left lg:p-2.5"
              >
                Cadastro
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default function NavbarComponent() {
  const [menuState, setMenuState] = useState(false);
  const [profileEditVisible, setProfileEditVisible] = useState(false);
  const { data } = useSession();

  const navigation = [
    { title: "Serviços", path: "/servicos" },
    { title: "Discussões", path: "/discussoes?page=1&title=" },
    { title: "Quem Somos", path: "/quem-somos" },
  ];
  return (
    <>
      <nav className="sticky top-0 w-full border-b bg-white dark:bg-slate-800 lg:bg-white/75 lg:backdrop-blur lg:dark:bg-slate-800/75 z-10">
        <div className="mx-auto flex max-w-screen-xl items-center space-x-8 px-4 py-3 md:px-8">
          <div className="flex-none lg:flex-initial">
            <Link href="/">
              <VirtusLogoComponent className="h-10" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div
              className={`absolute left-0 top-16 z-20 w-full border-b p-4 max-lg:bg-white max-lg:dark:bg-slate-800 lg:static lg:block lg:border-none ${
                menuState ? "" : "hidden"
              }`}
            >
              <ul className="mt-12 space-y-5 lg:mt-0 lg:flex lg:space-x-6 lg:space-y-0">
                {navigation.map((item, idx) => (
                  <li key={idx} className="hover:text-blue-500">
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
                {!data && (
                  <>
                    <li className="flex h-full w-full hover:text-blue-500 lg:hidden">
                      <Link href="/login">Login</Link>
                    </li>
                    <li className="flex h-full w-full hover:text-blue-500 lg:hidden">
                      <Link href="/signup" className="h-full w-full">
                        Cadastro
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {data && (
                <ProfileDropDown
                  dynamicClass="mt-5 border-t pt-5 lg:hidden"
                  callback={() => setProfileEditVisible(true)}
                />
              )}
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-6">
              <ThemeSelector />
              {data ? (
                <>
                  {/* <form className="flex items-center space-x-2 rounded-md border p-2">
                    <BiSearch className="h-5 w-5" />
                    <input
                      className="w-full appearance-none bg-transparent placeholder-gray-500 outline-none sm:w-auto"
                      type="text"
                      placeholder="Pesquise algo aqui..."
                    />
                  </form> */}

                  <ProfileDropDown
                    dynamicClass="hidden lg:block"
                    callback={() => setProfileEditVisible(true)}
                  />
                </>
              ) : (
                <div className="flex items-center gap-4 max-lg:hidden">
                  <Link href="/login" className="rounded-md px-3 py-2">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-blue-500 px-3 py-2 text-white"
                  >
                    Cadastro
                  </Link>
                </div>
              )}
              <button
                className="block text-gray-400 outline-none lg:hidden"
                onClick={() =>
                  setMenuState((previousState) => {
                    return !previousState;
                  })
                }
              >
                {menuState ? <CloseNavbarSVG /> : <OpenNavbarSVG />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <EditFirstNameComponent
        visible={profileEditVisible}
        callback={() => setProfileEditVisible(false)}
      />
    </>
  );
}
