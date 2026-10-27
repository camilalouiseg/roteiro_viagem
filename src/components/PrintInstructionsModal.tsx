import React from 'react';
import { X, Printer, CheckCircle, FileText } from 'lucide-react';

interface PrintInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPrint: () => void;
}

export const PrintInstructionsModal: React.FC<PrintInstructionsModalProps> = ({
  isOpen,
  onClose,
  onConfirmPrint
}) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Gerar PDF do Roteiro Oficial
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Instruções para salvar em alta resolução (A4)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs text-stone-700 leading-relaxed font-sans">
          <p className="font-medium text-stone-900 text-sm">
            Para salvar o PDF com visual de livro editorial e cores preservadas:
          </p>

          <div className="space-y-2.5 bg-stone-50 p-4 rounded-xl border border-stone-200/80 font-sans">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Destino:</strong> Selecione{' '}
                <span className="font-mono text-stone-800">"Salvar como PDF"</span> (ou sua impressora).
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Tamanho do Papel:</strong> Escolha{' '}
                <span className="font-mono text-stone-800">A4</span>.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Margens:</strong> Deixe como{' '}
                <span className="font-mono text-stone-800">"Padrão"</span> ou{' '}
                <span className="font-mono text-stone-800">"Nenhuma"</span>.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900">Gráficos de segundo plano:</strong>{' '}
                <span className="text-amber-800 font-semibold underline">Marque esta opção</span> para imprimir as cores de fundo, faixas e marcadores.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>Documento completo: 17 páginas perfeitamente paginadas.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onClose();
              onConfirmPrint();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-xl text-xs transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Abrir Caixa de Impressão / Salvar PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
