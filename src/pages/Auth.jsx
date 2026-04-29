// src/pages/Auth.jsx — Login and Register
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api.js'
import { useAuth } from '../AuthContext.jsx'

function AuthForm({ mode }) {
  const nav            = useNavigate()
  const { login }      = useAuth()
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [pw, setPw]           = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const isRegister = mode === 'register'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let data
      if (isRegister) {
        data = await api.register(email, pw, name)
      } else {
        data = await api.login(email, pw)
      }
      login(data.token, {
        email,
        name: data.name,
        plan: data.plan,
        homeworks_used: data.homeworks_used,
        homeworks_limit: data.homeworks_limit,
      })
      nav('/solve')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-up">
        {/* Logo */}
        <Link to="/" style={styles.logo}>⚡ StepWise</Link>

        <h1 style={styles.title}>
          {isRegister ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={styles.sub}>
          {isRegister
            ? '10 free homework sessions — no credit card needed'
            : 'Continue your guided learning'}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isRegister && (
            <div style={styles.field}>
              <label style={styles.label}>Your name</label>
              <input
                style={styles.input}
                type="text"
                placeholder="e.g. Alex"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password {isRegister && '(min 8 characters)'}</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: 4, fontSize: 16 }}
          >
            {loading
              ? <><span className="spinner" /> {isRegister ? 'Creating account…' : 'Logging in…'}</>
              : isRegister ? 'Start learning for free' : 'Log in'
            }
          </button>
        </form>

        <p style={styles.switch}>
          {isRegister
            ? <>Already have an account? <Link to="/login" style={styles.link}>Log in</Link></>
            : <>New to StepWise? <Link to="/register" style={styles.link}>Create free account</Link></>
          }
        </p>
      </div>
    </div>
  )
}

export function Login()    { return <AuthForm mode="login" /> }
export function Register() { return <AuthForm mode="register" /> }

const styles = {
  page: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    padding: '24px', background: '#0a0a0f',
  },
  card: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '36px 32px',
    width: '100%', maxWidth: 420,
    display: 'flex', flexDirection: 'column', gap: 16,
  },
  logo: { fontSize: 18, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8', alignSelf: 'flex-start' },
  title: { fontSize: 24, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8', marginTop: 4 },
  sub: { fontSize: 14, color: 'rgba(240,240,248,0.5)', lineHeight: 1.5 },
  form: { display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: 'rgba(240,240,248,0.6)' },
  input: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '12px 14px',
    fontSize: 15, color: '#f0f0f8',
    minHeight: 48,
    transition: 'border-color 0.2s',
  },
  error: {
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 8, padding: '10px 14px',
    fontSize: 13, color: '#fca5a5',
  },
  switch: { fontSize: 13, color: 'rgba(240,240,248,0.4)', textAlign: 'center', marginTop: 4 },
  link: { color: '#a78bfa', fontWeight: 600 },
}
