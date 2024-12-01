export const CardData = ({ name, value, unit, className }) => {
  return (
    <div className="CardData">
      <div className="flex w-full py-3 items-center border-b-4 border-white justify-between">
        <div className="font-bold text-white text-2xl w-1/3">{name}</div>
        <div className={`font-mono text-5xl w-2/3 text-right ${className}`}>{value}</div>
        <div className="text-xl text-white">{unit}</div>
      </div>
    </div>
  );
};
