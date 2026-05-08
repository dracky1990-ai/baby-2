import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundCanvas from './components/BackgroundCanvas';
import { Sparkles, Sliders, Image as ImageIcon, Upload, X, Settings, ArrowRight, Github, Twitter } from 'lucide-react';

const PRESETS = [
  { name: 'Luz Dorada', url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Atardecer Mágico', url: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Naturaleza Simbólica', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000' },
  { name: 'Misterio Escénico', url: 'https://images.unsplash.com/photo-1514525253344-7814d2574ab5?auto=format&fit=crop&q=80&w=2000' },
];

export default function App() {
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
      <nav className="absolute top-0 w-full p-8 lg:p-16 flex justify-between items-center z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-4 group cursor-pointer pointer-events-auto"
        >
          <img 
            src="https://ik.imagekit.io/x8axvbbz3/Gemini_Generated_Image_jc7opdjc7opdjc7o-removebg-preview.png?updatedAt=1778201669242" 
            alt="Barbara Higuera Logo" 
            className="w-32 h-32 lg:w-48 lg:h-48 object-contain filter drop-shadow-[0_0_80px_rgba(255,78,0,1)] brightness-150 group-hover:drop-shadow-[0_0_150px_rgba(255,100,0,1)] group-hover:scale-110 group-active:scale-95 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-white/90 pointer-events-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.1, textShadow: "0 0 20px rgba(255,255,255,1)", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            className="text-white/80 hover:text-white transition-all cursor-pointer"
          >
            Esencia
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.1, textShadow: "0 0 20px rgba(255,255,255,1)", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            className="text-white/80 hover:text-white transition-all cursor-pointer"
          >
            Universo
          </motion.a>
          <motion.button 
            onClick={() => setShowSettings(!showSettings)}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(0,0,0,0.7)", 
              borderColor: "rgba(255,255,255,0.5)",
              boxShadow: "0 0 30px rgba(255,78,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-all bg-black/40 backdrop-blur-md border border-white/30 px-8 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <Settings className="w-4 h-4" />
            Configuración
          </motion.button>
        </motion.div>
      </nav>

      {/* Landing Page Content */}
      <div className="relative z-10 w-full">
        {/* Section 1: Hero */}
        <section className="min-h-screen flex flex-col pt-80 lg:pt-96 pb-32 px-8 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.6em] uppercase font-bold text-brand mb-8 flex items-center gap-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
          >
            <div className="w-20 h-[2px] bg-brand shadow-[0_0_20px_rgba(255,78,0,1)]" />
            La Musa Escénica
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-[100px] lg:text-[130px] font-serif font-light tracking-[-4px] leading-[0.8] mb-16 drop-shadow-2xl"
          >
            Invocando <br />
            <span className="italic text-glow">Emociones</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white max-w-[520px] leading-relaxed mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Barbara Higuera no escribe canciones, <span className="text-white font-bold underline decoration-brand underline-offset-8">las convierte en escenas.</span> 
            Letras con identidad, alma y estética diseñadas para ser recordadas.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              whileHover={{ scale: 1.08, x: 8 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 text-xs tracking-[0.2em] uppercase font-bold group drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
            >
              <span className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center transition-all group-hover:border-brand group-hover:bg-brand/20 bg-black/40 backdrop-blur-sm group-hover:shadow-[0_0_25px_rgba(255,78,0,0.5)]">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </span>
              <span className="group-hover:text-brand group-hover:drop-shadow-[0_0_10px_rgba(255,78,0,0.5)] transition-all">Descubrir el Universo</span>
            </motion.button>
          </motion.div>
        </section>

        {/* Section 1.5: Quote */}
        <section className="py-24 px-8 lg:px-24 text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif italic text-white leading-tight drop-shadow-xl"
          >
            "Las canciones no se escriben, <span className="text-glow text-brand">se sienten</span>."
          </motion.p>
        </section>

        {/* Section 2: Features Grid */}
        <section className="py-32 px-8 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
            {[
              {
                title: 'Identidad Única',
                desc: 'Ayudo a artistas a encontrar una esencia estética y emocional a través de su música.',
                icon: '01'
              },
              {
                title: 'Narrativa Visual',
                desc: 'Canciones con alma, concepto y una estética entre lo real y lo mágico.',
                icon: '02'
              },
              {
                title: 'Impacto Escénico',
                desc: 'Letras que no solo se escuchan, sino que se sienten y se quedan en la gente.',
                icon: '03'
              }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-black/60 hover:bg-white/[0.05] transition-colors group"
              >
                <div className="font-mono text-brand text-sm mb-8 opacity-90 group-hover:opacity-100 transition-opacity tracking-widest font-bold">{feature.icon}</div>
                <h3 className="text-2xl font-serif italic mb-4 tracking-tight drop-shadow-md text-white"> {feature.title} </h3>
                <p className="text-sm text-white leading-relaxed drop-shadow-md"> {feature.desc} </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Technical Specs */}
        <section className="py-32 px-8 lg:px-24 bg-gradient-to-b from-transparent to-black/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-4xl lg:text-6xl font-serif font-light mb-8 italic tracking-tight drop-shadow-2xl">Esencia <br />Sensorial.</h2>
              <p className="text-white max-w-md leading-relaxed drop-shadow-md font-medium">
                Cada canción es un personaje. No trabajo música, trabajo emociones que se traducen en experiencias memorables.
              </p>
            </div>
            
            
            <div className="flex flex-col gap-12 border-l border-white/10 pl-12">
              {[
                { label: 'Arquetipo', value: 'Hechicera Emocional', sub: 'Identidad Artística' },
                { label: 'Visión', value: 'Musa Escénica', sub: 'Propuesta Estética' },
                { label: 'Filtro', value: 'Realismo Mágico', sub: 'Universo Visual' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1 font-bold">{stat.label}</div>
                  <div className="font-mono text-2xl tracking-tighter text-brand drop-shadow-lg">{stat.value}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-[0.3em] mt-1 drop-shadow-sm">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: CTA */}
        <section className="py-48 px-8 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto rounded-[40px] p-16 lg:p-24 border border-white/10 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h2 className="text-4xl lg:text-7xl font-serif italic mb-8 relative z-10">¿Damos vida a <br />tu próxima escena?</h2>
            <p className="text-white/40 mb-12 max-w-md mx-auto relative z-10">
              Si buscas una canción que se sienta y perdure, hablemos. 
              Transformo ideas en experiencias sonoras únicas.
            </p>
            
            <motion.button 
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 60px rgba(255,78,0,0.8), 0 0 20px rgba(255,255,255,0.2) inset",
                backgroundColor: "rgba(255, 78, 0, 1)",
                letterSpacing: "0.2em"
              }}
              whileTap={{ scale: 0.92 }}
              className="px-16 py-7 bg-brand text-white font-bold rounded-full transition-all shadow-2xl shadow-brand/50 relative z-10 text-sm tracking-widest uppercase border border-white/20"
            >
              Escribir a Barbara
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
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-2 font-bold italic">La Musa Escénica</div>
                <div className="text-[9px] tracking-widest uppercase text-white/30 font-medium">© 2026 Barbara Higuera • Todos los derechos reservados</div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-dark/80 backdrop-blur-2xl border-l border-white/10 z-[60] p-12 overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-serif italic tracking-tight">Vibe & Density</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors pointer-events-auto">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Particle Density */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <label className="text-[10px] tracking-[0.2em] uppercase text-white/40">Particle Density</label>
                <span className="text-brand font-mono">{particleCount}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="300" 
                step="5"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full accent-brand bg-white/10 h-1 rounded-full cursor-pointer pointer-events-auto appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand"
              />
              <div className="flex justify-between mt-2 text-[8px] text-white/20 uppercase tracking-widest">
                <span>Minimal</span>
                <span>Chaotic</span>
              </div>
            </section>

            {/* Background Presets */}
            <section className="mb-12">
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6 block">Backdrop Presets</label>
              <div className="grid grid-cols-2 gap-4">
                {PRESETS.map((preset) => (
                  <motion.button
                    key={preset.name}
                    onClick={() => setBgImage(preset.url)}
                    whileHover={{ scale: 1.05, borderColor: "rgba(255,78,0,0.8)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative h-24 rounded-xl overflow-hidden border-2 transition-all pointer-events-auto ${
                      bgImage === preset.url ? 'border-brand shadow-[0_0_15px_rgba(255,78,0,0.4)] px-1' : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold">{preset.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* Custom Upload */}
            <section>
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6 block">Custom Projection</label>
              <motion.button 
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,78,0,0.1)", borderColor: "rgba(255,78,0,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-white/30 hover:border-brand/40 transition-all text-sm group pointer-events-auto"
              >
                <Upload className="w-4 h-4 text-white/60 group-hover:text-brand transition-colors" />
                <span className="group-hover:text-white transition-colors">Subir Fondo Personalizado</span>
              </motion.button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                className="hidden pointer-events-auto"
              />
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Mobile View */}
      <footer className="fixed bottom-8 left-12 right-12 z-10 flex lg:hidden justify-between items-center text-white/20 text-[10px] tracking-widest uppercase">
        <div>© 2026 Aurora Engine</div>
        <div className="flex gap-4">
          <span>{particleCount} PX</span>
          <span>60 FPS</span>
        </div>
      </footer>
    </div>
  );
}
