const DnaHelix = ({ className = "", reverse = false }: { className?: string; reverse?: boolean }) => {
  const nucleotides = Array.from({ length: 20 });
  const animDir = reverse ? "reverse" : "normal";

  return (
    <svg
      className={className}
      viewBox="0 0 120 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: `dna-float 8s ease-in-out infinite ${animDir}` }}
    >
      {nucleotides.map((_, i) => {
        const y = i * 40 + 20;
        const phase = (i / 20) * Math.PI * 4;
        const x1 = 60 + Math.sin(phase) * 40;
        const x2 = 60 - Math.sin(phase) * 40;
        const opacity = 0.15 + Math.abs(Math.sin(phase)) * 0.35;
        const connectorOpacity = Math.abs(Math.cos(phase)) > 0.3 ? opacity * 0.6 : 0;

        return (
          <g key={i}>
            {/* Backbone strands */}
            {i < nucleotides.length - 1 && (
              <>
                <line
                  x1={x1}
                  y1={y}
                  x2={60 + Math.sin(((i + 1) / 20) * Math.PI * 4) * 40}
                  y2={y + 40}
                  stroke="hsl(0 72% 50%)"
                  strokeWidth="1.5"
                  opacity={opacity * 0.7}
                />
                <line
                  x1={x2}
                  y1={y}
                  x2={60 - Math.sin(((i + 1) / 20) * Math.PI * 4) * 40}
                  y2={y + 40}
                  stroke="hsl(0 72% 50%)"
                  strokeWidth="1.5"
                  opacity={opacity * 0.7}
                />
              </>
            )}
            {/* Cross connectors */}
            {connectorOpacity > 0 && (
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="hsl(0 0% 50%)"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity={connectorOpacity}
              />
            )}
            {/* Nucleotide nodes */}
            <circle cx={x1} cy={y} r="3" fill="hsl(0 72% 50%)" opacity={opacity} />
            <circle cx={x2} cy={y} r="3" fill="hsl(0 50% 40%)" opacity={opacity} />
            {/* Glow on nodes */}
            <circle cx={x1} cy={y} r="6" fill="hsl(0 72% 50%)" opacity={opacity * 0.15} />
          </g>
        );
      })}
    </svg>
  );
};

export default DnaHelix;
