// src/pages/Photography.js
export default function Photography() {
const [active, setActive] = useState(null); // index of selected photo


const close = useCallback(() => setActive(null), []);
const open = useCallback((idx) => setActive(idx), []);


// Close on ESC
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
<section className="section">
<h2 style={{ fontSize: '2.5rem' }}>Photography</h2>
<p style={{ maxWidth: 820, margin: '0 auto 1.25rem', color: 'var(--color-light-gray-blue, #dce8f2)' }}>
A curated selection of moments from my travels and fieldwork. Click any image to view full screen.
</p>


<div className="photo-grid" aria-label="Photo grid">
{photos.map((src, i) => (
<button
key={src}
className="photo-tile"
onClick={() => open(i)}
aria-label={`Open photo ${i + 1}`}
>
<img loading="lazy" src={src} alt="Naveen Sudharsan photography" />
</button>
))}
</div>


{active !== null && (
<div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
<button className="lightbox-close" aria-label="Close" onClick={close}>×</button>
<button
className="lightbox-nav prev"
onClick={(e) => { e.stopPropagation(); setActive((i) => Math.max(0, i - 1)); }}
aria-label="Previous"
>
‹
</button>
<img
className="lightbox-image"
src={photos[active]}
alt={`Photo ${active + 1} of ${photos.length}`}
onClick={(e) => e.stopPropagation()}
/>
<button
className="lightbox-nav next"
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
