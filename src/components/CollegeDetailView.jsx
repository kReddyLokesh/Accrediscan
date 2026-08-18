import React, { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, ExternalLink, GraduationCap, Building2,
  ScrollText, Users, FlaskConical, Landmark, HeartHandshake, Briefcase,
  BookOpen, User, Building, Bookmark, Scale, Printer, Award
} from 'lucide-react';
import CriteriaDeepDive from './CriteriaDeepDive.jsx';
import RadarChart from './RadarChart.jsx';
import HistoricalTimeline from './HistoricalTimeline.jsx';

function gradeColor(grade) {
  if (!grade) return '#6b6b66';
  const g = grade.toUpperCase();
  if (g.startsWith('A++')) return '#1F4D3A';
  if (g.startsWith('A+')) return '#2D6F54';
  if (g.startsWith('A')) return '#1F4D3A';
  if (g.startsWith('B')) return '#B8862E';
  if (g.startsWith('C')) return '#8C2F2F';
  return '#6b6b66';
}

function SealBadge({ grade, status }) {
  const color = status === 'accredited' ? gradeColor(grade) : '#8C2F2F';
  const label = status === 'accredited' ? (grade || 'Accredited') : status === 'unclear' ? 'Unverified' : 'Not Found';
  return (
    <div
      className="seal-pulse"
      style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        boxShadow: `0 0 0 4px #F6F3EA, 0 0 0 7px ${color}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexShrink: 0,
        background: 'radial-gradient(circle at 35% 30%, #ffffff, #FAF8F3 70%)',
        position: 'relative',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: label.length > 5 ? 13 : 24,
        fontWeight: 800,
        color,
        letterSpacing: 0.5,
        textAlign: 'center',
        lineHeight: 1.1,
        padding: '0 4px'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: 1,
        color: '#6B6B66',
        marginTop: 2,
        textTransform: 'uppercase'
      }}>
        NAAC SEAL
      </div>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px dashed ${color}55` }} />
    </div>
  );
}

function StatusPill({ ok, children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12.5,
      fontWeight: 600,
      padding: '4px 12px',
      borderRadius: 999,
      background: ok ? 'var(--color-emerald-bg)' : 'var(--color-crimson-bg)',
      color: ok ? 'var(--color-emerald)' : 'var(--color-crimson)',
      border: `1px solid ${ok ? 'rgba(31, 77, 58, 0.25)' : 'rgba(140, 47, 47, 0.25)'}`,
    }}>
      {children}
    </span>
  );
}

function DataCard({ icon, title, children }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 12,
      padding: 18,
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-navy)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, borderBottom: '1px solid var(--color-border)', paddingBottom: 8 }}>
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function MetricRow({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13.5, padding: '5px 0', borderBottom: '1px solid rgba(11,46,61,0.05)' }}>
      <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--color-text-main)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export default function CollegeDetailView({
  result,
  onSave,
  isSaved,
  onToggleCompare,
  isInCompare,
  onOpenOfficialDossier
}) {
  const [viewMode, setViewMode] = useState('student'); // 'student' | 'org'

  if (!result) return null;

  const insights = viewMode === 'student' ? result.student_insights : result.org_insights;

  return (
    <div id="college-dossier-view" className="animate-fade-in" style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 20px 60px' }}>
      
      {/* Top Banner Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        marginBottom: 24
      }}>
        <div style={{
          padding: '28px 28px 20px',
          background: 'linear-gradient(180deg, #FAF8F3 0%, #FFFFFF 100%)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          gap: 24,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <SealBadge grade={result.naac?.grade} status={result.naac?.status} />

          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--color-gold)', background: 'var(--color-gold-bg)', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(184, 134, 46, 0.3)' }}>
                VERIFIED ACCREDITATION DOSSIER
              </span>
              {result._source === 'featured_database' && (
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-emerald)', background: 'var(--color-emerald-bg)', padding: '2px 8px', borderRadius: 4 }}>
                  Verified Dataset
                </span>
              )}
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, margin: '6px 0 8px' }}>
              {result.institution_name}
            </h2>

            <div style={{ fontSize: 13.5, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {result.location && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Building2 size={14} color="var(--color-navy)" /> {result.location}
                </span>
              )}
              {result.institution_type && <span>• {result.institution_type}</span>}
              {result.established && <span>• Est. {result.established}</span>}
            </div>
          </div>

          {/* Action buttons */}
          <div className="no-print" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={onSave}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: isSaved ? 'var(--color-gold-bg)' : '#ffffff',
                color: isSaved ? 'var(--color-gold)' : 'var(--color-text-main)',
                cursor: 'pointer'
              }}
            >
              <Bookmark size={15} fill={isSaved ? 'var(--color-gold)' : 'none'} />
              {isSaved ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={onToggleCompare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: isInCompare ? 'var(--color-emerald-bg)' : '#ffffff',
                color: isInCompare ? 'var(--color-emerald)' : 'var(--color-text-main)',
                cursor: 'pointer'
              }}
            >
              <Scale size={15} />
              {isInCompare ? 'Comparing' : 'Add to Compare'}
            </button>

            <button
              onClick={onOpenOfficialDossier}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--color-navy)',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <Award size={15} color="var(--color-gold)" /> Formal Certificate
            </button>
          </div>
        </div>

        {/* Status Pills Bar */}
        <div style={{ padding: '14px 28px', background: 'var(--color-cream-card)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <StatusPill ok={result.naac?.status === 'accredited'}>
            NAAC Grade: {result.naac?.grade || 'Accredited'} {result.naac?.cgpa ? `(CGPA ${result.naac.cgpa}/4.0)` : ''}
          </StatusPill>
          <StatusPill ok={result.nba?.status === 'accredited'}>
            NBA Status: {result.nba?.status === 'accredited' ? 'Accredited Programs' : 'Unverified'}
          </StatusPill>
          {result.naac?.cycle && <StatusPill ok>{result.naac.cycle}</StatusPill>}
          {result.naac?.valid_until && <StatusPill ok>Valid till {result.naac.valid_until}</StatusPill>}
        </div>
      </div>

      {/* Summary Box */}
      <div style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '22px 26px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 24
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-gold)', marginBottom: 6 }}>
          Executive Accreditation Summary
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-text-main)', margin: 0 }}>
          {result.summary}
        </p>
      </div>

      {/* Analytics Grid: Radar Chart + Historical Trajectory */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 24 }}>
        <RadarChart institutions={[result]} />
        <HistoricalTimeline historicalCycles={result.historical_cycles} nirfHistory={result.nirf_history} />
      </div>

      {/* Dual Perspective Toggle Section */}
      <div style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--color-navy)' }}>
              Decision Intelligence Engine
            </h3>
            <div style={{ fontSize: 12.5, color: 'var(--color-text-muted)' }}>
              Tailored assessment synthesis based on your evaluation role
            </div>
          </div>

          <div className="no-print" style={{ display: 'inline-flex', background: 'var(--color-cream-card)', padding: 4, borderRadius: 10, border: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setViewMode('student')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'student' ? 'var(--color-navy)' : 'transparent',
                color: viewMode === 'student' ? '#ffffff' : 'var(--color-text-muted)',
                transition: 'all 0.2s'
              }}
            >
              <User size={15} /> Student &amp; Parent View
            </button>

            <button
              onClick={() => setViewMode('org')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: viewMode === 'org' ? 'var(--color-navy)' : 'transparent',
                color: viewMode === 'org' ? '#ffffff' : 'var(--color-text-muted)',
                transition: 'all 0.2s'
              }}
            >
              <Building size={15} /> Recruiter &amp; Industry View
            </button>
          </div>
        </div>

        <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(insights || []).map((bullet, idx) => (
            <li key={idx} style={{ fontSize: 14, color: 'var(--color-text-main)', lineHeight: 1.6 }}>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* NAAC 7-Criteria Deep Dive Component */}
      <CriteriaDeepDive criteria={result.criteria} />

      {/* Institutional Data Grid (Placements, Research, Infrastructure, Faculty, Support) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20,
        marginTop: 24
      }}>
        {/* Placements */}
        <DataCard icon={<Briefcase size={16} />} title="Placement Record">
          <MetricRow label="Placement Rate" value={result.placements?.placement_rate} />
          <MetricRow label="Average Package" value={result.placements?.average_package} />
          <MetricRow label="Highest Package" value={result.placements?.highest_package} />
          {result.placements?.top_recruiters?.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 6 }}>Top Recruiters:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {result.placements.top_recruiters.map((r, i) => (
                  <span key={i} style={{ fontSize: 11.5, background: 'var(--color-emerald-bg)', color: 'var(--color-emerald)', padding: '3px 8px', borderRadius: 4, fontWeight: 600 }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.placements?.note && (
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8, fontStyle: 'italic' }}>
              {result.placements.note}
            </div>
          )}
        </DataCard>

        {/* Research */}
        <DataCard icon={<FlaskConical size={16} />} title="Scopus & R&D Impact">
          <MetricRow label="Publications" value={result.research?.publications} />
          <MetricRow label="Patents Granted" value={result.research?.patents} />
          <MetricRow label="Funded R&D Grants" value={result.research?.funded_projects} />
          <MetricRow label="PhD Faculty Ratio" value={result.research?.phd_faculty_pct} />
          {result.research?.note && (
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8, fontStyle: 'italic' }}>
              {result.research.note}
            </div>
          )}
        </DataCard>

        {/* Infrastructure */}
        <DataCard icon={<Landmark size={16} />} title="Campus Infrastructure">
          <MetricRow label="Campus Footprint" value={result.infrastructure?.campus} />
          <MetricRow label="Labs & Library" value={result.infrastructure?.labs_library} />
          <MetricRow label="Hostel Accommodation" value={result.infrastructure?.hostel} />
          {result.infrastructure?.note && (
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8, fontStyle: 'italic' }}>
              {result.infrastructure.note}
            </div>
          )}
        </DataCard>

        {/* Faculty & Support */}
        <DataCard icon={<Users size={16} />} title="Faculty & Student Support">
          <MetricRow label="Student-Faculty Ratio" value={result.faculty?.student_ratio} />
          <MetricRow label="Total Faculty Count" value={result.faculty?.total_faculty} />
          <MetricRow label="Scholarships" value={result.student_support?.scholarships} />
          <MetricRow label="Mentoring Scheme" value={result.student_support?.mentoring} />
        </DataCard>
      </div>

      {/* Watchpoints / Caution Box */}
      <div style={{
        background: 'var(--color-crimson-bg)',
        borderRadius: 14,
        padding: 22,
        border: '1px solid rgba(140, 47, 47, 0.25)',
        marginTop: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-crimson)', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
          <AlertTriangle size={18} />
          <span>Audit Watchpoints &amp; Caution Flags</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {(result.watchpoints || []).map((w, idx) => (
            <li key={idx} style={{ fontSize: 13.5, color: '#6A2323', lineHeight: 1.5 }}>
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Sources list */}
      {result.sources?.length > 0 && (
        <div style={{ marginTop: 24, padding: 18, background: '#ffffff', borderRadius: 12, border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-navy)', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>
            <BookOpen size={16} /> Verified Sources &amp; SSR Citations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.sources.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 13,
                  color: 'var(--color-navy-light)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <ExternalLink size={13} />
                <span style={{ textDecoration: 'underline' }}>{s.title || s.url}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
