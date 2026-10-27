import React from 'react';
import { PageContainer } from './PageHeaderFooter';
import { TransitCardView } from './TransitCardView';
import { useItinerary } from '../context/ItineraryContext';
import { BANDEIRAS_MAP } from '../data/itineraryData';
import { getAttractionCategory } from '../utils/attractionUtils';
import { Footprints, AlertCircle, Bookmark, Sparkles, MapPin } from 'lucide-react';

interface PdfPagesViewProps {
  searchQuery?: string;
}

export const PdfPagesView: React.FC<PdfPagesViewProps> = ({ searchQuery = '' }) => {
  const {
    metadata,
    masterSchedule,
    deslocamentos,
    deslocamentosNota,
    hospedagens,
    ingressos,
    ingressosNota,
    dias,
    highlightAttractions
  } = useItinerary();

  return (
    <div className="print-document w-full py-4 print:py-0">
      {/* ========================================================
          PÁGINA 1: CAPA & VISÃO GERAL DO ROTEIRO (14 DIAS)
          ======================================================== */}
      <PageContainer pageNumber={1}>
        {/* Editorial Header Banner */}
        <div className="relative border-b-2 border-amber-600/30 pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-700 font-bold block mb-1">
                {metadata.headerKicker}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                {metadata.titulo}
              </h1>
            </div>
            {/* Country flags ribbon */}
            <div className="flex items-center gap-1.5 p-2 bg-stone-50 rounded-lg border border-stone-200">
              {['AT', 'CZ', 'PL', 'HU', 'SK'].map((code) => (
                <span key={code} className="text-xl" title={BANDEIRAS_MAP[code]?.nome}>
                  {BANDEIRAS_MAP[code]?.bandeira}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm font-medium text-stone-700 mt-2 font-sans leading-relaxed">
            {metadata.periodo}
          </p>
          <p className="text-xs text-stone-500 font-mono tracking-wide mt-0.5">
            {metadata.cidadesLista}
          </p>

          {/* City Timeline Progress Rail */}
          <div className="grid grid-cols-6 gap-2 mt-6 pt-5 border-t border-stone-200/80">
            {metadata.resumoDiasPaises.map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-xs font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {item.cidade}
                </div>
                <div className="text-[10px] font-mono text-stone-500 mt-0.5">
                  {item.datas}
                </div>
                <div className="text-sm mt-1">{item.bandeira}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Schedule Table */}
        <div className="flex-1 mt-2">
          <div className="overflow-hidden rounded-lg border border-stone-200 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-14 font-semibold">DATA</th>
                  <th className="py-2.5 px-2.5 w-16 font-semibold">DIA</th>
                  <th className="py-2.5 px-3 w-36 font-semibold">CIDADE</th>
                  <th className="py-2.5 px-3 font-semibold">DESTAQUES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {masterSchedule.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-amber-50/40 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                      {row.data}
                    </td>
                    <td className="py-2.5 px-2.5 text-stone-600 whitespace-nowrap">
                      {row.dia}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-stone-900 whitespace-nowrap">
                      {row.cidade}
                    </td>
                    <td className="py-2.5 px-3 text-stone-700 leading-relaxed">
                      {row.destaques}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>

      {/* ========================================================
          PÁGINA 2: DESLOCAMENTOS & HOSPEDAGENS
          ======================================================== */}
      <PageContainer pageNumber={2}>
        {/* Section 1: Deslocamentos */}
        <div className="mb-8">
          <div className="border-b-2 border-stone-800 pb-2 mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Deslocamentos
            </h2>
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">
              Trens · Ônibus · Voos
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-stone-200 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-14 font-semibold">DIA</th>
                  <th className="py-2.5 px-3 font-semibold">TRAJETO</th>
                  <th className="py-2.5 px-3 w-32 font-semibold">MEIO</th>
                  <th className="py-2.5 px-3 w-36 font-semibold">HORÁRIO</th>
                  <th className="py-2.5 px-3 w-28 font-semibold">PLATAFORMA</th>
                  <th className="py-2.5 px-3 w-36 font-semibold">LUGARES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {deslocamentos.map((d, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-amber-50/40 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-stone-900 whitespace-nowrap align-top">
                      {d.dia}
                    </td>
                    <td className="py-3 px-3 font-medium text-stone-900 align-top leading-relaxed">
                      {d.trajeto}
                    </td>
                    <td className="py-3 px-3 text-stone-700 align-top font-medium leading-relaxed">
                      {d.meio}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-800 align-top whitespace-pre-line leading-relaxed">
                      {d.horario}
                    </td>
                    <td className="py-3 px-3 text-stone-700 align-top">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded text-[11px] border border-stone-200">
                        {d.plataforma}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-amber-900 font-mono text-[11px] font-medium align-top leading-relaxed">
                      {d.lugares}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-start gap-2 p-3 bg-stone-50 rounded-md border border-stone-200/80 text-[11px] text-stone-600">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{deslocamentosNota}</p>
          </div>
        </div>

        {/* Section 2: Hospedagens */}
        <div className="mt-4">
          <div className="border-b-2 border-stone-800 pb-2 mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
              Hospedagens
            </h2>
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">
              Hotéis & Airbnbs
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-stone-200 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-28 font-semibold">CIDADE</th>
                  <th className="py-2.5 px-3 font-semibold">ONDE</th>
                  <th className="py-2.5 px-3 w-40 font-semibold">CHECK-IN</th>
                  <th className="py-2.5 px-3 w-32 font-semibold">CHECK-OUT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {hospedagens.map((h, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-amber-50/40 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                    }`}
                  >
                    <td className="py-3 px-3 font-serif font-bold text-stone-900">
                      {h.cidade}
                    </td>
                    <td className="py-3 px-3 text-stone-800 font-medium leading-relaxed">
                      {h.onde}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-700">
                      {h.checkIn}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-700">
                      {h.checkOut}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageContainer>

      {/* ========================================================
          PÁGINA 3: INGRESSOS E PASSEIOS
          ======================================================== */}
      <PageContainer pageNumber={3}>
        <div className="border-b-2 border-stone-800 pb-2 mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Ingressos e passeios
          </h2>
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest">
            Valores & Reservas
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-stone-200 shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                <th className="py-2.5 px-3 w-16 font-semibold">DIA</th>
                <th className="py-2.5 px-3 font-semibold">ATRAÇÃO / PASSEIO</th>
                <th className="py-2.5 px-3 w-44 font-semibold text-right">VALOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ingressos.map((item, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-amber-50/40 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                  }`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                    {item.dia}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-stone-900 leading-relaxed">
                    {item.atracao}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-amber-800 whitespace-nowrap">
                    {item.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-stone-50 rounded-md border border-stone-200/80 text-[11px] text-stone-600 leading-relaxed flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{ingressosNota}</p>
        </div>
      </PageContainer>

      {/* ========================================================
          PÁGINAS 4 A 17: DIAS 1 A 14 INDIVIDUAIS
          ======================================================== */}
      {dias.map((dayPlan, i) => {
        const pageNum = i + 4; // Dias 1 a 14 correspondem às páginas 4 a 17

        return (
          <PageContainer key={dayPlan.diaNumero} pageNumber={pageNum}>
            {/* Header of the Day */}
            <div className="border-b-2 border-stone-800 pb-3 mb-4 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-stone-900 text-stone-100 px-3 py-1.5 rounded font-mono font-bold text-lg tracking-wider">
                  {dayPlan.data}
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-bold">
                    {dayPlan.diaSemana} · Dia {dayPlan.diaNumero} de 14
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    {dayPlan.titulo}
                  </h2>
                </div>
              </div>

              {/* Badges and Country Flags */}
              <div className="flex items-center gap-2">
                {dayPlan.badge && (
                  <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded border border-rose-300 bg-rose-50 text-rose-800 tracking-wider">
                    {dayPlan.badge}
                  </span>
                )}
                <div className="flex items-center gap-1 text-2xl">
                  {dayPlan.bandeiras.map((code) => (
                    <span key={code} title={BANDEIRAS_MAP[code]?.nome}>
                      {BANDEIRAS_MAP[code]?.bandeira}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Transit Card if present (e.g., Flughafen - Wien Hbf, Viena - Praga, etc.) */}
            {dayPlan.transitCard && (
              <TransitCardView
                card={dayPlan.transitCard}
                title={dayPlan.titulo}
              />
            )}

            {/* Activities Timeline with generous line spacing & distinct attraction cards */}
            <div className="space-y-3.5 print:space-y-2.5 my-3 print:my-2 flex-1">
              {dayPlan.atividades.map((act, actIdx) => {
                const category = getAttractionCategory(act.titulo, act.tipo);
                const isHighlight = highlightAttractions && category.isMainAttraction;

                return (
                  <div key={actIdx} className="group relative">
                    {/* Walking indicator above if noted */}
                    {act.caminhada && (
                      <div className="flex items-center gap-1.5 text-[11px] print:text-[10px] text-stone-500 font-mono mb-1 print:mb-0.5 ml-4">
                        <Footprints className="w-3.5 h-3.5 print:w-3 print:h-3 text-stone-400" />
                        <span>{act.caminhada}</span>
                      </div>
                    )}

                    <div
                      className={`flex items-start gap-3 print:gap-2 transition-all ${
                        isHighlight
                          ? 'p-2.5 print:p-1.5 rounded-xl bg-amber-50/50 border border-amber-200/90 shadow-2xs'
                          : ''
                      }`}
                    >
                      {/* Activity Bullet Status Dot */}
                      <span
                        className={`w-2.5 h-2.5 print:w-2 print:h-2 rounded-full mt-1.5 print:mt-1 shrink-0 ${
                          act.tipo === 'deslocamento'
                            ? 'bg-rose-500'
                            : isHighlight
                            ? 'bg-amber-600 ring-2 ring-amber-200'
                            : 'bg-emerald-600'
                        }`}
                      />

                      {/* Time & Title & Category Badge */}
                      <div className="flex-1">
                        <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1">
                          {act.horario && (
                            <span className="font-mono text-xs print:text-[11px] font-bold text-stone-800 whitespace-nowrap">
                              {act.horario}
                            </span>
                          )}

                          <span
                            className={`text-sm print:text-xs leading-relaxed ${
                              isHighlight
                                ? 'font-serif font-bold text-stone-950 text-[14.5px] print:text-[12.5px]'
                                : 'font-semibold text-stone-900'
                            }`}
                          >
                            {act.titulo}
                          </span>

                          {/* Distinctive Tag for Attractions */}
                          {isHighlight && (
                            <span className="inline-flex items-center gap-1 text-[10px] print:text-[9px] font-mono uppercase tracking-wider font-semibold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-300/70">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>{category.label}</span>
                            </span>
                          )}
                        </div>

                        {/* Sub-bullets if any with comfortable, relaxed line-height */}
                        {act.subitens && act.subitens.length > 0 && (
                          <ul className="mt-1.5 print:mt-0.5 space-y-1 print:space-y-0.5 pl-3 border-l border-stone-200 ml-1 text-xs print:text-[10.5px] text-stone-700 leading-relaxed">
                            {act.subitens.map((sub, sIdx) => (
                              <li key={sIdx} className="leading-relaxed">
                                – {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* "LUGARES ANOTADOS" block if present */}
            {dayPlan.lugaresAnotados && dayPlan.lugaresAnotados.length > 0 && (
              <div className="mt-4 p-3 bg-stone-900 text-stone-100 rounded-lg">
                <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>LUGARES ANOTADOS</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-200 leading-relaxed">
                  {dayPlan.lugaresAnotados.map((lugar, lIdx) => (
                    <span key={lIdx} className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      {lugar}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </PageContainer>
        );
      })}
    </div>
  );
};
