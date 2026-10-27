import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ROTEIRO_METADATA,
  MASTER_SCHEDULE,
  DESLOCAMENTOS,
  DESLOCAMENTOS_NOTA,
  HOSPEDAGENS,
  INGRESSOS_PASSEIOS,
  INGRESSOS_NOTA,
  DIAS_DETALHADOS,
  MasterScheduleDay,
  DeslocamentoItem,
  HospedagemItem,
  IngressoItem,
  DayPlan,
  DayActivity
} from '../data/itineraryData';

interface ItineraryContextType {
  metadata: typeof ROTEIRO_METADATA;
  setMetadata: React.Dispatch<React.SetStateAction<typeof ROTEIRO_METADATA>>;
  masterSchedule: MasterScheduleDay[];
  setMasterSchedule: React.Dispatch<React.SetStateAction<MasterScheduleDay[]>>;
  updateMasterScheduleDay: (index: number, updated: Partial<MasterScheduleDay>) => void;
  deslocamentos: DeslocamentoItem[];
  setDeslocamentos: React.Dispatch<React.SetStateAction<DeslocamentoItem[]>>;
  updateDeslocamento: (index: number, updated: Partial<DeslocamentoItem>) => void;
  addDeslocamento: (item: DeslocamentoItem) => void;
  deleteDeslocamento: (index: number) => void;
  deslocamentosNota: string;
  setDeslocamentosNota: (nota: string) => void;
  hospedagens: HospedagemItem[];
  setHospedagens: React.Dispatch<React.SetStateAction<HospedagemItem[]>>;
  updateHospedagem: (index: number, updated: Partial<HospedagemItem>) => void;
  addHospedagem: (item: HospedagemItem) => void;
  deleteHospedagem: (index: number) => void;
  ingressos: IngressoItem[];
  setIngressos: React.Dispatch<React.SetStateAction<IngressoItem[]>>;
  updateIngresso: (index: number, updated: Partial<IngressoItem>) => void;
  addIngresso: (item: IngressoItem) => void;
  deleteIngresso: (index: number) => void;
  ingressosNota: string;
  setIngressosNota: (nota: string) => void;
  dias: DayPlan[];
  setDias: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  updateDayPlan: (dayNumber: number, updated: Partial<DayPlan>) => void;
  updateActivity: (dayNumber: number, activityIndex: number, updated: Partial<DayActivity>) => void;
  addActivity: (dayNumber: number, activity: DayActivity) => void;
  deleteActivity: (dayNumber: number, activityIndex: number) => void;
  highlightAttractions: boolean;
  setHighlightAttractions: (v: boolean) => void;
  resetToOriginal: () => void;
  isEdited: boolean;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

const STORAGE_KEY = 'europa_central_itinerary_custom_v1';

export const ItineraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metadata, setMetadata] = useState(ROTEIRO_METADATA);
  const [masterSchedule, setMasterSchedule] = useState<MasterScheduleDay[]>(MASTER_SCHEDULE);
  const [deslocamentos, setDeslocamentos] = useState<DeslocamentoItem[]>(DESLOCAMENTOS);
  const [deslocamentosNota, setDeslocamentosNota] = useState(DESLOCAMENTOS_NOTA);
  const [hospedagens, setHospedagens] = useState<HospedagemItem[]>(HOSPEDAGENS);
  const [ingressos, setIngressos] = useState<IngressoItem[]>(INGRESSOS_PASSEIOS);
  const [ingressosNota, setIngressosNota] = useState(INGRESSOS_NOTA);
  const [dias, setDias] = useState<DayPlan[]>(DIAS_DETALHADOS);
  const [highlightAttractions, setHighlightAttractions] = useState<boolean>(true);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.metadata) setMetadata(parsed.metadata);
        if (parsed.masterSchedule) setMasterSchedule(parsed.masterSchedule);
        if (parsed.deslocamentos) setDeslocamentos(parsed.deslocamentos);
        if (parsed.deslocamentosNota) setDeslocamentosNota(parsed.deslocamentosNota);
        if (parsed.hospedagens) setHospedagens(parsed.hospedagens);
        if (parsed.ingressos) setIngressos(parsed.ingressos);
        if (parsed.ingressosNota) setIngressosNota(parsed.ingressosNota);
        if (parsed.dias) setDias(parsed.dias);
        setIsEdited(true);
      }
    } catch (e) {
      console.warn('Erro ao carregar roteiro do localStorage', e);
    }
  }, []);

  // Save changes to localStorage
  const saveState = (updatedDias?: DayPlan[]) => {
    setIsEdited(true);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          metadata,
          masterSchedule,
          deslocamentos,
          deslocamentosNota,
          hospedagens,
          ingressos,
          ingressosNota,
          dias: updatedDias || dias
        })
      );
    } catch (e) {
      console.warn('Erro ao salvar no localStorage', e);
    }
  };

  const updateMasterScheduleDay = (index: number, updated: Partial<MasterScheduleDay>) => {
    setMasterSchedule((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
    setIsEdited(true);
  };

  const updateDeslocamento = (index: number, updated: Partial<DeslocamentoItem>) => {
    setDeslocamentos((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
    setIsEdited(true);
  };

  const addDeslocamento = (item: DeslocamentoItem) => {
    setDeslocamentos((prev) => [...prev, item]);
    setIsEdited(true);
  };

  const deleteDeslocamento = (index: number) => {
    setDeslocamentos((prev) => prev.filter((_, i) => i !== index));
    setIsEdited(true);
  };

  const updateHospedagem = (index: number, updated: Partial<HospedagemItem>) => {
    setHospedagens((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
    setIsEdited(true);
  };

  const addHospedagem = (item: HospedagemItem) => {
    setHospedagens((prev) => [...prev, item]);
    setIsEdited(true);
  };

  const deleteHospedagem = (index: number) => {
    setHospedagens((prev) => prev.filter((_, i) => i !== index));
    setIsEdited(true);
  };

  const updateIngresso = (index: number, updated: Partial<IngressoItem>) => {
    setIngressos((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updated };
      return next;
    });
    setIsEdited(true);
  };

  const addIngresso = (item: IngressoItem) => {
    setIngressos((prev) => [...prev, item]);
    setIsEdited(true);
  };

  const deleteIngresso = (index: number) => {
    setIngressos((prev) => prev.filter((_, i) => i !== index));
    setIsEdited(true);
  };

  const updateDayPlan = (dayNumber: number, updated: Partial<DayPlan>) => {
    setDias((prev) => {
      const next = prev.map((d) => (d.diaNumero === dayNumber ? { ...d, ...updated } : d));
      saveState(next);
      return next;
    });
  };

  const updateActivity = (dayNumber: number, activityIndex: number, updated: Partial<DayActivity>) => {
    setDias((prev) => {
      const next = prev.map((d) => {
        if (d.diaNumero !== dayNumber) return d;
        const newAtividades = [...d.atividades];
        newAtividades[activityIndex] = { ...newAtividades[activityIndex], ...updated };
        return { ...d, atividades: newAtividades };
      });
      saveState(next);
      return next;
    });
  };

  const addActivity = (dayNumber: number, activity: DayActivity) => {
    setDias((prev) => {
      const next = prev.map((d) => {
        if (d.diaNumero !== dayNumber) return d;
        return { ...d, atividades: [...d.atividades, activity] };
      });
      saveState(next);
      return next;
    });
  };

  const deleteActivity = (dayNumber: number, activityIndex: number) => {
    setDias((prev) => {
      const next = prev.map((d) => {
        if (d.diaNumero !== dayNumber) return d;
        return { ...d, atividades: d.atividades.filter((_, i) => i !== activityIndex) };
      });
      saveState(next);
      return next;
    });
  };

  const resetToOriginal = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMetadata(ROTEIRO_METADATA);
    setMasterSchedule(MASTER_SCHEDULE);
    setDeslocamentos(DESLOCAMENTOS);
    setDeslocamentosNota(DESLOCAMENTOS_NOTA);
    setHospedagens(HOSPEDAGENS);
    setIngressos(INGRESSOS_PASSEIOS);
    setIngressosNota(INGRESSOS_NOTA);
    setDias(DIAS_DETALHADOS);
    setIsEdited(false);
  };

  return (
    <ItineraryContext.Provider
      value={{
        metadata,
        setMetadata,
        masterSchedule,
        setMasterSchedule,
        updateMasterScheduleDay,
        deslocamentos,
        setDeslocamentos,
        updateDeslocamento,
        addDeslocamento,
        deleteDeslocamento,
        deslocamentosNota,
        setDeslocamentosNota,
        hospedagens,
        setHospedagens,
        updateHospedagem,
        addHospedagem,
        deleteHospedagem,
        ingressos,
        setIngressos,
        updateIngresso,
        addIngresso,
        deleteIngresso,
        ingressosNota,
        setIngressosNota,
        dias,
        setDias,
        updateDayPlan,
        updateActivity,
        addActivity,
        deleteActivity,
        highlightAttractions,
        setHighlightAttractions,
        resetToOriginal,
        isEdited
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary deve ser usado dentro de um ItineraryProvider');
  }
  return context;
};
