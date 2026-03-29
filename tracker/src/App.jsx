import React, { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import Dashboard   from './components/Dashboard.jsx'
import FeedingTab  from './components/FeedingTab.jsx'
import GrowthTab   from './components/GrowthTab.jsx'
import HabitatTab  from './components/HabitatTab.jsx'
import HealthTab   from './components/HealthTab.jsx'
import EnrichmentTab from './components/EnrichmentTab.jsx'

const TABS = [
  { id: 'dashboard',  label: 'Home',    icon: '🏠' },
  { id: 'feeding',    label: 'Feeding', icon: '🍽️' },
  { id: 'growth',     label: 'Growth',  icon: '📈' },
  { id: 'habitat',    label: 'Habitat', icon: '🌡️' },
  { id: 'health',     label: 'Health',  icon: '🩺' },
  { id: 'enrichment', label: 'Fun',     icon: '🎯' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [feedings,   setFeedings]   = useLocalStorage('bd_feedings',  [])
  const [weights,    setWeights]    = useLocalStorage('bd_weights',    [])
  const [lengths,    setLengths]    = useLocalStorage('bd_lengths',    [])
  const [temps,      setTemps]      = useLocalStorage('bd_temps',      [])
  const [sheds,      setSheds]      = useLocalStorage('bd_sheds',      [])
  const [uvbLogs,    setUvbLogs]    = useLocalStorage('bd_uvb',        [])
  const [vetVisits,  setVetVisits]  = useLocalStorage('bd_vet',        [])
  const [enrichment, setEnrichment] = useLocalStorage('bd_enrichment', [])

  const data = { feedings, setFeedings, weights, setWeights, lengths, setLengths,
    temps, setTemps, sheds, setSheds, uvbLogs, setUvbLogs, vetVisits, setVetVisits,
    enrichment, setEnrichment }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-2.5 sticky top-0 z-20">
        <span className="text-2xl leading-none">🦎</span>
        <div>
          <h1 className="font-bold text-white text-sm leading-tight">Parzival</h1>
          <p className="text-slate-500 text-xs">Bearded Dragon Tracker</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {activeTab === 'dashboard'  && <Dashboard   data={data} />}
          {activeTab === 'feeding'    && <FeedingTab  data={data} />}
          {activeTab === 'growth'     && <GrowthTab   data={data} />}
          {activeTab === 'habitat'    && <HabitatTab  data={data} />}
          {activeTab === 'health'     && <HealthTab   data={data} />}
          {activeTab === 'enrichment' && <EnrichmentTab data={data} />}
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex z-20">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              activeTab === tab.id ? 'text-green-400' : 'text-slate-500'
            }`}>
            <span className="text-lg leading-none">{tab.icon}</span>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}