interface ValidatedBadgeProps {
  level: string;
}

const ValidatedBadge = ({ level }: ValidatedBadgeProps) => (
  <div
    className="flex items-center px-3 py-2 rounded-full"
    style={{ background: "#EBF6EE", border: "1px solid #34A853" }}
  >
    <span className="label" style={{ color: "#34A853" }}>
      Validated: {level}
    </span>
  </div>
);

export default ValidatedBadge;
