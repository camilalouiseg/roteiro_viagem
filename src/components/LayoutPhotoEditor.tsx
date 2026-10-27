import React, { useState, useRef } from 'react';
import { useLayoutPhotos, PhotoLayoutStyle } from '../context/LayoutPhotoContext';
import {
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Trash2,
  Check,
  Eye,
  Sliders,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Search,
  Printer,
  LayoutGrid
} from 'lucide-react';

export const LayoutPhotoEditor: React.FC = () => {
  const {
    photos,
    customKeys,
    layoutSettings,
    attractionsList,
    setPhotoUrl,
    uploadPhotoFile,
    removePhoto,
    resetPhotoToDefault,
    resetAllPhotos,
    updateLayoutSettings
  } = useLayoutPhotos();

  const [filterCity, setFilterCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeUrlInputKey, setActiveUrlInputKey] = useState<string | null>(null);
  const [urlInputValue, setUrlInputValue] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ key: string; text: string } | null>(null);

  // Hidden file input references
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const cities = ['all', 'Viena', 'Praga', 'Cracóvia', 'Cracóvia - Zakopane', 'Budapeste', 'Bratislava'];

  const filteredAttractions = attractionsList.filter((item) => {
    if (filterCity !== 'all') {
      if (!item.cidade.toLowerCase().includes(filterCity.toLowerCase())) {
        return false;
      }
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.nome.toLowerCase().includes(q) ||
        item.cidade.toLowerCase().includes(q) ||
        item.descricao.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleFileUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadPhotoFile(key, file);
      setFeedbackMsg({ key, text: 'Foto atualizada com sucesso!' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch {
      alert('Erro ao carregar imagem. Tente uma imagem menor (JPG ou PNG).');
    }
  };

  const handleApplyUrl = (key: string) => {
    if (!urlInputValue.trim()) return;
    setPhotoUrl(key, urlInputValue.trim());
    setActiveUrlInputKey(null);
    setUrlInputValue('');
    setFeedbackMsg({ key, text: 'Link da foto aplicado!' });
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700 font-bold">
                  Personalização do Roteiro
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500 font-medium">Fotos dos Pontos Turísticos</span>
              </div>
              <h1 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
                Editar Layout & Adicionar Fotos
              </h1>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl">
                Personalize as fotos de cada atração turística do roteiro. Você pode fazer upload de suas próprias fotos, colar links da internet ou usar os presets editoriais inclusos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                if (confirm('Deseja restaurar todas as fotos e opções de layout para o padrão original?')) {
                  resetAllPhotos();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
          </div>
        </div>

        {/* Global Layout Options Section */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Option 1: Display Mode */}
          <div className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-900">
                Estilo das Fotos
              </span>
              <LayoutGrid className="w-4 h-4 text-stone-400" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 bg-white p-1 rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => updateLayoutSettings({ photoStyle: 'card' })}
                className={`py-1.5 px-2 rounded-md font-medium text-center transition-all ${
                  layoutSettings.photoStyle === 'card'
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cartão
              </button>
              <button
                onClick={() => updateLayoutSettings({ photoStyle: 'compact' })}
                className={`py-1.5 px-2 rounded-md font-medium text-center transition-all ${
                  layoutSettings.photoStyle === 'compact'
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Miniatura
              </button>
              <button
                onClick={() => updateLayoutSettings({ photoStyle: 'banner' })}
                className={`py-1.5 px-2 rounded-md font-medium text-center transition-all ${
                  layoutSettings.photoStyle === 'banner'
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Banner
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">
              {layoutSettings.photoStyle === 'card' && 'Foto ampla com moldura e legenda refinada sob a atração.'}
              {layoutSettings.photoStyle === 'compact' && 'Miniatura alinhada lateralmente para leitura ágil.'}
              {layoutSettings.photoStyle === 'banner' && 'Visual panorâmico de grande impacto visual.'}
            </p>
          </div>

          {/* Option 2: PDF Printing Toggle */}
          <div className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-900">
                Fotos no PDF / Impressão
              </span>
              <Printer className="w-4 h-4 text-stone-400" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-700">
                Incluir fotos nas páginas A4:
              </span>
              <button
                onClick={() =>
                  updateLayoutSettings({
                    showPhotosInPdf: !layoutSettings.showPhotosInPdf,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  layoutSettings.showPhotosInPdf ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    layoutSettings.showPhotosInPdf ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">
              {layoutSettings.showPhotosInPdf
                ? 'As fotos selecionadas aparecerão no PDF impresso das 17 páginas.'
                : 'O PDF será gerado em versão compacta limpa sem fotos.'}
            </p>
          </div>

          {/* Option 3: General Visibility */}
          <div className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-900">
                Exibição Geral no Roteiro
              </span>
              <Eye className="w-4 h-4 text-stone-400" />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-700">
                Mostrar fotos no roteiro:
              </span>
              <button
                onClick={() =>
                  updateLayoutSettings({
                    showPhotos: !layoutSettings.showPhotos,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  layoutSettings.showPhotos ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    layoutSettings.showPhotos ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">
              Alterne facilmente para comparar o roteiro com ou sem fotos fotográficas.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCity(c)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                filterCity === c
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {c === 'all' ? 'Todas as Cidades' : c}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar atração para editar..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Attractions Grid for Photo Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((item) => {
          const currentUrl = photos[item.key];
          const hasCustom = customKeys.has(item.key);
          const isUrlInputActive = activeUrlInputKey === item.key;
          const feedback = feedbackMsg?.key === item.key ? feedbackMsg.text : null;

          return (
            <div
              key={item.key}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Preview Container */}
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden border-b border-stone-200">
                  {currentUrl ? (
                    <img
                      src={currentUrl}
                      alt={item.nome}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback in case user URL fails
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 gap-1.5">
                      <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                      <span className="text-[11px] font-mono">Sem foto atribuída</span>
                    </div>
                  )}

                  {/* Badges on preview */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                      Dia {item.diaNumero}
                    </span>
                    <span className="bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[10px] font-serif px-2 py-0.5 rounded-md">
                      {item.cidade}
                    </span>
                  </div>

                  {hasCustom && (
                    <div className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Personalizada</span>
                    </div>
                  )}
                </div>

                {/* Attraction Info */}
                <div className="p-4 space-y-1">
                  <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                    {item.nome}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2.5">
                {feedback && (
                  <div className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center font-medium">
                    {feedback}
                  </div>
                )}

                {/* URL Input Form when opened */}
                {isUrlInputActive ? (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <input
                      type="url"
                      value={urlInputValue}
                      onChange={(e) => setUrlInputValue(e.target.value)}
                      placeholder="Cole a URL direta da imagem (https://...)"
                      className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApplyUrl(item.key)}
                        className="flex-1 py-1.5 text-xs bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors"
                      >
                        Salvar URL
                      </button>
                      <button
                        onClick={() => {
                          setActiveUrlInputKey(null);
                          setUrlInputValue('');
                        }}
                        className="py-1.5 px-3 text-xs text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs">
                    {/* Hidden input for local file upload */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => {
                        fileInputRefs.current[item.key] = el;
                      }}
                      onChange={(e) => handleFileUpload(item.key, e)}
                      className="hidden"
                    />

                    {/* Upload File Button */}
                    <button
                      onClick={() => fileInputRefs.current[item.key]?.click()}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium transition-colors cursor-pointer"
                      title="Enviar foto do seu computador ou celular"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto</span>
                    </button>

                    {/* Paste URL Button */}
                    <button
                      onClick={() => {
                        setActiveUrlInputKey(item.key);
                        setUrlInputValue(currentUrl || '');
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-medium transition-colors cursor-pointer"
                      title="Inserir link direto de imagem da internet"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>Colar Link</span>
                    </button>
                  </div>
                )}

                {/* Sub-actions: Reset / Remove */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-stone-500">
                  {hasCustom ? (
                    <button
                      onClick={() => resetPhotoToDefault(item.key)}
                      className="flex items-center gap-1 text-amber-700 hover:text-amber-800 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restaurar padrão</span>
                    </button>
                  ) : (
                    <span className="text-stone-400">Foto padrão ativa</span>
                  )}

                  {currentUrl && (
                    <button
                      onClick={() => removePhoto(item.key)}
                      className="flex items-center gap-1 text-rose-600 hover:text-rose-700 hover:underline cursor-pointer ml-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
