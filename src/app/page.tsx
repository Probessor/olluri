export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#123524',
      color: '#F3F7F5',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <p style={{ fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '1.5rem' }}>
        Coming Soon
      </p>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, lineHeight: 1, margin: 0, color: '#F3F7F5' }}>
        In the making.
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.7, marginTop: '2rem', maxWidth: '480px' }}>
        Something new is taking shape. Check back soon.
      </p>
      <a href="mailto:hello@bess.no" style={{
        marginTop: '3rem',
        padding: '0.75rem 2rem',
        border: '1px solid rgba(243,247,245,0.4)',
        borderRadius: '999px',
        color: '#F3F7F5',
        textDecoration: 'none',
        fontSize: '0.95rem',
        opacity: 0.8,
      }}>
        hello@bess.no
      </a>
    </div>
  )
}
