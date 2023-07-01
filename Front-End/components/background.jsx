import BackgroundPattern from "../assets/images/background-pattern.png";

export default function BackgroundComponent(props) {
  return (
    <main
      style={{
        backgroundImage: `url(${BackgroundPattern.src})`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "bottom center",
      }}
      className={`dark:bg-slate-800 ${props.className}`}
    >
      {props.children}
    </main>
  );
}
