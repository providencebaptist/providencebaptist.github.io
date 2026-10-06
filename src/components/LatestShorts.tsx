import { useEffect, useState } from "react";

type Short = { id: string; title: string; published: string };

const FALLBACK_LIST = "UUSHblyD0D5m6QWqNrjjMqy_cw";

const LatestShorts = () => {
  const [shorts, setShorts] = useState<Short[] | null>(null);

  useEffect(() => {
    fetch(`/youtube-shorts.json?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setShorts(Array.isArray(d?.shorts) ? d.shorts.slice(0, 2) : []))
      .catch(() => setShorts([]));
  }, []);

  if (shorts === null) return null;

  const items =
    shorts.length > 0
      ? shorts.map((s) => ({ key: s.id, src: `https://www.youtube-nocookie.com/embed/${s.id}`, title: s.title }))
      : [{ key: "list", src: `https://www.youtube-nocookie.com/embed/videoseries?list=${FALLBACK_LIST}`, title: "A Short on YouTube" }];

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 justify-items-center">
      {items.map((item) => (
        <div key={item.key} className="w-full max-w-xs">
          <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden shadow-2xl bg-primary">
            <iframe
              src={item.src}
              title={`${item.title} - Providence Baptist Church`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <p className="mt-2 text-sm text-center text-muted-foreground line-clamp-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default LatestShorts;
