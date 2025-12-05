import SurfaceCard from "./SurfaceCard";

type Props = {
  prompts: string[];
  onSelect?: (prompt: string) => void;
};

export default function PromptList({ prompts, onSelect }: Props) {
  return (
    <SurfaceCard title="Prompt Starters">
      <div className="grid gap-3 sm:grid-cols-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect?.(prompt)}
            className="w-full rounded-xl border border-[color:var(--color-border)]/80 bg-white/5 px-4 py-3 text-left text-sm text-white transition hover:border-cyan-400/60 hover:bg-white/10"
          >
            {prompt}
          </button>
        ))}
      </div>
    </SurfaceCard>
  );
}

