/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ItineraryProvider } from './context/ItineraryContext';
import { HeaderNav } from './components/HeaderNav';
import { PdfPagesView } from './components/PdfPagesView';
import { InteractiveView } from './components/InteractiveView';
import { ItineraryEditor } from './components/ItineraryEditor';
import { PrintInstructionsModal } from './components/PrintInstructionsModal';
import { Download, Sparkles, Edit3, BookOpen } from 'lucide-react';

function AppContent() {
  const [viewMode, setViewMode] = useState<'pdf' | 'interactive' | 'editor'>('pdf');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  const handleBrowserPrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Erro ao chamar window.print():', e);
      alert('Seu navegador bloqueou a janela de impressão direta. Por favor, use a opção "Baixar Arquivo PDF (.pdf)" no botão superior.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/90 text-stone-900 flex flex-col font-sans">
      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <HeaderNav
        viewMode={viewMode}
        setViewMode={setViewMode}
        onPrint={() => setIsPrintModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Mode Sub-banner in Web View (Hidden on Print) */}
      <div className="no-print bg-stone-900 text-stone-200 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-medium text-stone-100">
              {viewMode === 'pdf' && 'Visualização de Impressão A4 (17 páginas completas prontas para PDF)'}
              {viewMode === 'interactive' && 'Modo Aplicativo de Viagem (Itinerário interativo para mobile e desktop)'}
              {viewMode === 'editor' && 'Modo Edição de Escritos: Altere títulos, horários, atrações e notas do roteiro'}
            </span>
            <span className="text-stone-500">·</span>
            <span className="text-stone-400 font-mono">
              {viewMode === 'editor' ? 'Salvo no navegador' : 'Espaçamento ampliado & Destaque de atrações'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {viewMode === 'editor' ? (
              <button
                onClick={() => setViewMode('pdf')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-md transition-colors border border-stone-700 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>Visualizar no PDF</span>
              </button>
            ) : (
              <button
                onClick={() => setViewMode('editor')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-md transition-colors border border-stone-700 cursor-pointer"
              >
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>Editar Textos</span>
              </button>
            )}

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar PDF (.pdf)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* On screen: switch between PDF multi-page view, Interactive view, and Editor view */}
        <div className="no-print">
          {viewMode === 'pdf' && (
            <div id="pdf-export-source" className="max-w-5xl mx-auto px-4 py-8">
              <PdfPagesView searchQuery={searchQuery} />
            </div>
          )}

          {viewMode === 'interactive' && (
            <InteractiveView searchQuery={searchQuery} />
          )}

          {viewMode === 'editor' && (
            <ItineraryEditor onPreviewPdf={() => setViewMode('pdf')} />
          )}
        </div>

        {/* Off-screen source for html2canvas export when viewMode !== 'pdf' so download always works! */}
        {viewMode !== 'pdf' && (
          <div
            id="pdf-export-source-offscreen"
            className="no-print"
            style={{
              position: 'fixed',
              left: '-99999px',
              top: '0',
              width: '210mm',
              pointerEvents: 'none',
              zIndex: -100
            }}
            aria-hidden="true"
          >
            <PdfPagesView searchQuery="" />
          </div>
        )}

        {/* During browser print, ALWAYS render the 17-page PDF document cleanly! */}
        <div className="hidden print:block">
          <PdfPagesView searchQuery="" />
        </div>
      </main>

      {/* Clean, quiet web footer (Hidden on Print) */}
      <footer className="no-print bg-stone-900 text-stone-400 border-t border-stone-800 py-8 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Roteiro Oficial Europa Central · 11 a 24 de novembro de 2026</span>
          </div>
          <div className="text-stone-400 font-mono text-[11px]">
            14 dias · 5 países · 17 páginas paginadas · Totalmente editável
          </div>
        </div>
      </footer>

      {/* Print & Download Modal */}
      <PrintInstructionsModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onBrowserPrint={handleBrowserPrint}
      />
    </div>
  );
}

export default function App() {
  return (
    <ItineraryProvider>
      <AppContent />
    </ItineraryProvider>
  );
}
