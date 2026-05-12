import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Building2, Clock, ChevronRight, Loader2, Filter, CheckCircle2 } from 'lucide-react';
import { MAP_OPPORTUNITIES } from '../data/mockData';

const CATEGORY_COLORS = {
  Education:   '#2563eb',
  Community:   '#059669',
  Health:      '#dc2626',
  Environment: '#16a34a',
  Sports:      '#d97706',
  Culture:     '#7c3aed',
  Technology:  '#0891b2',
  Social:      '#db2777',
};

function OpportunityPopup({ opp, onClose, onApply }) {
  const color = CATEGORY_COLORS[opp.category] || '#2563eb';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div style={{ height: 4, background: color }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: `${color}15`, color }}>
            {opp.category}
          </span>
          <button onClick={onClose} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X size={12} />
          </button>
        </div>
        <h4 className="font-semibold text-sm text-gray-900 mb-1 leading-tight">{opp.title}</h4>
        <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1"><Building2 size={10} /> {opp.organization}</div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <MapPin size={10} /> {opp.location}
          <span className="text-gray-300">·</span>
          <Clock size={10} /> {opp.time}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">{opp.description}</p>
        <button
          onClick={() => onApply(opp)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: color }}
        >
          Apply Now <ChevronRight size={11} />
        </button>
      </div>
      <div style={{
        position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)',
        width: 14, height: 14, background: '#ffffff',
        border: '1px solid #e5e7eb',
        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
      }} />
    </motion.div>
  );
}

function CategoryPill({ label, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
      style={active
        ? { background: `${color}12`, borderColor: `${color}40`, color }
        : { background: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }
      }
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: active ? color : '#d1d5db', display: 'inline-block' }} />
      {label}
    </button>
  );
}

export default function JordanMapSection() {
  const mapRef        = useRef(null);
  const leafletMapRef = useRef(null);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [mapLoaded, setMapLoaded]     = useState(false);
  const [applyToast, setApplyToast]   = useState(null);
  const [activeCategory, setCategory] = useState(null);

  const handleApply = (opp) => {
    setSelectedOpp(null);
    setApplyToast(opp.title);
    setTimeout(() => setApplyToast(null), 3200);
  };

  const filteredOpps = activeCategory
    ? MAP_OPPORTUNITIES.filter(o => o.category === activeCategory)
    : MAP_OPPORTUNITIES;

  const flyTo = (opp) => {
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([opp.lat, opp.lng], 10, { duration: 0.8 });
    }
    setSelectedOpp(opp);
  };

  useEffect(() => {
    if (leafletMapRef.current || !mapRef.current) return;

    import('leaflet').then(L => {
      const leaflet = L.default || L;
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = leaflet.map(mapRef.current, {
        center: [31.5, 36.3], zoom: 7,
        zoomControl: true, attributionControl: false,
      });
      leafletMapRef.current = map;

      leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);

      MAP_OPPORTUNITIES.forEach(opp => {
        const color = CATEGORY_COLORS[opp.category] || '#2563eb';
        const icon = leaflet.divIcon({
          className: '',
          html: `<div style="width:34px;height:34px;background:${color};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 3px 10px ${color}60;cursor:pointer;"></div>`,
          iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -38],
        });
        leaflet.marker([opp.lat, opp.lng], { icon }).addTo(map)
          .on('click', (e) => {
            leaflet.DomEvent.stopPropagation(e);
            setSelectedOpp(opp);
            map.flyTo([opp.lat, opp.lng], 10, { duration: 0.7 });
          });
      });

      map.on('click', () => setSelectedOpp(null));
      setMapLoaded(true);
    }).catch(err => console.error('Leaflet load error:', err));

    return () => {
      if (leafletMapRef.current) { leafletMapRef.current.remove(); leafletMapRef.current = null; }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-sm">
          <MapPin size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Opportunities Map</h2>
          <p className="text-sm text-gray-500">{MAP_OPPORTUNITIES.length} opportunities across Jordan — click a pin to explore</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
          style={!activeCategory
            ? { background: '#111827', color: '#fff', borderColor: '#111827' }
            : { background: '#fff', borderColor: '#e5e7eb', color: '#6b7280' }
          }
        >
          <Filter size={10} /> All
        </button>
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <CategoryPill
            key={cat} label={cat} color={color}
            active={activeCategory === cat}
            onClick={() => setCategory(activeCategory === cat ? null : cat)}
          />
        ))}
      </div>

      {/* Map container */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm" style={{ height: 480 }}>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-50">
            <div className="flex flex-col items-center gap-3">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Loader2 size={28} className="text-blue-600" />
              </motion.div>
              <p className="text-sm text-gray-500">Loading map…</p>
            </div>
          </div>
        )}

        <div ref={mapRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />

        <AnimatePresence>
          {selectedOpp && (
            <div style={{ position: 'absolute', zIndex: 1000, left: '50%', top: '32%', transform: 'translate(-50%, -50%)', pointerEvents: 'auto' }}>
              <OpportunityPopup opp={selectedOpp} onClose={() => setSelectedOpp(null)} onApply={handleApply} />
            </div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-2 right-3 z-50 text-gray-400" style={{ fontSize: 10, opacity: 0.6 }}>
          © CartoDB · OpenStreetMap
        </div>
      </div>

      {/* Opportunity list */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          {activeCategory ? `${activeCategory} Opportunities` : 'All Opportunities'}
          <span className="ml-2 text-sm font-normal text-gray-400">({filteredOpps.length})</span>
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredOpps.map((opp, i) => {
            const color = CATEGORY_COLORS[opp.category] || '#2563eb';
            return (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.035 }}
                whileHover={{ y: -3 }}
                onClick={() => flyTo(opp)}
                className="p-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                style={{ borderLeft: `3px solid ${color}` }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <MapPin size={12} style={{ color, marginTop: 2, flexShrink: 0 }} />
                  <h4 className="text-xs font-semibold text-gray-800 leading-tight">{opp.title}</h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap pl-4">
                  <span className="text-xs text-gray-400">{opp.location}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ background: `${color}12`, color }}>
                    {opp.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {applyToast && (
          <motion.div
            initial={{ opacity: 0, y: 32, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 32, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-2xl shadow-xl"
          >
            <CheckCircle2 size={16} /> Applied to "{applyToast}"!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
