// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import { useAuth } from '../AuthContext.jsx'

export default function Dashboard() {
  const nav              = useNavigate()
  const { user, logout } = useAuth()
  const [homeworks, setHomeworks] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    api.listHomeworks()
      .then(d => setHomeworks(d.homeworks || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function handleLogout() {
    logout()
    nav('/')
  }

  const used      = user?.homeworks_used || 0
  const limit     = user?.homeworks_limit || 10
  const isFree    = user?.plan === 'free_trial'
  const remaining = limit - used

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => nav('/solve')}>⚡ StepWise</div>
        <div style={styles.navRight}>
          <button className="btn btn-primary" onClick={() => nav('/solve')}
            style={{ padding: '10px 20px', fontSize: 14 }}>
            + New homework
          </button>
          <button className="btn btn-ghost" onClick={handleLogout}
            style={{ padding: '10px 16px', fontSize: 14 }}>
            Log out
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Hi, {user?.name || 'there'} 👋</h1>
          <p style={styles.sub}>Here's your homework history</p>
        </div>

        {/* Usage card */}
        <div style={styles.usageCard}>
          <div style={styles.usageLeft}>
            <div style={styles.usageLabel}>
              {isFree ? 'Free Trial' : 'Monthly Plan'}
            </div>
            <div style={styles.usageCount}>
              {isFree ? `${remaining} sessions remaining` : 'Unlimited sessions'}
            </div>
          </div>
          {isFree && (
            <div style={styles.usageBarWrap}>
              <div style={styles.usageBar}>
                <div style={{
                  ...styles.usageFill,
                  width: `${Math.min((used / limit) * 100, 100)}%`,
                  background: remaining <= 2 ? '#ef4444' : '#7c6af7',
                }} />
              </div>
              <div style={styles.usageNumbers}>{used} / {limit} used</div>
            </div>
          )}
        </div>

        {/* Upgrade prompt */}
        {isFree && remaining <= 3 && (
          <div style={styles.upgradeBox}>
            <p style={{ fontSize: 14, color: '#fbbf24', fontWeight: 600 }}>
              ⚡ Running low on free sessions
            </p>
            <p style={{ fontSize: 13, color: 'rgba(240,240,248,0.5)', marginTop: 4 }}>
              Upgrade to unlimited for $14.99/month —{' '}
              <a href="mailto:jhassan.abbas@gmail.com" style={{ color: '#a78bfa' }}>
                contact us to upgrade
              </a>
            </p>
          </div>
        )}

        {/* Homework list */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent homeworks</h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(240,240,248,0.3)' }}>
              Loading…
            </div>
          ) : homeworks.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
              <p style={{ fontSize: 15, color: 'rgba(240,240,248,0.4)' }}>
                No homeworks yet. Upload your first one!
              </p>
              <button className="btn btn-primary" onClick={() => nav('/solve')}
                style={{ marginTop: 16, padding: '12px 24px' }}>
                Upload homework
              </button>
            </div>
          ) : (
            <div style={styles.hwList}>
              {homeworks.map(hw => (
                <div key={hw.id} style={styles.hwCard}>
                  <div style={styles.hwIcon}>📐</div>
                  <div style={styles.hwInfo}>
                    <div style={styles.hwTopic}>{hw.topic || 'Homework'}</div>
                    <div style={styles.hwMeta}>
                      {hw.subject} · {hw.questions} question{hw.questions !== 1 ? 's' : ''} ·{' '}
                      {new Date(hw.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0f' },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'sticky', top: 0, background: 'rgba(10,10,15,0.95)',
    backdropFilter: 'blur(12px)', zIndex: 50,
  },
  logo: { fontSize: 18, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8', cursor: 'pointer' },
  navRight: { display: 'flex', gap: 10 },
  main: { maxWidth: 600, margin: '0 auto', padding: '28px 20px 60px', display: 'flex', flexDirection: 'column', gap: 20 },
  header: { display: 'flex', flexDirection: 'column', gap: 4 },
  title: { fontSize: 26, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8' },
  sub: { fontSize: 14, color: 'rgba(240,240,248,0.45)' },
  usageCard: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14, padding: '18px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
  },
  usageLeft: { display: 'flex', flexDirection: 'column', gap: 4 },
  usageLabel: { fontSize: 11, fontWeight: 700, color: '#7c6af7', textTransform: 'uppercase', letterSpacing: '0.5px' },
  usageCount: { fontSize: 18, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0f0f8' },
  usageBarWrap: { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 140 },
  usageBar: { height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 },
  usageFill: { height: '100%', borderRadius: 3, transition: 'width 0.4s ease' },
  usageNumbers: { fontSize: 12, color: 'rgba(240,240,248,0.4)', textAlign: 'right' },
  upgradeBox: {
    background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)',
    borderRadius: 12, padding: '14px 18px',
  },
  section: { display: 'flex', flexDirection: 'column', gap: 12 },
  sectionTitle: { fontSize: 16, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0f0f8' },
  emptyState: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '40px 24px', textAlign: 'center',
  },
  hwList: { display: 'flex', flexDirection: 'column', gap: 8 },
  hwCard: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12, padding: '14px 18px',
    display: 'flex', alignItems: 'center', gap: 14,
  },
  hwIcon: { fontSize: 28, flexShrink: 0 },
  hwInfo: { display: 'flex', flexDirection: 'column', gap: 4 },
  hwTopic: { fontSize: 15, fontWeight: 600, color: '#f0f0f8' },
  hwMeta: { fontSize: 12, color: 'rgba(240,240,248,0.4)' },
}
