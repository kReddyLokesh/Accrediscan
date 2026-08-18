import React from 'react';
import { ShieldCheck, Scale, Bookmark, Settings, Building2, Grid, Calculator, Moon, Sun } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  compareCount,
  savedCount,
  onOpenSettings,
  hasApiKey,
  theme,
  onToggleTheme
}) {
  return (
    <header className="no-print" style={{
      background: 'linear-gradient(135deg, #061A23 0%, #0B2E3D 100%)',
      color: '#F6F3EA',
      borderBottom: '1px solid rgba(184, 134, 46, 0.3)',
      boxShadow: '0 4px 20px rgba(6, 26, 35, 0.4)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => setActiveTab('explore')}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #B8862E 0%, #D4A757 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(184, 134, 46, 0.4)'
          }}>
            <ShieldCheck size={24} color="#061A23" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#F6F3EA',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              ACCREDICHECK
              <span style={{
                fontSize: 10,
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                background: 'rgba(184, 134, 46, 0.25)',
                color: '#D4A757',
                border: '1px solid rgba(184, 134, 46, 0.4)',
                padding: '2px 7px',
                borderRadius: 999,
                letterSpacing: 0.5,
                textTransform: 'uppercase'
              }}>
                PRO v3.0
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#A3B4BC', letterSpacing: 0.5, marginTop: 2 }}>
              Institutional Accreditation &amp; SSR Intelligence Engine
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'explore' ? 'rgba(246, 243, 234, 0.15)' : 'transparent',
              color: activeTab === 'explore' ? '#F6F3EA' : '#A3B4BC',
              transition: 'all 0.2s'
            }}
          >
            <Building2 size={16} /> Explorer
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'directory' ? 'rgba(246, 243, 234, 0.15)' : 'transparent',
              color: activeTab === 'directory' ? '#F6F3EA' : '#A3B4BC',
              transition: 'all 0.2s'
            }}
          >
            <Grid size={16} /> Catalog
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'calculator' ? 'rgba(246, 243, 234, 0.15)' : 'transparent',
              color: activeTab === 'calculator' ? '#F6F3EA' : '#A3B4BC',
              transition: 'all 0.2s'
            }}
          >
            <Calculator size={16} /> Predictor
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'compare' ? 'rgba(246, 243, 234, 0.15)' : 'transparent',
              color: activeTab === 'compare' ? '#F6F3EA' : '#A3B4BC',
              transition: 'all 0.2s'
            }}
          >
            <Scale size={16} /> Compare
            {compareCount > 0 && (
              <span style={{
                background: '#B8862E',
                color: '#061A23',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                padding: '1px 6px',
                marginLeft: 2
              }}>
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'saved' ? 'rgba(246, 243, 234, 0.15)' : 'transparent',
              color: activeTab === 'saved' ? '#F6F3EA' : '#A3B4BC',
              transition: 'all 0.2s'
            }}
          >
            <Bookmark size={16} /> Saved ({savedCount})
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              borderRadius: 8,
              border: '1px solid rgba(246, 243, 234, 0.2)',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#F6F3EA',
              marginLeft: 4
            }}
          >
            {theme === 'dark' ? <Sun size={16} color="#D4A757" /> : <Moon size={16} color="#F6F3EA" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            title="API Settings"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              padding: '7px 12px',
              borderRadius: 8,
              border: '1px solid rgba(246, 243, 234, 0.2)',
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#F6F3EA',
              marginLeft: 2
            }}
          >
            <Settings size={14} />
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: hasApiKey ? '#2D6F54' : '#D4A757'
            }} />
          </button>
        </nav>
      </div>
    </header>
  );
}
