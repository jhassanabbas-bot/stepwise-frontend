// src/pages/Solve.jsx — Core homework experience
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'
import { useAuth } from '../AuthContext.jsx'
import ConceptCard from '../components/ConceptCard.jsx'
import StepCard from '../components/StepCard.jsx'
import CheckQuestion from '../components/CheckQuestion.jsx'

// ── Phases ────────────────────────────────────────────────
// upload → loading → concept → solving → done
// ─────────────────────────────────────────────────────────

export default function Solve() {
  const nav             = useNavigate()
  const { user, updateUsage } = useAuth()
  const fileRef         = useRef(null)

  const [phase, setPhase]         = useState('upload')   // upload | loading | concept | solving | done
  const [hwData, setHwData]       = useState(null)
  const [error, setError]         = useState('')
  const [dragOver, setDragOver]   = useState(false)

  // Solving state
  const [questionIdx, setQuestionIdx] = useState(0)
  const [stepIdx, setStepIdx]         = useState(0)        // how many steps revealed so far
  const [showCheck, setShowCheck]     = useState(false)
  const [showAnswer, setShowAnswer]   = useState(false)

  // ── File upload ──────────────────────────────────────────
  async function handleFile(file) {
    if (!file) return
    const allowed = ['pdf','jpg','jpeg','png','webp','heic']
    const ext = file.name.split('.').pop().toLowerCase()
    if (!allowed.includes(ext)) {
      setError('Please upload a PDF or image file (JPG, PNG, WEBP).')
      return
    }
    setError('')
    setPhase('loading')
    try {
      const result = await api.analyseHomework(file)
      setHwData(result.data)
      updateUsage((user?.homeworks_used || 0) + 1)
      setPhase('concept')
    } catch (err) {
      setError(err.message)
      setPhase('upload')
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  // ── Solving helpers ──────────────────────────────────────
  const questions     = hwData?.questions || []
  const currentQ      = questions[questionIdx]
  const currentSteps  = currentQ?.steps || []
  const revealedSteps = currentSteps.slice(0, stepIdx + 1)
  const allStepsShown = stepIdx >= currentSteps.length - 1

  function handleStepUnderstood() {
    if (allStepsShown) {
      // All steps done — show check question or final answer
      if (currentQ.check_question) {
        setShowCheck(true)
      } else {
        setShowAnswer(true)
      }
    } else {
      setStepIdx(prev => prev + 1)
    }
  }

  function handleCheckDone(correct) {
    setShowCheck(false)
    setShowAnswer(true)
  }

  function nextQuestion() {
    if (questionIdx >= questions.length - 1) {
      setPhase('done')
    } else {
      setQuestionIdx(prev => prev + 1)
      setStepIdx(0)
      setShowCheck(false)
      setShowAnswer(false)
    }
  }

  function startOver() {
    setPhase('upload')
    setHwData(null)
    setError('')
    setQuestionIdx(0)
    setStepIdx(0)
    setShowCheck(false)
    setShowAnswer(false)
  }

  // ── Remaining homeworks ──────────────────────────────────
  const remaining = (user?.homeworks_limit || 10) - (user?.homeworks_used || 0)

  // ══════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════
  return (
    <div style={styles.page}>

      {/* Top nav */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => nav('/')}>⚡ StepWise</div>
        <div style={styles.navRight}>
          {phase !== 'upload' && (
            <button className="btn btn-ghost" onClick={startOver}
              style={{ padding: '8px 16px', fontSize: 13 }}>
              ← New homework
            </button>
          )}
          {user && (
            <div style={styles.usageChip}>
              {user.plan === 'free_trial'
                ? `${remaining} free left`
                : '∞ Unlimited'}
            </div>
          )}
          <button className="btn btn-ghost" onClick={() => nav('/dashboard')}
            style={{ padding: '8px 16px', fontSize: 13 }}>
            History
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.main}>

        {/* ── UPLOAD PHASE ── */}
        {phase === 'upload' && (
          <div className="fade-up" style={styles.uploadWrap}>
            <h1 style={styles.uploadTitle}>Upload your homework</h1>
            <p style={styles.uploadSub}>
              Photo of your homework sheet or a PDF file
            </p>

            {error && <div style={styles.errorBox}>{error}</div>}

            {/* Drop zone */}
            <div
              style={{
                ...styles.dropZone,
                borderColor: dragOver ? '#7c6af7' : 'rgba(255,255,255,0.12)',
                background: dragOver ? 'rgba(124,106,247,0.08)' : 'rgba(255,255,255,0.02)',
              }}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current?.click()}
            >
              <div style={styles.dropIcon}>📸</div>
              <p style={styles.dropText}>Take a photo or upload a file</p>
              <p style={styles.dropHint}>JPG, PNG, PDF · Max 20MB</p>
            </div>

            <input
              ref={fileRef} type="file" style={{ display: 'none' }}
              accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
              capture="environment"
              onChange={e => handleFile(e.target.files[0])}
            />

            {/* Big camera button for mobile */}
            <button
              className="btn btn-primary btn-full"
              onClick={() => fileRef.current?.click()}
              style={{ fontSize: 17, padding: '18px', marginTop: 4 }}
            >
              📷 Upload homework
            </button>

            {remaining <= 3 && user?.plan === 'free_trial' && (
              <div style={styles.trialWarning}>
                ⚠️ {remaining} free {remaining === 1 ? 'session' : 'sessions'} remaining.{' '}
                <a href="mailto:jhassan.abbas@gmail.com" style={{ color: '#a78bfa' }}>
                  Contact us to upgrade
                </a>
              </div>
            )}
          </div>
        )}

        {/* ── LOADING PHASE ── */}
        {phase === 'loading' && (
          <div className="fade-in" style={styles.loadingWrap}>
            <div style={styles.loadingSpinner} />
            <h2 style={styles.loadingTitle}>Reading your homework…</h2>
            <p style={styles.loadingText}>
              StepWise is identifying the topic and preparing<br />
              your guided solutions. This takes 10–20 seconds.
            </p>
            <div style={styles.loadingSteps}>
              {['Reading the questions', 'Identifying the concept', 'Building step-by-step solutions'].map((s, i) => (
                <div key={i} style={{ ...styles.loadingStep, animationDelay: `${i * 0.6}s` }}>
                  <span style={styles.loadingDot} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONCEPT PHASE ── */}
        {phase === 'concept' && hwData && (
          <ConceptCard
            concept={hwData.concept}
            subject={hwData.subject}
            topic={hwData.topic}
            onUnderstood={() => {
              setPhase('solving')
              setStepIdx(0)
            }}
          />
        )}

        {/* ── SOLVING PHASE ── */}
        {phase === 'solving' && currentQ && (
          <div style={styles.solvingWrap}>
            {/* Progress */}
            <div style={styles.progress}>
              <div style={styles.progressText}>
                Question {questionIdx + 1} of {questions.length}
              </div>
              <div style={styles.progressBar}>
                <div style={{
                  ...styles.progressFill,
                  width: `${((questionIdx) / questions.length) * 100}%`,
                }} />
              </div>
            </div>

            {/* Question text */}
            <div style={styles.questionBox}>
              <div style={styles.questionLabel}>Question {questionIdx + 1}</div>
              <p style={styles.questionText}>{currentQ.text}</p>
            </div>

            {/* Steps revealed so far */}
            <div style={styles.steps}>
              {revealedSteps.map((step, i) => (
                <StepCard
                  key={`${questionIdx}-${i}`}
                  step={step}
                  stepIndex={i}
                  totalSteps={currentSteps.length}
                  isNew={i === stepIdx && !showCheck && !showAnswer}
                  onUnderstood={handleStepUnderstood}
                />
              ))}
            </div>

            {/* Check question */}
            {showCheck && currentQ.check_question && (
              <CheckQuestion
                checkQ={currentQ.check_question}
                onComplete={handleCheckDone}
              />
            )}

            {/* Final answer */}
            {showAnswer && (
              <div className="fade-up" style={styles.answerBox}>
                <div style={styles.answerLabel}>✅ Full Solution</div>
                <p style={styles.answerText}>{currentQ.final_answer}</p>
                <button
                  className="btn btn-primary btn-full"
                  onClick={nextQuestion}
                  style={{ marginTop: 12, fontSize: 16 }}
                >
                  {questionIdx >= questions.length - 1
                    ? '🎉 Complete homework'
                    : `Next question →`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── DONE PHASE ── */}
        {phase === 'done' && (
          <div className="fade-up" style={styles.doneWrap}>
            <div style={styles.doneIcon}>🎉</div>
            <h2 style={styles.doneTitle}>Homework complete!</h2>
            <p style={styles.doneSub}>
              You worked through {questions.length} question{questions.length !== 1 ? 's' : ''} on{' '}
              <strong style={{ color: '#a78bfa' }}>{hwData?.topic}</strong>.
              Great work!
            </p>
            <div style={styles.doneBtns}>
              <button className="btn btn-primary" onClick={startOver}
                style={{ fontSize: 15, padding: '14px 28px' }}>
                📚 Upload another homework
              </button>
              <button className="btn btn-ghost" onClick={() => nav('/dashboard')}
                style={{ fontSize: 15, padding: '14px 28px' }}>
                View history
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column' },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'sticky', top: 0, background: 'rgba(10,10,15,0.95)',
    backdropFilter: 'blur(12px)', zIndex: 50,
  },
  logo: { fontSize: 18, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8', cursor: 'pointer' },
  navRight: { display: 'flex', alignItems: 'center', gap: 10 },
  usageChip: {
    background: 'rgba(124,106,247,0.15)', border: '1px solid rgba(124,106,247,0.3)',
    color: '#a78bfa', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600,
  },
  main: {
    flex: 1, padding: '28px 20px 60px',
    maxWidth: 600, width: '100%', margin: '0 auto',
  },

  // Upload
  uploadWrap: { display: 'flex', flexDirection: 'column', gap: 16 },
  uploadTitle: { fontSize: 28, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8' },
  uploadSub: { fontSize: 15, color: 'rgba(240,240,248,0.5)', marginBottom: 4 },
  errorBox: {
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#fca5a5',
  },
  dropZone: {
    border: '2px dashed', borderRadius: 16,
    padding: '40px 24px', textAlign: 'center',
    cursor: 'pointer', transition: 'all 0.2s',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
  },
  dropIcon: { fontSize: 40 },
  dropText: { fontSize: 16, fontWeight: 600, color: 'rgba(240,240,248,0.7)' },
  dropHint: { fontSize: 13, color: 'rgba(240,240,248,0.35)' },
  trialWarning: {
    background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
    borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#fbbf24',
    textAlign: 'center',
  },

  // Loading
  loadingWrap: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 20, paddingTop: 60, textAlign: 'center',
  },
  loadingSpinner: {
    width: 52, height: 52,
    border: '3px solid rgba(124,106,247,0.2)',
    borderTop: '3px solid #7c6af7',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingTitle: { fontSize: 22, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0f0f8' },
  loadingText: { fontSize: 14, color: 'rgba(240,240,248,0.5)', lineHeight: 1.7 },
  loadingSteps: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginTop: 8 },
  loadingStep: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontSize: 13, color: 'rgba(240,240,248,0.4)',
    animation: 'fadeIn 0.5s ease both',
  },
  loadingDot: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#7c6af7', flexShrink: 0,
  },

  // Solving
  solvingWrap: { display: 'flex', flexDirection: 'column', gap: 16 },
  progress: { display: 'flex', flexDirection: 'column', gap: 6 },
  progressText: { fontSize: 12, color: 'rgba(240,240,248,0.4)', fontWeight: 600 },
  progressBar: { height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 },
  progressFill: { height: '100%', background: '#7c6af7', borderRadius: 2, transition: 'width 0.4s ease' },
  questionBox: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14, padding: '18px 20px',
  },
  questionLabel: { fontSize: 11, fontWeight: 700, color: '#7c6af7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 },
  questionText: { fontSize: 15, color: '#f0f0f8', lineHeight: 1.65, fontWeight: 500 },
  steps: { display: 'flex', flexDirection: 'column', gap: 12 },
  answerBox: {
    background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)',
    borderRadius: 14, padding: '20px',
  },
  answerLabel: { fontSize: 13, fontWeight: 700, color: '#34d399', marginBottom: 10 },
  answerText: { fontSize: 15, color: 'rgba(240,240,248,0.8)', lineHeight: 1.7 },

  // Done
  doneWrap: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 18, paddingTop: 60, textAlign: 'center',
  },
  doneIcon: { fontSize: 64 },
  doneTitle: { fontSize: 28, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8' },
  doneSub: { fontSize: 16, color: 'rgba(240,240,248,0.6)', lineHeight: 1.6, maxWidth: 380 },
  doneBtns: { display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 },
}
