export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-10 flex max-w-2xl flex-col gap-3">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
    </div>
  );
}
