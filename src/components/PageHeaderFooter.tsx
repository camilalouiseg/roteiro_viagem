import React from 'react';

interface PageHeaderFooterProps {
  pageNumber: number;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageHeaderFooterProps> = ({ pageNumber, children }) => {
  return (
    <section className="a4-page-container relative bg-white border border-stone-200/90 shadow-sm print:shadow-none print:border-none mx-auto w-full max-w-[210mm] min-h-[297mm] print:min-h-[265mm] print:h-auto p-8 md:p-12 mb-8 print:mb-0 print:p-0 flex flex-col justify-between text-stone-900 page-break-after">
      {/* Page Content */}
      <div className="flex-1 flex flex-col">{children}</div>

      {/* Standard Running Footer across all 17 pages */}
      <footer className="mt-6 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500 font-sans tracking-wide shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-stone-700">Roteiro Europa Central</span>
          <span aria-hidden="true">·</span>
          <span>11 a 24 de novembro de 2026</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span className="text-stone-600">atração / atividade</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
            <span className="text-stone-600">deslocamento</span>
          </div>
        </div>

        <div className="font-mono text-[11px] text-stone-400">
          pág. {pageNumber}
        </div>
      </footer>
    </section>
  );
};
