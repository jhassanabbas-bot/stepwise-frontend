// src/components/CheckQuestion.jsx
import { useState } from 'react'

export default function CheckQuestion({ checkQ, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  function handleSelect(idx) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    const correct = idx === checkQ.correct_index
    setTimeout(() => onComplete(correct), correct ? 1200 : 2000)
  }

  return (
    <div className="fade-up" style={styles.wrap}>
      <div style={styles.header}>
        <span style={styles.badge}>Quick Check ✓</span>
        <p style={styles.hint}>Test your understanding</p>
      </div>

      <p style={styles.question}>{checkQ.question}</p>

      <div style={styles.options}>
        {checkQ.options.map((opt, i) => {
          const isCorrect  = i === checkQ.correct_index
          const isSelected = i === selected

          let bg     = 'rgba(255,255,255,0.04)'
          let border = 'rgba(255,255,255,0.08)'
          let color  = 'rgba(240,240,248,0.75)'

          if (revealed && isCorrect) {
            bg = 'rgba(52,211,153,0.15)'; border = '#34d399'; color = '#34d399'
          } else if (revealed && isSelected && !isCorrect) {
            bg = 'rgba(239,68,68,0.15)'; border = '#ef4444'; color = '#ef4444'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              style={{ ...styles.option, background: bg, borderColor: border, color }}
            >
              <span style={styles.optLetter}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {revealed && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {revealed && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          )
        })}
      </div>

      {revealed && (
        <p className="fade-in" style={{
          fontSize: 13, textAlign: 'center',
          color: selected === checkQ.correct_index ? '#34d399' : '#fbbf24',
          marginTop: 4,
        }}>
          {selected === checkQ.correct_index
            ? '🎉 Correct! Moving to next question…'
            : '💡 Not quite — the correct answer is highlighted. Moving on…'}
        </p>
      )}
    </div>
  )
}

const styles = {
  wrap: {
    background: 'rgba(124,106,247,0.06)',
    border: '1px solid rgba(124,106,247,0.25)',
    borderRadius: 14,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    background: 'rgba(124,106,247,0.2)',
    color: '#a78bfa',
    borderRadius: 6,
    padding: '3px 10px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  hint: {
    fontSize: 12,
    color: 'rgba(240,240,248,0.4)',
  },
  question: {
    fontSize: 15,
    fontWeight: 600,
    color: '#f0f0f8',
    lineHeight: 1.5,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid',
    fontSize: 14,
    textAlign: 'left',
    transition: 'all 0.25s',
    cursor: 'pointer',
    minHeight: 48,
    fontFamily: 'DM Sans, sans-serif',
  },
  optLetter: {
    width: 24, height: 24,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },
}
