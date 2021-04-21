import hex2rgba from "../helper/hex2rgba";

export default function Tag({ value, color, id, className }) {
  return (
    <div
      className={`rounded px-1.5 py-0.5 text-xs border select-none whitespace-nowrap ${
        className || ""
      }`}
      style={{
        backgroundColor: hex2rgba(color, 0.2),
        borderColor: hex2rgba(color, 1),
        color: hex2rgba(color, 1),
      }}
    >
      {value}
    </div>
  );
}
