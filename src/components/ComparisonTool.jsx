import React from 'react';
import { Scale, Trash2, ShieldCheck, Plus, Check, AlertCircle } from 'lucide-react';
import { FEATURED_INSTITUTIONS } from '../data/featuredInstitutions.js';

export default function ComparisonTool({
  compareList,
  onRemoveFromCompare,
  onAddInstitution,
  onSelectInstitution
}) {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-navy)' }}>
            <Scale size={24} color="var(--color-gold)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, margin: 0 }}>
              Institutional Side-by-Side Comparison
            </h2>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
            Compare up to 3 higher education institutions across NAAC metrics, placement packages, research impact, and criteria scores.
          </p>
        </div>

        {compareList.length < 3 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FEATURED_INSTITUTIONS.filter(inst => !compareList.some(c => c.id === inst.id)).map(inst => (
              <button
                key={inst.id}
                onClick={() => onAddInstitution(inst)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '1px solid var(--color-gold)',
                  background: 'var(--color-gold-bg)',
                  color: 'var(--color-gold)',
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} /> Add {inst.institution_name.split('(')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {compareList.length === 0 ? (
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: '48px 24px',
          textAlign: 'center',
          border: '1px dashed var(--color-border)'
        }}>
          <Scale size={40} color="var(--color-gold)" style={{ marginBottom: 12, opacity: 0.6 }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--color-navy)', marginBottom: 8 }}>
            No Colleges Selected for Comparison
          </h3>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', maxWidth: 440, margin: '0 auto 20px' }}>
            Search or select institutions from the Explorer view to compare NAAC CGPAs, placements, and 7-criteria scores side-by-side.
          </p>
        </div>
      ) : (
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
            <thead>
              <tr style={{ background: 'var(--color-cream-card)', borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '16px 20px', width: 220, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-navy)' }}>
                  Metric / Feature
                </th>
                {compareList.map(inst => (
                  <th key={inst.id} style={{ padding: '16px 20px', fontSize: 15, fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{inst.institution_name}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 400 }}>{inst.location}</div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(inst.id)}
                        title="Remove from comparison"
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-crimson)', padding: 2 }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ fontSize: 13.5 }}>
              {/* NAAC Grade */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>NAAC Grade</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px' }}>
                    <span style={{
                      fontWeight: 800,
                      fontSize: 15,
                      color: inst.naac?.grade?.startsWith('A') ? 'var(--color-emerald)' : 'var(--color-gold)'
                    }}>
                      {inst.naac?.grade || 'N/A'}
                    </span>
                    {inst.naac?.cgpa && <span style={{ fontSize: 12, color: 'var(--color-text-muted)', marginLeft: 6 }}>(CGPA {inst.naac.cgpa})</span>}
                  </td>
                ))}
              </tr>

              {/* NBA Status */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>NBA Accreditation</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px' }}>
                    {inst.nba?.status === 'accredited' ? (
                      <span style={{ color: 'var(--color-emerald)', fontWeight: 600 }}>Accredited Programs</span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>Not specified</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Placement Rate & Avg Package */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>Placement Rate</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px', fontWeight: 600 }}>
                    {inst.placements?.placement_rate || 'N/A'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>Average Package</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>
                    {inst.placements?.average_package || 'N/A'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>Highest Package</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-gold)' }}>
                    {inst.placements?.highest_package || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Scopus Research & Faculty */}
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>Research Output</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px' }}>
                    {inst.research?.publications || 'N/A'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px 20px', fontWeight: 700, color: 'var(--color-navy)' }}>Student:Faculty Ratio</td>
                {compareList.map(inst => (
                  <td key={inst.id} style={{ padding: '12px 20px' }}>
                    {inst.faculty?.student_ratio || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Criteria Scores Section Header */}
              <tr style={{ background: 'var(--color-cream-card)' }}>
                <td colSpan={compareList.length + 1} style={{ padding: '10px 20px', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', color: 'var(--color-gold)', letterSpacing: 0.5 }}>
                  NAAC 7-Criteria Scores (out of 4.0)
                </td>
              </tr>

              {[
                "Curricular Aspects",
                "Teaching-Learning & Evaluation",
                "Research, Innovation & Extension",
                "Infrastructure & Learning Resources",
                "Student Support & Progression",
                "Governance, Leadership & Management",
                "Institutional Values & Best Practices"
              ].map((cName, cIdx) => (
                <tr key={cIdx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--color-navy)' }}>{cName}</td>
                  {compareList.map(inst => {
                    const foundCrit = inst.criteria?.find(c => c.name.toLowerCase().includes(cName.toLowerCase().split(' ')[0]));
                    return (
                      <td key={inst.id} style={{ padding: '12px 20px', fontWeight: 700 }}>
                        {foundCrit?.score || 'N/A'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
