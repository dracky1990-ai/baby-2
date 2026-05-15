import React, { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  src: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      // Explicitly try to play after a short delay to ensure DOM is ready
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented:", error);
          // If prevented, we can try to play again on first user interaction if needed, 
          // but muted + playsInline usually works.
        });
      }
    }
  }, [src]);

  if (!src) return null;
  
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none bg-black">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-0 transition-opacity duration-1000"
        onCanPlay={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        onError={(e) => {
          console.error("Video failed to load:", src, e);
        }}
      />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </div>
  );
};

export default BackgroundVideo;
