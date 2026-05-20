type Props = {
  title: string;
  info: string | string[];
};
const InfoDisplay = ({ title, info }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-black font-semibold text-lg">{title}</h3>
      <ul className="flex flex-row gap-x-2">
        {Array.isArray(info) ? (
          info.map((data) => (
            <li
              className="py-2.5 bg-white border border-[#D9D9D9] rounded-lg text-black text-base px-6 text-center"
              key={data}
            >
              {data}
            </li>
          ))
        ) : (
          <p className="py-2.5 bg-white border border-[#D9D9D9] rounded-lg text-black text-base px-6 text-center">
            {info}
          </p>
        )}
      </ul>
    </div>
  );
};

export default InfoDisplay;
