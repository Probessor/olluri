export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--primary)',
      color: '#fff',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <p style={{ fontSize: '3rem', marginBottom: 16 }}>🚧</p>
      <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>
        _sidelengs
      </h1>
      <p style={{ fontSize: '1.1rem', opacity: 0.75, maxWidth: 400 }}>
        Vi er under bygging. Kommer snart.
      </p>
    </div>
  )
}
