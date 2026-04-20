// TODO: Replace with real API call when backend is ready
const MOCK_MATCHES = [
  { id: 1, name: 'Alex', age: 22, major: 'Business Administration', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', matchedAt: '2 hours ago', isNew: true },
]

export default function Matches({ navigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--gray-100)' }}>
      <div style={{ background: 'var(--blue)', padding: '16px 20px' }}>
        <h1 style={{ color: 'var(--white)', fontSize: 22, fontWeight: 800 }}>Rowdy</h1>
      </div>

      <div style={{ padding: '20px 16px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-800)', marginBottom: 4 }}>Your Matches</h2>
        <p style={{ color: 'var(--gray-600)', fontSize: 14, marginBottom: 20 }}>
          {MOCK_MATCHES.filter(m => m.isNew).length} new match
        </p>

        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>New</h3>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4, marginBottom: 28 }}>
          {MOCK_MATCHES.filter(m => m.isNew).map(m => (
            <button key={m.id} onClick={() => navigate('chat', m)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 72, background: 'none' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 68, height: 68, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--yellow)' }}>
                  <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: '50%', background: '#22c55e', border: '2px solid white' }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-800)' }}>{m.name}</span>
            </button>
          ))}
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>All Matches</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_MATCHES.map(m => (
            <button key={m.id} onClick={() => navigate('chat', m)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'var(--white)', borderRadius: 14, padding: '14px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'left',
              }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-800)' }}>{m.name}, {m.age}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{m.matchedAt}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 2 }}>{m.major}</p>
              </div>
              {m.isNew && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}