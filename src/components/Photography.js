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
    src: `${process.env.PUBLIC_URL}/Photography/Arya.jpg`,
    title: 'Portrait1',
    camera: {
      camera: 'Sony A6400',
      lens: 'Sony 50mm f/1.8',
      settings: 'f/1.8, 1/1000s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure +0.61, Contrast +29, Highlights -85, Shadows +36, Whites -23, Blacks -24, Saturation 0, Texture +11, Clarity 0, Dehaze +9'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Keerthi.jpg`,
    title: 'Portrait2',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/3.5, 1/500s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure -0.59, Contrast 0, Highlights -100, Shadows +15, Whites -25, Blacks +20, Saturation 0, Texture +15, Clarity +11, Dehaze +27'
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Adhu.jpg`,
    title: 'Portrait3',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/1.7, 1/1000s, ISO 400'
    },
    editing: {
      adjustments: 'Exposure -0.51, Contrast -12, Highlights -24, Shadows +29, Whites -37, Blacks -16, Saturation +9, Texture +13, Clarity +10, Dehaze +3'
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
  },
    {
    src: `${process.env.PUBLIC_URL}/Photography/Koorosh.jpg`,
    title: 'Portrait3',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/1.7, 1/90s, ISO 400'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
    {
    src: `${process.env.PUBLIC_URL}/Photography/20251125-_NAV7298-HDR.jpg`,
    title: 'Milkyway BigBend',
    camera: {
      camera: 'Sony A6400',
      lens: 'Sony 24-50mm f/2.8',
      settings: 'f/2.8, 13s, ISO 3200'
    },
    editing: {
      adjustments: 'Exposure -0.27, Contrast +45, Highlights +39, Shadows +49, Whites +25, Blacks -49, Saturation +25, Texture +100, Clarity +62, Dehaze +46'
    }
  },
    {
    src: `${process.env.PUBLIC_URL}/Photography/Keerthi_1.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
    {
    src: `${process.env.PUBLIC_URL}/Photography/Brenda.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Adu_1.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Brenda_1.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Brenda_2.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Brenda_Hari.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Adu_2.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Group_photo.jpg`,
    title: 'Portrait4',
    camera: {
      camera: 'Sony A6400',
      lens: 'Viltrox 25mm f/1.7',
      settings: 'f/5.6, 1/125s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
  {
    src: `${process.env.PUBLIC_URL}/Photography/Santa_Elena_Canyon.jpg`,
    title: 'Santa Elena Canyon',
    camera: {
      camera: 'Sony A6400',
      lens: 'Sigma 24-70mm f/2.8',
      settings: 'f/2.8, 1/60s, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  },
    {
    src: `${process.env.PUBLIC_URL}/Photography/Mount_Blue_Sky.jpg`,
    title: 'Mount Blue Sky',
    camera: {
      camera: 'Sony A6400',
      lens: 'Sigma 10-18mm',
      settings: 'f/2.8, 1/2000, ISO 100'
    },
    editing: {
      adjustments: 'Exposure , Contrast , Highlights , Shadows , Whites , Blacks , Saturation , Texture , Clarity , Dehaze '
    }
  }
];


export default function Photography() {
  const [active, setActive] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // Show first 8 photos initially for faster loading
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(false); // Start with false to show content immediately

  const close = useCallback(() => setActive(null), []);
  const open = useCallback((idx) => setActive(idx), []);

  const showMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 12, photos.length));
  }, []);

  const handleImageLoad = useCallback((src) => {
    setLoadedImages(prev => {
      const newSet = new Set([...prev, src]);
      return newSet;
    });
  }, []);

  // Preload next batch of images
  useEffect(() => {
    const preloadImages = () => {
      const nextBatch = photos.slice(visibleCount, visibleCount + 8);
      nextBatch.forEach(photo => {
        const img = new Image();
        img.src = photo.src;
      });
    };
    
    if (visibleCount < photos.length) {
      preloadImages();
    }
  }, [visibleCount]);

  useEffect(() => {
    function onKey(e) {
      // Prevent common screenshot shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault();
        return;
      }
      
      // Prevent F12 and other dev tools
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        return;
      }
      
      if (e.key === 'Escape') close();
      if (active !== null) {
        if (e.key === 'ArrowRight') setActive((i) => Math.min(photos.length - 1, i + 1));
        if (e.key === 'ArrowLeft') setActive((i) => Math.max(0, i - 1));
      }
    }
    
    // Prevent right-click context menu
    function onContextMenu(e) {
      e.preventDefault();
    }
    
    // Prevent drag and drop
    function onDragStart(e) {
      e.preventDefault();
    }
    
    // Prevent selection
    function onSelectStart(e) {
      e.preventDefault();
    }
    
    window.addEventListener('keydown', onKey);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('selectstart', onSelectStart);
    
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('selectstart', onSelectStart);
    };
  }, [active, close]);


return (
<section className="pg-section">
<h2 className="pg-title">Photography</h2>
<p className="pg-intro">Click on the photo to see in full size
</p>

{isInitialLoading && (
  <div className="pg-initial-loading">
    <div className="pg-loading-spinner"></div>
    <p>Loading photos...</p>
  </div>
)}

<div className="pg-grid" aria-label="Photo grid">
  {photos.slice(0, visibleCount).map((photo, i) => (
    <button
      key={photo.src}
      className="pg-tile"
      onClick={() => open(i)}
      aria-label={`Open photo ${i + 1}: ${photo.title}`}
    >
      <img 
        loading="lazy" 
        src={photo.src} 
        alt={photo.title}
        onLoad={() => handleImageLoad(photo.src)}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{ 
          opacity: loadedImages.has(photo.src) ? 1 : 0,
          transition: 'opacity 0.3s ease',
          userSelect: 'none',
          pointerEvents: 'auto'
        }}
      />
      {!loadedImages.has(photo.src) && (
        <div className="pg-loading-placeholder">
          <div className="pg-loading-spinner"></div>
        </div>
      )}
      <div className="pg-tile-overlay">
        <span className="pg-tile-title">{photo.title}</span>
      </div>
    </button>
  ))}

  {visibleCount < photos.length && (
    <div className="pg-show-more">
      <button 
        className="pg-show-more-btn" 
        onClick={showMore}
        aria-label="Show more photos"
        title="Show more"
      >
        <span>Show More</span>
        <svg className="pg-arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5"/>
          <path d="M7 6l5 5 5-5"/>
        </svg>
      </button>
    </div>
  )}
</div>


{active !== null && (
<div className="pg-lightbox" role="dialog" aria-modal="true" onClick={close}>
<button className="pg-close" aria-label="Close" onClick={close}>×</button>
{active > 0 && (
<button
className="pg-nav pg-prev"
onClick={(e) => { e.stopPropagation(); setActive((i) => Math.max(0, i - 1)); }}
aria-label="Previous"
>
‹
</button>
)}
<div className="pg-lightbox-content">
  <img
    className="pg-image"
    src={photos[active].src}
    alt={`Photo ${active + 1} of ${photos.length}: ${photos[active].title}`}
    onClick={(e) => e.stopPropagation()}
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
    style={{ userSelect: 'none' }}
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
{active < photos.length - 1 && (
<button
className="pg-nav pg-next"
onClick={(e) => { e.stopPropagation(); setActive((i) => Math.min(photos.length - 1, i + 1)); }}
aria-label="Next"
>
›
</button>
)}
</div>
)}
</section>
);
}
