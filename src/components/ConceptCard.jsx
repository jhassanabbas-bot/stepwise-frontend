// src/components/ConceptCard.jsx
import { useState } from 'react'
import Timer from './Timer.jsx'

export default function ConceptCard({ concept, subject, topic, onUnderstood }) {
  const [timerDone, setTimerDone]     = useState(false)
  const [endorsed,  setEndorsed]      = useState(false)

  function handleEndorse() {
    setEndorsed(true)
    setTimeout(onUnderstood, 600)
  }

  return (
    <div className="fade-up" style={styles.wrap}>
      {/* Subject pill */}
      <div style={styles.pill}>{subject}</div>

      {/* Topic */}
      <h2 style={styles.topic}>{topic}</h2>

      {/* Concept card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardIcon}>💡</span>
          <h3 style={styles.cardTitle}>{concept.title}</h3>
        </div>

        <p style={styles.explanation}>{concept.explanation}</p>

        <div style={styles.whyBox}>
          <span style={styles.whyLabel}>Why it matters</span>
          <p style={styles.whyText}>{concept.why_it_matters}</p>
        </div>

        {concept.key_points?.length > 0 && (
          <ul style={styles.keyPoints}>
            {concept.key_points.map((pt, i) => (
              <li key={i} style={styles.keyPoint}>
                <span style={styles.bullet}>→</span>
                {pt}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Timer + endorsement */}
      <div style={styles.timerSection}>
        {!timerDone ? (
          <>
            <p style={styles.timerLabel}>Read carefully — button unlocks in</p>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Timer seconds={10} onComplete={() => setTimerDone(true)} />
            </div>
          </>
        ) : (
          <button
            className="btn btn-green btn-full fade-in"
            onClick={handleEndorse}
            disabled={endorsed}
            style={{ fontSize: 17, padding: '16px 24px' }}
          >
            {endorsed ? '✓ Got it!' : '✓ I understand this concept'}
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    maxWidth: 560,
    margin: '0 auto',
    padding: '0 4px',
  },
  pill: {
    display: 'inline-block',
    background: 'rgba(124,106,247,0.18)',
    border: '1px solid rgba(124,106,247,0.3)',
    color: '#a78bfa',
    borderRadius: 20,
    padding: '4px 14px',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  topic: {
    fontSize: 'clamp(22px, 5vw, 30px)',
    fontFamily: 'Syne, sans-serif',
    fontWeight: 800,
    color: '#f0f0f8',
    lineHeight: 1.2,
  },
  card: {
    background: '#1e1e2e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 22,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardIcon: {
    fontSize: 24,
    flexShrink: 0,
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    color: '#f0f0f8',
    lineHeight: 1.3,
  },
  explanation: {
    fontSize: 15,
    lineHeight: 1.7,
    color: 'rgba(240,240,248,0.82)',
  },
  whyBox: {
    background: 'rgba(124,106,247,0.1)',
    border: '1px solid rgba(124,106,247,0.2)',
    borderRadius: 10,
    padding: '12px 16px',
  },
  whyLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#a78bfa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: 6,
  },
  whyText: {
    fontSize: 14,
    color: 'rgba(240,240,248,0.75)',
    lineHeight: 1.6,
  },
  keyPoints: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  keyPoint: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 14,
    color: 'rgba(240,240,248,0.75)',
    lineHeight: 1.5,
  },
  bullet: {
    color: '#7c6af7',
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 1,
  },
  timerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    padding: '4px 0 8px',
  },
  timerLabel: {
    fontSize: 13,
    color: 'rgba(240,240,248,0.45)',
    textAlign: 'center',
  },
}
