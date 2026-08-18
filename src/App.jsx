import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchSection from './components/SearchSection.jsx';
import CollegeDetailView from './components/CollegeDetailView.jsx';
import DirectoryView from './components/DirectoryView.jsx';
import ComparisonTool from './components/ComparisonTool.jsx';
import SavedColleges from './components/SavedColleges.jsx';
import GradeCalculator from './components/GradeCalculator.jsx';
import StatsBanner from './components/StatsBanner.jsx';
import ApiSettingsModal from './components/ApiSettingsModal.jsx';
import OfficialDossierModal from './components/OfficialDossierModal.jsx';
import { searchInstitution, fetchPlatformStats } from './services/apiService.js';
import { FEATURED_INSTITUTIONS } from './data/featuredInstitutions.js';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'directory' | 'calculator' | 'compare' | 'saved'
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(FEATURED_INSTITUTIONS[0]);
  const [platformStats, setPlatformStats] = useState(null);

  // Theme state ('light' | 'dark')
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('accredicheck_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  // Apply data-theme to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('accredicheck_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Fetch platform stats on mount
  useEffect(() => {
    fetchPlatformStats().then(stats => setPlatformStats(stats));
  }, []);

  // Persisted state
  const [savedColleges, setSavedColleges] = useState(() => {
    try {
      const stored = localStorage.getItem('accredicheck_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState(() => {
    try {
      const stored = localStorage.getItem('accredicheck_compare');
      return stored ? JSON.parse(stored) : [FEATURED_INSTITUTIONS[0], FEATURED_INSTITUTIONS[1]];
    } catch {
      return [FEATURED_INSTITUTIONS[0], FEATURED_INSTITUTIONS[1]];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem('accredicheck_history');
      return stored ? JSON.parse(stored) : ['VIT Vellore', 'PSG Tech', 'IIT Madras'];
    } catch {
      return ['VIT Vellore', 'PSG Tech', 'IIT Madras'];
    }
  });

  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('accredicheck_api_key') || '';
    } catch {
      return '';
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOfficialDossierOpen, setIsOfficialDossierOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('accredicheck_saved', JSON.stringify(savedColleges));
    } catch {}
  }, [savedColleges]);

  useEffect(() => {
    try {
      localStorage.setItem('accredicheck_compare', JSON.stringify(compareList));
    } catch {}
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem('accredicheck_history', JSON.stringify(history));
    } catch {}
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('accredicheck_api_key', apiKey);
    } catch {}
  }, [apiKey]);

  async function handleSearch(searchQuery) {
    const q = (searchQuery ?? query).trim();
    if (!q || loading) return;

    if (searchQuery) setQuery(searchQuery);
    setLoading(true);
    setError(null);

    try {
      const result = await searchInstitution(q, apiKey);
      setSelectedResult(result);
      setActiveTab('explore');

      // Update history
      setHistory(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== q.toLowerCase());
        return [q, ...filtered].slice(0, 6);
      });

      // Smoothly scroll down to dossier
      setTimeout(() => {
        const dossierEl = document.getElementById('college-dossier-view');
        if (dossierEl) {
          dossierEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }
      }, 150);
    } catch (err) {
      setError(err.message || "Failed to search institution. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectInstitution(inst) {
    if (!inst.criteria) {
      // Need to fetch full live dossier
      handleSearch(inst.institution_name);
    } else {
      setSelectedResult(inst);
      setQuery(inst.institution_name);
      setActiveTab('explore');
      setTimeout(() => {
        const dossierEl = document.getElementById('college-dossier-view');
        if (dossierEl) {
          dossierEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }
      }, 100);
    }
  }

  function toggleSaveCollege(inst) {
    setSavedColleges(prev => {
      const exists = prev.some(c => c.id === inst.id);
      if (exists) return prev.filter(c => c.id !== inst.id);
      return [...prev, inst];
    });
  }

  function toggleCompareCollege(inst) {
    setCompareList(prev => {
      const exists = prev.some(c => c.id === inst.id);
      if (exists) return prev.filter(c => c.id !== inst.id);
      if (prev.length >= 3) {
        alert("Comparison limit is 3 institutions. Please remove one to add another.");
        return prev;
      }
      return [...prev, inst];
    });
  }

  const isCurrentSaved = selectedResult && savedColleges.some(c => c.id === selectedResult.id);
  const isCurrentInCompare = selectedResult && compareList.some(c => c.id === selectedResult.id);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-cream)' }}>
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={compareList.length}
        savedCount={savedColleges.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasApiKey={Boolean(apiKey)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Platform Stats Banner */}
      <StatsBanner stats={platformStats} />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'explore' && (
          <>
            <SearchSection
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              loading={loading}
              history={history}
              onSelectInstitution={handleSelectInstitution}
            />

            {error && (
              <div style={{ maxWidth: 880, margin: '20px auto 0', padding: 16, background: 'var(--color-crimson-bg)', border: '1px solid rgba(140, 47, 47, 0.3)', borderRadius: 12, color: 'var(--color-crimson)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <AlertTriangle size={18} />
                <span style={{ fontSize: 14 }}>{error}</span>
              </div>
            )}

            {selectedResult && (
              <CollegeDetailView
                result={selectedResult}
                onSave={() => toggleSaveCollege(selectedResult)}
                isSaved={isCurrentSaved}
                onToggleCompare={() => toggleCompareCollege(selectedResult)}
                isInCompare={isCurrentInCompare}
                onOpenOfficialDossier={() => setIsOfficialDossierOpen(true)}
              />
            )}
          </>
        )}

        {activeTab === 'directory' && (
          <DirectoryView
            onSelectInstitution={handleSelectInstitution}
            onToggleCompare={toggleCompareCollege}
            compareList={compareList}
          />
        )}

        {activeTab === 'calculator' && (
          <GradeCalculator />
        )}

        {activeTab === 'compare' && (
          <ComparisonTool
            compareList={compareList}
            onRemoveFromCompare={(id) => setCompareList(prev => prev.filter(c => c.id !== id))}
            onAddInstitution={(inst) => toggleCompareCollege(inst)}
            onSelectInstitution={handleSelectInstitution}
          />
        )}

        {activeTab === 'saved' && (
          <SavedColleges
            savedList={savedColleges}
            onRemoveSaved={(id) => setSavedColleges(prev => prev.filter(c => c.id !== id))}
            onSelectInstitution={handleSelectInstitution}
            onToggleCompare={toggleCompareCollege}
            compareList={compareList}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print" style={{
        background: 'var(--color-navy-dark)',
        color: '#A3B4BC',
        padding: '32px 20px',
        fontSize: 12.5,
        textAlign: 'center',
        borderTop: '1px solid rgba(184, 134, 46, 0.2)',
        lineHeight: 1.6
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#F6F3EA', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
            <ShieldCheck size={18} color="#B8862E" /> ACCREDICHECK PRO v3.0
          </div>
          <div>
            Data synthesized from public NAAC Self-Study Reports (SSR), National Board of Accreditation (NBA), NIRF filings, and institutional portals.
          </div>
          <div style={{ color: '#6A7D87', marginTop: 4 }}>
            Always verify final accreditation certificates with official NAAC/NBA registries before making admission or due-diligence decisions.
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(newKey) => setApiKey(newKey)}
      />

      {/* Formal Certificate Dossier Modal */}
      <OfficialDossierModal
        isOpen={isOfficialDossierOpen}
        onClose={() => setIsOfficialDossierOpen(false)}
        result={selectedResult}
      />
    </div>
  );
}
