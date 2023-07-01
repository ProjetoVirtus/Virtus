import { CgShapeHalfCircle } from "react-icons/cg";
import SpinningProgressCircle from "../svg/spinning-progress-circle";

export default function LoadingButton() {
  return (
    <button
      disabled={true}
      className="bg-blue-500/50 text-white px-4 py-2 rounded inline-flex items-center justify-center"
    >
      <SpinningProgressCircle />
      <span className="ml-2">Carregando...</span>
    </button>
  );
}
