const MoleculeStructure = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => {
  return (
    <svg className={className} style={style} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagonal ring - benzene-like */}
      <g opacity="0.6">
        {/* Bonds */}
        <line x1="200" y1="100" x2="270" y2="140" stroke="hsl(0 0% 30%)" strokeWidth="2" />
        <line x1="270" y1="140" x2="270" y2="220" stroke="hsl(0 0% 30%)" strokeWidth="2" />
        <line x1="270" y1="220" x2="200" y2="260" stroke="hsl(0 0% 30%)" strokeWidth="2" />
        <line x1="200" y1="260" x2="130" y2="220" stroke="hsl(0 0% 30%)" strokeWidth="2" />
        <line x1="130" y1="220" x2="130" y2="140" stroke="hsl(0 0% 30%)" strokeWidth="2" />
        <line x1="130" y1="140" x2="200" y2="100" stroke="hsl(0 0% 30%)" strokeWidth="2" />

        {/* Double bonds (inner) */}
        <line x1="200" y1="115" x2="258" y2="148" stroke="hsl(0 50% 35%)" strokeWidth="1.5" opacity="0.5" />
        <line x1="258" y1="212" x2="200" y2="245" stroke="hsl(0 50% 35%)" strokeWidth="1.5" opacity="0.5" />
        <line x1="142" y1="212" x2="142" y2="148" stroke="hsl(0 50% 35%)" strokeWidth="1.5" opacity="0.5" />

        {/* Side chains */}
        <line x1="200" y1="100" x2="200" y2="40" stroke="hsl(0 0% 25%)" strokeWidth="1.5" />
        <line x1="270" y1="140" x2="340" y2="110" stroke="hsl(0 0% 25%)" strokeWidth="1.5" />
        <line x1="270" y1="220" x2="340" y2="260" stroke="hsl(0 0% 25%)" strokeWidth="1.5" />
        <line x1="200" y1="260" x2="200" y2="330" stroke="hsl(0 0% 25%)" strokeWidth="1.5" />
        <line x1="130" y1="220" x2="60" y2="260" stroke="hsl(0 0% 25%)" strokeWidth="1.5" />
        <line x1="130" y1="140" x2="60" y2="100" stroke="hsl(0 0% 25%)" strokeWidth="1.5" />

        {/* Branch chains */}
        <line x1="340" y1="110" x2="380" y2="60" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <line x1="200" y1="330" x2="250" y2="370" stroke="hsl(0 0% 22%)" strokeWidth="1" />
        <line x1="60" y1="100" x2="30" y2="50" stroke="hsl(0 0% 22%)" strokeWidth="1" />
      </g>

      {/* Atom nodes - 3D spheres with radial gradients */}
      <defs>
        <radialGradient id="atomRed" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="hsl(0 72% 65%)" />
          <stop offset="60%" stopColor="hsl(0 72% 45%)" />
          <stop offset="100%" stopColor="hsl(0 72% 25%)" />
        </radialGradient>
        <radialGradient id="atomGrey" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="hsl(0 0% 50%)" />
          <stop offset="60%" stopColor="hsl(0 0% 30%)" />
          <stop offset="100%" stopColor="hsl(0 0% 15%)" />
        </radialGradient>
        <radialGradient id="atomDark" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="hsl(0 0% 40%)" />
          <stop offset="60%" stopColor="hsl(0 0% 22%)" />
          <stop offset="100%" stopColor="hsl(0 0% 10%)" />
        </radialGradient>
        <filter id="atomGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ring atoms */}
      <circle cx="200" cy="100" r="14" fill="url(#atomRed)" filter="url(#atomGlow)" />
      <circle cx="270" cy="140" r="12" fill="url(#atomGrey)" />
      <circle cx="270" cy="220" r="12" fill="url(#atomGrey)" />
      <circle cx="200" cy="260" r="14" fill="url(#atomRed)" filter="url(#atomGlow)" />
      <circle cx="130" cy="220" r="12" fill="url(#atomGrey)" />
      <circle cx="130" cy="140" r="12" fill="url(#atomGrey)" />

      {/* Side chain atoms */}
      <circle cx="200" cy="40" r="10" fill="url(#atomDark)" />
      <circle cx="340" cy="110" r="10" fill="url(#atomRed)" opacity="0.8" />
      <circle cx="340" cy="260" r="10" fill="url(#atomDark)" />
      <circle cx="200" cy="330" r="10" fill="url(#atomRed)" opacity="0.8" />
      <circle cx="60" cy="260" r="10" fill="url(#atomDark)" />
      <circle cx="60" cy="100" r="10" fill="url(#atomDark)" />

      {/* Terminal atoms */}
      <circle cx="380" cy="60" r="7" fill="url(#atomGrey)" opacity="0.6" />
      <circle cx="250" cy="370" r="7" fill="url(#atomGrey)" opacity="0.6" />
      <circle cx="30" cy="50" r="7" fill="url(#atomGrey)" opacity="0.6" />

      {/* Specular highlights on main atoms */}
      <circle cx="194" cy="94" r="4" fill="white" opacity="0.3" />
      <circle cx="194" cy="254" r="4" fill="white" opacity="0.3" />
      <circle cx="334" cy="104" r="3" fill="white" opacity="0.25" />
      <circle cx="194" cy="324" r="3" fill="white" opacity="0.25" />
    </svg>
  );
};

export default MoleculeStructure;
