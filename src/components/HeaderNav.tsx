import React from 'react';
import { Printer, BookOpen, Smartphone, Search, Compass, Edit3 } from 'lucide-react';
import { useItinerary } from '../context/ItineraryContext';

interface HeaderNavProps {
  viewMode: 'pdf' | 'interactive' | 'editor';
  setViewMode: (mode: 'pdf' | 'interactive' | 'editor') => void;
  onPrint: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  viewMode,
  setViewMode,
  onPrint,
  searchQuery,
  setSearchQuery
}) => {
  const { isEdited } = useItinerary();

  return (
    <header className="no-print sticky top-0 z-50 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-lg font-semibold tracking-wide text-white block leading-tight">
              Europa Central
            </span>
            <span className="text-[10px] tracking-widest uppercase text-stone-400 font-mono">
              Roteiro Oficial · 2026
            </span>
          </div>
        </div>

        {/* View Mode & Search Center */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl justify-center">
          <div className="flex items-center bg-stone-800 p-1 rounded-lg border border-stone-700/60 text-xs font-medium">
            <button
              onClick={() => setViewMode('pdf')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                viewMode === 'pdf'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Visualizar formato de impressão A4 idêntico ao PDF"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Formato PDF A4</span>
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                viewMode === 'interactive'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Modo prático para navegar no celular ou desktop"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Modo Prático</span>
            </button>

            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                viewMode === 'editor'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Editar todos os textos e detalhes do roteiro"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Escritos</span>
              {isEdited && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" title="Roteiro com edições salvas" />
              )}
            </button>
          </div>

          {viewMode !== 'editor' && (
            <div className="relative hidden lg:block w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar no roteiro..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-800/80 border border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/70"
              />
            </div>
          )}
        </div>

        {/* Primary Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Gerar PDF / Imprimir</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
