const WaitlistErrorDisplay = ({ error }: { error: string | null }) => {
  if (!error) return null;
  return (
    <p
      role="alert"
      className="text-sm font-medium leading-4.5 tracking-[0.016em] text-red-600"
    >
      {error}
    </p>
  );
};

export default WaitlistErrorDisplay;
