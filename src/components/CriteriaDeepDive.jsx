import React, { useState } from 'react';
import { ScrollText, ChevronDown, ChevronUp, CheckCircle2, Info } from 'lucide-react';

function getScoreNumeric(scoreStr) {
  if (!scoreStr) return 0;
  const match = scoreStr.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

function getScoreColor(val) {
  if (val >= 3.5) return '#1F4D3A'; // Emerald
  if (val >= 3.25) return '#2D6F54'; // Medium Emerald
  if (val >= 3.0) return '#B8862E'; // Gold
  if (val > 0) return '#8C2F2F'; // Crimson
  return '#6B6B66';
}

export default function CriteriaDeepDive({ criteria }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!criteria || criteria.length === 0) return null;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 14,
      padding: '24px',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      marginTop: 24
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ScrollText size={20} color="var(--color-navy)" />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--color-navy)' }}>
            NAAC 7-Criteria Granular Findings
          </h3>
        </div>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600 }}>
          Scores evaluated on 4.0 Scale
        </span>
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--color-text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
        NAAC grades colleges based on 7 core structural criteria. Expand any criterion below to read quantitative scores and qualitative findings:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {criteria.map((c, i) => {
          const numVal = getScoreNumeric(c.score);
          const color = getScoreColor(numVal);
          const pct = Math.min(100, Math.max(0, (numVal / 4.0) * 100));
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={i}
              style={{
                border: isExpanded ? `1.5px solid ${color}44` : '1px solid var(--color-border)',
                borderRadius: 10,
                overflow: 'hidden',
                background: isExpanded ? `${color}06` : 'var(--color-cream-card)',
                transition: 'all 0.2s'
              }}
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ flex: 1, minWidth: 0, paddingRight: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-navy)' }}>
                      Criterion {i + 1}: {c.name}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: color, paddingLeft: 8 }}>
                      {c.score || 'N/A'}
                    </span>
                  </div>

                  {/* Progress Score Bar */}
                  <div style={{ height: 6, width: '100%', background: '#E2E8F0', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: color,
                      borderRadius: 999,
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </div>

                <div style={{ color: 'var(--color-navy-light)' }}>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {isExpanded && (
                <div style={{
                  padding: '0 18px 16px',
                  fontSize: 13.5,
                  color: 'var(--color-text-main)',
                  lineHeight: 1.6,
                  borderTop: '1px solid rgba(11, 46, 61, 0.06)',
                  paddingTop: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid var(--color-border)' }}>
                    <Info size={16} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: 2 }}>Analysis &amp; SSR Finding:</div>
                      {c.insight || "No specific qualitative finding extracted from public SSR records for this criterion."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
