import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle, FileText, Loader2, Sparkles } from 'lucide-react';
import { downloadItineraryPdf, PdfExportProgress } from '../utils/pdfExport';

interface PrintInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowserPrint: () => void;
}

export const PrintInstructionsModal: React.FC<PrintInstructionsModalProps> = ({
  isOpen,
  onClose,
  onBrowserPrint
}) => {
  const [exportProgress, setExportProgress] = useState<PdfExportProgress>({
    currentPage: 0,
    totalPages: 17,
    status: 'idle'
  });

  if (!isOpen) return null;

  const isGenerating = exportProgress.status === 'rendering' || exportProgress.status === 'compiling';

  const handleDirectDownload = async () => {
    try {
      await downloadItineraryPdf('#pdf-export-source', (p) => {
        setExportProgress(p);
      });
      setTimeout(() => {
        setExportProgress({ currentPage: 0, totalPages: 17, status: 'idle' });
        onClose();
      }, 1500);
    } catch (err: any) {
      alert(`Não foi possível gerar o PDF automaticamente: ${err?.message}. Você também pode usar a opção 'Imprimir via Navegador' abaixo.`);
    }
  };

  const percent =
    exportProgress.totalPages > 0
      ? Math.round((exportProgress.currentPage / exportProgress.totalPages) * 100)
      : 0;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/75 backdrop-blur-xs font-sans">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Baixar Roteiro em PDF
              </h3>
              <p className="text-xs text-stone-500">
                Documento de 17 páginas paginadas em alta resolução (A4)
              </p>
            </div>
          </div>
          {!isGenerating && (
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="py-5 space-y-4 text-xs text-stone-700 leading-relaxed">
          {/* Progress Box if generating */}
          {isGenerating ? (
            <div className="p-6 bg-amber-50/70 rounded-xl border border-amber-200/90 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-700 animate-spin mx-auto" />
              <div>
                <p className="font-serif font-bold text-sm text-stone-900">
                  {exportProgress.status === 'rendering'
                    ? `Processando página ${exportProgress.currentPage} de ${exportProgress.totalPages}...`
                    : 'Compilando arquivo PDF final...'}
                </p>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Por favor, aguarde alguns instantes enquanto montamos as 17 páginas.
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden mt-2">
                <div
                  className="bg-amber-600 h-full transition-all duration-200 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-800">
                {percent}% concluído
              </span>
            </div>
          ) : exportProgress.status === 'done' ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-emerald-900 text-sm">Download Concluído com Sucesso!</p>
              <p className="text-emerald-700 text-xs">
                O arquivo <span className="font-mono">Roteiro_Europa_Central_Oficial_2026.pdf</span> foi salvo.
              </p>
            </div>
          ) : (
            <>
              {/* Option 1: Direct File Download */}
              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-300/80 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Opção 1 (Recomendada): Baixar Arquivo Direto</span>
                </div>
                <p className="text-stone-600 text-xs">
                  Gera e baixa o arquivo <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200 text-amber-900">.pdf</code> com todas as 17 páginas, incluindo qualquer edição feita.
                </p>
                <button
                  onClick={handleDirectDownload}
                  className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo PDF (.pdf) Agora</span>
                </button>
              </div>

              {/* Option 2: Browser Print Dialog */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Printer className="w-4 h-4 text-stone-700" />
                  <span>Opção 2: Imprimir ou Salvar via Navegador</span>
                </div>
                <p className="text-stone-600 text-[11.5px]">
                  Abre a janela nativa do seu navegador (ótimo se quiser enviar para uma impressora física ou salvar com os recursos de impressão do Chrome/Edge).
                </p>
                <div className="text-[11px] text-stone-500 space-y-1 pl-2 border-l-2 border-stone-300">
                  <p>• Destino: <strong className="text-stone-700">"Salvar como PDF"</strong></p>
                  <p>• Tamanho do papel: <strong className="text-stone-700">A4</strong></p>
                  <p>• Marque a opção: <strong className="text-stone-700">"Gráficos de segundo plano"</strong></p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBrowserPrint();
                  }}
                  className="w-full mt-2 py-2 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Abrir Caixa de Impressão do Navegador</span>
                </button>
              </div>

              {/* Option 3: Download Original PDF */}
              <div className="pt-2 text-center">
                <a
                  href="./assets/aistudio/Roteiro_Europa_Central_v2_16192c3e.pdf"
                  download="Roteiro_Europa_Central_Original_Claude.pdf"
                  className="text-stone-500 hover:text-stone-800 text-[11px] font-mono underline inline-flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Baixar PDF original de referência enviado anteriormente</span>
                </a>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
