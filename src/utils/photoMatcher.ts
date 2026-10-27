import { ATTRACTION_PHOTO_PRESETS, AttractionPhoto } from '../data/photoPresets';

/**
 * Mapeia uma atividade pelo seu dia e título ao preset correspondente
 */
export function getAttractionKeyForActivity(diaNumero: number, titulo: string): string | null {
  const t = titulo.toLowerCase();

  // DIA 2 - Viena
  if (diaNumero === 2) {
    if (t.includes('schönbrunn') || t.includes('schonbrunn')) return 'vienna_schonbrunn';
    if (t.includes('hofburg')) return 'vienna_hofburg';
    if (t.includes('história da arte') || t.includes('khm')) return 'vienna_khm';
    if (t.includes('stephansplatz')) return 'vienna_stephansplatz_market';
  }

  // DIA 3 - Praga
  if (diaNumero === 3) {
    if (t.includes('cidade velha')) return 'prague_old_town_square';
    if (t.includes('torre da pólvora') || t.includes('torre da polvora')) return 'prague_powder_tower';
  }

  // DIA 4 - Praga
  if (diaNumero === 4) {
    if (t.includes('ponte carlos') || t.includes('bridge')) return 'prague_charles_bridge';
    if (t.includes('castelo de praga')) return 'prague_castle_complex';
    if (t.includes('strahov')) return 'prague_strahov';
  }

  // DIA 5 - Praga / Cracóvia
  if (diaNumero === 5) {
    if (t.includes('vyšehrad') || t.includes('vysehrad')) return 'prague_vysehrad';
  }

  // DIA 6 - Cracóvia
  if (diaNumero === 6) {
    if (t.includes('schindler')) return 'krakow_schindler_factory';
    if (t.includes('kazimierz') || t.includes('sinagoga')) return 'krakow_kazimierz';
    if (t.includes('wieliczka')) return 'krakow_wieliczka_salt_mine';
  }

  // DIA 7 - Zakopane
  if (diaNumero === 7) {
    if (t.includes('gubałówka') || t.includes('gubalowka')) return 'zakopane_gubalowka';
    if (t.includes('krupówki') || t.includes('krupowki')) return 'zakopane_krupowki';
  }

  // DIA 8 - Cracóvia
  if (diaNumero === 8) {
    if (t.includes('wawel')) return 'krakow_wawel_castle';
    if (t.includes('rynek') || t.includes('mercado')) return 'krakow_rynek_glowny';
  }

  // DIA 9 - Budapeste
  if (diaNumero === 9) {
    if (t.includes('ópera') || t.includes('opera')) return 'budapest_opera';
    if (t.includes('vörösmarty') || t.includes('vorosmarty')) return 'budapest_vorosmarty_market';
  }

  // DIA 10 - Budapeste
  if (diaNumero === 10) {
    if (t.includes('heróis') || t.includes('herois')) return 'budapest_heroes_square';
    if (t.includes('parlamento')) return 'budapest_parliament';
    if (t.includes('barco') && t.includes('danúbio')) return 'budapest_danube_boat';
  }

  // DIA 11 - Budapeste
  if (diaNumero === 11) {
    if (t.includes('castelo de buda') || t.includes('várkert')) return 'budapest_buda_castle';
    if (t.includes('bastião') || t.includes('bastiao') || t.includes('matias')) return 'budapest_fishermans_bastion';
    if (t.includes('estêvão') || t.includes('estevao')) return 'budapest_stephen_basilica';
  }

  // DIA 12 - Bratislava
  if (diaNumero === 12) {
    if (t.includes('castelo de bratislava')) return 'bratislava_castle';
    if (t.includes('azul') || t.includes('alžbety')) return 'bratislava_blue_church';
    if (t.includes('čumil') || t.includes('cumil')) return 'bratislava_cumil';
  }

  // DIA 13 - Viena
  if (diaNumero === 13) {
    if (t.includes('belvedere')) return 'vienna_belvedere';
    if (t.includes('karlskirche')) return 'vienna_karlskirche';
    if (t.includes('rathausplatz') || t.includes('prefeitura')) return 'vienna_rathaus_market';
    if (t.includes('prater') || t.includes('wintermarkt')) return 'vienna_prater_wintermarkt';
  }

  return null;
}

export function getAttractionInfoByKey(key: string): AttractionPhoto | undefined {
  return ATTRACTION_PHOTO_PRESETS.find((a) => a.key === key);
}
