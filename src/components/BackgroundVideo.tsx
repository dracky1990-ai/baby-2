import React, { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  src: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => {
        console.warn("Video auto-play failed, usually due to browser policy:", e);
      });
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
        className="w-full h-full object-cover opacity-90"
      />
    </div>
  );
};

export default BackgroundVideo;
