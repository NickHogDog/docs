export const today = () => new Date().toISOString().slice(0, 10)
export const nowTime = () => { const d = new Date(); return d.toTimeString().slice(0, 5) }
export const fmtDate = (d) => { if (!d) return '—'; const [y,m,day] = d.split('-'); return `${m}/${day}/${y}` }
export const fmtDateTime = (d, t) => t ? `${fmtDate(d)} ${t}` : fmtDate(d)
export const daysAgo = (dateStr) => {
  if (!dateStr) return null
  const diff = new Date().setHours(0,0,0,0) - new Date(dateStr + 'T00:00:00').getTime()
  return Math.floor(diff / 86400000)
}
export const daysBetween = (d1, d2) => {
  const t1 = new Date(d1 + 'T00:00:00').getTime()
  const t2 = new Date(d2 + 'T00:00:00').getTime()
  return Math.abs(Math.floor((t2 - t1) / 86400000))
}
export const pluralDays = (n) => n === 1 ? '1 day' : `${n} days`
export const makeId = () => Date.now() + Math.random()