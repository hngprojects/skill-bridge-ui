type TocItem = {
  id: string;
  label: string;
};

type PrivacyTocProps = {
  items: TocItem[];
};

export function PrivacyToc({ items }: PrivacyTocProps) {
  return (
    <section className="border-b border-border/60">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <h2 className="mb-5 text-base font-semibold tracking-tight">
          Table of Content
        </h2>

        <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              &bull;&nbsp;&nbsp;{item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
