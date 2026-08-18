import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, Globe, Cpu } from 'lucide-react';

export default function ApiSettingsModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(keyInput.trim());
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(6, 26, 35, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 16,
        maxWidth: 520,
        width: '100%',
        padding: 24,
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-navy)' }}>
            <Key size={20} color="var(--color-gold)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, margin: 0 }}>
              Live Web &amp; AI Research Settings
            </h3>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Free Web Search Status Banner */}
        <div style={{
          background: 'var(--color-emerald-bg)',
          border: '1px solid rgba(31, 77, 58, 0.2)',
          borderRadius: 10,
          padding: '12px 14px',
          marginBottom: 16,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start'
        }}>
          <Globe size={18} color="var(--color-emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 13, color: 'var(--color-emerald)', lineHeight: 1.4 }}>
            <strong>Live Web Intelligence is Active &amp; Free!</strong><br />
            AccrediCheck automatically queries Wikipedia, DuckDuckGo, and public registries to extract accreditation records for any Indian college.
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
          <strong>Optional:</strong> Enter an Anthropic Claude (<code>sk-ant-...</code>) or LLM API Key below to unlock deep strategic reasoning, detailed SWOT insights, and multi-cycle analysis for newly discovered institutions.
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--color-navy)', display: 'block', marginBottom: 6 }}>
            Anthropic / LLM API Key (Optional)
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="sk-ant-... (optional)"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              fontSize: 14,
              fontFamily: 'monospace',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: '#ffffff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--color-navy)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Check size={16} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
