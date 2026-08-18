import React from 'react';
import { X, ShieldCheck, Printer, CheckCircle2, Award, QrCode } from 'lucide-react';

export default function OfficialDossierModal({ isOpen, onClose, result }) {
  if (!isOpen || !result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(6, 26, 35, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: 20,
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 16,
        maxWidth: 760,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        border: '2px solid var(--color-gold)',
        position: 'relative'
      }}>
        {/* Modal Controls Bar */}
        <div style={{
          padding: '12px 20px',
          background: 'var(--color-navy)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 700 }}>
            <Award color="var(--color-gold)" size={18} /> Official Accreditation Dossier Certificate
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'var(--color-gold)',
                color: '#061A23',
                cursor: 'pointer'
              }}
            >
              <Printer size={14} /> Print Formal Certificate
            </button>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#ffffff' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div style={{ padding: '36px 40px', position: 'relative', background: '#FFFFFF' }}>
          
          {/* Header Seal & Crest */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--color-navy)', paddingBottom: 20, marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--color-navy)', letterSpacing: 1 }}>
                NATIONAL ACCREDITATION DOSSIER
              </div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--color-gold)', fontWeight: 700, marginTop: 4 }}>
                SSR &amp; Institutional Performance Audit Report
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
                Dossier Serial: ACC-{Date.now().toString().slice(-8)} • Issued: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-gold-bg)',
                margin: '0 auto 4px'
              }}>
                <ShieldCheck size={36} color="var(--color-navy)" />
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-navy)' }}>VERIFIED</div>
            </div>
          </div>

          {/* Institution Title */}
          <div style={{ textAlign: 'center', margin: '24px 0 28px' }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#777', fontWeight: 600 }}>This certified audit dossier attests the standing of</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 800, color: 'var(--color-navy)', margin: '8px 0' }}>
              {result.institution_name}
            </h1>
            <div style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
              {result.location} • {result.institution_type}
            </div>
          </div>

          {/* Summary Box */}
          <div style={{
            background: 'var(--color-cream-card)',
            borderRadius: 10,
            padding: 16,
            border: '1px solid var(--color-border)',
            marginBottom: 24,
            fontSize: 13.5,
            lineHeight: 1.6
          }}>
            <strong>Audit Executive Brief:</strong> {result.summary}
          </div>

          {/* NAAC Scores Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--color-navy)', color: '#ffffff' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>NAAC Criterion</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Score (out of 4.0)</th>
              </tr>
            </thead>
            <tbody>
              {result.criteria?.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '8px 12px', color: 'var(--color-navy)', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, color: 'var(--color-emerald)' }}>{c.score || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Sign-off */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: 11, color: '#888' }}>Audit Verification Stamp</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-navy)', marginTop: 2 }}>AccrediCheck Quality Engine</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <QrCode size={40} color="var(--color-navy)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
