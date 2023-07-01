export default function FeatureComponent({ Icon, Name, Description }) {
  return (
    <div className="flex gap-x-4 max-w-sm">
      <div className="w-[50px] h-[50px] flex-none bg-blue-50 rounded-lg grid place-content-center">
        <Icon className="fill-blue-500" />
      </div>
      <div>
        <h4 className="font-bold text-xl">{Name}</h4>
        <p>{Description}</p>
      </div>
    </div>
  );
}
