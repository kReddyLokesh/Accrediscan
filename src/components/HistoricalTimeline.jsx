import React from 'react';
import { History, TrendingUp, Award, CheckCircle } from 'lucide-react';

export default function HistoricalTimeline({ historicalCycles = [], nirfHistory = [] }) {
  if ((!historicalCycles || historicalCycles.length === 0) && (!nirfHistory || nirfHistory.length === 0)) {
    return null;
  }

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 14,
      padding: 24,
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      marginTop: 24
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-navy)', marginBottom: 16 }}>
        <TrendingUp size={20} color="var(--color-gold)" />
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, margin: 0 }}>
          Accreditation Progression &amp; NIRF Ranking Trajectory
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        
        {/* NAAC Cycle Timeline */}
        {historicalCycles.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-navy)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Award size={14} color="var(--color-emerald)" /> NAAC Multi-Cycle Progress
            </div>
            
            <div style={{ position: 'relative', paddingLeft: 18, borderLeft: '2px solid var(--color-gold)' }}>
              {historicalCycles.map((cyc, idx) => (
                <div key={idx} style={{ marginBottom: 14, position: 'relative' }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: -24,
                    top: 2,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'var(--color-gold)',
                    border: '2px solid #ffffff'
                  }} />

                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-navy)' }}>
                    {cyc.cycle}
                  </div>

                  <div style={{ fontSize: 12.5, color: 'var(--color-text-muted)', display: 'flex', gap: 10, marginTop: 2 }}>
                    <span>Grade: <strong style={{ color: 'var(--color-emerald)' }}>{cyc.grade}</strong></span>
                    {cyc.cgpa && <span>CGPA: <strong>{cyc.cgpa} / 4.0</strong></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NIRF 5-Year Trend */}
        {nirfHistory.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-navy)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingUp size={14} color="var(--color-navy)" /> NIRF 5-Year Ranking Trend
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100, paddingBottom: 10 }}>
              {nirfHistory.map((item, idx) => {
                const rankNum = parseInt(item.rank, 10);
                // Inverse height calculation for ranking (rank #1 is highest bar)
                const heightPct = Math.max(20, 100 - (rankNum * 0.8));

                return (
                  <div key={idx} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-gold)', marginBottom: 4 }}>
                      #{item.rank}
                    </div>
                    <div style={{
                      width: '100%',
                      maxWidth: 32,
                      height: `${heightPct}%`,
                      background: 'linear-gradient(180deg, #0B2E3D 0%, #16465B 100%)',
                      borderRadius: '4px 4px 0 0'
                    }} />
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4, fontWeight: 600 }}>
                      {item.year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
