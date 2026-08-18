import React from 'react';
import { ShieldCheck, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function StatsBanner({ stats }) {
  const total = stats?.total_indexed || 5;
  const aPlusPlus = stats?.a_plus_plus_count || 3;
  const avgCgpa = stats?.avg_cgpa || '3.62';
  const recruiters = stats?.active_recruiters_tracked || '2,500+';

  return (
    <div style={{
      background: 'var(--color-navy)',
      color: '#F6F3EA',
      borderTop: '1px solid rgba(184, 134, 46, 0.2)',
      borderBottom: '1px solid rgba(184, 134, 46, 0.2)',
      padding: '16px 20px'
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
        textAlign: 'center'
      }}>
        <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>
            {total} Institutions
          </div>
          <div style={{ fontSize: 11, color: '#A3B4BC', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Indexed SSR Dossiers
          </div>
        </div>

        <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-emerald-light)', fontFamily: 'var(--font-serif)' }}>
            {aPlusPlus} A++ Rated
          </div>
          <div style={{ fontSize: 11, color: '#A3B4BC', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Top 2% NAAC Accredited
          </div>
        </div>

        <div style={{ borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-serif)' }}>
            {avgCgpa} / 4.0
          </div>
          <div style={{ fontSize: 11, color: '#A3B4BC', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Average Platform CGPA
          </div>
        </div>

        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>
            {recruiters}
          </div>
          <div style={{ fontSize: 11, color: '#A3B4BC', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Corporate Recruiters Tracked
          </div>
        </div>
      </div>
    </div>
  );
}
