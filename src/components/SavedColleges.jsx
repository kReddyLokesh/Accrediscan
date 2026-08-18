import React from 'react';
import { Bookmark, Trash2, ExternalLink, Scale, Building2 } from 'lucide-react';

export default function SavedColleges({
  savedList,
  onRemoveSaved,
  onSelectInstitution,
  onToggleCompare,
  compareList
}) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Bookmark size={24} color="var(--color-gold)" fill="var(--color-gold)" />
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: 'var(--color-navy)', margin: 0 }}>
          Saved Institutions Dossier ({savedList.length})
        </h2>
      </div>

      {savedList.length === 0 ? (
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: '48px 24px',
          textAlign: 'center',
          border: '1px dashed var(--color-border)'
        }}>
          <Bookmark size={40} color="var(--color-gold)" style={{ marginBottom: 12, opacity: 0.5 }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--color-navy)', marginBottom: 8 }}>
            No Saved Institutions
          </h3>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', maxWidth: 400, margin: '0 auto' }}>
            Click the "Save" bookmark icon on any institution's detail dossier to store it here for quick access.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {savedList.map((inst) => {
            const isInCompare = compareList.some(c => c.id === inst.id);

            return (
              <div
                key={inst.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 20,
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: 'var(--color-emerald)',
                      background: 'var(--color-emerald-bg)',
                      padding: '2px 8px',
                      borderRadius: 4
                    }}>
                      NAAC {inst.naac?.grade || 'Accredited'}
                    </span>

                    <button
                      onClick={() => onRemoveSaved(inst.id)}
                      title="Remove from saved"
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-crimson)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: 'var(--color-navy)', margin: '0 0 6px' }}>
                    {inst.institution_name}
                  </h3>

                  <div style={{ fontSize: 12.5, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
                    <Building2 size={13} /> {inst.location}
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--color-text-main)', background: 'var(--color-cream-card)', padding: 10, borderRadius: 8, marginBottom: 16 }}>
                    <div><strong>Placement Avg:</strong> {inst.placements?.average_package || 'N/A'}</div>
                    <div><strong>Scopus Papers:</strong> {inst.research?.publications || 'N/A'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => onSelectInstitution(inst)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontSize: 12.5,
                      fontWeight: 700,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'var(--color-navy)',
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    View Dossier <ExternalLink size={13} />
                  </button>

                  <button
                    onClick={() => onToggleCompare(inst)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--color-border)',
                      background: isInCompare ? 'var(--color-emerald-bg)' : '#ffffff',
                      color: isInCompare ? 'var(--color-emerald)' : 'var(--color-navy)',
                      cursor: 'pointer'
                    }}
                  >
                    <Scale size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
