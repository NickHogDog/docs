import React from 'react'
import { daysAgo, fmtDate, pluralDays } from '../lib/utils.js'

function DashCard({ icon, label, value, sub, valueColor = 'text-green-400', warn }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-sm">{icon}</span>
        <span className="text-slate-400 text-xs font-medium">{label}</span>
        {warn && <span className="ml-auto text-amber-400 text-xs">⚠️</span>}
      </div>
      <div className={`text-lg font-bold leading-tight ${valueColor}`}>{value ?? '—'}</div>
      {sub && <div className="text-slate-500 text-xs mt-0.5">{sub}</div>}
    </div>
  )
}

export default function Dashboard({ data }) {
  const { feedings, weights, temps, sheds, uvbLogs, vetVisits } = data
  const lastFeed = feedings[0]
  const feedAgo  = lastFeed ? daysAgo(lastFeed.date) : null
  const lastTemp = temps[0]
  const sortedWeights = [...weights].sort((a,b) => a.date.localeCompare(b.date))
  const lastWeight = sortedWeights[sortedWeights.length - 1]
  const sortedSheds = [...sheds].sort((a,b) => b.date.localeCompare(a.date))
  const lastShed = sortedSheds[0]
  const shedDays = lastShed ? daysAgo(lastShed.date) : null
  const sortedUvb = [...uvbLogs].sort((a,b) => b.date.localeCompare(a.date))
  const lastUvb = sortedUvb[0]
  const uvbDays = lastUvb ? daysAgo(lastUvb.date) : null
  const uvbWarn = uvbDays != null && uvbDays >= 150
  const now = new Date().toISOString().slice(0, 10)
  const upcoming = vetVisits.filter(v => v.nextAppt && v.nextAppt >= now).sort((a,b) => a.nextAppt.localeCompare(b.nextAppt))[0]
  const tc = (val, lo, hi) => val == null ? 'text-slate-400' : val >= lo && val <= hi ? 'text-green-400' : 'text-red-400'

  return (
    <div>
      <h2 className="text-white font-bold text-base mb-3">At a Glance</h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <DashCard icon="🍽️" label="Last Feeding" value={lastFeed?.type} sub={feedAgo != null ? (feedAgo === 0 ? 'Today' : `${pluralDays(feedAgo)} ago`) : 'No data'} />
        <DashCard icon="⚖️" label="Current Weight" value={lastWeight ? `${lastWeight.value}g` : null} sub={lastWeight ? fmtDate(lastWeight.date) : 'No data'} valueColor="text-sky-400" />
        <DashCard icon="🐍" label="Days Since Shed" value={shedDays != null ? pluralDays(shedDays) : null} sub={lastShed ? fmtDate(lastShed.date) : 'No data'} valueColor={shedDays != null && shedDays > 60 ? 'text-amber-400' : 'text-green-400'} />
        <DashCard icon="☀️" label="UVB Bulb Age" value={uvbDays != null ? pluralDays(uvbDays) : null} sub={uvbWarn ? 'Replace soon!' : lastUvb ? `Replaced ${fmtDate(lastUvb.date)}` : 'No data'} valueColor={uvbWarn ? 'text-amber-400' : 'text-green-400'} warn={uvbWarn} />
      </div>
      {lastTemp && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">🌡️</span>
            <span className="text-slate-400 text-xs font-medium">Tank Conditions</span>
            <span className="ml-auto text-slate-500 text-xs">{fmtDate(lastTemp.date)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {lastTemp.basking != null && <div className="text-center"><div className={`text-base font-bold ${tc(lastTemp.basking,100,115)}`}>{lastTemp.basking}°</div><div className="text-slate-500 text-xs">Basking</div></div>}
            {lastTemp.warm    != null && <div className="text-center"><div className={`text-base font-bold ${tc(lastTemp.warm,85,95)}`}>{lastTemp.warm}°</div><div className="text-slate-500 text-xs">Warm</div></div>}
            {lastTemp.cool    != null && <div className="text-center"><div className={`text-base font-bold ${tc(lastTemp.cool,75,85)}`}>{lastTemp.cool}°</div><div className="text-slate-500 text-xs">Cool</div></div>}
            {lastTemp.humidityHot  != null && <div className="text-center"><div className="text-base font-bold text-sky-400">{lastTemp.humidityHot}%</div><div className="text-slate-500 text-xs">Humid Hot</div></div>}
            {lastTemp.humidityCool != null && <div className="text-center"><div className="text-base font-bold text-sky-400">{lastTemp.humidityCool}%</div><div className="text-slate-500 text-xs">Humid Cool</div></div>}
            {lastTemp.uvb != null && <div className="text-center"><div className="text-base font-bold text-violet-400">{lastTemp.uvb}</div><div className="text-slate-500 text-xs">UVI</div></div>}
          </div>
        </div>
      )}
      {upcoming && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3">
          <div className="flex items-center gap-1.5">
            <span>📅</span>
            <div>
              <div className="text-xs text-amber-400 font-medium">Upcoming Vet Visit</div>
              <div className="text-white text-sm font-semibold">{fmtDate(upcoming.nextAppt)}</div>
              {upcoming.reason && <div className="text-slate-400 text-xs">{upcoming.reason}</div>}
            </div>
          </div>
        </div>
      )}
      {feedings.length === 0 && weights.length === 0 && temps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🦎</div>
          <p className="text-white font-semibold mb-1">Welcome, Parzival!</p>
          <p className="text-slate-500 text-sm">Start logging data using the tabs below.</p>
        </div>
      )}
    </div>
  )
}