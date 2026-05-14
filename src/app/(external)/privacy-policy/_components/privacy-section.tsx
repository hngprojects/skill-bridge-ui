type PrivacySectionProps = {
  id: string;
  title: string;
  description: string;
  items?: string[];
};

export function PrivacySection({
  id,
  title,
  description,
  items,
}: PrivacySectionProps) {
  return (
    <section id={id}>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">{title}</h2>

      <p className="mb-4 text-sm leading-7 text-muted-foreground">
        {description}
      </p>

      {items && (
        <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
          {items.map((item) => (
            <li key={item}>&bull; {item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
