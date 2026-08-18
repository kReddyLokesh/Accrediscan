import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Sparkles, History, Globe, ArrowRight, Building2, MapPin, Award } from 'lucide-react';
import { FEATURED_INSTITUTIONS } from '../data/featuredInstitutions.js';
import { ALL_INDIAN_ENGINEERING_COLLEGES } from '../data/engineeringCollegesRegistry.js';

export default function SearchSection({
  query,
  setQuery,
  onSearch,
  loading,
  history,
  onSelectInstitution
}) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let timer;
    if (loading) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % 3);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // Handle clicking outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadingMessages = [
    "🌐 Querying live web sources & public registries...",
    "📊 Extracting NAAC cycles, CGPA, NIRF & placement statistics...",
    "✨ Assembling verified institutional accreditation dossier..."
  ];

  // Compute live auto-complete suggestions from 100+ Indian Engineering Colleges
  const suggestions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const matches = [];

    // 1. Check featured pre-analyzed list
    for (const inst of FEATURED_INSTITUTIONS) {
      if (
        inst.institution_name.toLowerCase().includes(q) ||
        inst.location.toLowerCase().includes(q) ||
        inst.id.toLowerCase().includes(q)
      ) {
        matches.push({
          name: inst.institution_name,
          location: inst.location,
          grade: inst.naac?.grade || "Accredited",
          instObj: inst,
          isPreloaded: true
        });
      }
    }

    // 2. Check all Indian engineering colleges registry
    for (const engCol of ALL_INDIAN_ENGINEERING_COLLEGES) {
      if (
        (engCol.name.toLowerCase().includes(q) || engCol.location.toLowerCase().includes(q)) &&
        !matches.some(m => m.name.toLowerCase() === engCol.name.toLowerCase())
      ) {
        matches.push({
          name: engCol.name,
          location: engCol.location,
          grade: `NAAC ${engCol.grade}`,
          instObj: null,
          isPreloaded: false
        });
      }
    }

    return matches.slice(0, 8);
  }, [query]);

  const handleSelectSuggestion = (item) => {
    setIsDropdownOpen(false);
    if (item.instObj) {
      onSelectInstitution(item.instObj);
    } else {
      setQuery(item.name);
      onSearch(item.name);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #0B2E3D 0%, #16465B 100%)',
      padding: '36px 20px 48px',
      color: '#F6F3EA',
      position: 'relative',
      overflow: 'visible'
    }}>
      {/* Decorative overlay element */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184, 134, 46, 0.15) 0%, rgba(11, 46, 61, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        
        {/* Live Search Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(184, 134, 46, 0.2)',
          border: '1px solid rgba(184, 134, 46, 0.4)',
          borderRadius: 999,
          padding: '4px 14px',
          fontSize: 12,
          fontWeight: 700,
          color: '#F6F3EA',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginBottom: 12
        }}>
          <Globe size={14} color="#D4A757" /> Master Indian Higher Education Database &amp; Live Web Intelligence
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: 10,
          letterSpacing: -0.5
        }}>
          Search &amp; Evaluate Any College in India
        </h1>
        
        <p style={{
          fontSize: 'clamp(14px, 2vw, 16px)',
          color: '#C2D3DD',
          maxWidth: 720,
          margin: '0 auto 28px',
          lineHeight: 1.6
        }}>
          Look up any of India's 45,000+ colleges and universities. AccrediCheck extracts verified <strong>NAAC Grades, CGPA, NBA Status, NIRF Ranks, Placement CTC Packages,</strong> and Scopus research papers.
        </p>

        {/* Search input container with Autocomplete Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative', maxWidth: 740, margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            gap: 10,
            background: '#ffffff',
            borderRadius: 14,
            padding: 8,
            boxShadow: '0 10px 30px rgba(6, 26, 35, 0.3)',
            border: '2px solid rgba(184, 134, 46, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 12, color: '#0B2E3D' }}>
              <Search size={22} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsDropdownOpen(false);
                  onSearch();
                }
              }}
              placeholder="Type any Indian college (e.g. RVCE, IIT, Christ University, DTU, SRM, Jadavpur)..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 16,
                padding: '10px 4px',
                color: '#2B2A26',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                onSearch();
              }}
              disabled={loading || !query.trim()}
              style={{
                background: 'linear-gradient(135deg, #0B2E3D 0%, #16465B 100%)',
                color: '#F6F3EA',
                border: 'none',
                borderRadius: 10,
                padding: '0 24px',
                fontSize: 15,
                fontWeight: 700,
                cursor: loading || !query.trim() ? 'default' : 'pointer',
                opacity: loading || !query.trim() ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(11, 46, 61, 0.2)'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" />
                  Searching...
                </>
              ) : (
                <>
                  Research <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: '#ffffff',
              borderRadius: 12,
              boxShadow: '0 15px 35px rgba(6, 26, 35, 0.35)',
              border: '1px solid var(--color-border)',
              zIndex: 100,
              overflow: 'hidden',
              textAlign: 'left'
            }}>
              <div style={{ padding: '8px 14px', background: '#F8F6F0', borderBottom: '1px solid #ECE7D9', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#6B6B66', letterSpacing: 0.5 }}>
                Matching Colleges in India
              </div>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectSuggestion(item)}
                  style={{
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderBottom: '1px solid #F0ECE1',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F6F3EA'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Building2 size={16} color="var(--color-navy)" style={{ flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0B2E3D' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#7E8C94', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={11} /> {item.location}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: item.isPreloaded ? 'var(--color-emerald-bg)' : 'var(--color-gold-bg)',
                    color: item.isPreloaded ? 'var(--color-emerald)' : 'var(--color-gold)',
                    border: `1px solid ${item.isPreloaded ? 'rgba(31, 77, 58, 0.2)' : 'rgba(184, 134, 46, 0.3)'}`
                  }}>
                    {item.grade}
                  </span>
                </div>
              ))}
              <div
                onClick={() => {
                  setIsDropdownOpen(false);
                  onSearch();
                }}
                style={{
                  padding: '10px 14px',
                  background: '#FAF8F3',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: 'var(--color-navy)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  justifyContent: 'center'
                }}
              >
                <Globe size={14} color="var(--color-gold)" /> Research full web &amp; SSR reports for "{query}" ➔
              </div>
            </div>
          )}
        </div>

        {/* Live Loading Progress Bar */}
        {loading && (
          <div style={{
            maxWidth: 600,
            margin: '18px auto 0',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            borderRadius: 10,
            border: '1px solid rgba(184, 134, 46, 0.3)',
            fontSize: 13.5,
            color: '#F6F3EA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}>
            <Loader2 size={16} className="spin" color="#D4A757" />
            <span>{loadingMessages[loadingStep]}</span>
          </div>
        )}

        {/* Featured quick-select institutions */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#A3B4BC', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Sparkles size={14} color="#D4A757" /> Top Tier Colleges:
          </span>
          {FEATURED_INSTITUTIONS.slice(0, 9).map((inst) => (
            <button
              key={inst.id}
              onClick={() => onSelectInstitution(inst)}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: '5px 12px',
                borderRadius: 999,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#F6F3EA',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {inst.institution_name.split('(')[0].trim()} ({inst.naac?.grade || 'Accredited'})
            </button>
          ))}
        </div>

        {/* Search history */}
        {history.length > 0 && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: '#889BA5', display: 'flex', alignItems: 'center', gap: 4 }}>
              <History size={12} /> Recent:
            </span>
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(h);
                  onSearch(h);
                }}
                style={{
                  fontSize: 11.5,
                  padding: '3px 10px',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'transparent',
                  color: '#A3B4BC',
                  cursor: 'pointer'
                }}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
