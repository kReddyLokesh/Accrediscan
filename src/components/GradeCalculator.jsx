import React, { useState } from 'react';
import { Calculator, Award, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

const CRITERIA_WEIGHTS = [
  { name: "1. Curricular Aspects", weight: 150, desc: "Curriculum design, flexibility, feedback systems" },
  { name: "2. Teaching-Learning & Evaluation", weight: 200, desc: "Student enrollment, faculty profile, evaluation process" },
  { name: "3. Research, Innovation & Extension", weight: 250, desc: "Publications, patents, grants, incubation centers" },
  { name: "4. Infrastructure & Learning Resources", weight: 100, desc: "Physical campus, IT facilities, library, sports" },
  { name: "5. Student Support & Progression", weight: 100, desc: "Scholarships, placement rate, alumni contribution" },
  { name: "6. Governance, Leadership & Management", weight: 100, desc: "Institutional vision, IQAC audits, financial management" },
  { name: "7. Institutional Values & Best Practices", weight: 100, desc: "Green campus initiatives, gender equity, innovations" }
];

function calculateGrade(cgpa) {
  if (cgpa >= 3.51) return { grade: "A++", label: "Accredited (Highest Performance)", color: "#1F4D3A" };
  if (cgpa >= 3.26) return { grade: "A+", label: "Accredited (Excellent)", color: "#2D6F54" };
  if (cgpa >= 3.01) return { grade: "A", label: "Accredited (Very Good)", color: "#1F4D3A" };
  if (cgpa >= 2.76) return { grade: "B++", label: "Accredited (Good)", color: "#B8862E" };
  if (cgpa >= 2.51) return { grade: "B+", label: "Accredited (Fair)", color: "#B8862E" };
  if (cgpa >= 2.01) return { grade: "B", label: "Accredited (Satisfactory)", color: "#B8862E" };
  if (cgpa >= 1.51) return { grade: "C", label: "Accredited (Marginal)", color: "#8C2F2F" };
  return { grade: "D", label: "Not Accredited", color: "#8C2F2F" };
}

export default function GradeCalculator() {
  const [scores, setScores] = useState([3.8, 3.6, 3.5, 3.7, 3.6, 3.4, 3.6]);

  const handleScoreChange = (index, val) => {
    const updated = [...scores];
    updated[index] = parseFloat(val);
    setScores(updated);
  };

  // Weighted CGPA Calculation
  const totalWeightedScore = CRITERIA_WEIGHTS.reduce((acc, item, idx) => {
    return acc + (scores[idx] * item.weight);
  }, 0);

  const finalCGPA = (totalWeightedScore / 1000).toFixed(2);
  const gradeInfo = calculateGrade(parseFloat(finalCGPA));

  const handleReset = () => {
    setScores([3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5]);
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 60px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-navy)' }}>
            <Calculator size={26} color="var(--color-gold)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, margin: 0 }}>
              NAAC CGPA &amp; Grade Predictor Calculator
            </h2>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
            Simulate 7-criteria weighted scores (1000-point scale) to project institutional CGPA and NAAC accreditation grade.
          </p>
        </div>

        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12.5,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            background: 'var(--color-card-bg)',
            color: 'var(--color-text-main)',
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={14} /> Reset Scores
        </button>
      </div>

      {/* Calculator Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        
        {/* Sliders Input Column */}
        <div style={{
          background: 'var(--color-card-bg)',
          borderRadius: 16,
          padding: 24,
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16 }}>
            Criterion Score Sliders (0.0 to 4.0)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CRITERIA_WEIGHTS.map((item, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--color-navy)' }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--color-gold)', fontWeight: 700, marginLeft: 8 }}>
                      (Weight: {item.weight}/1000)
                    </span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-emerald)', background: 'var(--color-emerald-bg)', padding: '2px 8px', borderRadius: 4 }}>
                    {scores[idx].toFixed(1)} / 4.0
                  </span>
                </div>

                <div style={{ fontSize: 11.5, color: 'var(--color-text-muted)', marginBottom: 8 }}>
                  {item.desc}
                </div>

                <input
                  type="range"
                  min="0.0"
                  max="4.0"
                  step="0.1"
                  value={scores[idx]}
                  onChange={(e) => handleScoreChange(idx, e.target.value)}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-gold)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Projected Grade Output Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            background: 'linear-gradient(135deg, #0B2E3D 0%, #16465B 100%)',
            color: '#F6F3EA',
            borderRadius: 16,
            padding: 30,
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            border: '2px solid var(--color-gold)'
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: '#D4A757', marginBottom: 8 }}>
              PROJECTED NAAC RESULT
            </div>

            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 56,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              margin: '8px 0'
            }}>
              Grade {gradeInfo.grade}
            </div>

            <div style={{ fontSize: 22, fontWeight: 700, color: '#D4A757', marginBottom: 8 }}>
              CGPA {finalCGPA} / 4.0
            </div>

            <div style={{ fontSize: 13, color: '#C2D3DD', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: 999, display: 'inline-block' }}>
              {gradeInfo.label}
            </div>
          </div>

          {/* Grade Bands Reference Card */}
          <div style={{
            background: 'var(--color-card-bg)',
            borderRadius: 14,
            padding: 20,
            border: '1px solid var(--color-border)',
            fontSize: 12.5
          }}>
            <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Award size={16} color="var(--color-gold)" /> Official NAAC Grade Scale Reference
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span><strong>A++</strong> (CGPA 3.51 - 4.00)</span>
                <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>Highest</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span><strong>A+</strong> (CGPA 3.26 - 3.50)</span>
                <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>Excellent</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--color-border)' }}>
                <span><strong>A</strong> (CGPA 3.01 - 3.25)</span>
                <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>Very Good</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span><strong>B++ / B+</strong> (CGPA 2.51 - 3.00)</span>
                <span style={{ color: 'var(--color-text-muted)' }}>Good</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
