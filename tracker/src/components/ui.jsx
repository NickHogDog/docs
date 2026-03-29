export function Card({ children, className = '' }) {
  return <div className={`bg-slate-900 border border-slate-800 rounded-xl p-4 ${className}`}>{children}</div>
}
export function Label({ children }) {
  return <label className="block text-slate-400 text-xs mb-1 font-medium">{children}</label>
}
export function Input({ className = '', ...props }) {
  return <input className={`w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-green-500 transition-colors ${className}`} {...props} />
}
export function Select({ children, className = '', ...props }) {
  return <select className={`w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-green-500 transition-colors ${className}`} {...props}>{children}</select>
}
export function Textarea({ className = '', ...props }) {
  return <textarea className={`w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none ${className}`} rows={2} {...props} />
}
export function Btn({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
  const base = 'font-semibold text-sm rounded-lg py-2.5 px-4 transition-colors focus:outline-none'
  const variants = {
    primary: 'bg-green-500 hover:bg-green-400 text-slate-950 w-full',
    ghost:   'text-red-400 hover:text-red-300 border border-red-400/30 text-xs px-2 py-1 rounded',
  }
  return <button type={type} onClick={onClick} className={`${base} ${variants[variant] || variants.primary} ${className}`}>{children}</button>
}
export function Toggle({ active, onToggle, label, colorClass = 'text-sky-400 border-sky-400/50 bg-sky-400/10' }) {
  return (
    <button type="button" onClick={onToggle}
      className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
        active ? colorClass : 'text-slate-500 border-slate-700 bg-transparent'
      }`}>{label}</button>
  )
}
export function Tag({ children, color = 'green' }) {
  const colors = { green:'bg-green-500/15 text-green-400', red:'bg-red-500/15 text-red-400', amber:'bg-amber-500/15 text-amber-400', sky:'bg-sky-500/15 text-sky-400', violet:'bg-violet-500/15 text-violet-400', slate:'bg-slate-700 text-slate-400' }
  return <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-semibold ${colors[color] || colors.slate}`}>{children}</span>
}
export function EmptyState({ icon, message }) {
  return <div className="text-center py-10"><div className="text-3xl mb-2">{icon}</div><p className="text-slate-500 text-sm">{message}</p></div>
}
export function SubTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 mb-4 bg-slate-900 p-1 rounded-xl border border-slate-800">
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)}
          className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            active === t ? 'bg-green-500 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}>{t}</button>
      ))}
    </div>
  )
}
export function DeleteBtn({ onClick }) {
  return <button onClick={onClick} className="text-slate-600 hover:text-red-400 transition-colors text-xs ml-2 shrink-0" title="Delete">✕</button>
}