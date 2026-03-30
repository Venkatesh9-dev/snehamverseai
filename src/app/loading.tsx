// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0ms]" />
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:150ms]" />
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}