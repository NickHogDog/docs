export const KEYS = {
  FEEDINGS:   'bd_feedings',
  WEIGHTS:    'bd_weights',
  LENGTHS:    'bd_lengths',
  TEMPS:      'bd_temps',
  SHEDS:      'bd_sheds',
  UVB:        'bd_uvb',
  VET:        'bd_vet',
  ENRICHMENT: 'bd_enrichment',
}

export const storage = {
  get(key) {
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : []
    } catch { return [] }
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
}