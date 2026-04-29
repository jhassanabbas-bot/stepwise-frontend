// src/components/Timer.jsx
import { useState, useEffect, useRef } from 'react'

const SIZE    = 56
const STROKE  = 4
const RADIUS  = (SIZE - STROKE) / 2
const CIRCUM  = 2 * Math.PI * RADIUS

export default function Timer({ seconds, onComplete }) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef = useRef(null)

  useEffect(() => {
    setRemaining(seconds)
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [seconds])

  const progress  = remaining / seconds
  const dashOffset = CIRCUM * (1 - progress)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={STROKE}
        />
        {/* Progress */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          fill="none"
          stroke={remaining > 3 ? '#7c6af7' : '#fbbf24'}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUM}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <span style={{
        position: 'absolute',
        fontSize: 15,
        fontWeight: 700,
        color: remaining > 3 ? '#a78bfa' : '#fbbf24',
        fontFamily: 'Syne, sans-serif',
        marginTop: 18,
      }}>
        {remaining}
      </span>
      <span style={{ fontSize: 11, color: 'rgba(240,240,248,0.4)', marginTop: -4 }}>
        seconds
      </span>
    </div>
  )
}
