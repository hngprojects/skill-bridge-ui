const VerifiedReportProgressIndicator = ({ value }: { value: number }) => {
  return (
    <div className="mt-6 pb-7">
      <div className="relative">
        <div className="relative h-2 w-full rounded-full bg-[#E5E7EB]">
          <div
            className="h-full rounded-full bg-[#10B981]"
            style={{ width: `${value}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10B981] border-2 border-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
            style={{ left: `${value}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span
              key={tick}
              className="h-1.5 w-px bg-[#10B981]"
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs font-medium tracking-wide text-[#1F2937]">
          <span>WEAK</span>
          <span>STRONG</span>
        </div>
        <div
          className="absolute top-7 -translate-x-1/2 rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 text-xs text-[#1F2937] shadow-sm"
          style={{ left: `${value}%` }}
        >
          {value}%
        </div>
      </div>
    </div>
  );
};

export default VerifiedReportProgressIndicator;
