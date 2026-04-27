export default function Card({ children }) {
  return (
    <div className="relative group rounded-xl p-[1px] bg-gradient-to-r from-green-400/40 via-green-500/20 to-transparent">
      
      {/* Glow layer */}
      <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-green-500/20 rounded-xl"></div>

      {/* Glass card */}
      <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 transition duration-300 group-hover:scale-[1.03]">
        {children}
      </div>

    </div>
  );
}