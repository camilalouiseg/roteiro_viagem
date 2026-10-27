import React from 'react';
import { Train, Bus } from 'lucide-react';
import { TransitCard } from '../data/itineraryData';

interface TransitCardViewProps {
  card: TransitCard;
  title?: string;
}

export const TransitCardView: React.FC<TransitCardViewProps> = ({ card, title }) => {
  const isBus = card.tipoMeio.toLowerCase().includes('flixbus') || card.tipoMeio.toLowerCase().includes('ônibus');

  return (
    <div className="my-5 rounded-xl border border-stone-200 bg-stone-50/80 p-5 shadow-xs transition-all">
      {title && (
        <div className="text-center mb-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            {title}
          </span>
        </div>
      )}

      {/* Main Route Visualization */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-2">
        {/* Origin */}
        <div className="text-left">
          <div className="text-xs font-semibold tracking-wide text-stone-700 uppercase">
            {card.origem}
          </div>
          <div className="text-xl font-mono font-bold text-stone-900 mt-0.5">
            {card.origemHorario}
          </div>
        </div>

        {/* Journey Center Visual Line */}
        <div className="flex flex-col items-center px-4 w-44 md:w-56">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200/60 mb-2">
            {isBus ? <Bus className="w-3.5 h-3.5" /> : <Train className="w-3.5 h-3.5" />}
            <span>{card.tipoMeio}</span>
          </div>
          
          <div className="w-full flex items-center relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 mx-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
          </div>

          {card.observacao && (
            <span className="text-[10px] text-stone-500 mt-1 font-mono">
              {card.observacao}
            </span>
          )}
        </div>

        {/* Destination */}
        <div className="text-right">
          <div className="text-xs font-semibold tracking-wide text-stone-700 uppercase">
            {card.destino}
          </div>
          <div className="text-xl font-mono font-bold text-stone-900 mt-0.5">
            {card.destinoHorario}
          </div>
        </div>
      </div>

      {/* Booking Details Strip */}
      <div className="mt-4 pt-3 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
            PLATAFORMA
          </span>
          <span className="font-semibold text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-200 text-xs">
            {card.plataforma}
          </span>
        </div>

        {card.chegada && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
              CHEGADA
            </span>
            <span className="font-semibold text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-200 text-xs">
              {card.chegada}
            </span>
          </div>
        )}

        {card.lugares && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
              LUGARES
            </span>
            <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70 text-xs font-mono">
              {card.lugares}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
