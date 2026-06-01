const HexagonPercentageItem = ({
  value,
  tierLabel,
}: {
  value: number;
  tierLabel?: string;
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="relative w-26.5 h-26.5 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <polygon
            points="50,4 93,27 93,73 50,96 7,73 7,27"
            fill="#009F6A"
            stroke="#009F6A"
            strokeWidth="9"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative text-white font-bold text-3xl">{value}%</span>
      </div>
      <p className="text-[#008458] font-semibold text-lg">
        {tierLabel ?? "Job Ready!"}
      </p>
    </div>
  );
};

export default HexagonPercentageItem;
