// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const nav = useNavigate()

  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.logo}>⚡ StepWise</div>
        <div style={styles.navRight}>
          <button className="btn btn-ghost" onClick={() => nav('/login')}
            style={{ padding: '10px 20px', fontSize: 14 }}>
            Log in
          </button>
          <button className="btn btn-primary" onClick={() => nav('/register')}
            style={{ padding: '10px 20px', fontSize: 14 }}>
            Start free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>For High School Students · STEM</div>
        <h1 style={styles.heroTitle}>
          Homework that<br />
          <span style={styles.heroAccent}>actually teaches you</span>
        </h1>
        <p style={styles.heroSub}>
          Upload your homework. StepWise explains the concept,
          then guides you through each question step by step —
          with real pauses to make sure it sticks.
        </p>
        <div style={styles.heroBtns}>
          <button className="btn btn-primary" onClick={() => nav('/register')}
            style={{ fontSize: 16, padding: '16px 32px' }}>
            Try free — 10 homeworks
          </button>
          <button className="btn btn-ghost" onClick={() => nav('/login')}
            style={{ fontSize: 16, padding: '16px 32px' }}>
            Log in →
          </button>
        </div>
      </section>

      {/* How it works */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>How it works</div>
        <h2 style={styles.sectionTitle}>Four steps to understanding</h2>
        <div style={styles.steps}>
          {[
            { num: '01', icon: '📸', title: 'Upload your homework', desc: 'Photo or PDF — handwritten or printed. Works on any phone.' },
            { num: '02', icon: '💡', title: 'Learn the concept first', desc: 'Before any solutions, StepWise explains what the homework is actually about.' },
            { num: '03', icon: '🧩', title: 'Steps revealed one at a time', desc: 'Each step has a pause. You read, think, then confirm you understand before moving on.' },
            { num: '04', icon: '✅', title: 'Quick comprehension check', desc: 'After each question, a short quiz confirms you really got it.' },
          ].map(s => (
            <div key={s.num} style={styles.stepCard}>
              <div style={styles.stepNum}>{s.num}</div>
              <div style={styles.stepIcon}>{s.icon}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section style={{ ...styles.section, textAlign: 'center' }}>
        <div style={styles.sectionLabel}>Subjects covered</div>
        <h2 style={styles.sectionTitle}>Built for STEM</h2>
        <div style={styles.subjects}>
          {['📐 Geometry', '📊 Algebra', '🧮 Calculus', '⚗️ Chemistry',
            '⚡ Physics', '🧬 Biology', '📈 Statistics', '🔢 Trigonometry'].map(s => (
            <div key={s} style={styles.subjectPill}>{s}</div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ ...styles.section, textAlign: 'center' }}>
        <div style={styles.sectionLabel}>Pricing</div>
        <h2 style={styles.sectionTitle}>Less than one tutoring session</h2>
        <div style={styles.pricing}>
          <div style={styles.priceCard}>
            <div style={styles.planName}>Free Trial</div>
            <div style={styles.price}>$0</div>
            <div style={styles.pricePer}>no credit card</div>
            <ul style={styles.features}>
              {['10 homework sessions', 'All STEM subjects', 'Photo & PDF upload', 'Step-by-step guidance'].map(f => (
                <li key={f} style={styles.feature}><span style={{ color: '#34d399' }}>✓</span> {f}</li>
              ))}
            </ul>
            <button className="btn btn-ghost btn-full" onClick={() => nav('/register')}>
              Start free trial
            </button>
          </div>

          <div style={{ ...styles.priceCard, borderColor: 'rgba(124,106,247,0.4)', position: 'relative' }}>
            <div style={styles.popularBadge}>Most Popular</div>
            <div style={styles.planName}>Monthly</div>
            <div style={styles.price}>$14.99</div>
            <div style={styles.pricePer}>per month</div>
            <ul style={styles.features}>
              {['Unlimited homework sessions', 'All STEM subjects', 'Photo & PDF upload',
                'Step-by-step guidance', 'Comprehension checks', 'Progress history'].map(f => (
                <li key={f} style={styles.feature}><span style={{ color: '#34d399' }}>✓</span> {f}</li>
              ))}
            </ul>
            <button className="btn btn-primary btn-full" onClick={() => nav('/register')}>
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.logo}>⚡ StepWise</div>
        <p style={{ fontSize: 13, color: 'rgba(240,240,248,0.35)' }}>
          © 2026 StepWise · Guided Homework Solutions
        </p>
        <p style={{ fontSize: 13, color: 'rgba(240,240,248,0.35)' }}>
          Questions? <a href="mailto:jhassan.abbas@gmail.com"
            style={{ color: 'rgba(240,240,248,0.5)' }}>jhassan.abbas@gmail.com</a>
        </p>
      </footer>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0a0a0f' },
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'sticky', top: 0, background: 'rgba(10,10,15,0.9)',
    backdropFilter: 'blur(12px)', zIndex: 100,
  },
  logo: { fontSize: 20, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8' },
  navRight: { display: 'flex', gap: 10 },
  hero: {
    maxWidth: 680, margin: '0 auto',
    padding: '80px 24px 70px',
    textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
  },
  heroBadge: {
    background: 'rgba(124,106,247,0.15)', border: '1px solid rgba(124,106,247,0.3)',
    color: '#a78bfa', borderRadius: 20, padding: '4px 14px',
    fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
  },
  heroTitle: {
    fontSize: 'clamp(36px, 8vw, 60px)', fontFamily: 'Syne, sans-serif',
    fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#f0f0f8',
  },
  heroAccent: {
    background: 'linear-gradient(135deg, #7c6af7, #a78bfa)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: { fontSize: 17, color: 'rgba(240,240,248,0.6)', lineHeight: 1.7, maxWidth: 500 },
  heroBtns: { display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  section: { maxWidth: 1000, margin: '0 auto', padding: '70px 24px' },
  sectionLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
    color: '#7c6af7', marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 'clamp(24px, 4vw, 36px)', fontFamily: 'Syne, sans-serif',
    fontWeight: 800, color: '#f0f0f8', marginBottom: 36,
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16,
  },
  stepCard: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 14, padding: '24px 20px',
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  stepNum: { fontSize: 11, fontWeight: 700, color: 'rgba(124,106,247,0.6)', letterSpacing: '1px' },
  stepIcon: { fontSize: 28 },
  stepTitle: { fontSize: 16, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0f0f8' },
  stepDesc: { fontSize: 13, color: 'rgba(240,240,248,0.55)', lineHeight: 1.6 },
  subjects: { display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 24 },
  subjectPill: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '8px 18px', fontSize: 14, color: 'rgba(240,240,248,0.7)',
  },
  pricing: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20, maxWidth: 620, margin: '36px auto 0',
  },
  priceCard: {
    background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16, padding: '28px 24px',
    display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left',
  },
  popularBadge: {
    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
    background: '#7c6af7', color: '#fff', borderRadius: 20,
    padding: '3px 14px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
  },
  planName: { fontSize: 12, fontWeight: 700, color: 'rgba(240,240,248,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  price: { fontSize: 42, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#f0f0f8', lineHeight: 1 },
  pricePer: { fontSize: 13, color: 'rgba(240,240,248,0.4)', marginBottom: 8 },
  features: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 },
  feature: { fontSize: 14, color: 'rgba(240,240,248,0.7)', display: 'flex', gap: 8, alignItems: 'flex-start' },
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '32px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: 12,
  },
}
