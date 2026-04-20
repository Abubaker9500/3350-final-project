import { useState } from 'react'

const HOBBIES = ['Gaming', 'Travel', 'Fitness', 'Cooking', 'Reading', 'Music', 'Art', 'Basketball']
const MAJORS = ['Computer Science', 'Business Administration', 'Biology', 'Psychology', 'Engineering', 'Nursing', 'Math', 'History', 'English', 'Other']

// Note: This is a static profile page for demonstration. In a real app, profile data would be fetched from a server and updates would be sent back to the server.
export default function Profile({ navigate }) {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Team', age: 123, major: 'Computer Science',
    year: 'Junior', bio: 'CS student at CSUB. Love coding, gaming, and exploring new restaurants around Bakersfield!',
    hobbies: ['Gaming', 'Coding', 'Travel'],
    email: 'team@csub.edu',
  })
  const [edit, setEdit] = useState({ ...profile })

  const saveEdit = () => { setProfile({ ...edit }); setEditing(false) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--gray-100)' }}>
      {/* Header */}
      <div style={{ background: 'var(--blue)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'var(--white)', fontSize: 22, fontWeight: 800 }}>Rowdy</h1>
        <button onClick={() => setEditing(true)} style={{ color: 'var(--white)', fontSize: 14, fontWeight: 600 }}>Edit</button>
      </div>

      {!editing ? (
        <ViewMode profile={profile} navigate={navigate} onEdit={() => setEditing(true)} />
      ) : (
        <EditMode edit={edit} setEdit={setEdit} onSave={saveEdit} onCancel={() => setEditing(false)} />
      )}
    </div>
  )
}

function ViewMode({ profile, navigate, onEdit }) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Profile card */}
      <div style={{ background: 'var(--white)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <div style={{ background: 'var(--blue)', height: 90, position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: -36, left: 20,
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--yellow)', border: '4px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 800, color: 'var(--blue)',
          }}>
            {profile.name.charAt(0)}
          </div>
        </div>
        <div style={{ padding: '44px 20px 20px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-800)' }}>{profile.name}, {profile.age}</h2>
          <p style={{ color: 'var(--gray-600)', fontSize: 14, marginBottom: 4 }}>{profile.major} • {profile.year}</p>
          <p style={{ color: 'var(--gray-400)', fontSize: 13 }}>{profile.email}</p>
        </div>
      </div>

      {/* Bio */}
      <div style={{ background: 'var(--white)', borderRadius: 14, padding: '16px 18px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>About</h3>
        <p style={{ fontSize: 15, color: 'var(--gray-800)', lineHeight: 1.6 }}>{profile.bio}</p>
      </div>

      {/* Hobbies */}
      <div style={{ background: 'var(--white)', borderRadius: 14, padding: '16px 18px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Interests</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {profile.hobbies.map(h => (
            <span key={h} style={{
              padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              background: 'var(--blue-light)', color: 'var(--blue)',
            }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onEdit} style={{
          padding: 14, background: 'var(--blue)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 15,
        }}>Edit Profile</button>

        <button onClick={() => setShowSettings(true)} style={{
          padding: 14, background: 'var(--white)', color: 'var(--gray-600)', borderRadius: 12, fontWeight: 600, fontSize: 15,
          border: '1.5px solid var(--gray-200)',
        }}>Settings</button>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  )
}

function EditMode({ edit, setEdit, onSave, onCancel }) {
  const toggleHobby = (h) => {
    setEdit(f => ({
      ...f,
      hobbies: f.hobbies.includes(h) ? f.hobbies.filter(x => x !== h) : [...f.hobbies, h],
    }))
  }

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field label="Name">
        <input value={edit.name} onChange={e => setEdit(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
      </Field>
      <Field label="Major">
        <select value={edit.major} onChange={e => setEdit(f => ({ ...f, major: e.target.value }))} style={{ ...inputStyle, background: 'white' }}>
          {MAJORS.map(m => <option key={m}>{m}</option>)}
        </select>
      </Field>
      <Field label="Year">
        <select value={edit.year} onChange={e => setEdit(f => ({ ...f, year: e.target.value }))} style={{ ...inputStyle, background: 'white' }}>
          {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(y => <option key={y}>{y}</option>)}
        </select>
      </Field>
      <Field label="Bio">
        <textarea value={edit.bio} onChange={e => setEdit(f => ({ ...f, bio: e.target.value }))} rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
      </Field>
      <Field label="Interests">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {HOBBIES.map(h => {
            const active = edit.hobbies.includes(h)
            return (
              <button key={h} onClick={() => toggleHobby(h)} style={{
                padding: '8px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                border: `2px solid ${active ? 'var(--blue)' : 'var(--gray-200)'}`,
                background: active ? 'var(--blue)' : 'white',
                color: active ? 'white' : 'var(--gray-600)',
              }}>{h}</button>
            )
          })}
        </div>
      </Field>
      <div style={{ display: 'flex', gap: 10, paddingBottom: 20 }}>
        <button onClick={onCancel} style={{ flex: 1, padding: 14, borderRadius: 12, border: '2px solid var(--blue)', color: 'var(--blue)', fontWeight: 700 }}>Cancel</button>
        <button onClick={onSave} style={{ flex: 2, padding: 14, background: 'var(--blue)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 15 }}>Save Changes</button>
      </div>
    </div>
  )
}

function SettingsModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', zIndex: 200 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px 20px', width: '100%' }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue)', marginBottom: 20 }}>Settings</h3>
        {[
          { label: '🔔 Notifications', sub: 'Manage alerts' },
          { label: '🔒 Privacy', sub: 'Control your data' },
          { label: '❓ Help & Support', sub: 'FAQ and contact' },
          { label: '🚪 Log Out', sub: '', danger: true },
        ].map(item => (
          <button key={item.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', padding: '14px 0', borderBottom: '1px solid var(--gray-200)',
            color: item.danger ? 'var(--red)' : 'var(--gray-800)', textAlign: 'left',
          }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600 }}>{item.label}</p>
              {item.sub && <p style={{ fontSize: 13, color: 'var(--gray-400)' }}>{item.sub}</p>}
            </div>
            {!item.danger && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>}
          </button>
        ))}
        <button onClick={onClose} style={{ width: '100%', marginTop: 16, padding: 13, background: 'var(--gray-100)', borderRadius: 12, fontWeight: 600, color: 'var(--gray-600)' }}>Close</button>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = { width: '100%', padding: '12px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 15, outline: 'none' }
