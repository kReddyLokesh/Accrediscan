import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Filter, GraduationCap, ArrowRight, Search, ShieldCheck, Globe, Sparkles, MapPin, Award } from 'lucide-react';
import { fetchCatalogInstitutions } from '../services/apiService.js';
import { FEATURED_INSTITUTIONS } from '../data/featuredInstitutions.js';
import { ALL_INDIAN_ENGINEERING_COLLEGES } from '../data/engineeringCollegesRegistry.js';

export default function DirectoryView({ onSelectInstitution, onToggleCompare, compareList }) {
  const [activeCatalogTab, setActiveCatalogTab] = useState('engineering'); // 'engineering' | 'featured'
  const [institutions, setInstitutions] = useState(FEATURED_INSTITUTIONS);
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchCatalogInstitutions().then(data => {
      if (data && data.length > 0) {
        setInstitutions(data);
      }
    });
  }, []);

  // Extract unique states across both databases
  const states = useMemo(() => {
    const set = new Set([
      ...institutions.map(i => i.state || i.location.split(',')[1]?.trim() || 'Other'),
      ...ALL_INDIAN_ENGINEERING_COLLEGES.map(i => i.state)
    ]);
    return ['ALL', ...Array.from(set).sort()];
  }, [institutions]);

  // Filtered list for Pre-indexed Full Dossiers
  const filteredFeaturedList = useMemo(() => {
    return institutions.filter(inst => {
      if (selectedGrade !== 'ALL' && inst.naac?.grade !== selectedGrade) return false;
      if (selectedState !== 'ALL') {
        const instState = inst.state || inst.location.split(',')[1]?.trim();
        if (instState !== selectedState) return false;
      }
      if (selectedType !== 'ALL' && !inst.institution_type?.toLowerCase().includes(selectedType.toLowerCase())) {
        return false;
      }
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const nameMatch = inst.institution_name.toLowerCase().includes(q);
        const locMatch = inst.location.toLowerCase().includes(q);
        if (!nameMatch && !locMatch) return false;
      }
      return true;
    });
  }, [institutions, selectedGrade, selectedState, selectedType, searchFilter]);

  // Filtered list for Master Engineering Registry
  const filteredEngineeringList = useMemo(() => {
    return ALL_INDIAN_ENGINEERING_COLLEGES.filter(col => {
      if (selectedGrade !== 'ALL' && !col.grade.includes(selectedGrade)) return false;
      if (selectedState !== 'ALL' && col.state !== selectedState) return false;
      if (selectedType !== 'ALL' && !col.type.toLowerCase().includes(selectedType.toLowerCase())) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const nameMatch = col.name.toLowerCase().includes(q);
        const locMatch = col.location.toLowerCase().includes(q);
        if (!nameMatch && !locMatch) return false;
      }
      return true;
    });
  }, [selectedGrade, selectedState, selectedType, searchFilter]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 60px' }}>
      
      {/* Header Banner */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-navy)' }}>
          <Building2 size={26} color="var(--color-gold)" />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, margin: 0 }}>
            Indian Higher Education &amp; Engineering Institutions Directory
          </h2>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
          Explore hundreds of top engineering colleges, universities, and autonomous institutions across every Indian state.
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20,
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: 8
      }}>
        <button
          onClick={() => setActiveCatalogTab('engineering')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeCatalogTab === 'engineering' ? 'var(--color-navy)' : 'transparent',
            color: activeCatalogTab === 'engineering' ? '#ffffff' : 'var(--color-text-muted)',
            fontWeight: 700,
            fontSize: 13.5,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <GraduationCap size={16} color={activeCatalogTab === 'engineering' ? 'var(--color-gold)' : 'currentColor'} />
          All Indian Engineering Colleges ({ALL_INDIAN_ENGINEERING_COLLEGES.length}+ Index)
        </button>

        <button
          onClick={() => setActiveCatalogTab('featured')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeCatalogTab === 'featured' ? 'var(--color-navy)' : 'transparent',
            color: activeCatalogTab === 'featured' ? '#ffffff' : 'var(--color-text-muted)',
            fontWeight: 700,
            fontSize: 13.5,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <ShieldCheck size={16} color={activeCatalogTab === 'featured' ? 'var(--color-gold)' : 'currentColor'} />
          Full Dossier Analyzed Universities ({institutions.length})
        </button>
      </div>

      {/* Filter Toolbar */}
      <div style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '18px 20px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-cream-card)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--color-border)' }}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by college name, city, or state..."
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13.5, width: '100%', fontFamily: 'inherit' }}
          />
        </div>

        {/* State filter */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-navy)', marginRight: 6 }}>State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13, background: '#ffffff', cursor: 'pointer' }}
          >
            {states.map(s => <option key={s} value={s}>{s === 'ALL' ? 'All Indian States' : s}</option>)}
          </select>
        </div>

        {/* NAAC Grade filter */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-navy)', marginRight: 6 }}>Grade:</label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 13, background: '#ffffff', cursor: 'pointer' }}
          >
            <option value="ALL">All Grades</option>
            <option value="A++">A++ (CGPA 3.51 - 4.0)</option>
            <option value="A+">A+ (CGPA 3.26 - 3.50)</option>
            <option value="A">A (CGPA 3.01 - 3.25)</option>
          </select>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* VIEW 1: ALL INDIAN ENGINEERING COLLEGES MASTER INDEX */}
      {/* ---------------------------------------------------- */}
      {activeCatalogTab === 'engineering' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
              Showing <strong>{filteredEngineeringList.length}</strong> of <strong>{ALL_INDIAN_ENGINEERING_COLLEGES.length}</strong> engineering institutions
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-gold)', fontWeight: 600 }}>
              💡 Click any college to instantly live-research &amp; generate its full dossier
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16
          }}>
            {filteredEngineeringList.map((col, idx) => {
              const isTop = col.grade.includes('A++') || col.grade.includes('A+');
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.15s, box-shadow 0.15s'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{
                        fontSize: 11.5,
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: isTop ? 'var(--color-emerald-bg)' : 'var(--color-gold-bg)',
                        color: isTop ? 'var(--color-emerald)' : 'var(--color-gold)',
                        border: `1px solid ${isTop ? 'rgba(31, 77, 58, 0.2)' : 'rgba(184, 134, 46, 0.3)'}`
                      }}>
                        NAAC {col.grade}
                      </span>

                      {col.nirf && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-navy)', background: 'var(--color-cream-card)', padding: '2px 8px', borderRadius: 4 }}>
                          NIRF #{col.nirf}
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 15.5, fontWeight: 700, color: 'var(--color-navy)', margin: '0 0 6px', lineHeight: 1.3 }}>
                      {col.name}
                    </h4>

                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} /> {col.location}
                    </div>

                    <div style={{ fontSize: 11.5, color: '#5A6B74', background: 'var(--color-cream-card)', padding: '4px 8px', borderRadius: 6, display: 'inline-block', marginBottom: 14 }}>
                      {col.type}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const matched = institutions.find(i => i.institution_name.toLowerCase().includes(col.name.toLowerCase()) || col.name.toLowerCase().includes(i.institution_name.toLowerCase()));
                      if (matched) {
                        onSelectInstitution(matched);
                      } else {
                        onSelectInstitution({ institution_name: col.name, id: `eng-${idx}` });
                      }
                    }}
                    style={{
                      width: '100%',
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
                    Generate Full Dossier <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ---------------------------------------------------- */}
      {/* VIEW 2: FULL PRE-INDEXED DOSSIER CATALOG */}
      {/* ---------------------------------------------------- */}
      {activeCatalogTab === 'featured' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
              Showing <strong>{filteredFeaturedList.length}</strong> of <strong>{institutions.length}</strong> full-dossier institutions
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20
          }}>
            {filteredFeaturedList.map((inst) => {
              const grade = inst.naac?.grade || 'Accredited';
              const isTopGrade = grade.startsWith('A++') || grade.startsWith('A+');

              return (
                <div
                  key={inst.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 14,
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: isTopGrade ? 'var(--color-emerald-bg)' : 'var(--color-gold-bg)',
                        color: isTopGrade ? 'var(--color-emerald)' : 'var(--color-gold)',
                        border: `1px solid ${isTopGrade ? 'rgba(31, 77, 58, 0.2)' : 'rgba(184, 134, 46, 0.3)'}`
                      }}>
                        NAAC {grade} {inst.naac?.cgpa ? `(${inst.naac.cgpa})` : ''}
                      </span>

                      {inst.nirf_history?.[inst.nirf_history.length - 1]?.rank && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-navy)', background: 'var(--color-cream-card)', padding: '3px 8px', borderRadius: 4 }}>
                          NIRF #{inst.nirf_history[inst.nirf_history.length - 1].rank}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16.5, fontWeight: 700, color: 'var(--color-navy)', margin: '0 0 6px', lineHeight: 1.3 }}>
                      {inst.institution_name}
                    </h3>

                    <div style={{ fontSize: 12.5, color: 'var(--color-text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Building2 size={13} /> {inst.location} • {inst.institution_type}
                    </div>

                    <div style={{ background: 'var(--color-cream-card)', padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Avg Placement:</span>
                        <strong style={{ color: 'var(--color-navy)' }}>{inst.placements?.average_package}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Highest Package:</span>
                        <strong style={{ color: 'var(--color-gold)' }}>{inst.placements?.highest_package}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectInstitution(inst)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      padding: '9px 14px',
                      borderRadius: 8,
                      border: 'none',
                      background: 'var(--color-navy)',
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    Inspect Dossier <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
