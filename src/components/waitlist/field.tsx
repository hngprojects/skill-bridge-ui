const Field = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1.25">
      <label
        htmlFor={htmlFor}
        className="text-base font-semibold leading-5 tracking-[0.017em] text-[#151515]"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default Field;
