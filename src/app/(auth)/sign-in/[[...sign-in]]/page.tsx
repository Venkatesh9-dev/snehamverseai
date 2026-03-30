import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full">
      <SignIn
        appearance={{
          baseTheme: undefined,
          elements: {
            card: "bg-zinc-900 text-white shadow-2xl rounded-2xl border border-white/10",
            headerTitle: "text-white text-xl font-semibold",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton:
              "bg-zinc-800 border border-white/10 text-white hover:bg-zinc-700",
            formButtonPrimary:
              "bg-cyan-500 hover:bg-cyan-600 text-black font-semibold",
            formFieldInput:
              "bg-zinc-800 border border-white/10 text-white",
            footerActionLink:
              "text-cyan-400 hover:text-cyan-300",
          },
        }}
      />
    </div>
  );
}