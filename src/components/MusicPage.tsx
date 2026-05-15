import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronLeft, Disc, Music as MusicIcon, Clock } from 'lucide-react';

interface Song {
  name: string;
  duration: string;
  url: string;
}

interface Album {
  id: string;
  title: string;
  cover: string;
  year: string;
  songs: Song[];
}

interface MusicPageProps {
  onBack: () => void;
  musicContent: {
    title: string;
    desc: string;
    albums: Album[];
  };
}

const MusicPage: React.FC<MusicPageProps> = ({ onBack, musicContent }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (songUrl: string) => {
    if (playingSong === songUrl) {
      audioRef.current?.pause();
      setPlayingSong(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = songUrl;
        audioRef.current.play().catch(console.error);
      }
      setPlayingSong(songUrl);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 sm:pt-40 pb-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto relative z-10"
    >
      <audio 
        ref={audioRef} 
        onEnded={() => setPlayingSong(null)}
        className="hidden"
      />

      <div className="flex flex-col gap-12 md:gap-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <motion.button
              whileHover={{ x: -10 }}
              onClick={onBack}
              className="flex items-center gap-2 text-white/40 hover:text-brand transition-all uppercase tracking-widest text-[10px] font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              Regresar
            </motion.button>
            <motion.h1 
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-serif italic text-white drop-shadow-2xl"
            >
              {musicContent.title}
            </motion.h1>
            <p className="text-white/60 max-w-xl text-lg border-l border-brand/40 pl-6">
              {musicContent.desc}
            </p>
          </div>
          <div className="p-4 rounded-full bg-white/5 border border-white/10 hidden md:block">
            <Disc className="w-8 h-8 text-brand animate-spin-slow" />
          </div>
        </div>

        {/* Dynamic Display: List or Details */}
        <AnimatePresence mode="wait">
          {!selectedAlbum ? (
            <motion.div 
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {musicContent.albums.map((album) => (
                <motion.div
                  key={album.id}
                  variants={itemVariants}
                  whileHover={{ y: -15, scale: 1.02 }}
                  onClick={() => setSelectedAlbum(album)}
                  className="group relative cursor-pointer"
                >
                  <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                    <img 
                      src={album.cover} 
                      alt={album.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                        <MusicIcon className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-2xl font-serif italic text-white group-hover:text-brand transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2">
                      <span className="w-8 h-px bg-white/20" />
                      {album.year} • {album.songs.length} Canciones
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12"
            >
              <div className="md:col-span-4 lg:col-span-5 space-y-8">
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/20">
                  <img 
                    src={selectedAlbum.cover} 
                    alt={selectedAlbum.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-4 text-brand p-4 rounded-2xl bg-brand/10 border border-brand/20 hover:bg-brand hover:text-white transition-all w-full justify-center uppercase tracking-widest font-bold text-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Volver a Álbumes
                </button>
              </div>

              <div className="md:col-span-8 lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-7xl font-serif italic text-white mb-2 drop-shadow-xl">{selectedAlbum.title}</h2>
                  <div className="flex gap-4 text-[10px] uppercase tracking-widest text-white/40">
                    <span>{selectedAlbum.year}</span>
                    <span>•</span>
                    <span>Studio Album</span>
                  </div>
                </div>

                <div className="space-y-px rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  {selectedAlbum.songs.map((song, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="flex items-center justify-between p-6 transition-all border-b border-white/5 last:border-0 group"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-white/20 font-mono text-sm w-4">{String(idx + 1).padStart(2, '0')}</span>
                        <button 
                          onClick={() => togglePlay(song.url)}
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand transition-all text-white"
                        >
                          {playingSong === song.url ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-1 fill-current" />}
                        </button>
                        <div>
                          <h4 className={`text-lg font-medium transition-colors ${playingSong === song.url ? 'text-brand' : 'text-white'}`}>
                            {song.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-widest text-white/30">Barbara Higuera</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-white/30 text-xs">
                        <Clock className="w-3 h-3" />
                        {song.duration}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MusicPage;
