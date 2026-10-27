import React, { useState, useMemo } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import { BANDEIRAS_MAP } from '../data/itineraryData';
import { TransitCardView } from './TransitCardView';
import { getAttractionCategory } from '../utils/attractionUtils';
import {
  Calendar,
  Train,
  Home,
  Ticket,
  Footprints,
  Bookmark,
  AlertCircle,
  Clock,
  MapPin,
  Sparkles,
  Check
} from 'lucide-react';

interface InteractiveViewProps {
  searchQuery: string;
}

export const InteractiveView: React.FC<InteractiveViewProps> = ({ searchQuery }) => {
  const {
    metadata,
    masterSchedule,
    deslocamentos,
    deslocamentosNota,
    hospedagens,
    ingressos,
    ingressosNota,
    dias,
    highlightAttractions,
    setHighlightAttractions
  } = useItinerary();

  const [activeTab, setActiveTab] = useState<'dias' | 'deslocamentos' | 'hospedagens' | 'ingressos' | 'resumo'>('dias');
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  // Filter days based on city and search query
  const filteredDays = useMemo(() => {
    return dias.filter((day) => {
      // City filter
      if (selectedCity !== 'all') {
        const cityLower = day.cidade.toLowerCase();
        if (!cityLower.includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // Day filter
      if (selectedDay !== 'all' && day.diaNumero !== selectedDay) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = day.titulo.toLowerCase().includes(q);
        const matchesDate = day.data.includes(q);
        const matchesCity = day.cidade.toLowerCase().includes(q);
        const matchesActivity = day.atividades.some(
          (a) =>
            a.titulo.toLowerCase().includes(q) ||
            (a.subitens && a.subitens.some((s) => s.toLowerCase().includes(q))) ||
            (a.horario && a.horario.toLowerCase().includes(q))
        );
        const matchesLugares = day.lugaresAnotados?.some((l) =>
          l.toLowerCase().includes(q)
        );
        const matchesTransit =
          day.transitCard &&
          (day.transitCard.origem.toLowerCase().includes(q) ||
            day.transitCard.destino.toLowerCase().includes(q) ||
            day.transitCard.tipoMeio.toLowerCase().includes(q) ||
            (day.transitCard.lugares && day.transitCard.lugares.toLowerCase().includes(q)));

        return (
          matchesTitle ||
          matchesDate ||
          matchesCity ||
          matchesActivity ||
          matchesLugares ||
          matchesTransit
        );
      }

      return true;
    });
  }, [dias, selectedCity, selectedDay, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Editorial Hero Strip */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-200/70 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold">
                {metadata.headerKicker}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500 font-medium">Navegador Prático da Viagem</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {metadata.titulo}
            </h1>
            <p className="text-sm text-stone-600 mt-1 font-sans leading-relaxed">
              {metadata.periodo}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3 text-center">
              <span className="text-xs text-stone-500 block uppercase">Duração</span>
              <span className="text-lg font-bold text-stone-900">14 Dias</span>
            </div>
            <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3 text-center">
              <span className="text-xs text-stone-500 block uppercase">Países</span>
              <span className="text-lg font-bold text-stone-900">5 Países</span>
            </div>
            <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3 text-center">
              <span className="text-xs text-stone-500 block uppercase">Deslocamentos</span>
              <span className="text-lg font-bold text-amber-700">{deslocamentos.length} Trajetos</span>
            </div>
            <div className="bg-stone-50 border border-stone-200/70 rounded-xl p-3 text-center">
              <span className="text-xs text-stone-500 block uppercase">Ingressos</span>
              <span className="text-lg font-bold text-stone-900">{ingressos.length} Itens</span>
            </div>
          </div>
        </div>

        {/* City Route Strip */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {metadata.resumoDiasPaises.map((item, idx) => {
            const isSelected =
              selectedCity.toLowerCase() === item.cidade.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCity(isSelected ? 'all' : item.cidade);
                  setSelectedDay('all');
                }}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                    : 'bg-stone-50/60 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="text-xl mb-1">{item.bandeira}</div>
                <div className="font-serif font-bold text-stone-900 text-sm">
                  {item.cidade}
                </div>
                <div className="text-[10px] font-mono text-stone-500 mt-0.5">
                  {item.datas}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Navigation Segmented Control */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('dias')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'dias'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Itinerário Dia a Dia</span>
          </button>
          <button
            onClick={() => setActiveTab('deslocamentos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'deslocamentos'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            <span>Deslocamentos & Trens</span>
          </button>
          <button
            onClick={() => setActiveTab('hospedagens')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'hospedagens'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Hospedagens</span>
          </button>
          <button
            onClick={() => setActiveTab('ingressos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'ingressos'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Ingressos & Passeios</span>
          </button>
          <button
            onClick={() => setActiveTab('resumo')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'resumo'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Tabela Geral (14 Dias)</span>
          </button>
        </div>

        {/* Filter & Attraction Highlight Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHighlightAttractions(!highlightAttractions)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              highlightAttractions
                ? 'bg-amber-100/80 border-amber-300 text-amber-900'
                : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
            title="Destacar visualmente as atrações turísticas e culturais"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Destacar Atrações</span>
            {highlightAttractions && <Check className="w-3 h-3 text-amber-700" />}
          </button>

          {activeTab === 'dias' && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-stone-500">Filtrar dia:</label>
              <select
                value={selectedDay}
                onChange={(e) =>
                  setSelectedDay(
                    e.target.value === 'all' ? 'all' : Number(e.target.value)
                  )
                }
                className="text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-mono focus:outline-none focus:border-amber-500"
              >
                <option value="all">Todos os 14 dias</option>
                {dias.map((d) => (
                  <option key={d.diaNumero} value={d.diaNumero}>
                    Dia {d.diaNumero} ({d.data} - {d.titulo})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: ITINERÁRIO DIA A DIA */}
      {activeTab === 'dias' && (
        <div className="space-y-6">
          {filteredDays.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-500">
              Nenhuma atividade encontrada com o filtro selecionado.
            </div>
          ) : (
            filteredDays.map((day) => (
              <div
                key={day.diaNumero}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all hover:border-stone-300"
              >
                {/* Day Header */}
                <div className="bg-stone-50/80 border-b border-stone-200/70 p-5 sm:px-6 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-stone-900 text-stone-100 px-3.5 py-1.5 rounded-lg font-mono font-bold text-base tracking-wider">
                      {day.data}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-bold">
                        {day.diaSemana} · Dia {day.diaNumero} de 14
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
                        {day.titulo}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {day.badge && (
                      <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-md border border-rose-300 bg-rose-50 text-rose-800 tracking-wider">
                        {day.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-2xl">
                      {day.bandeiras.map((code) => (
                        <span key={code} title={BANDEIRAS_MAP[code]?.nome}>
                          {BANDEIRAS_MAP[code]?.bandeira}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Day Body with comfortable line spacing and highlighted attractions */}
                <div className="p-6 space-y-6">
                  {/* Transit Card if exists */}
                  {day.transitCard && (
                    <TransitCardView
                      card={day.transitCard}
                      title={day.titulo}
                    />
                  )}

                  {/* Step by step activities with generous spacing */}
                  <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    {day.atividades.map((act, idx) => {
                      const category = getAttractionCategory(act.titulo, act.tipo);
                      const isHighlight = highlightAttractions && category.isMainAttraction;

                      return (
                        <div key={idx} className="relative group">
                          {/* Status Icon / Dot */}
                          <span
                            className={`absolute -left-6 top-2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs ${
                              act.tipo === 'deslocamento'
                                ? 'bg-rose-500'
                                : isHighlight
                                ? 'bg-amber-600 ring-2 ring-amber-300'
                                : 'bg-emerald-600'
                            }`}
                          />

                          {/* Walking distance reminder if present */}
                          {act.caminhada && (
                            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono mb-1.5">
                              <Footprints className="w-3.5 h-3.5 text-stone-400" />
                              <span>{act.caminhada}</span>
                            </div>
                          )}

                          <div
                            className={`rounded-xl p-4 transition-all ${
                              isHighlight
                                ? 'bg-amber-50/60 border border-amber-300/80 shadow-xs'
                                : 'bg-stone-50/60 border border-stone-200/60 hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                              {act.horario && (
                                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-stone-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                                  <Clock className="w-3 h-3 text-stone-400" />
                                  {act.horario}
                                </span>
                              )}

                              <span
                                className={`leading-relaxed ${
                                  isHighlight
                                    ? 'text-base font-serif font-bold text-stone-950'
                                    : 'text-sm font-semibold text-stone-900'
                                }`}
                              >
                                {act.titulo}
                              </span>

                              {isHighlight && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-semibold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300/60">
                                  <Sparkles className="w-3 h-3" />
                                  <span>{category.label}</span>
                                </span>
                              )}
                            </div>

                            {act.subitens && act.subitens.length > 0 && (
                              <ul className="mt-2.5 space-y-1.5 pl-4 border-l-2 border-amber-300/70 text-xs text-stone-700 leading-relaxed">
                                {act.subitens.map((sub, sIdx) => (
                                  <li key={sIdx} className="leading-relaxed">
                                    – {sub}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Annotated Places Box */}
                  {day.lugaresAnotados && day.lugaresAnotados.length > 0 && (
                    <div className="p-4 bg-stone-900 text-stone-100 rounded-xl border border-stone-800">
                      <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                        <Bookmark className="w-4 h-4" />
                        <span>Lugares Anotados</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs leading-relaxed">
                        {day.lugaresAnotados.map((lug, lIdx) => (
                          <span
                            key={lIdx}
                            className="bg-stone-800 text-stone-200 px-3 py-1 rounded-md border border-stone-700/60 flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            {lug}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: DESLOCAMENTOS */}
      {activeTab === 'deslocamentos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs">
            <div className="border-b border-stone-200 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Deslocamentos Oficiais
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  {deslocamentos.length} grandes trajetos entre cidades e aeroportos
                </p>
              </div>
              <Train className="w-6 h-6 text-amber-600" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-3.5 px-3.5 w-16 font-semibold">DIA</th>
                    <th className="py-3.5 px-3.5 font-semibold">TRAJETO</th>
                    <th className="py-3.5 px-3.5 w-36 font-semibold">MEIO</th>
                    <th className="py-3.5 px-3.5 w-44 font-semibold">HORÁRIO</th>
                    <th className="py-3.5 px-3.5 w-32 font-semibold">PLATAFORMA</th>
                    <th className="py-3.5 px-3.5 w-40 font-semibold">LUGARES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {deslocamentos.map((d, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-amber-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                      }`}
                    >
                      <td className="py-3.5 px-3.5 font-mono font-bold text-stone-900 whitespace-nowrap align-top">
                        {d.dia}
                      </td>
                      <td className="py-3.5 px-3.5 font-semibold text-stone-900 align-top leading-relaxed">
                        {d.trajeto}
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-700 align-top font-medium leading-relaxed">
                        {d.meio}
                      </td>
                      <td className="py-3.5 px-3.5 font-mono text-stone-800 align-top whitespace-pre-line leading-relaxed">
                        {d.horario}
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-700 align-top">
                        <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] font-medium border border-stone-200">
                          {d.plataforma}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-amber-900 font-mono text-xs font-semibold align-top leading-relaxed">
                        {d.lugares}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{deslocamentosNota}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HOSPEDAGENS */}
      {activeTab === 'hospedagens' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs">
            <div className="border-b border-stone-200 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Hospedagens & Estadias
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  {hospedagens.length} estadias confirmadas com horários de check-in e check-out
                </p>
              </div>
              <Home className="w-6 h-6 text-amber-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hospedagens.map((h, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-lg text-stone-900">
                        {h.cidade}
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-stone-800 mb-4 leading-relaxed">
                      {h.onde}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-stone-200/70 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 uppercase text-[10px]">
                        Check-in:
                      </span>
                      <span className="font-semibold text-stone-800">
                        {h.checkIn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 uppercase text-[10px]">
                        Check-out:
                      </span>
                      <span className="font-semibold text-stone-800">
                        {h.checkOut}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INGRESSOS & PASSEIOS */}
      {activeTab === 'ingressos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs">
            <div className="border-b border-stone-200 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Ingressos e Passeios
                </h2>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  {ingressos.length} atrações anotadas na moeda original
                </p>
              </div>
              <Ticket className="w-6 h-6 text-amber-600" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-3.5 w-16 font-semibold">DIA</th>
                    <th className="py-3 px-3.5 font-semibold">ATRAÇÃO / PASSEIO</th>
                    <th className="py-3 px-3.5 w-44 font-semibold text-right">VALOR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {ingressos.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-amber-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                      }`}
                    >
                      <td className="py-3 px-3.5 font-mono font-bold text-stone-900 whitespace-nowrap">
                        {item.dia}
                      </td>
                      <td className="py-3 px-3.5 font-medium text-stone-900 leading-relaxed">
                        {item.atracao}
                      </td>
                      <td className="py-3 px-3.5 text-right font-mono font-bold text-amber-800 whitespace-nowrap">
                        {item.valor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{ingressosNota}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TABELA GERAL (14 DIAS) */}
      {activeTab === 'resumo' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs">
            <div className="border-b border-stone-200 pb-4 mb-6">
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Visão Completa dos 14 Dias
              </h2>
              <p className="text-xs text-stone-500 font-mono mt-1">
                Cronograma consolidado de 11 a 24 de novembro de 2026
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-900 text-stone-100 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-3.5 px-3.5 w-16 font-semibold">DATA</th>
                    <th className="py-3.5 px-3.5 w-20 font-semibold">DIA</th>
                    <th className="py-3.5 px-3.5 w-40 font-semibold">CIDADE</th>
                    <th className="py-3.5 px-3.5 font-semibold">DESTAQUES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {masterSchedule.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-amber-50/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                      }`}
                    >
                      <td className="py-3.5 px-3.5 font-mono font-bold text-stone-900 whitespace-nowrap">
                        {row.data}
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-600 whitespace-nowrap">
                        {row.dia}
                      </td>
                      <td className="py-3.5 px-3.5 font-serif font-bold text-stone-900 whitespace-nowrap">
                        {row.cidade}
                      </td>
                      <td className="py-3.5 px-3.5 text-stone-700 leading-relaxed">
                        {row.destaques}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
