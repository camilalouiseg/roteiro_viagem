import React from 'react';
import {
  Landmark,
  Castle,
  Church,
  Coffee,
  Sparkles,
  Ship,
  TreePine,
  Ticket,
  Footprints,
  Compass
} from 'lucide-react';

export interface AttractionCategory {
  label: string;
  iconName: string;
  isMainAttraction: boolean;
}

const ROUTINE_KEYWORDS = [
  'acordar',
  'café da manhã',
  'tomar banho',
  'almoço',
  'jantar',
  'check in',
  'check-in',
  'check out',
  'check-out',
  'compras no supermercado',
  'compras no lidl',
  'guardar malas',
  'deixar malas',
  'pegar malas',
  'retirar malas',
  'procedimentos de embarque',
  'chegada',
  'ida para estação',
  'passar no hotel',
  'descanso'
];

export function getAttractionCategory(titulo: string, tipo: 'atracao' | 'deslocamento'): AttractionCategory {
  if (tipo === 'deslocamento') {
    return {
      label: 'Deslocamento',
      iconName: 'train',
      isMainAttraction: false
    };
  }

  const lower = titulo.toLowerCase();

  // Check if it's routine
  const isRoutine = ROUTINE_KEYWORDS.some((kw) => lower.includes(kw));
  if (isRoutine) {
    return {
      label: 'Rotina & Logística',
      iconName: 'clock',
      isMainAttraction: false
    };
  }

  // Castles & Palaces
  if (
    lower.includes('castelo') ||
    lower.includes('palácio') ||
    lower.includes('schönbrunn') ||
    lower.includes('hofburg') ||
    lower.includes('wawel') ||
    lower.includes('vyšehrad') ||
    lower.includes('belvedere') ||
    lower.includes('justizpalast')
  ) {
    return {
      label: 'Palácio & Castelo',
      iconName: 'castle',
      isMainAttraction: true
    };
  }

  // Christmas Markets
  if (lower.includes('mercado de natal') || lower.includes('christmas market') || lower.includes('wintermarkt')) {
    return {
      label: 'Mercado de Natal',
      iconName: 'sparkles',
      isMainAttraction: true
    };
  }

  // Museums & Historical Sites
  if (
    lower.includes('museu') ||
    lower.includes('khm') ||
    lower.includes('casa do terror') ||
    lower.includes('schindler') ||
    lower.includes('wieliczka') ||
    lower.includes('minas de sal') ||
    lower.includes('underground') ||
    lower.includes('hospital in the rock') ||
    lower.includes('barbakan') ||
    lower.includes('parlamento')
  ) {
    return {
      label: 'Museu & História',
      iconName: 'landmark',
      isMainAttraction: true
    };
  }

  // Churches & Sacred
  if (
    lower.includes('catedral') ||
    lower.includes('igreja') ||
    lower.includes('basílica') ||
    lower.includes('sinagoga') ||
    lower.includes('karlskirche') ||
    lower.includes('stephansplatz')
  ) {
    return {
      label: 'Monumento Sacro',
      iconName: 'church',
      isMainAttraction: true
    };
  }

  // River Boats
  if (lower.includes('barco') || lower.includes('vltava') || lower.includes('danúbio')) {
    return {
      label: 'Cruzeiro Fluvial',
      iconName: 'ship',
      isMainAttraction: true
    };
  }

  // Cafes & Gastronomy
  if (
    lower.includes('café') ||
    lower.includes('trdelník') ||
    lower.includes('sorvete') ||
    lower.includes('gelato') ||
    lower.includes('perníčkův') ||
    lower.includes('louvre') ||
    lower.includes('brabantského') ||
    lower.includes('taverna')
  ) {
    return {
      label: 'Café & Gastronomia',
      iconName: 'coffee',
      isMainAttraction: true
    };
  }

  // Parks & Nature / Viewpoints
  if (
    lower.includes('ponte') ||
    lower.includes('ilha') ||
    lower.includes('gubałówka') ||
    lower.includes('jardim') ||
    lower.includes('volksgarten') ||
    lower.includes('bastião') ||
    lower.includes('krupówki') ||
    lower.includes('prater') ||
    lower.includes('strahov')
  ) {
    return {
      label: 'Ponto Turístico & Vista',
      iconName: 'treepine',
      isMainAttraction: true
    };
  }

  // Default attraction
  return {
    label: 'Atração Cultural',
    iconName: 'compass',
    isMainAttraction: true
  };
}
