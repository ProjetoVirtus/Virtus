export default function SubmitButton({ Text }) {
  return (
    <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
      {Text || "Acessar"}
    </button>
  );
}
