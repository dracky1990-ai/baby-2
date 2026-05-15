import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundCanvas from './components/BackgroundCanvas';
import BackgroundVideo from './components/BackgroundVideo';
import { Sparkles, Sliders, Image as ImageIcon, Upload, X, Settings, ArrowRight, Github, Twitter, Lock, Save, Layout, Type, Film } from 'lucide-react';

const INITIAL_CONTENT = {
  logo: "https://ik.imagekit.io/x8axvbbz3/Gemini_Generated_Image_jc7opdjc7opdjc7o-removebg-preview.png?updatedAt=1778201669242",
  bgVideo: "https://ik.imagekit.io/ltrqfbdkh/08%20(1).mp4", // Newest high quality background video
  label: "La Musa Escénica",
  nav1: "Esencia",
  nav2: "Universo",
  heroTitle: "Invocando \nEmociones",
  heroDesc: "Barbara Higuera no escribe canciones, las convierte en escenas. Letras con identidad, alma y estética diseñadas para ser recordadas.",
  heroBtn: "Descubrir el Universo",
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
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('la_musa_content');
      return saved ? JSON.parse(saved) : INITIAL_CONTENT;
    } catch (e) {
      console.warn("Failed to load content from localStorage", e);
      return INITIAL_CONTENT;
    }
  });
  const [bgImage, setBgImage] = useState(() => {
    try {
      return localStorage.getItem('la_musa_bgImage') || PRESETS[0].url;
    } catch (e) {
      return PRESETS[0].url;
    }
  });
  const [bgVideo, setBgVideo] = useState(() => {
    try {
      return localStorage.getItem('la_musa_bgVideo') || INITIAL_CONTENT.bgVideo;
    } catch (e) {
      return INITIAL_CONTENT.bgVideo;
    }
  });
  const [particleCount, setParticleCount] = useState(() => {
    try {
      return Number(localStorage.getItem('la_musa_particleCount')) || 20;
    } catch (e) {
      return 20;
    }
  });

  // Persistence Effects
  useEffect(() => {
    // Migration: Ensure user gets the absolute latest video URL if they have a legacy one
    const legacyVideos = [
      "https://ik.imagekit.io/x8axvbbz3/0508.mp4",
      "https://ik.imagekit.io/x8axvbbz3/palomas%20blancas.mp4",
      "https://ik.imagekit.io/x8axvbbz3/blancas%20palomas.mp4"
    ];
    
    if (legacyVideos.includes(bgVideo)) {
      setBgVideo(INITIAL_CONTENT.bgVideo);
    }
    
    try {
      localStorage.setItem('la_musa_content', JSON.stringify(content));
      localStorage.setItem('la_musa_bgImage', bgImage);
      localStorage.setItem('la_musa_bgVideo', bgVideo);
      localStorage.setItem('la_musa_particleCount', particleCount.toString());
    } catch (e) {
      console.warn("Failed to save to localStorage", e);
    }
  }, [content, bgImage, bgVideo, particleCount]);

  const resetToDefaults = () => {
    if (window.confirm("¿Estás seguro de que quieres restablecer todos los valores por defecto? Se perderán tus cambios personalizados.")) {
      setContent(INITIAL_CONTENT);
      setBgImage(PRESETS[0].url);
      setBgVideo(INITIAL_CONTENT.bgVideo);
      setParticleCount(20);
      localStorage.removeItem('la_musa_content');
      localStorage.removeItem('la_musa_bgImage');
      localStorage.removeItem('la_musa_bgVideo');
      localStorage.removeItem('la_musa_particleCount');
      alert("Valores restablecidos. Por favor refrezca la página si no ves los cambios.");
    }
  };

  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const meowAudioRef = useRef<HTMLAudioElement | null>(null);

  const playMeow = () => {
    if (!meowAudioRef.current) {
      meowAudioRef.current = new Audio('https://ik.imagekit.io/x8axvbbz3/yomecerlm3-meow-460686.mp3');
    }
    meowAudioRef.current.currentTime = 0;
    meowAudioRef.current.play().catch(e => console.error("Audio play failed:", e));
  };

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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgVideo(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const textBlurVariants = {
    hidden: { opacity: 0, filter: "blur(20px)", scale: 1.1 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)", 
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-brand/30 overflow-x-hidden">
      <BackgroundVideo src={bgVideo} />
      <BackgroundCanvas bgImage={bgVideo ? "" : bgImage} particleCount={particleCount} />
      
      {/* Navigation */}
      <nav className="fixed md:absolute top-0 w-full p-2 sm:p-6 md:p-8 lg:p-16 flex justify-between items-center z-[60] pointer-events-none bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border-b border-white/5 md:border-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05, 
            filter: "brightness(1.6) drop-shadow(0 0 60px rgba(255,78,0,0.8))",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={playMeow}
          className="flex items-center gap-4 group cursor-pointer pointer-events-auto transition-all"
        >
          <img 
            src={content.logo} 
            alt="Logo" 
            className="w-28 h-28 sm:w-48 sm:h-48 md:w-80 md:h-80 lg:w-[480px] lg:h-[480px] object-contain filter drop-shadow-[0_0_80px_rgba(255,78,0,0.4)] brightness-125 transition-all duration-700 slide-in-bck-bottom"
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
            className="text-white font-medium hover:text-white transition-all cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,1)] px-2"
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
            className="text-white font-medium hover:text-white transition-all cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,1)] px-2"
          >
            {content.nav2}
          </motion.a>
        </motion.div>
      </nav>

      {/* Landing Page Content */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Section 1: Hero */}
        <section className="min-h-screen flex flex-col justify-center pt-24 sm:pt-20 md:pt-[450px] lg:pt-[580px] pb-12 sm:pb-20 md:pb-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
            }}
            className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] sm:tracking-[0.6em] uppercase font-bold text-brand mb-4 md:mb-8 flex items-center gap-3 md:gap-4 drop-shadow-[0_0_20px_rgba(255,78,0,0.5)]"
          >
            <motion.div 
              variants={{
                hidden: { scaleX: 0, originX: 0 },
                visible: { scaleX: 1, transition: { duration: 1, ease: "circOut" } }
              }}
              className="w-6 sm:w-10 md:w-20 h-[1.5px] md:h-[2px] bg-brand shadow-[0_0_20px_rgba(255,78,0,1)]" 
            />
            <div className="flex overflow-hidden">
              {content.label.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6 md:gap-16">
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{
                visible: { transition: { staggerChildren: 0.03 } }
              }}
              className="text-5xl sm:text-6xl md:text-[80px] lg:text-[110px] font-serif font-extralight tracking-tight md:tracking-[-4px] leading-[0.95] sm:leading-[1.1] md:leading-[0.8] mb-4 md:mb-8 drop-shadow-[0_10px_40px_rgba(0,0,0,1)] whitespace-pre-line overflow-hidden"
            >
              {content.heroTitle.split('\n').map((line, i) => (
                <div key={i} className="flex flex-wrap items-center">
                  {line.split(' ').map((word, wordIdx) => (
                    <div key={wordIdx} className="flex overflow-hidden mr-[0.3em] py-2">
                      {word.split('').map((char, charIdx) => (
                        <motion.span
                          key={charIdx}
                          variants={{
                            hidden: { y: "150%", opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
                          }}
                          className={word.includes('Emociones') ? "italic text-glow drop-shadow-[0_0_40px_rgba(255,78,0,0.8)]" : ""}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  ))}
                  {i === 0 && <div className="w-full hidden sm:block" />}
                </div>
              ))}
            </motion.h1>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.015, delayChildren: 0.8 } }
              }}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-[500px] leading-relaxed mb-6 md:mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-medium"
            >
              {content.heroDesc.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                  <motion.span
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } }
            }}
          >
            <motion.button 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
              }}
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
              <motion.span 
                variants={{
                  hidden: { opacity: 0, filter: "blur(4px)" },
                  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
                }}
                className="group-hover:text-brand group-hover:drop-shadow-[0_0_25px_rgba(255,78,0,0.9)] transition-all drop-shadow-[0_4px_20px_rgba(0,0,0,1)]"
              >
                {content.heroBtn}
              </motion.span>
            </motion.button>
          </motion.div>
        </section>

        {/* Section 5: Final Footer */}
        <footer className="py-12 md:py-24 px-6 md:px-8 lg:px-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/10 pt-16 md:pt-24 pb-8 md:pb-12">
              <motion.div variants={itemVariants} className="flex items-center gap-8 opacity-80">
                <motion.div whileHover={{ scale: 1.2, color: "#fff", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>
                  <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-all" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, color: "#fff", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))" }}>
                  <Github className="w-5 h-5 cursor-pointer hover:text-white transition-all" />
                </motion.div>
                <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white/50 border-l border-white/20 pl-8">Barbara Higuera Lab</span>
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-center md:text-right flex flex-col items-center md:items-end group">
                <div className="text-[10px] tracking-[0.4em] uppercase text-white/80 mb-2 font-bold italic drop-shadow-md">{content.footerLabel}</div>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] tracking-widest uppercase text-white/70 font-bold drop-shadow-sm">{content.footerCopy}</div>
                  <motion.button
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPasswordModal(true)}
                    className="opacity-[0.08] hover:opacity-100 transition-all pointer-events-auto p-1"
                    title=""
                  >
                    <Lock className="w-2.5 h-2.5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
                    <label className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4 block underline decoration-brand/30">Video de Fondo (Loop)</label>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={bgVideo}
                          onChange={(e) => setBgVideo(e.target.value)}
                          placeholder="URL del video (mp4)"
                          className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2 text-xs focus:border-brand outline-none"
                        />
                        <button 
                          onClick={() => videoInputRef.current?.click()}
                          className="p-2 bg-brand/10 border border-brand/20 rounded-lg text-brand hover:bg-brand hover:text-white transition-all"
                          title="Subir Video"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setBgVideo("")}
                          className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Eliminar Video"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <input 
                          ref={videoInputRef}
                          type="file" 
                          accept="video/mp4" 
                          className="hidden" 
                          onChange={handleVideoUpload}
                        />
                      </div>
                      <p className="text-[8px] text-white/30 italic">Tip: Use un video de alta calidad en formato .mp4 para mejores resultados.</p>
                    </div>
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

            <div className="p-8 bg-black/60 border-t border-white/10 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const config = {
                    content,
                    bgImage,
                    bgVideo,
                    particleCount
                  };
                  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'config_la_musa.json';
                  a.click();
                  alert("Configuración exportada. Por favor, compártela conmigo si quieres que estos cambios sean permanentes en el código fuente.");
                }}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-3 h-3" />
                Exportar para el Desarrollador
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetToDefaults}
                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-red-500/20 hover:text-red-400 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-3 h-3" />
                Restablecer a Valores de Fábrica
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSettings(false)}
                className="w-full bg-brand p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,78,0,0.3)]"
              >
                Aplicar Cambios
              </motion.button>
              <p className="text-[8px] text-center mt-4 text-white/20 uppercase tracking-[0.3em]">Cambios persistentes en este navegador</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
