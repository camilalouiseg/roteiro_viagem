/**
 * Presets de fotos de alta qualidade para os principais pontos turísticos do Roteiro Europa Central 2026.
 * Imagens de referências públicas/Wikimedia/Unsplash otimizadas com alt text e legendas.
 */

export interface AttractionPhoto {
  key: string;
  nome: string;
  cidade: string;
  diaNumero: number;
  url: string;
  descricao: string;
}

export const ATTRACTION_PHOTO_PRESETS: AttractionPhoto[] = [
  // DIA 2 - VIENA
  {
    key: "vienna_schonbrunn",
    nome: "Palácio de Schönbrunn",
    cidade: "Viena",
    diaNumero: 2,
    url: "https://images.unsplash.com/photo-1574884242633-91b79f649887?auto=format&fit=crop&w=1000&q=80",
    descricao: "Residência de verão dos Habsburgo e Gloriette em Viena"
  },
  {
    key: "vienna_hofburg",
    nome: "Palácio Imperial de Hofburg",
    cidade: "Viena",
    diaNumero: 2,
    url: "https://images.unsplash.com/photo-1609856878074-ce31ec407523?auto=format&fit=crop&w=1000&q=80",
    descricao: "Centro imperial histórico em Heldenplatz e Michaelertor"
  },
  {
    key: "vienna_khm",
    nome: "Museu de História da Arte (KHM)",
    cidade: "Viena",
    diaNumero: 2,
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
    descricao: "Acervo de Bruegel 'A Torre de Babel' e a Saliera de Cellini"
  },
  {
    key: "vienna_stephansplatz_market",
    nome: "Stephansplatz Christmas Market",
    cidade: "Viena",
    diaNumero: 2,
    url: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1000&q=80",
    descricao: "Mercado de Natal tradicional aos pés da Catedral de Santo Estêvão"
  },

  // DIA 3 - PRAGA
  {
    key: "prague_old_town_square",
    nome: "Praça da Cidade Velha & Relógio Astronômico",
    cidade: "Praga",
    diaNumero: 3,
    url: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=80",
    descricao: "Coração medieval de Praga com a Igreja de Týn e o Orloj"
  },
  {
    key: "prague_powder_tower",
    nome: "Torre da Pólvora & Casa Municipal",
    cidade: "Praga",
    diaNumero: 3,
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80",
    descricao: "Portal gótico monumental da Rota Real iluminado à noite"
  },

  // DIA 4 - PRAGA
  {
    key: "prague_charles_bridge",
    nome: "Ponte Carlos (Karlův most)",
    cidade: "Praga",
    diaNumero: 4,
    url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80",
    descricao: "Travessia matinal histórica sobre o Rio Vltava sem multidões"
  },
  {
    key: "prague_castle_complex",
    nome: "Complexo do Castelo de Praga & São Vito",
    cidade: "Praga",
    diaNumero: 4,
    url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=1000&q=80",
    descricao: "Maior castelo antigo do mundo com a Catedral gótica e a Rua do Ouro"
  },
  {
    key: "prague_strahov",
    nome: "Mosteiro de Strahov & Mirante",
    cidade: "Praga",
    diaNumero: 4,
    url: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=1000&q=80",
    descricao: "Vista panorâmica da cidade das cem torres a partir da colina"
  },

  // DIA 5 - PRAGA / CRACÓVIA
  {
    key: "prague_vysehrad",
    nome: "Vyšehrad & Basílica de São Pedro e São Paulo",
    cidade: "Praga",
    diaNumero: 5,
    url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1000&q=80",
    descricao: "Fortaleza histórica lendária e jardins sobre o penhasco do Vltava"
  },

  // DIA 6 - CRACÓVIA
  {
    key: "krakow_schindler_factory",
    nome: "Fábrica de Oskar Schindler",
    cidade: "Cracóvia",
    diaNumero: 6,
    url: "https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=1000&q=80",
    descricao: "Museu histórico sobre a ocupação de Cracóvia na Segunda Guerra"
  },
  {
    key: "krakow_kazimierz",
    nome: "Bairro de Kazimierz & Stara Synagoga",
    cidade: "Cracóvia",
    diaNumero: 6,
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
    descricao: "Histórico bairro judeu com cafés, sinagogas e cultura autêntica"
  },
  {
    key: "krakow_wieliczka_salt_mine",
    nome: "Minas de Sal de Wieliczka",
    cidade: "Cracóvia",
    diaNumero: 6,
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    descricao: "Capela de Santa Kinga esculpida em rocha de sal subterrânea"
  },

  // DIA 7 - ZAKOPANE
  {
    key: "zakopane_gubalowka",
    nome: "Subida em Gubałówka & Tatras",
    cidade: "Cracóvia - Zakopane",
    diaNumero: 7,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    descricao: "Funicular com vista panorâmica para as montanhas Tatra cobertas de neve"
  },
  {
    key: "zakopane_krupowki",
    nome: "Rua Krupówki & Tavernas de Madeira",
    cidade: "Cracóvia - Zakopane",
    diaNumero: 7,
    url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80",
    descricao: "Arquitetura alpina em madeira, queijo tradicional Oscypek e artesanato"
  },

  // DIA 8 - CRACÓVIA
  {
    key: "krakow_wawel_castle",
    nome: "Complexo do Castelo de Wawel",
    cidade: "Cracóvia",
    diaNumero: 8,
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1000&q=80",
    descricao: "Residência dos reis poloneses, Catedral de Wawel e Estátua do Dragão"
  },
  {
    key: "krakow_rynek_glowny",
    nome: "Rynek Główny & Sukiennice",
    cidade: "Cracóvia",
    diaNumero: 8,
    url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80",
    descricao: "Maior praça de mercado medieval da Europa com a Basílica de Santa Maria"
  },

  // DIA 9 - BUDAPESTE
  {
    key: "budapest_opera",
    nome: "Ópera Estatal Húngara",
    cidade: "Budapeste",
    diaNumero: 9,
    url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80",
    descricao: "Jóia neo-renascentista na célebre Avenida Andrássy"
  },
  {
    key: "budapest_vorosmarty_market",
    nome: "Mercado de Natal da Praça Vörösmarty",
    cidade: "Budapeste",
    diaNumero: 9,
    url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1000&q=80",
    descricao: "Vinho quente, doces tradicionais e clima natalino no centro de Budapeste"
  },

  // DIA 10 - BUDAPESTE
  {
    key: "budapest_heroes_square",
    nome: "Praça dos Heróis (Hősök tere)",
    cidade: "Budapeste",
    diaNumero: 10,
    url: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80",
    descricao: "Monumento do Milênio e Castelo de Vajdahunyad no parque da cidade"
  },
  {
    key: "budapest_parliament",
    nome: "Parlamento Húngaro & Danúbio",
    cidade: "Budapeste",
    diaNumero: 10,
    url: "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&w=1000&q=80",
    descricao: "Monumento neogótico espetacular às margens do Rio Danúbio"
  },
  {
    key: "budapest_danube_boat",
    nome: "Passeio de Barco pelo Rio Danúbio",
    cidade: "Budapeste",
    diaNumero: 10,
    url: "https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?auto=format&fit=crop&w=1000&q=80",
    descricao: "Pôr do sol navegando com os palácios e pontes iluminadas"
  },

  // DIA 11 - BUDAPESTE
  {
    key: "budapest_fishermans_bastion",
    nome: "Bastião dos Pescadores & Igreja de Matias",
    cidade: "Budapeste",
    diaNumero: 11,
    url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1000&q=80",
    descricao: "Mirante neo-românico de conto de fadas com vista para Pest"
  },
  {
    key: "budapest_buda_castle",
    nome: "Complexo do Castelo de Buda & Várkert Bazár",
    cidade: "Budapeste",
    diaNumero: 11,
    url: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80",
    descricao: "Castelo real histórico dominando o topo da colina de Buda"
  },
  {
    key: "budapest_stephen_basilica",
    nome: "Basílica de Santo Estêvão & Mercado de Natal",
    cidade: "Budapeste",
    diaNumero: 11,
    url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80",
    descricao: "Show de luzes projetado na fachada da basílica e feira natalina"
  },

  // DIA 12 - BRATISLAVA
  {
    key: "bratislava_castle",
    nome: "Castelo de Bratislava (Bratislavský hrad)",
    cidade: "Bratislava",
    diaNumero: 12,
    url: "https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=1000&q=80",
    descricao: "Castelo imponente com quatro torres vigiando o Rio Danúbio"
  },
  {
    key: "bratislava_blue_church",
    nome: "Igreja Azul (Kostol svätej Alžbety)",
    cidade: "Bratislava",
    diaNumero: 12,
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80",
    descricao: "Obra de Art Nouveau húngaro em tom azul pastel encantador"
  },
  {
    key: "bratislava_cumil",
    nome: "Escultura 'Čumil' & Centro Histórico",
    cidade: "Bratislava",
    diaNumero: 12,
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    descricao: "Famosa escultura de bronze do homem saindo do bueiro"
  },

  // DIA 13 - VIENA
  {
    key: "vienna_belvedere",
    nome: "Palácio de Belvedere",
    cidade: "Viena",
    diaNumero: 13,
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80",
    descricao: "Palácio barroco dos príncipes com espelho d'água e o beijo de Klimt"
  },
  {
    key: "vienna_karlskirche",
    nome: "Karlskirche (Igreja de São Carlos Borromeu)",
    cidade: "Viena",
    diaNumero: 13,
    url: "https://images.unsplash.com/photo-1574884242633-91b79f649887?auto=format&fit=crop&w=1000&q=80",
    descricao: "Fachada barroca monumental com colunas triunfais e mercado de Natal"
  },
  {
    key: "vienna_rathaus_market",
    nome: "Mercado de Natal da Rathausplatz",
    cidade: "Viena",
    diaNumero: 13,
    url: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1000&q=80",
    descricao: "O maior e mais iluminado mercado natalino de Viena com pista de patinação"
  },
  {
    key: "vienna_prater_wintermarkt",
    nome: "Wintermarkt no Prater & Roda-Gigante",
    cidade: "Viena",
    diaNumero: 13,
    url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1000&q=80",
    descricao: "A emblemática Riesenrad iluminada em clima festivo noturno no Prater"
  }
];

export const DEFAULT_PHOTOS_MAP: Record<string, string> = ATTRACTION_PHOTO_PRESETS.reduce(
  (acc, item) => {
    acc[item.key] = item.url;
    return acc;
  },
  {} as Record<string, string>
);
