type Props = {
  title: string;
  info: string | string[];
};
const InfoDisplay = ({ title, info }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-black font-semibold text-lg">{title}</h3>
      {Array.isArray(info) ? (
        <ul className="flex flex-row flex-wrap gap-y-3 gap-x-2">
          {info.map((data, index) => (
            <li
              className="py-2.5 bg-white border border-[#D9D9D9] rounded-lg text-black text-base px-6 text-center"
              key={data + index}
            >
              {data}
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-2.5 bg-white w-full border border-[#D9D9D9] rounded-lg text-black text-base px-6">
          {info}
        </p>
      )}
    </div>
  );
};

export default InfoDisplay;
