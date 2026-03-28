'use client';

import { useEffect, useState } from 'react';

interface Episode {
  season: number;
  number: number;
  name: string;
  airdate: string;
  airtime: string;
}

interface Props {
  seriesId: 'bergdoktor' | 'tatort-zuerich';
}

const SHOWS = {
  'bergdoktor': { tvmazeId: 6487, sender: 'ZDF', label: 'Der Bergdoktor', note: '' },
  'tatort-zuerich': { tvmazeId: 6446, sender: 'Das Erste', label: 'Tatort', note: 'Alle Tatort-Folgen inkl. anderer Ermittlerteams' },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const months = ['Jan.', 'Feb.', 'Mär.', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'];
  return `${days[d.getDay()]}. ${d.getDate()}. ${months[d.getMonth()]}`;
}

export function SendetermineWidget({ seriesId }: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const show = SHOWS[seriesId];

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${show.tvmazeId}/episodes`)
      .then(r => r.json())
      .then((data: Episode[]) => {
        const today = new Date().toISOString().split('T')[0];
        const upcoming = data.filter(ep => ep.airdate >= today);
        const recent = data.filter(ep => ep.airdate < today).slice(-3);
        setEpisodes([...recent, ...upcoming].slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [show.tvmazeId]);

  if (loading) {
    return (
      <div className="max-w-xl bg-surface rounded-xl p-5 animate-pulse">
        <div className="h-5 bg-foreground/10 rounded w-48 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-4 bg-foreground/10 rounded w-full" />)}
        </div>
      </div>
    );
  }

  if (episodes.length === 0) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-xl bg-surface rounded-xl border border-foreground/10 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 bg-foreground/5 border-b border-foreground/10">
        <span className="text-base">📺</span>
        <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">
          Sendetermine
        </h3>
        <span className="text-xs text-foreground/40 ml-auto">{show.sender}</span>
      </div>
      <div className="divide-y divide-foreground/5">
        {episodes.map((ep, i) => {
          const isPast = ep.airdate < today;
          const isNext = !isPast && (i === 0 || episodes[i - 1]?.airdate < today);
          return (
            <div
              key={`${ep.season}-${ep.number}`}
              className={`flex items-center gap-4 px-5 py-3 ${
                isPast ? 'opacity-40' : ''
              } ${isNext ? 'bg-brand-orange/10 border-l-3 border-brand-orange' : ''}`}
            >
              <div className="w-28 shrink-0">
                <span className={`text-sm ${isNext ? 'text-brand-orange font-bold' : 'text-foreground/60'}`}>
                  {formatDate(ep.airdate)}
                </span>
              </div>
              <span className={`text-sm ${isNext ? 'text-brand-orange' : 'text-foreground/40'}`}>
                {ep.airtime || '20:15'}
              </span>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className={`truncate text-sm ${isNext ? 'text-foreground font-semibold' : 'text-foreground/80'}`}>
                  {ep.name}
                </span>
                {isNext && (
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-brand-orange text-white px-2 py-0.5 rounded-full">
                    Next
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-5 py-2 bg-foreground/5 border-t border-foreground/10 flex items-center justify-between">
        <span className="text-[10px] text-foreground/30">Quelle: TVmaze · Ohne Gewähr</span>
        {show.note && <span className="text-[10px] text-foreground/30">{show.note}</span>}
      </div>
    </div>
  );
}
