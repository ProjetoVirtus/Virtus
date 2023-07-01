import { BiError } from "react-icons/bi";

export default function AlertComponent({ visible, message }) {
  return (
    <div
      className={`bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md ${
        !visible && "hidden"
      }`}
    >
      <div className="flex">
        <div className="py-1">
          <BiError className="fill-current h-6 w-6 text-red-500 mr-4" />
        </div>
        <div>
          <p className="font-bold">Não foi possível continuar</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
