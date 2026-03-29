import React, { useState } from 'react'
import { today, fmtDate, daysAgo, makeId } from '../lib/utils.js'
import { Card, Label, Input, Select, Textarea, Btn, Tag, EmptyState, DeleteBtn } from './ui.jsx'

const ACTIVITIES = ['Bath','Outside Time','Handling','New Decor','Free Roam','Foraging','Socialization','Other']
const COLORS = { 'Bath':'sky','Outside Time':'green','Handling':'violet','New Decor':'amber','Free Roam':'green','Foraging':'amber','Socialization':'violet','Other':'slate' }

export default function EnrichmentTab({ data }) {
  const { enrichment, setEnrichment } = data
  const [date, setDate]         = useState(today)
  const [activity, setActivity] = useState('Bath')
  const [duration, setDuration] = useState('')
  const [notes, setNotes]       = useState('')

  const submit = () => {
    if (!date || !activity) return
    setEnrichment(prev => [{ id: makeId(), date, activity, duration: duration ? parseInt(duration) : null, notes: notes.trim() }, ...prev])
    setDuration(''); setNotes(''); setDate(today())
  }
  const del = id => setEnrichment(prev => prev.filter(e => e.id !== id))
  const sorted   = [...enrichment].sort((a,b) => b.date.localeCompare(a.date))
  const thisWeek = sorted.filter(e => (new Date() - new Date(e.date+'T00:00:00'))/86400000 <= 7).length
  const lastAgo  = sorted[0] ? daysAgo(sorted[0].date) : null

  return (
    <div>
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><Label>Date</Label><Input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
          <div><Label>Duration (min)</Label><Input type="number" placeholder="Optional" value={duration} onChange={e=>setDuration(e.target.value)} min="1" /></div>
        </div>
        <div className="mb-3"><Label>Activity</Label>
          <Select value={activity} onChange={e=>setActivity(e.target.value)}>
            {ACTIVITIES.map(a => <option key={a}>{a}</option>)}
          </Select>
        </div>
        <div className="mb-3"><Label>Notes</Label><Textarea placeholder="Optional notes…" value={notes} onChange={e=>setNotes(e.target.value)} /></div>
        <Btn onClick={submit}>Log Activity</Btn>
      </Card>
      {sorted.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"><div className="text-xl font-bold text-green-400">{sorted.length}</div><div className="text-slate-500 text-xs mt-0.5">Total</div></div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"><div className="text-xl font-bold text-green-400">{thisWeek}</div><div className="text-slate-500 text-xs mt-0.5">This Week</div></div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"><div className="text-xl font-bold text-slate-300">{lastAgo != null ? (lastAgo === 0 ? 'Today' : `${lastAgo}d ago`) : '—'}</div><div className="text-slate-500 text-xs mt-0.5">Last Activity</div></div>
        </div>
      )}
      {sorted.length === 0 ? <EmptyState icon="🎯" message="No enrichment activities logged yet." /> : sorted.map(e => (
        <div key={e.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5"><Tag color={COLORS[e.activity]||'slate'}>{e.activity}</Tag>{e.duration && <span className="text-slate-500 text-xs">{e.duration} min</span>}</div>
              {e.notes && <p className="text-slate-500 text-xs italic mt-1">{e.notes}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-slate-500 text-xs">{fmtDate(e.date)}</span>
              <DeleteBtn onClick={() => del(e.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}