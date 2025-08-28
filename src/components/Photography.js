import React, { useState, useCallback, useEffect } from 'react';
import './Phototgraphy.css'; 


const photos = [
  {
    src: `${process.env.PUBLIC_URL}/Photography/360Bridge.jpg`,
    title: '360 Bridge, Austin',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/8, 1/350s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure +1.85, Contrast +65, Highlights -100, Shadows +18, Whites -3, Blacks +47, Saturation -10, Texture +14, Clarity +27, Dehaze +75'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Austin_nightscape.jpg`,
    title: 'Austin Nightscape',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/8, 20s, ISO 400'
    },
    editing: {
      adjustments: 'Exposure +0.07, Contrast +38, Highlights -100, Shadows -46, Whites +42, Blacks -49, Saturation +27, Texture +30, Clarity +33, Dehaze +100'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/South_Austin_Sunset.jpg`,
    title: 'South Austin Sunset',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/6.7, 1/4000s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure +0.34, Contrast +43, Highlights -10, Shadows -2, Whites +29, Blacks +44, Saturation +28, Texture +13, Clarity +14, Dehaze +52'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Austin_lady_bird_lake.jpg`,
    title: 'Austin Ladybird Lake',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 30s, ISO 400'
    },
    editing: {
      adjustments: 'Exposure -0.95, Contrast +100, Highlights -23, Shadows +29, Whites -3, Blacks -25, Saturation 0, Texture +38, Clarity +100, Dehaze +82'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Chicago_overcast.jpg`,
    title: 'Chicago Overcast',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/2.4, 1/125s, ISO 1600'
    },
    editing: {
      adjustments: 'Exposure -0.27, Contrast +45, Highlights +39, Shadows +49, Whites +25, Blacks -49, Saturation +25, Texture +100, Clarity +62, Dehaze +46'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Caterpiller.jpg`,
    title: 'Caterpillar Macro',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/1.7, 1/750s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure +0.62, Contrast +78, Highlights -84, Shadows -39, Whites +24, Blacks -9, Saturation 0, Texture 0, Clarity +34, Dehaze +31'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Cactus.jpg`,
    title: 'Cactus',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/2, 1/3000s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure +0.50, Contrast +86, Highlights -80, Shadows -15, Whites +42, Blacks -13, Saturation +19, Texture +18, Clarity +16, Dehaze +25'
    }
  }
];


export default function Photography() {
  const [active, setActive] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Show first 10 photos initially

  const close = useCallback(() => setActive(null), []);
  const open = useCallback((idx) => setActive(idx), []);

  const showMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 10, photos.length));
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (active !== null) {
        if (e.key === 'ArrowRight') setActive((i) => Math.min(photos.length - 1, i + 1));
        if (e.key === 'ArrowLeft') setActive((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close]);


return (
<section className="pg-section">
<h2 className="pg-title">Photography</h2>
<p className="pg-intro">
</p>


<div className="pg-grid" aria-label="Photo grid">
  {photos.slice(0, visibleCount).map((photo, i) => (
    <button
      key={photo.src}
      className="pg-tile"
      onClick={() => open(i)}
      aria-label={`Open photo ${i + 1}: ${photo.title}`}
    >
      <img loading="lazy" src={photo.src} alt={photo.title} />
      <div className="pg-tile-overlay">
        <span className="pg-tile-title">{photo.title}</span>
      </div>
    </button>
  ))}
</div>

{visibleCount < photos.length && (
  <div className="pg-show-more">
    <button 
      className="pg-show-more-btn" 
      onClick={showMore}
      aria-label="Show more photos"
    >
      <span>Show More</span>
      <svg className="pg-arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 13l5 5 5-5"/>
        <path d="M7 6l5 5 5-5"/>
      </svg>
    </button>
  </div>
)}


{active !== null && (
<div className="pg-lightbox" role="dialog" aria-modal="true" onClick={close}>
<button className="pg-close" aria-label="Close" onClick={close}>×</button>
<button
className="pg-nav pg-prev"
onClick={(e) => { e.stopPropagation(); setActive((i) => Math.max(0, i - 1)); }}
aria-label="Previous"
>
‹
</button>
<div className="pg-lightbox-content">
  <img
    className="pg-image"
    src={photos[active].src}
    alt={`Photo ${active + 1} of ${photos.length}: ${photos[active].title}`}
    onClick={(e) => e.stopPropagation()}
  />
  <div className="pg-photo-info">
    <div className="pg-info-section">
      <h4>Camera Settings</h4>
      <div className="pg-info-item">
        <span className="pg-info-label">Camera:</span>
        <span className="pg-info-value">{photos[active].camera.camera}</span>
      </div>
      <div className="pg-info-item">
        <span className="pg-info-label">Lens:</span>
        <span className="pg-info-value">{photos[active].camera.lens}</span>
      </div>
      <div className="pg-info-item">
        <span className="pg-info-label">Settings:</span>
        <span className="pg-info-value">{photos[active].camera.settings}</span>
      </div>
    </div>
    <div className="pg-info-section">
      <h4>Editing Details</h4>
      <div className="pg-info-item">
        <span className="pg-info-label">Adjustments:</span>
        <span className="pg-info-value">{photos[active].editing.adjustments}</span>
      </div>
    </div>
  </div>
</div>
<button
className="pg-nav pg-next"
onClick={(e) => { e.stopPropagation(); setActive((i) => Math.min(photos.length - 1, i + 1)); }}
aria-label="Next"
>
›
</button>
</div>
)}
</section>
);
}
