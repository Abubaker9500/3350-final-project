const MOCK_CONVOS = [
  { id: 1, name: 'Alex', age: 22, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', lastMsg: 'Hey! Saw you like coffee too 😄', time: '2m', unread: 2, revealed: false },
  { id: 2, name: 'Jordan', age: 21, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', lastMsg: 'What\'s your favorite spot on campus?', time: '1h', unread: 0, revealed: false },
  { id: 3, name: 'Riley', age: 23, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', lastMsg: 'Profile revealed! Nice to meet you 🎉', time: '2d', unread: 0, revealed: true },
]

export default function Messages({ navigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--gray-100)' }}>
      <div style={{ background: 'var(--blue)', padding: '16px 20px' }}>
        <h1 style={{ color: 'var(--white)', fontSize: 22, fontWeight: 800 }}>Rowdy</h1>
      </div>

      <div style={{ padding: '20px 16px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Messages</h2>

        {MOCK_CONVOS.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
            <p>No messages yet. Match with someone to start chatting!</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {MOCK_CONVOS.map(c => (
            <button key={c.id} onClick={() => navigate('chat', c)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'var(--white)', borderRadius: 14, padding: '14px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'left', marginBottom: 8,
              }}>
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 54, height: 54, borderRadius: '50%', overflow: 'hidden',
                  filter: c.revealed ? 'none' : 'blur(6px)',
                  background: '#ccc',
                }}>
                  <img src={c.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {!c.revealed && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,53,148,0.15)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <span style={{ fontSize: 15, fontWeight: c.unread > 0 ? 700 : 600, color: 'var(--gray-800)' }}>
                    {c.revealed ? `${c.name}, ${c.age}` : 'Anonymous Rowdy'}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{c.time}</span>
                </div>
                <p style={{
                  fontSize: 13, color: c.unread > 0 ? 'var(--gray-800)' : 'var(--gray-400)',
                  fontWeight: c.unread > 0 ? 600 : 400,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {c.lastMsg}
                </p>
              </div>

              {c.unread > 0 && (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--blue)', color: 'white',
                  fontSize: 12, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {c.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
