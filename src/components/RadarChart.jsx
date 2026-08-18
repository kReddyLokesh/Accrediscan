import React from 'react';

const CRITERIA_LABELS = [
  "Curricular",
  "Teaching-Learning",
  "Research",
  "Infrastructure",
  "Student Support",
  "Governance",
  "Values & Practices"
];

function getScoreNumeric(scoreStr) {
  if (!scoreStr) return 0;
  const match = scoreStr.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function RadarChart({ institutions = [] }) {
  if (!institutions || institutions.length === 0) return null;

  const size = 320;
  const center = size / 2;
  const radius = center - 50;
  const totalAxes = CRITERIA_LABELS.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Colors for overlayed institutions
  const colors = ['#1F4D3A', '#B8862E', '#0B2E3D'];

  // Concentric polygon grid points (for scores 1.0, 2.0, 3.0, 4.0)
  const gridLevels = [1.0, 2.0, 3.0, 4.0];

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 14,
      padding: 20,
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      textAlign: 'center'
    }}>
      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4 }}>
        NAAC 7-Criteria Score Radar Comparison
      </h4>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 16 }}>
        Visual score overlay mapped on 4.0 CGPA scale
      </div>

      <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background Grid Rings */}
          {gridLevels.map((lvl) => {
            const r = (lvl / 4.0) * radius;
            const points = CRITERIA_LABELS.map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');

            return (
              <g key={lvl}>
                <polygon
                  points={points}
                  fill="none"
                  stroke="rgba(11, 46, 61, 0.1)"
                  strokeWidth="1"
                  strokeDasharray={lvl === 4.0 ? 'none' : '3,3'}
                />
                <text
                  x={center + 4}
                  y={center - r + 10}
                  fontSize="9"
                  fill="#999"
                  fontWeight="600"
                >
                  {lvl.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Axes Lines and Labels */}
          {CRITERIA_LABELS.map((label, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);

            // Label positions
            const labelR = radius + 22;
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);

            return (
              <g key={i}>
                <line
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(11, 46, 61, 0.12)"
                  strokeWidth="1"
                />
                <text
                  x={lx}
                  y={ly}
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--color-navy)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Render Polygons for Institutions */}
          {institutions.map((inst, instIdx) => {
            const color = colors[instIdx % colors.length];

            const points = CRITERIA_LABELS.map((label, i) => {
              const foundCrit = inst.criteria?.find(c =>
                c.name.toLowerCase().includes(label.toLowerCase().split(' ')[0])
              );
              const scoreVal = foundCrit ? getScoreNumeric(foundCrit.score) : 3.0;
              const r = (scoreVal / 4.0) * radius;
              const angle = i * angleStep - Math.PI / 2;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return { x, y };
            });

            const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

            return (
              <g key={inst.id || instIdx}>
                <polygon
                  points={pointsString}
                  fill={color}
                  fillOpacity="0.2"
                  stroke={color}
                  strokeWidth="2.5"
                />
                {points.map((p, pIdx) => (
                  <circle
                    key={pIdx}
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginTop: 12 }}>
        {institutions.map((inst, i) => (
          <div key={inst.id || i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors[i % colors.length] }} />
            <span style={{ color: 'var(--color-navy)' }}>{inst.institution_name.split('(')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
