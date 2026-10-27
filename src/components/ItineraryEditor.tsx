import React, { useState } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Calendar,
  Train,
  Home,
  Ticket,
  FileText,
  Clock,
  Sparkles,
  CheckCircle,
  Eye,
  Footprints,
  AlertTriangle
} from 'lucide-react';

interface ItineraryEditorProps {
  onPreviewPdf: () => void;
}

export const ItineraryEditor: React.FC<ItineraryEditorProps> = ({ onPreviewPdf }) => {
  const {
    metadata,
    setMetadata,
    masterSchedule,
    updateMasterScheduleDay,
    deslocamentos,
    updateDeslocamento,
    addDeslocamento,
    deleteDeslocamento,
    deslocamentosNota,
    setDeslocamentosNota,
    hospedagens,
    updateHospedagem,
    addHospedagem,
    deleteHospedagem,
    ingressos,
    updateIngresso,
    addIngresso,
    deleteIngresso,
    ingressosNota,
    setIngressosNota,
    dias,
    updateDayPlan,
    updateActivity,
    addActivity,
    deleteActivity,
    resetToOriginal,
    isEdited
  } = useItinerary();

  const [activeSubTab, setActiveSubTab] = useState<'dias' | 'deslocamentos' | 'hospedagens' | 'ingressos' | 'metadata'>('dias');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const selectedDay = dias.find((d) => d.diaNumero === selectedDayNum) || dias[0];

  const handleShowToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Banner of Editor */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold">
                EDITOR DE ROTEIRO
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-500">Personalize qualquer texto ou detalhe</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Editar Escritos do Roteiro
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Todas as alterações são salvas automaticamente no seu navegador e refletem no PDF e no aplicativo.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => {
                if (confirm('Deseja realmente restaurar todos os textos originais do roteiro inicial?')) {
                  resetToOriginal();
                  handleShowToast('Textos restaurados para o original!');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Restaurar Original</span>
            </button>

            <button
              onClick={() => {
                handleShowToast('Todas as alterações estão salvas!');
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvo Automaticamente</span>
            </button>

            <button
              onClick={onPreviewPdf}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver no Formato PDF A4</span>
            </button>
          </div>
        </div>

        {/* Editor Category Tabs */}
        <div className="pt-6 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveSubTab('dias')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'dias'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Atividades Dia a Dia (1 a 14)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('deslocamentos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'deslocamentos'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>Tabela de Deslocamentos</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hospedagens')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'hospedagens'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Hospedagens & Malas</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ingressos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'ingressos'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Ingressos & Valores</span>
          </button>

          <button
            onClick={() => setActiveSubTab('metadata')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'metadata'
                ? 'bg-stone-900 text-stone-100 shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Cabeçalho & Metadados</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: DIAS INDIVIDUAIS (1 A 14) */}
      {activeSubTab === 'dias' && (
        <div className="space-y-6">
          {/* Day Selector Buttons */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-widest block mb-2 font-bold">
              Selecione o Dia para Editar:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {dias.map((d) => (
                <button
                  key={d.diaNumero}
                  onClick={() => setSelectedDayNum(d.diaNumero)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedDayNum === d.diaNumero
                      ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span>Dia {d.diaNumero}</span>
                    <span className="opacity-90">{d.data}</span>
                  </div>
                  <div className="text-xs truncate font-medium mt-1">
                    {d.titulo}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Edit Form for the Selected Day */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
            <div className="border-b border-stone-200 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-amber-700 font-bold uppercase tracking-wider">
                  Editando Dia {selectedDay.diaNumero} de 14 ({selectedDay.data})
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                  {selectedDay.titulo}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-500">Badge especial:</span>
                <input
                  type="text"
                  value={selectedDay.badge || ''}
                  onChange={(e) => updateDayPlan(selectedDay.diaNumero, { badge: e.target.value })}
                  placeholder="ex: PASSE 24H, CHECK OUT 11H"
                  className="text-xs font-mono px-3 py-1.5 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500 w-48"
                />
              </div>
            </div>

            {/* General Day Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Título do Dia
                </label>
                <input
                  type="text"
                  value={selectedDay.titulo}
                  onChange={(e) => updateDayPlan(selectedDay.diaNumero, { titulo: e.target.value })}
                  className="w-full text-sm font-semibold px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Dia da Semana
                </label>
                <input
                  type="text"
                  value={selectedDay.diaSemana}
                  onChange={(e) => updateDayPlan(selectedDay.diaNumero, { diaSemana: e.target.value })}
                  className="w-full text-sm px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Data
                </label>
                <input
                  type="text"
                  value={selectedDay.data}
                  onChange={(e) => updateDayPlan(selectedDay.diaNumero, { data: e.target.value })}
                  className="w-full text-sm font-mono px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Transit Card Section if present */}
            {selectedDay.transitCard && (
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                  <span className="text-xs font-serif font-bold text-stone-900 flex items-center gap-2">
                    <Train className="w-4 h-4 text-amber-700" />
                    Passe de Deslocamento do Dia (Trem / Ônibus)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Origem</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.origem}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, origem: e.target.value }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Horário Origem</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.origemHorario}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, origemHorario: e.target.value }
                        });
                      }}
                      className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Destino</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.destino}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, destino: e.target.value }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Horário Destino</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.destinoHorario}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, destinoHorario: e.target.value }
                        });
                      }}
                      className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Meio / Linha</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.tipoMeio}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, tipoMeio: e.target.value }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Plataforma</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.plataforma}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, plataforma: e.target.value }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Lugares / Vagão</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.lugares || ''}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, lugares: e.target.value }
                        });
                      }}
                      className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 mb-1">Observações</label>
                    <input
                      type="text"
                      value={selectedDay.transitCard.observacao || ''}
                      onChange={(e) => {
                        if (!selectedDay.transitCard) return;
                        updateDayPlan(selectedDay.diaNumero, {
                          transitCard: { ...selectedDay.transitCard, observacao: e.target.value }
                        });
                      }}
                      className="w-full px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Activities List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="text-sm font-serif font-bold text-stone-900">
                  Cronograma de Atividades ({selectedDay.atividades.length} itens)
                </span>
                <button
                  onClick={() => {
                    addActivity(selectedDay.diaNumero, {
                      horario: '10h00 – 11h00',
                      tipo: 'atracao',
                      titulo: 'Nova atividade ou atração'
                    });
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Atividade</span>
                </button>
              </div>

              <div className="space-y-4">
                {selectedDay.atividades.map((act, actIdx) => (
                  <div
                    key={actIdx}
                    className="p-4 rounded-xl border border-stone-200/90 bg-stone-50/50 hover:bg-stone-50 space-y-3 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={act.tipo}
                          onChange={(e) =>
                            updateActivity(selectedDay.diaNumero, actIdx, {
                              tipo: e.target.value as 'atracao' | 'deslocamento'
                            })
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                            act.tipo === 'atracao'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="atracao">Atração / Atividade</option>
                          <option value="deslocamento">Deslocamento</option>
                        </select>

                        <input
                          type="text"
                          value={act.horario || ''}
                          onChange={(e) =>
                            updateActivity(selectedDay.diaNumero, actIdx, { horario: e.target.value })
                          }
                          placeholder="Horário (ex: 08h30 – 10h00)"
                          className="font-mono text-xs px-2.5 py-1 border border-stone-200 rounded-md bg-white w-40 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <button
                        onClick={() => deleteActivity(selectedDay.diaNumero, actIdx)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Remover esta atividade"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={act.titulo}
                        onChange={(e) =>
                          updateActivity(selectedDay.diaNumero, actIdx, { titulo: e.target.value })
                        }
                        placeholder="Nome da atração ou atividade"
                        className="w-full text-sm font-semibold px-3 py-1.5 border border-stone-200 rounded-md bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-mono text-stone-500 mb-1 flex items-center gap-1">
                          <Footprints className="w-3 h-3" />
                          Caminhada a pé (opcional)
                        </label>
                        <input
                          type="text"
                          value={act.caminhada || ''}
                          onChange={(e) =>
                            updateActivity(selectedDay.diaNumero, actIdx, { caminhada: e.target.value })
                          }
                          placeholder="ex: caminhada de 15min"
                          className="w-full font-mono text-xs px-2.5 py-1.5 border border-stone-200 rounded-md bg-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-stone-500 mb-1">
                          Subitens e Destaques (um por linha)
                        </label>
                        <textarea
                          rows={2}
                          value={(act.subitens || []).join('\n')}
                          onChange={(e) =>
                            updateActivity(selectedDay.diaNumero, actIdx, {
                              subitens: e.target.value.split('\n').filter((l) => l.trim() !== '')
                            })
                          }
                          placeholder="Sub-tópicos (ex: ingressos, salas a visitar...)"
                          className="w-full text-xs px-2.5 py-1.5 border border-stone-200 rounded-md bg-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lugares Anotados */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <label className="block text-xs font-serif font-bold text-stone-900">
                Lugares Anotados (Vida noturna, bares, lojas recomendadas - separados por vírgula):
              </label>
              <input
                type="text"
                value={(selectedDay.lugaresAnotados || []).join(', ')}
                onChange={(e) => {
                  const items = e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);
                  updateDayPlan(selectedDay.diaNumero, { lugaresAnotados: items });
                }}
                placeholder="ex: Karlovy Lázně, U Sudu, Duplex Prague"
                className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DESLOCAMENTOS GERAIS */}
      {activeSubTab === 'deslocamentos' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Editar Tabela Geral de Deslocamentos
              </h2>
              <p className="text-xs text-stone-500">
                Atualize horários, plataformas ou número de assentos marcados
              </p>
            </div>
            <button
              onClick={() => {
                addDeslocamento({
                  dia: '12/11',
                  trajeto: 'Origem → Destino',
                  meio: 'Trem',
                  horario: '10h00 – 12h00',
                  plataforma: 'ver painel',
                  lugares: '—'
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Trajeto</span>
            </button>
          </div>

          <div className="space-y-4">
            {deslocamentos.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end text-xs"
              >
                <div>
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Dia</label>
                  <input
                    type="text"
                    value={item.dia}
                    onChange={(e) => updateDeslocamento(idx, { dia: e.target.value })}
                    className="w-full font-mono font-bold px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Trajeto</label>
                  <input
                    type="text"
                    value={item.trajeto}
                    onChange={(e) => updateDeslocamento(idx, { trajeto: e.target.value })}
                    className="w-full font-semibold px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Meio</label>
                  <input
                    type="text"
                    value={item.meio}
                    onChange={(e) => updateDeslocamento(idx, { meio: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Horário</label>
                  <input
                    type="text"
                    value={item.horario}
                    onChange={(e) => updateDeslocamento(idx, { horario: e.target.value })}
                    className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-[10px] font-mono text-stone-500 mb-1">Lugares / Vagão</label>
                    <input
                      type="text"
                      value={item.lugares}
                      onChange={(e) => updateDeslocamento(idx, { lugares: e.target.value })}
                      className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>
                  <button
                    onClick={() => deleteDeslocamento(idx)}
                    className="text-stone-400 hover:text-rose-600 p-2 rounded transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-1">
            <label className="block text-xs font-serif font-bold text-stone-900">
              Nota de Rodapé dos Deslocamentos:
            </label>
            <input
              type="text"
              value={deslocamentosNota}
              onChange={(e) => setDeslocamentosNota(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      )}

      {/* SUBTAB 3: HOSPEDAGENS */}
      {activeSubTab === 'hospedagens' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Editar Hospedagens
              </h2>
              <p className="text-xs text-stone-500">
                Altere nomes, endereços e horários de check-in / check-out
              </p>
            </div>
            <button
              onClick={() => {
                addHospedagem({
                  cidade: 'Nova Cidade',
                  onde: 'Nome do Hotel / Airbnb',
                  checkIn: '14h00',
                  checkOut: '11h00'
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Hospedagem</span>
            </button>
          </div>

          <div className="space-y-4">
            {hospedagens.map((h, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end text-xs"
              >
                <div>
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={h.cidade}
                    onChange={(e) => updateHospedagem(idx, { cidade: e.target.value })}
                    className="w-full font-serif font-bold px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Local / Endereço</label>
                  <input
                    type="text"
                    value={h.onde}
                    onChange={(e) => updateHospedagem(idx, { onde: e.target.value })}
                    className="w-full font-medium px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-stone-500 mb-1">Check-in</label>
                  <input
                    type="text"
                    value={h.checkIn}
                    onChange={(e) => updateHospedagem(idx, { checkIn: e.target.value })}
                    className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-[10px] font-mono text-stone-500 mb-1">Check-out</label>
                    <input
                      type="text"
                      value={h.checkOut}
                      onChange={(e) => updateHospedagem(idx, { checkOut: e.target.value })}
                      className="w-full font-mono px-2.5 py-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>
                  <button
                    onClick={() => deleteHospedagem(idx)}
                    className="text-stone-400 hover:text-rose-600 p-2 rounded transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: INGRESSOS & PASSEIOS */}
      {activeSubTab === 'ingressos' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Editar Ingressos e Passeios
              </h2>
              <p className="text-xs text-stone-500">
                Modifique atrações, datas ou valores anotados
              </p>
            </div>
            <button
              onClick={() => {
                addIngresso({
                  dia: '12/11',
                  atracao: 'Nova Atração / Ingresso',
                  valor: '€ 20'
                });
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Ingresso</span>
            </button>
          </div>

          <div className="space-y-3">
            {ingressos.map((ing, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs"
              >
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-stone-500 mb-0.5">Dia</label>
                  <input
                    type="text"
                    value={ing.dia}
                    onChange={(e) => updateIngresso(idx, { dia: e.target.value })}
                    className="w-full font-mono font-bold px-2 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="sm:col-span-7">
                  <label className="block text-[10px] font-mono text-stone-500 mb-0.5">Atração / Passeio</label>
                  <input
                    type="text"
                    value={ing.atracao}
                    onChange={(e) => updateIngresso(idx, { atracao: e.target.value })}
                    className="w-full font-medium px-2 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono text-stone-500 mb-0.5">Valor</label>
                  <input
                    type="text"
                    value={ing.valor}
                    onChange={(e) => updateIngresso(idx, { valor: e.target.value })}
                    className="w-full font-mono font-bold text-amber-800 px-2 py-1.5 border border-stone-200 rounded bg-white"
                  />
                </div>
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => deleteIngresso(idx)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-1">
            <label className="block text-xs font-serif font-bold text-stone-900">
              Nota de Rodapé dos Ingressos:
            </label>
            <input
              type="text"
              value={ingressosNota}
              onChange={(e) => setIngressosNota(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      )}

      {/* SUBTAB 5: CABEÇALHO & METADADOS */}
      {activeSubTab === 'metadata' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Editar Cabeçalho & Informações do Documento
            </h2>
            <p className="text-xs text-stone-500">
              Altere o título principal, período da viagem ou lista de cidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Kicker Superior
              </label>
              <input
                type="text"
                value={metadata.headerKicker}
                onChange={(e) => setMetadata({ ...metadata, headerKicker: e.target.value })}
                className="w-full font-mono text-xs px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Título Principal
              </label>
              <input
                type="text"
                value={metadata.titulo}
                onChange={(e) => setMetadata({ ...metadata, titulo: e.target.value })}
                className="w-full font-serif font-bold text-sm px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Período & Duração
              </label>
              <input
                type="text"
                value={metadata.periodo}
                onChange={(e) => setMetadata({ ...metadata, periodo: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-medium text-stone-700 mb-1">
                Lista de Cidades
              </label>
              <input
                type="text"
                value={metadata.cidadesLista}
                onChange={(e) => setMetadata({ ...metadata, cidadesLista: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 px-4 py-3 rounded-xl shadow-xl border border-stone-800 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{saveToast}</span>
        </div>
      )}
    </div>
  );
};
