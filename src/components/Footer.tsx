export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-white text-xl font-bold tracking-wide">
          SNEHAMVERSE PRIVATE LIMITED
        </h2>

        <p className="text-gray-400 mt-3">
          Empowering students, institutions, and professionals with
          AI literacy, GenAI education, and intelligent technology solutions.
        </p>

        <div className="mt-5 flex justify-center gap-6 text-sm text-gray-400">

          <span>
            SnehAmverseAI
          </span>

          <span>
            AI Workshops
          </span>

          <span>
            GenAI Education
          </span>

        </div>

        <p className="text-gray-600 text-xs mt-8">
          © 2026 SNEHAMVERSE PRIVATE LIMITED. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}