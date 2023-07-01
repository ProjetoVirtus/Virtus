export default function ServiceOptionComponent({
  Icon,
  Title,
  onClick,
  Active,
}) {
  return (
    <button
    type="button"
      onClick={() => onClick()}
      className={`flex cursor-pointer flex-col items-center rounded-md p-5 transition ${
        Active ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-slate-950"
      }`}
    >
      <Icon
        className={`h-[40px] w-[40px] ${
          Active ? "fill-slate-100" : "fill-blue-500"
        }`}
      />
      <p className="text-base font-bold">{Title}</p>
    </button>
  );
}
