import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundCanvas from './components/BackgroundCanvas';
import { Sparkles, Sliders, Image as ImageIcon, Upload, X, Settings, ArrowRight, Github, Twitter, Lock, Save, Layout, Type } from 'lucide-react';

const INITIAL_CONTENT = {
  logo: "https://ik.imagekit.io/x8axvbbz3/Gemini_Generated_Image_jc7opdjc7opdjc7o-removebg-preview.png?updatedAt=1778201669242",
  label: "La Musa Escénica",
  nav1: "Esencia",
  nav2: "Universo",
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

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === "1234") {
      setShowSettings(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

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
      <nav className="fixed md:absolute top-0 w-full p-4 sm:p-6 md:p-8 lg:p-16 flex justify-between items-center z-[60] pointer-events-none bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/5 md:border-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.1, 
            filter: "brightness(1.6) drop-shadow(0 0 40px rgba(255,78,0,0.8))",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 group cursor-pointer pointer-events-auto transition-all"
        >
          <img 
            src={content.logo} 
            alt="Logo" 
            className="w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain filter drop-shadow-[0_0_60px_rgba(255,78,0,0.5)] brightness-125 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 md:gap-8 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/90 pointer-events-auto"
        >
          <motion.a 
            href="#" 
            whileHover={{ 
              scale: 1.15, 
              textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,78,0,0.5)", 
              color: "#fff" 
            }}
            whileTap={{ scale: 0.9 }}
            className="text-white font-black hover:text-white transition-all cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,1)] px-2"
          >
            {content.nav1}
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ 
              scale: 1.15, 
              textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,78,0,0.5)", 
              color: "#fff" 
            }}
            whileTap={{ scale: 0.9 }}
            className="text-white font-black hover:text-white transition-all cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,1)] px-2"
          >
            {content.nav2}
          </motion.a>
        </motion.div>
      </nav>

      {/* Landing Page Content */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Section 1: Hero */}
        <section className="min-h-screen flex flex-col justify-center pt-64 sm:pt-72 md:pt-64 lg:pt-80 pb-12 sm:pb-20 md:pb-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] sm:tracking-[0.6em] uppercase font-bold text-brand mb-4 md:mb-8 flex items-center gap-3 md:gap-4 drop-shadow-[0_0_20px_rgba(255,78,0,0.5)]"
          >
            <div className="w-6 sm:w-10 md:w-20 h-[1.5px] md:h-[2px] bg-brand shadow-[0_0_20px_rgba(255,78,0,1)]" />
            <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">{content.label}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-[100px] lg:text-[130px] font-serif font-light tracking-tight md:tracking-[-4px] leading-[1.0] sm:leading-[1.1] md:leading-[0.8] mb-8 md:mb-16 drop-shadow-[0_10px_40px_rgba(0,0,0,1)] whitespace-pre-line"
          >
            {content.heroTitle.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line.includes('Emociones') ? (
                  <span className="italic text-glow drop-shadow-[0_0_40px_rgba(255,78,0,0.8)] block sm:inline">{line}</span>
                ) : line}
                {i === 0 && <br className="hidden sm:block" />}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/90 max-w-[500px] leading-relaxed mb-10 md:mb-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-medium"
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
              whileHover={{ 
                scale: 1.08, 
                x: 10, 
                filter: "brightness(1.3)", 
                textShadow: "0 0 20px rgba(255,100,0,0.8)",
                boxShadow: "0 10px 50px rgba(255,78,0,0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 text-[11px] sm:text-sm tracking-[0.3em] uppercase font-black group drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] px-1"
            >
              <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/80 flex items-center justify-center transition-all group-hover:border-brand group-hover:bg-brand/30 bg-black/60 backdrop-blur-md group-hover:shadow-[0_0_60px_rgba(255,78,0,1)]">
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-2" />
              </span>
              <span className="group-hover:text-brand group-hover:drop-shadow-[0_0_25px_rgba(255,78,0,0.9)] transition-all drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">{content.heroBtn}</span>
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
        <section className="py-20 md:py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-transparent via-black/40 to-black/80">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-light mb-6 md:mb-8 italic tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,1)] whitespace-pre-line leading-tight">{content.statsTitle}</h2>
              <p className="text-white/90 max-w-md text-base sm:text-lg leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] font-medium">
                {content.statsDesc}
              </p>
            </div>
            
            <div className="flex flex-col gap-6 sm:gap-10 border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-4 md:pl-12">
              {content.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-1 border-b border-white/5 pb-6 md:border-0 md:pb-0"
                >
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1 font-bold drop-shadow-sm">{stat.label}</div>
                  <div className="font-mono text-xl sm:text-2xl md:text-3xl tracking-tighter text-brand drop-shadow-[0_0_15px_rgba(255,78,0,0.4)]">{stat.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.2em] mt-1 italic">{stat.sub}</div>
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
            className="max-w-3xl mx-auto rounded-[32px] md:rounded-[40px] p-8 sm:p-16 lg:p-24 border border-white/10 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-serif italic mb-6 md:mb-8 relative z-10 whitespace-pre-line leading-tight">{content.ctaTitle}</h2>
            <p className="text-white/80 sm:text-white/40 mb-10 md:mb-12 max-w-md mx-auto relative z-10 text-sm md:text-base leading-relaxed px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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
              className="px-8 py-5 sm:px-20 sm:py-8 bg-brand text-white font-black rounded-full transition-all shadow-2xl shadow-brand/60 relative z-10 text-[10px] md:text-sm tracking-widest uppercase border-2 border-white/30"
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
                  whileHover={{ scale: 1.3, color: "#ff4e00" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPasswordModal(true)}
                  className="opacity-40 hover:opacity-100 transition-all pointer-events-auto p-2 ml-4 bg-white/5 rounded-full border border-white/10"
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

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-brand" />
                  <span className="text-sm font-bold uppercase tracking-widest">Acceso Panel</span>
                </div>
                <button onClick={() => setShowPasswordModal(false)} className="text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 block">Contraseña de Administrador</label>
                  <input
                    autoFocus
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••"
                    className={`w-full bg-black/50 border ${loginError ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-white/10'} rounded-xl p-4 text-center text-2xl tracking-[0.5em] focus:border-brand outline-none transition-all`}
                  />
                  {loginError && <p className="text-[10px] text-red-500 mt-2 text-center uppercase tracking-widest font-bold">Contraseña Incorrecta</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand p-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,78,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Entrar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Navigation Links</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          value={content.nav1} 
                          onChange={(e) => setContent({...content, nav1: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors"
                          placeholder="Link 1"
                        />
                        <input 
                          value={content.nav2} 
                          onChange={(e) => setContent({...content, nav2: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors"
                          placeholder="Link 2"
                        />
                      </div>
                    </div>
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
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Hero Button Text</label>
                      <input 
                        value={content.heroBtn} 
                        onChange={(e) => setContent({...content, heroBtn: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Logo URL (PNG suggested)</label>
                      <input 
                        value={content.logo} 
                        onChange={(e) => setContent({...content, logo: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/30 mb-2 block">Frase Inspiradora (Separar con coma)</label>
                      <input 
                        value={content.quote} 
                        onChange={(e) => setContent({...content, quote: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none transition-colors italic"
                        placeholder="Las canciones no se escriben, se sienten"
                      />
                    </div>
                  </div>

                  {/* Feature Grid Editors */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-6">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">Cuadrícula de Esencia</label>
                    {content.features.map((f, idx) => (
                      <div key={idx} className="space-y-3 p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            value={f.title} 
                            onChange={(e) => {
                              const newFeatures = [...content.features];
                              newFeatures[idx].title = e.target.value;
                              setContent({...content, features: newFeatures});
                            }}
                            className="w-full bg-transparent border-b border-white/10 p-1 text-sm font-bold text-brand outline-none focus:border-brand"
                            placeholder="Title"
                          />
                          <input 
                            value={f.icon} 
                            onChange={(e) => {
                              const newFeatures = [...content.features];
                              newFeatures[idx].icon = e.target.value;
                              setContent({...content, features: newFeatures});
                            }}
                            className="w-full bg-transparent border-b border-white/10 p-1 text-[10px] text-white/40 outline-none focus:border-brand text-right"
                            placeholder="01"
                          />
                        </div>
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
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none mb-2"
                    />
                    <textarea 
                      value={content.statsDesc} 
                      onChange={(e) => setContent({...content, statsDesc: e.target.value})}
                      rows={2}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-[12px] text-white/60 focus:border-brand outline-none"
                    />
                    <div className="space-y-4">
                      {content.stats.map((s, idx) => (
                        <div key={idx} className="space-y-2 p-3 bg-black/20 rounded-xl border border-white/5">
                          <div className="grid grid-cols-2 gap-2">
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
                              className="bg-transparent border-b border-white/10 text-brand text-sm outline-none text-right font-bold"
                            />
                          </div>
                          <input 
                            value={s.sub} 
                            onChange={(e) => {
                              const newStats = [...content.stats];
                              newStats[idx].sub = e.target.value;
                              setContent({...content, stats: newStats});
                            }}
                            className="w-full bg-transparent border-b border-white/10 text-[9px] text-white/30 outline-none uppercase tracking-widest"
                            placeholder="Sub-label"
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
                      <textarea 
                        value={content.ctaDesc} 
                        onChange={(e) => setContent({...content, ctaDesc: e.target.value})}
                        rows={2}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-[12px] text-white/60 focus:border-brand outline-none"
                      />
                      <input 
                        value={content.ctaBtn} 
                        onChange={(e) => setContent({...content, ctaBtn: e.target.value})}
                        className="w-full bg-brand/10 border border-brand/20 rounded-lg p-3 text-sm font-bold text-brand outline-none"
                      />
                  </div>

                  {/* Footer */}
                  <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-4">
                     <label className="text-[9px] uppercase tracking-widest text-white/30 block border-b border-white/5 pb-2">Pie de Página</label>
                     <input 
                        value={content.footerLabel} 
                        onChange={(e) => setContent({...content, footerLabel: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-brand outline-none"
                      />
                      <input 
                        value={content.footerCopy} 
                        onChange={(e) => setContent({...content, footerCopy: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-[11px] focus:border-brand outline-none"
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
