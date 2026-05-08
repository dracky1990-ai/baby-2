import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundCanvas from './components/BackgroundCanvas';
import { Sparkles, Sliders, Image as ImageIcon, Upload, X, Settings, ArrowRight, Github, Twitter, Lock, Save, Layout, Type } from 'lucide-react';

const INITIAL_CONTENT = {
  logo: "https://ik.imagekit.io/x8axvbbz3/Gemini_Generated_Image_jc7opdjc7opdjc7o-removebg-preview.png?updatedAt=1778201669242",
  label: "La Musa Escénica",
  heroTitle: "Invocando \nEmociones",
  heroDesc: "Barbara Higuera no escribe canciones, las convierte en escenas. Letras con identidad, alma y estética diseñadas para ser recordadas.",
  heroBtn: "Descubrir el Universo",
  quote: "Las canciones no se escriben, se sienten.",
  features: [
    { title: 'Identidad Única', desc: 'Ayudo a artistas a encontrar una esencia estética y emocional a través de su música.', icon: '01' },
    { title: 'Narrativa Visual', desc: 'Canciones con alma, concepto y una estética entre lo real y lo mágico.', icon: '02' },
    { title: 'Impacto Escénico', desc: 'Letras que no solo se escuchan, sino que se sienten y se quedan en la gente.', icon: '03' }
  ],
  statsTitle: "Esencia \nSensorial.",
  statsDesc: "Cada canción es un personaje. No trabajo música, trabajo emociones que se traducen en experiencias memorables.",
  stats: [
    { label: 'Arquetipo', value: 'Hechicera Emocional', sub: 'Identidad Artística' },
    { label: 'Visión', value: 'Musa Escénica', sub: 'Propuesta Estética' },
    { label: 'Filtro', value: 'Realismo Mágico', sub: 'Universo Visual' }
  ],
  ctaTitle: "¿Damos vida a \ntu próxima escena?",
  ctaDesc: "Si buscas una canción que se sienta y perdure, hablemos. Transformo ideas en experiencias sonoras únicas.",
  ctaBtn: "Escribir a Barbara",
  footerLabel: "La Musa Escénica",
  footerCopy: "© 2026 Barbara Higuera • Todos los derechos reservados"
};

const PRESETS = [
  { name: 'Universo Barbara', url: 'https://ik.imagekit.io/x8axvbbz3/Copilot_20260507_223917.png' },
  { name: 'Esencia Clásica', url: 'https://ik.imagekit.io/x8axvbbz3/images.jpeg' },
  { name: 'Magia Nocturna', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Luz Dorada', url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=2000' },
];

export default function App() {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [bgImage, setBgImage] = useState(PRESETS[0].url);
  const [particleCount, setParticleCount] = useState(105);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-brand/30 overflow-x-hidden">
      <BackgroundCanvas bgImage={bgImage} particleCount={particleCount} />
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 md:p-8 lg:p-16 flex justify-between items-center z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, filter: "brightness(1.5) drop-shadow(0 0 30px rgba(255,78,0,0.8))" }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-4 group cursor-pointer pointer-events-auto transition-all duration-500"
        >
          <img 
            src={content.logo} 
            alt="Logo" 
            className="w-32 h-32 md:w-56 md:h-56 lg:w-[480px] lg:h-[480px] object-contain filter drop-shadow-[0_0_80px_rgba(255,78,0,1)] brightness-150 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 md:gap-8 text-[9px] md:text-[11px] tracking-[0.2em] uppercase text-white/90 pointer-events-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.15, textShadow: "0 0 25px rgba(255,255,255,1)", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            className="hidden sm:block text-white font-bold hover:text-white transition-all cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Esencia
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.15, textShadow: "0 0 25px rgba(255,255,255,1)", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            className="hidden sm:block text-white font-bold hover:text-white transition-all cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Universo
          </motion.a>
        </motion.div>
      </nav>

      {/* Landing Page Content */}
      <div className="relative z-10 w-full">
        {/* Section 1: Hero */}
        <section className="min-h-[80vh] flex flex-col pt-32 md:pt-80 lg:pt-96 pb-20 md:pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs tracking-[0.5em] md:tracking-[0.6em] uppercase font-bold text-brand mb-4 md:mb-8 flex items-center gap-3 md:gap-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
          >
            <div className="w-10 md:w-20 h-[1.5px] md:h-[2px] bg-brand shadow-[0_0_20px_rgba(255,78,0,1)]" />
            {content.label}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl xs:text-5xl md:text-[100px] lg:text-[130px] font-serif font-light tracking-[-1px] md:tracking-[-4px] leading-[1.1] md:leading-[0.8] mb-10 md:mb-16 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] whitespace-pre-line"
          >
            {content.heroTitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line.includes('Emociones') ? (
                  <span className="italic text-glow drop-shadow-[0_0_30px_rgba(255,78,0,0.6)]">{line}</span>
                ) : line}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white max-w-[520px] leading-relaxed mb-10 md:mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            {content.heroDesc}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              whileHover={{ scale: 1.1, x: 10, filter: "brightness(1.2)", textShadow: "0 0 10px rgba(255,100,0,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 text-[10px] md:text-sm tracking-[0.3em] uppercase font-black group drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            >
              <span className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/80 flex items-center justify-center transition-all group-hover:border-brand group-hover:bg-brand/30 bg-black/50 backdrop-blur-md group-hover:shadow-[0_0_40px_rgba(255,78,0,0.7)]">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:translate-x-2" />
              </span>
              <span className="group-hover:text-brand group-hover:drop-shadow-[0_0_20px_rgba(255,78,0,0.8)] transition-all">{content.heroBtn}</span>
            </motion.button>
          </motion.div>
        </section>

        {/* Section 1.5: Quote */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-5xl font-serif italic text-white leading-tight drop-shadow-xl"
          >
            "{content.quote.split(',')[0]}, <span className="text-glow text-brand">{content.quote.split(',')[1]}</span>."
          </motion.p>
        </section>

        {/* Section 2: Features Grid */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
            {content.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 bg-black/60 hover:bg-white/[0.05] transition-colors group"
              >
                <div className="font-mono text-brand text-xs md:text-sm mb-6 md:mb-8 opacity-90 group-hover:opacity-100 transition-opacity tracking-widest font-bold">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-serif italic mb-3 md:mb-4 tracking-tight drop-shadow-md text-white"> {feature.title} </h3>
                <p className="text-sm md:text-base text-white leading-relaxed drop-shadow-md"> {feature.desc} </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Technical Specs */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-black/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-end">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-light mb-6 md:mb-8 italic tracking-tight drop-shadow-2xl whitespace-pre-line">{content.statsTitle}</h2>
              <p className="text-white max-w-md text-base md:text-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-medium">
                {content.statsDesc}
              </p>
            </div>
            
            
            <div className="flex flex-col gap-8 md:gap-12 border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-12">
              {content.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1 font-bold">{stat.label}</div>
                  <div className="font-mono text-xl md:text-2xl tracking-tighter text-brand drop-shadow-lg">{stat.value}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-[0.3em] mt-1 drop-shadow-sm">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: CTA */}
        <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto rounded-[32px] md:rounded-[40px] p-10 md:p-16 lg:p-24 border border-white/10 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-serif italic mb-6 md:mb-8 relative z-10 whitespace-pre-line">{content.ctaTitle}</h2>
            <p className="text-white/60 md:text-white/40 mb-10 md:mb-12 max-w-md mx-auto relative z-10 text-sm md:text-base">
              {content.ctaDesc}
            </p>
            
            <motion.button 
              whileHover={{ 
                scale: 1.15, 
                boxShadow: "0 0 80px rgba(255,78,0,0.9), 0 0 30px rgba(255,255,255,0.3) inset",
                backgroundColor: "rgba(255, 78, 0, 1)",
                letterSpacing: "0.3em",
                filter: "brightness(1.1)"
              }}
              whileTap={{ scale: 0.92 }}
              className="px-12 py-6 md:px-20 md:py-8 bg-brand text-white font-black rounded-full transition-all shadow-2xl shadow-brand/60 relative z-10 text-[10px] md:text-sm tracking-widest uppercase border-2 border-white/30"
            >
              {content.ctaBtn}
            </motion.button>
          </motion.div>
        </section>

        {/* Section 5: Final Footer */}
        <footer className="py-24 px-8 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/10 pt-24 pb-12">
              <div className="flex items-center gap-8 opacity-80">
                <motion.div whileHover={{ scale: 1.2, color: "#fff", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>
                  <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-all" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, color: "#fff", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>
                  <Github className="w-5 h-5 cursor-pointer hover:text-white transition-all" />
                </motion.div>
                <span className="text-[11px] tracking-[0.3em] uppercase font-black text-white/50 border-l border-white/20 pl-8">Barbara Higuera Lab</span>
                <motion.button
                  whileHover={{ scale: 1.2, color: "#ff4e00" }}
                  onClick={() => {
                    const pass = prompt("Acceso Restringido - Ingrese Contraseña:");
                    if(pass === "1234") setShowSettings(true);
                  }}
                  className="opacity-20 hover:opacity-100 transition-all pointer-events-auto"
                >
                  <Lock className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-[10px] tracking-[0.4em] uppercase text-white/80 mb-2 font-bold italic drop-shadow-md">{content.footerLabel}</div>
                <div className="text-[10px] tracking-widest uppercase text-white/70 font-bold drop-shadow-sm">{content.footerCopy}</div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Admin Control Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 500 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/10 z-[100] flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand/10 rounded-lg">
                  <Settings className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Panel de Control</h2>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin Mode Activated</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(false)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              {/* Visual Vibe */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Layout className="w-4 h-4 text-brand/60" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Entorno Visual</h3>
                </div>
                
                <div className="space-y-8 p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Densidad Estelar</label>
                      <span className="text-brand font-mono text-sm">{particleCount}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="300" 
                      step="5"
                      value={particleCount}
                      onChange={(e) => setParticleCount(Number(e.target.value))}
                      className="w-full accent-brand bg-white/10 h-1 rounded-full cursor-pointer pointer-events-auto appearance-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4 block">Proyecciones de Fondo</label>
                    <div className="grid grid-cols-2 gap-3">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => setBgImage(preset.url)}
                          className={`group relative h-20 rounded-xl overflow-hidden border-2 transition-all pointer-events-auto ${
                            bgImage === preset.url ? 'border-brand' : 'border-white/5'
                          }`}
                        >
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-[8px] tracking-[0.2em] uppercase font-bold">{preset.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Text Management */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Type className="w-4 h-4 text-brand/60" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Contenido del Sitio</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Slogan / Label</label>
                      <input 
                        value={content.label} 
                        onChange={(e) => setContent({...content, label: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Hero Title (Use \n for break)</label>
                      <textarea 
                        value={content.heroTitle} 
                        onChange={(e) => setContent({...content, heroTitle: e.target.value})}
                        rows={2}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors font-serif italic"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Hero Description</label>
                      <textarea 
                        value={content.heroDesc} 
                        onChange={(e) => setContent({...content, heroDesc: e.target.value})}
                        rows={3}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Feature Grid Editors */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-6">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">Cuadrícula de Esencia</label>
                    {content.features.map((f, idx) => (
                      <div key={idx} className="space-y-3 p-4 bg-black/20 rounded-xl border border-white/5">
                        <input 
                          value={f.title} 
                          onChange={(e) => {
                            const newFeatures = [...content.features];
                            newFeatures[idx].title = e.target.value;
                            setContent({...content, features: newFeatures});
                          }}
                          className="w-full bg-transparent border-b border-white/10 p-1 text-sm font-bold text-brand outline-none focus:border-brand"
                        />
                        <textarea 
                          value={f.desc} 
                          onChange={(e) => {
                            const newFeatures = [...content.features];
                            newFeatures[idx].desc = e.target.value;
                            setContent({...content, features: newFeatures});
                          }}
                          className="w-full bg-transparent p-1 text-[12px] text-white/60 outline-none h-16 resize-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Statistics Editor */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-6">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">Especificaciones Técnicas</label>
                    <textarea 
                      value={content.statsTitle} 
                      onChange={(e) => setContent({...content, statsTitle: e.target.value})}
                      rows={2}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none"
                    />
                    <div className="space-y-4">
                      {content.stats.map((s, idx) => (
                        <div key={idx} className="grid grid-cols-2 gap-2 p-3 bg-black/20 rounded-xl border border-white/5">
                          <input 
                            value={s.label} 
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[idx].label = e.target.value;
                              setContent({...content, stats: newStats});
                            }}
                            className="bg-transparent border-b border-white/10 text-[10px] text-white/40 outline-none uppercase"
                          />
                          <input 
                            value={s.value} 
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[idx].value = e.target.value;
                              setContent({...content, stats: newStats});
                            }}
                            className="bg-transparent border-b border-white/10 text-brand text-sm outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-4">
                     <label className="text-[9px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">Llamado a la Acción</label>
                     <input 
                        value={content.ctaTitle} 
                        onChange={(e) => setContent({...content, ctaTitle: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none"
                      />
                      <input 
                        value={content.ctaBtn} 
                        onChange={(e) => setContent({...content, ctaBtn: e.target.value})}
                        className="w-full bg-brand/10 border border-brand/20 rounded-lg p-3 text-sm font-bold text-brand outline-none"
                      />
                  </div>
                </div>
              </section>
            </div>

            <div className="p-8 bg-black/60 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSettings(false)}
                className="w-full bg-brand p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,78,0,0.3)]"
              >
                <Save className="w-4 h-4" />
                Aplicar Cambios
              </motion.button>
              <p className="text-[8px] text-center mt-4 text-white/20 uppercase tracking-[0.3em]">Changes persist for this session</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
