import { useState } from 'react'

const HOBBIES = [
  'Gaming', 'Travel', 'Fitness', 'Cooking', 'Reading', 'Music',
  'Art', 'Basketball', 'Soccer', 'Hiking', 'Photography', 'Dancing',
  'Chess', 'Coding', 'Volunteering', 'Movies', 'Yoga', 'Baking',
]

const MAJORS = [
  'Computer Science', 'Business Administration', 'Biology',
  'Psychology', 'Engineering', 'Nursing', 'Math', 'History',
  'English', 'Criminal Justice', 'Education', 'Kinesiology', 'Other',
]

export default function CreateProfile({ onDone }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', birthdate: '', gender: '', lookingFor: '',
    major: '', bio: '', hobbies: [],
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleHobby = (h) => {
    setForm(f => ({
      ...f,
      hobbies: f.hobbies.includes(h) ? f.hobbies.filter(x => x !== h) : [...f.hobbies, h],
    }))
  }

  const steps = 3
  const progress = (step / steps) * 100

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
      {/* Header */}
      <div style={{ background: 'var(--blue)', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: 'var(--white)', fontSize: 20, fontWeight: 800 }}>Rowdy</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Step {step} of {steps}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, height: 6 }}>
          <div style={{ width: `${progress}%`, background: 'var(--yellow)', height: '100%', borderRadius: 99, transition: 'width .3s' }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
        {step === 1 && (
          <>
            <h2 style={headStyle}>Tell us about you</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="First Name">
                <input placeholder="Your name" value={form.name}
                  onChange={e => update('name', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Birthday">
                <input type="date" value={form.birthdate}
                  onChange={e => update('birthdate', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="I am">
                <SelectRow
                  options={['Male', 'Female', 'Non-binary', 'Other']}
                  value={form.gender} onChange={v => update('gender', v)} />
              </Field>
              <Field label="Looking for">
                <SelectRow
                  options={['Male', 'Female', 'Everyone']}
                  value={form.lookingFor} onChange={v => update('lookingFor', v)} />
              </Field>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={headStyle}>Your Academic Life</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Major">
                <select value={form.major} onChange={e => update('major', e.target.value)}
                  style={{ ...inputStyle, background: 'white' }}>
                  <option value="">Select your major</option>
                  {MAJORS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Bio">
                <textarea
                  placeholder="Tell others a little about yourself..."
                  value={form.bio} onChange={e => update('bio', e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
              </Field>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={headStyle}>Your Interests</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: 14, marginBottom: 20 }}>Pick hobbies that match you</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {HOBBIES.map(h => {
                const active = form.hobbies.includes(h)
                return (
                  <button key={h} onClick={() => toggleHobby(h)}
                    style={{
                      padding: '8px 16px', borderRadius: 99, fontSize: 14, fontWeight: 600,
                      border: `2px solid ${active ? 'var(--blue)' : 'var(--gray-200)'}`,
                      background: active ? 'var(--blue)' : 'var(--white)',
                      color: active ? 'var(--white)' : 'var(--gray-600)',
                      transition: 'all .15s',
                    }}>
                    {h}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 12 }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)}
            style={{ flex: 1, padding: 14, borderRadius: 12, border: '2px solid var(--blue)', color: 'var(--blue)', fontSize: 16, fontWeight: 700 }}>
            Back
          </button>
        )}
        <button
          onClick={() => step < steps ? setStep(s => s + 1) : onDone()}
          style={{ flex: 2, padding: 14, background: 'var(--blue)', color: 'var(--white)', borderRadius: 12, fontSize: 16, fontWeight: 700 }}>
          {step < steps ? 'Continue' : 'Finish Setup'}
        </button>
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

function SelectRow({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          style={{
            padding: '9px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
            border: `2px solid ${value === o ? 'var(--blue)' : 'var(--gray-200)'}`,
            background: value === o ? 'var(--blue)' : 'var(--white)',
            color: value === o ? 'var(--white)' : 'var(--gray-600)',
            transition: 'all .15s',
          }}>
          {o}
        </button>
      ))}
    </div>
  )
}

const headStyle = { fontSize: 22, fontWeight: 700, color: 'var(--blue)', marginBottom: 20 }
const inputStyle = { width: '100%', padding: '12px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 15, outline: 'none' }
