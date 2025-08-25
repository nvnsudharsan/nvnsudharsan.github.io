import React, { useState, useCallback, useEffect } from 'react';
import './Photography.css'; 


const photos = [
`${process.env.PUBLIC_URL}/images/photography/austin_skyline.jpg`,
`${process.env.PUBLIC_URL}/images/photography/milky_way.jpg`,
`${process.env.PUBLIC_URL}/images/photography/trail_bridge.jpg`,
`${process.env.PUBLIC_URL}/images/photography/desert_road.jpg`,
`${process.env.PUBLIC_URL}/images/photography/longhorn_game.jpg`,
`${process.env.PUBLIC_URL}/images/photography/lake_sunset.jpg`,
`${process.env.PUBLIC_URL}/images/photography/city_rain.jpg`,
`${process.env.PUBLIC_URL}/images/photography/mountain_fog.jpg`,
`${process.env.PUBLIC_URL}/images/photography/oak_creek.jpg`,
];


export default function Photography() {
const [active, setActive] = useState(null);


const close = useCallback(() => setActive(null), []);
const open = useCallback((idx) => setActive(idx), []);


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
A curated selection of moments from my travels and fieldwork. Click any image to view full screen.
</p>


<div className="pg-grid" aria-label="Photo grid">
{photos.map((src, i) => (
<button
key={src}
className="pg-tile"
onClick={() => open(i)}
aria-label={`Open photo ${i + 1}`}
>
<img loading="lazy" src={src} alt="Naveen Sudharsan photography" />
</button>
))}
</div>


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
<img
className="pg-image"
src={photos[active]}
alt={`Photo ${active + 1} of ${photos.length}`}
onClick={(e) => e.stopPropagation()}
/>
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
