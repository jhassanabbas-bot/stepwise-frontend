// src/components/StepCard.jsx
import { useState } from 'react'
import Timer from './Timer.jsx'

export default function StepCard({ step, stepIndex, totalSteps, isNew, onUnderstood }) {
  const [timerDone, setTimerDone] = useState(false)
  const [endorsed,  setEndorsed]  = useState(false)
  const isLast = stepIndex === totalSteps - 1

  function handleEndorse() {
    setEndorsed(true)
    setTimeout(onUnderstood, 500)
  }

  return (
    <div
      className={isNew ? 'fade-up' : ''}
      style={{
        ...styles.wrap,
        borderColor: isNew ? 'rgba(124,106,247,0.4)' : 'rgba(255,255,255,0.06)',
        background: isNew ? 'rgba(124,106,247,0.06)' : 'rgba(30,30,46,0.6)',
      }}
    >
      {/* Step number badge */}
      <div style={styles.header}>
        <div style={styles.stepBadge}>
          <span style={styles.stepNum}>Step {step.number}</span>
        </div>
        {!isNew && (
          <span style={styles.doneBadge}>✓ Completed</span>
        )}
      </div>

      {/* Step title */}
      <h4 style={styles.title}>{step.title}</h4>

      {/* Action */}
      <div style={styles.actionBox}>
        <span style={styles.actionLabel}>What we do</span>
        <p style={styles.action}>{step.action}</p>
      </div>

      {/* Explanation */}
      <p style={styles.explanation}>{step.explanation}</p>

      {/* Timer + endorsement — only on the newest step */}
      {isNew && (
        <div style={styles.footer}>
          {!timerDone ? (
            <div style={styles.timerRow}>
              <span style={styles.timerText}>Think about this step…</span>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Timer seconds={step.pause_seconds || 8} onComplete={() => setTimerDone(true)} />
              </div>
            </div>
          ) : (
            <button
              className="btn btn-green btn-full fade-in"
              onClick={handleEndorse}
              disabled={endorsed}
              style={{ marginTop: 4 }}
            >
              {endorsed
                ? '✓ Understood!'
                : isLast
                  ? '✓ I understand — see final answer'
                  : '✓ I understand — next step'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrap: {
    border: '1px solid',
    borderRadius: 14,
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    transition: 'all 0.3s',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepBadge: {
    background: 'rgba(124,106,247,0.2)',
    borderRadius: 6,
    padding: '3px 10px',
  },
  stepNum: {
    fontSize: 12,
    fontWeight: 700,
    color: '#a78bfa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  doneBadge: {
    fontSize: 12,
    color: '#34d399',
    fontWeight: 600,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Syne, sans-serif',
    fontWeight: 700,
    color: '#f0f0f8',
    lineHeight: 1.3,
  },
  actionBox: {
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 8,
    padding: '10px 14px',
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: 'rgba(240,240,248,0.35)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: 4,
  },
  action: {
    fontSize: 14,
    color: 'rgba(240,240,248,0.8)',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  explanation: {
    fontSize: 14,
    color: 'rgba(240,240,248,0.65)',
    lineHeight: 1.7,
  },
  footer: {
    marginTop: 4,
  },
  timerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: 10,
    padding: '10px 16px',
  },
  timerText: {
    fontSize: 13,
    color: 'rgba(240,240,248,0.45)',
    fontStyle: 'italic',
  },
}
