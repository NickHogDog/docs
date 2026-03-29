import React, { useState } from 'react'
import { today, nowTime, fmtDateTime, makeId } from '../lib/utils.js'
import { Card, Label, Input, Select, Textarea, Btn, Toggle, Tag, EmptyState, DeleteBtn } from './ui.jsx'

const FOOD_TYPES = ['Dubia Roaches','Crickets','Mealworms','Superworms','Hornworms','Silkworms','Collard Greens','Mustard Greens','Turnip Greens','Dandelion Greens','Butternut Squash','Kale','Mixed Salad','Other']

export default function FeedingTab({ data }) {
  const { feedings, setFeedings } = data
  const [date, setDate]       = useState(today)
  const [time, setTime]       = useState(nowTime)
  const [type, setType]       = useState('Dubia Roaches')
  const [qty, setQty]         = useState('')
  const [eaten, setEaten]     = useState('all')
  const [notes, setNotes]     = useState('')
  const [calcium, setCalcium]     = useState(false)
  const [calciumD3, setCalciumD3] = useState(false)
  const [multivit, setMultivit]   = useState(false)

  const submit = () => {
    if (!date || !type) return
    setFeedings(prev => [{ id: makeId(), date, time, type, qty: qty.trim(), eaten, notes: notes.trim(),
      supplements: { calcium, calciumD3, multivitamin: multivit } }, ...prev])
    setQty(''); setNotes(''); setCalcium(false); setCalciumD3(false); setMultivit(false)
    setDate(today()); setTime(nowTime())
  }
  const del = id => setFeedings(prev => prev.filter(f => f.id !== id))
  const eatenColor = { all:'green', most:'green', some:'amber', refused:'red' }
  const thisWeek = feedings.filter(f => (new Date() - new Date(f.date+'T00:00:00'))/86400000 <= 7).length
  const refused  = feedings.filter(f => f.eaten === 'refused').length

  return (
    <div>
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><Label>Date</Label><Input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
          <div><Label>Time</Label><Input type="time" value={time} onChange={e=>setTime(e.target.value)} /></div>
        </div>
        <div className="mb-3"><Label>Food</Label>
          <Select value={type} onChange={e=>setType(e.target.value)}>
            {FOOD_TYPES.map(t => <option key={t}>{t}</option>)}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><Label>Quantity</Label><Input type="text" placeholder="e.g. 10 roaches" value={qty} onChange={e=>setQty(e.target.value)} /></div>
          <div><Label>Eaten?</Label>
            <Select value={eaten} onChange={e=>setEaten(e.target.value)}>
              <option value="all">All eaten</option><option value="most">Most eaten</option>
              <option value="some">Some eaten</option><option value="refused">Refused</option>
            </Select>
          </div>
        </div>
        <div className="mb-3"><Label>Supplements</Label>
          <div className="flex gap-2">
            <Toggle active={calcium}   onToggle={() => setCalcium(v=>!v)}   label="Ca (no D3)" colorClass="text-sky-400 border-sky-400/60 bg-sky-400/10" />
            <Toggle active={calciumD3} onToggle={() => setCalciumD3(v=>!v)} label="Ca + D3"    colorClass="text-yellow-400 border-yellow-400/60 bg-yellow-400/10" />
            <Toggle active={multivit}  onToggle={() => setMultivit(v=>!v)}  label="Multi"      colorClass="text-violet-400 border-violet-400/60 bg-violet-400/10" />
          </div>
        </div>
        <div className="mb-3"><Label>Notes</Label><Textarea placeholder="Optional notes…" value={notes} onChange={e=>setNotes(e.target.value)} /></div>
        <Btn onClick={submit}>Log Feeding</Btn>
      </Card>
      {feedings.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"><div className="text-xl font-bold text-green-400">{feedings.length}</div><div className="text-slate-500 text-xs mt-0.5">Total</div></div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"><div className="text-xl font-bold text-green-400">{thisWeek}</div><div className="text-slate-500 text-xs mt-0.5">This Week</div></div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center"><div className="text-xl font-bold text-red-400">{refused}</div><div className="text-slate-500 text-xs mt-0.5">Refused</div></div>
        </div>
      )}
      {feedings.length === 0 ? <EmptyState icon="🍽️" message="No feedings logged yet." /> : feedings.map(f => (
        <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-white text-sm font-semibold">{f.type}</span>
                {f.qty && <span className="text-slate-400 text-xs">· {f.qty}</span>}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                <Tag color={eatenColor[f.eaten] || 'slate'}>{f.eaten}</Tag>
                {f.supplements?.calcium      && <Tag color="sky">Ca</Tag>}
                {f.supplements?.calciumD3    && <Tag color="amber">Ca+D3</Tag>}
                {f.supplements?.multivitamin && <Tag color="violet">Multi</Tag>}
              </div>
              {f.notes && <p className="text-slate-500 text-xs mt-1 italic">{f.notes}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-slate-500 text-xs">{fmtDateTime(f.date, f.time)}</span>
              <DeleteBtn onClick={() => del(f.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}