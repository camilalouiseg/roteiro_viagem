/**
 * Dados 100% fiéis do Roteiro Oficial Europa Central
 * 11 a 24 de novembro de 2026 (14 dias · 5 países)
 * Não altera, não omite e não adiciona nenhuma informação ao roteiro original.
 */

export interface MasterScheduleDay {
  data: string;
  dia: string;
  cidade: string;
  destaques: string;
  paisCodigo: string; // ISO ou flag code
  paisNome: string;
}

export interface DeslocamentoItem {
  dia: string;
  trajeto: string;
  meio: string;
  horario: string;
  plataforma: string;
  lugares: string;
}

export interface HospedagemItem {
  cidade: string;
  onde: string;
  checkIn: string;
  checkOut: string;
}

export interface IngressoItem {
  dia: string;
  atracao: string;
  valor: string;
}

export interface TransitCard {
  origem: string;
  origemHorario: string;
  destino: string;
  destinoHorario: string;
  tipoMeio: string; // ex: Trem RegioJet, Trem noturno EN 443, FlixBus 260
  plataforma: string;
  lugares?: string;
  chegada?: string;
  observacao?: string;
}

export interface DayActivity {
  horario?: string;
  tipo: 'atracao' | 'deslocamento';
  titulo: string;
  subitens?: string[];
  caminhada?: string;
}

export interface DayPlan {
  diaNumero: number; // 1 a 14
  data: string; // ex: 11/11
  diaSemana: string; // ex: Quarta-feira
  titulo: string; // ex: VIENA, VIENA - PRAGA
  cidade: string;
  bandeiras: string[]; // ['AT'], ['AT', 'CZ']
  badge?: string; // ex: "PASSE 24H", "CHECK OUT 11H"
  transitCard?: TransitCard;
  atividades: DayActivity[];
  lugaresAnotados?: string[];
}

export const ROTEIRO_METADATA = {
  headerKicker: "ROTEIRO OFICIAL",
  titulo: "Europa Central",
  periodo: "11 a 24 de novembro de 2026 · 14 dias · 5 países",
  cidadesLista: "Viena · Praga · Cracóvia · Budapeste · Bratislava",
  resumoDiasPaises: [
    { cidade: "Viena", datas: "11–13/11", bandeira: "🇦🇹", pais: "Áustria" },
    { cidade: "Praga", datas: "13–15/11", bandeira: "🇨🇿", pais: "República Tcheca" },
    { cidade: "Cracóvia", datas: "16–18/11", bandeira: "🇵🇱", pais: "Polônia" },
    { cidade: "Budapeste", datas: "19–22/11", bandeira: "🇭🇺", pais: "Hungria" },
    { cidade: "Bratislava", datas: "22–23/11", bandeira: "🇸🇰", pais: "Eslováquia" },
    { cidade: "Viena", datas: "23–24/11", bandeira: "🇦🇹", pais: "Áustria" }
  ],
  footerPadrao: "Roteiro Europa Central · 11 a 24 de novembro de 2026"
};

export const MASTER_SCHEDULE: MasterScheduleDay[] = [
  {
    data: "11/11",
    dia: "Quarta",
    cidade: "Viena",
    destaques: "Chegada às 22h55 · trem do aeroporto · check-in no hotel",
    paisCodigo: "AT",
    paisNome: "Áustria"
  },
  {
    data: "12/11",
    dia: "Quinta",
    cidade: "Viena",
    destaques: "Schönbrunn · Volksgarten · Hofburg · KHM · Stephansplatz",
    paisCodigo: "AT",
    paisNome: "Áustria"
  },
  {
    data: "13/11",
    dia: "Sexta",
    cidade: "Viena - Praga",
    destaques: "Trem para Praga · Cidade Velha · Josefov · Torre da Pólvora",
    paisCodigo: "AT-CZ",
    paisNome: "Áustria / Rep. Tcheca"
  },
  {
    data: "14/11",
    dia: "Sábado",
    cidade: "Praga",
    destaques: "Ponte Carlos · Castelo de Praga · Café Louvre · barco no Vltava",
    paisCodigo: "CZ",
    paisNome: "República Tcheca"
  },
  {
    data: "15/11",
    dia: "Domingo",
    cidade: "Praga - Cracóvia",
    destaques: "Vyšehrad · Teatro Nacional · trem noturno",
    paisCodigo: "CZ-PL",
    paisNome: "Rep. Tcheca / Polônia"
  },
  {
    data: "16/11",
    dia: "Segunda",
    cidade: "Cracóvia",
    destaques: "Fábrica de Schindler · Kazimierz · Minas de Sal de Wieliczka",
    paisCodigo: "PL",
    paisNome: "Polônia"
  },
  {
    data: "17/11",
    dia: "Terça",
    cidade: "Cracóvia - Zakopane",
    destaques: "Gubałówka · Rua Krupówki · Wielka Krokiew",
    paisCodigo: "PL",
    paisNome: "Polônia"
  },
  {
    data: "18/11",
    dia: "Quarta",
    cidade: "Cracóvia - Budapeste",
    destaques: "Wawel · Rynek Główny · ônibus noturno",
    paisCodigo: "PL-HU",
    paisNome: "Polônia / Hungria"
  },
  {
    data: "19/11",
    dia: "Quinta",
    cidade: "Budapeste",
    destaques: "Ópera · Casa do Terror · Grande Sinagoga · Mercado de Natal Vörösmarty",
    paisCodigo: "HU",
    paisNome: "Hungria"
  },
  {
    data: "20/11",
    dia: "Sexta",
    cidade: "Budapeste",
    destaques: "Praça dos Heróis · Ilha Margarida · Parlamento · barco no Danúbio",
    paisCodigo: "HU",
    paisNome: "Hungria"
  },
  {
    data: "21/11",
    dia: "Sábado",
    cidade: "Budapeste",
    destaques: "Ponte das Correntes · Castelo de Buda · Bastião dos Pescadores · Basílica",
    paisCodigo: "HU",
    paisNome: "Hungria"
  },
  {
    data: "22/11",
    dia: "Domingo",
    cidade: "Budapeste - Bratislava",
    destaques: "Ônibus para Bratislava · centro histórico · Castelo de Bratislava",
    paisCodigo: "HU-SK",
    paisNome: "Hungria / Eslováquia"
  },
  {
    data: "23/11",
    dia: "Segunda",
    cidade: "Bratislava - Viena",
    destaques: "Belvedere · Karlskirche · Mercados de Natal · Prater",
    paisCodigo: "SK-AT",
    paisNome: "Eslováquia / Áustria"
  },
  {
    data: "24/11",
    dia: "Terça",
    cidade: "Viena",
    destaques: "Trem para o aeroporto · voo de volta às 12h20",
    paisCodigo: "AT",
    paisNome: "Áustria"
  }
];

export const DESLOCAMENTOS: DeslocamentoItem[] = [
  {
    dia: "11/11",
    trajeto: "Aeroporto de Viena → Wien Hbf",
    meio: "Trem",
    horario: "23h46 – 00h06",
    plataforma: "ver painel",
    lugares: "—"
  },
  {
    dia: "13/11",
    trajeto: "Wien Hbf → Praha Hlavní Nádraží",
    meio: "Trem RegioJet",
    horario: "06h39 – 10h56",
    plataforma: "ver painel",
    lugares: "Vagão 1 · 15, 16 e 17"
  },
  {
    dia: "15/11",
    trajeto: "Praha hl.n. → Kraków Główny",
    meio: "Trem noturno EN 443",
    horario: "22h16 – 07h08 (16/11)",
    plataforma: "ver painel",
    lugares: "Vagão 344 · 34 a 36"
  },
  {
    dia: "16/11",
    trajeto: "Kraków Główny → Wieliczka Rynek Kopalnia (ida e volta)",
    meio: "Trem",
    horario: "15h30 – 16h00 · volta 19h41 – 20h03",
    plataforma: "ver painel",
    lugares: "—"
  },
  {
    dia: "17/11",
    trajeto: "Cracóvia → Zakopane (ida e volta)",
    meio: "Ônibus",
    horario: "07h30 – 09h30 · volta 17h00 – 19h00",
    plataforma: "—",
    lugares: "—"
  },
  {
    dia: "18/11",
    trajeto: "Kraków MDA Bus Station → Budapest Népliget",
    meio: "FlixBus N986 (noturno)",
    horario: "21h50 – 06h00 (19/11)",
    plataforma: "G14 – G17",
    lugares: "11B · 11A · 10B"
  },
  {
    dia: "22/11",
    trajeto: "Budapest Népliget → Bratislava Bus Station",
    meio: "FlixBus 260",
    horario: "06h45 – 09h30",
    plataforma: "ver painel",
    lugares: "9D · 8C · 9C"
  },
  {
    dia: "23/11",
    trajeto: "Bratislava hl.st. → Wien Hbf",
    meio: "Trem RJX 160",
    horario: "06h00 – 07h18",
    plataforma: "ver painel (chegada: 3 a 12)",
    lugares: "Sem lugar marcado · só vale neste trem"
  },
  {
    dia: "24/11",
    trajeto: "Viena → Aeroporto de Viena (VIE)",
    meio: "Trem expresso",
    horario: "08h50 – 09h30",
    plataforma: "ver painel",
    lugares: "—"
  }
];

export const DESLOCAMENTOS_NOTA =
  "Os bilhetes de trem não trazem a plataforma: confira o painel da estação. Voo de volta: 24/11, 12h20 (embarque a partir das 09h30).";

export const HOSPEDAGENS: HospedagemItem[] = [
  {
    cidade: "Viena",
    onde: "Hotel George Vienna (Airbnb)",
    checkIn: "12/11 · 01h30",
    checkOut: "13/11"
  },
  {
    cidade: "Praga",
    onde: "Airbnb · Havelská, 110 00",
    checkIn: "13/11 · 19h30",
    checkOut: "15/11 · 11h"
  },
  {
    cidade: "Cracóvia",
    onde: "Hotel",
    checkIn: "16/11 · 14h50",
    checkOut: "18/11"
  },
  {
    cidade: "Budapeste",
    onde: "Airbnb",
    checkIn: "19/11 · 14h20",
    checkOut: "22/11"
  },
  {
    cidade: "Bratislava",
    onde: "Hotel Park Inn",
    checkIn: "22/11 · malas às 10h",
    checkOut: "23/11"
  },
  {
    cidade: "Viena",
    onde: "Airbnb",
    checkIn: "23/11 · malas às 07h40",
    checkOut: "24/11"
  }
];

export const INGRESSOS_PASSEIOS: IngressoItem[] = [
  { dia: "12/11", atracao: "Palácio de Schönbrunn · State Apartments", valor: "32 euros" },
  { dia: "12/11", atracao: "Museu de História da Arte (KHM)", valor: "€ 21" },
  { dia: "13/11", atracao: "Medieval Underground Tour · Entrada Geral + Circuito B", valor: "R$ 105" },
  { dia: "14/11", atracao: "Trdelník com sorvete", valor: "5 euros" },
  { dia: "14/11", atracao: "Complexo do Castelo de Praga", valor: "450 czk / 18 euros" },
  { dia: "14/11", atracao: "Passeio de barco pelo Rio Vltava", valor: "110 reais" },
  { dia: "16/11", atracao: "Minas de Sal de Wieliczka", valor: "184 reais" },
  { dia: "17/11", atracao: "Gubałówka · funicular (ida e volta)", valor: "R$ 50" },
  { dia: "17/11", atracao: "Gubałówka · tobogã/mirante", valor: "R$ 21" },
  { dia: "17/11", atracao: "Vila Koliba", valor: "R$ 31" },
  { dia: "17/11", atracao: "Rampa de Esqui (Wielka Krokiew)", valor: "R$ 42" },
  { dia: "18/11", atracao: "Museu do Exército (Muzeum Armii Krajowej)", valor: "R$ 35" },
  { dia: "19/11", atracao: "Casa do Terror", valor: "70 reais" },
  { dia: "19/11", atracao: "Underground Railway Museum", valor: "15 reais" },
  { dia: "20/11", atracao: "Passeio de barco pelo Rio Danúbio", valor: "~€ 25" },
  { dia: "21/11", atracao: "Hospital in the Rock", valor: "170 reais" },
  { dia: "22/11", atracao: "Castelo de Bratislava", valor: "14 euros" }
];

export const INGRESSOS_NOTA =
  "Valores como anotados no roteiro, na moeda original. Também citados: taxa para retirar as malas no escritório de Praga (13/11) e dinheiro em espécie para o Justiz-Café (12/11).";

export const DIAS_DETALHADOS: DayPlan[] = [
  // DIA 1 (pág. 4)
  {
    diaNumero: 1,
    data: "11/11",
    diaSemana: "QUARTA-FEIRA",
    titulo: "VIENA",
    cidade: "Viena",
    bandeiras: ["AT"],
    transitCard: {
      origem: "FLUGHAFEN WIEN",
      origemHorario: "23h46",
      destino: "WIEN HBF",
      destinoHorario: "00h06 (12/11)",
      tipoMeio: "Trem",
      plataforma: "ver painel"
    },
    atividades: [
      {
        horario: "22h55",
        tipo: "atracao",
        titulo: "Chegada"
      },
      {
        horario: "00h10 – 01h10",
        tipo: "atracao",
        titulo: "Jantar na estação"
      },
      {
        horario: "01h10 – 01h25",
        tipo: "deslocamento",
        titulo: "Uber: Estação - Airbnb (Hotel George Vienna)"
      },
      {
        horario: "01h30",
        tipo: "atracao",
        titulo: "Check in"
      }
    ]
  },

  // DIA 2 (pág. 5)
  {
    diaNumero: 2,
    data: "12/11",
    diaSemana: "QUINTA-FEIRA",
    titulo: "VIENA",
    cidade: "Viena",
    bandeiras: ["AT"],
    atividades: [
      {
        horario: "07h30 – 08h30",
        tipo: "atracao",
        titulo: "Acordar + café da manhã (no hotel)"
      },
      {
        horario: "08h30 – 08h45",
        tipo: "deslocamento",
        titulo: "Deslocamento: Hotel George Vienna - Schonbrunn"
      },
      {
        horario: "08h45 – 11h15",
        tipo: "atracao",
        titulo: "Palácio de Schönbrunn",
        subitens: [
          "State Apartments 32 euros - 40min",
          "Jardins - 15min",
          "Subida à Gloriette - 30min",
          "Fotos no topo - 20min",
          "Mercado de Natal de Schonbrunn - 20min"
        ]
      },
      {
        horario: "11h15 – 11h40",
        tipo: "deslocamento",
        titulo: "U4 metro Schönbrunn - Karlsplatz",
        caminhada: "caminhada de 16 min"
      },
      {
        horario: "11h45 – 12h15",
        tipo: "atracao",
        titulo: "Volksgarten e Templo de Teseu",
        subitens: ["(Passeio a pé pelos jardins)"]
      },
      {
        horario: "12h25 – 12h40",
        tipo: "atracao",
        titulo: "Edifício do Parlamento austríaco",
        subitens: ["(Fotos da fachada grega e estátua de Atena)"]
      },
      {
        horario: "12h40 – 13h25",
        tipo: "atracao",
        titulo: "Palace of Justice (Justizpalast)",
        subitens: ["(Entrada gratuita + Saguão + Justiz-Café no 5º andar) - levar dinheiro em espécie"],
        caminhada: "caminhada de 5min"
      },
      {
        horario: "13h30 – 14h10",
        tipo: "atracao",
        titulo: "Palácio Imperial de Hofburg",
        subitens: ["(Heldenplatz / In der Burg / Michaelertor / Michaelerplatz)"]
      },
      {
        horario: "14h10 – 15h40",
        tipo: "atracao",
        titulo: "Almoço na região central"
      },
      {
        horario: "15h40 – 18h00",
        tipo: "atracao",
        titulo: "Museu de História da Arte (KHM) [Entrada: € 21]",
        subitens: ["Ala Egípcia", '"Saliera"', '"A torre de Babel"', "Cupola Café"]
      },
      {
        horario: "18h00 – 18h15",
        tipo: "deslocamento",
        titulo: "Uber para o Lidl Tivoligasse"
      },
      {
        horario: "18h15 – 19h00",
        tipo: "atracao",
        titulo: "Ida ao supermercado Lidl: garantir as compras de comidas para viagem",
        caminhada: "caminhada de 15min"
      },
      {
        horario: "19h15 – 20h30",
        tipo: "atracao",
        titulo: "Passar no hotel para tomar banho, descansar e guardar as compras"
      },
      {
        horario: "20h30 – 22h00",
        tipo: "atracao",
        titulo: "Stephansplatz Christmas Market",
        subitens: ["(Uber 16min ou U4 + U1 Schönbrunn - Stephansplatz)"]
      }
    ]
  },

  // DIA 3 (pág. 6)
  {
    diaNumero: 3,
    data: "13/11",
    diaSemana: "SEXTA-FEIRA",
    titulo: "VIENA - PRAGA",
    cidade: "Viena - Praga",
    bandeiras: ["AT", "CZ"],
    transitCard: {
      origem: "WIEN HBF",
      origemHorario: "06h39",
      destino: "PRAHA HLAVNÍ NÁDRAŽÍ",
      destinoHorario: "10h56",
      tipoMeio: "Trem RegioJet",
      plataforma: "ver painel",
      lugares: "Vagão 1 · 15, 16 e 17"
    },
    atividades: [
      {
        horario: "04h30 – 06h00",
        tipo: "atracao",
        titulo: "Acordar + café da manhã (no hotel) + check out"
      },
      {
        horario: "06h00 – 06h14",
        tipo: "deslocamento",
        titulo: "Uber até Wien Hbf"
      },
      {
        horario: "11h00 – 11h20",
        tipo: "atracao",
        titulo: "Deixar malas no escritório (U Půjčovny 6)",
        caminhada: "caminhada de 10min"
      },
      {
        horario: "11h30 – 11h50",
        tipo: "atracao",
        titulo: "Museu Nacional + Praça Venceslau",
        subitens: ["(Caminhada pela praça e foto na estátua)"],
        caminhada: "caminhada de 12min"
      },
      {
        horario: "12h15 – 14h00",
        tipo: "atracao",
        titulo: "Praça da Cidade Velha",
        subitens: ["Almoço com Goulash no Pão", "Relógio Astronômico 13h", "Tyn Church"]
      },
      {
        horario: "14h00 – 15h00",
        tipo: "atracao",
        titulo: "Medieval Underground Tour da Antiga Prefeitura (Old Town Underground)",
        subitens: [
          "Compra ingresso [Entrada Geral + Circuito B = R$105]",
          "Tour dura 30min + subida na Torre do Relógio"
        ]
      },
      {
        horario: "15h00 – 16h00",
        tipo: "atracao",
        titulo: "Bairro Judeu / Josefov",
        subitens: [
          "Prefeitura Judaica (relógio hebraico de trás pra frente) - Židovská radnice",
          "Sinagoga Velha-Nova (1270 - mais antiga Europa) - Staronová synagoga",
          "Old Jewish Cemetery (100.000 túmulos em 12 camadas) - Starý židovský hřbitov",
          "Sinagoga Klausen",
          "Salão Cerimonial (Obřadní síň)"
        ]
      },
      {
        horario: "16h00 – 16h20",
        tipo: "atracao",
        titulo: "Rudolfinum",
        subitens: ["(Fachada e vista para a orla do Vltava no pôr do sol)"],
        caminhada: "caminhada de 15min"
      },
      {
        horario: "16h35 – 17h00",
        tipo: "atracao",
        titulo: "Perníčkův sen",
        subitens: ["(Comprar biscoitos tradicionais de gengibre)"],
        caminhada: "caminhada de 10min"
      },
      {
        horario: "17h00 – 17h20",
        tipo: "atracao",
        titulo: "Torre da Pólvora & Casa Municipal (Obecní dům) iluminadas",
        caminhada: "caminhada de 3min"
      },
      {
        horario: "17h20 – 18h30",
        tipo: "atracao",
        titulo: "Jantar no U Krále Brabantského (sem show) - restaurante medieval (meio caro)"
      },
      {
        horario: "18h45 – 19h15",
        tipo: "atracao",
        titulo: "Pegar malas no escritório (U Půjčovny 6) e pagar taxa",
        caminhada: "caminhada de 13min"
      },
      {
        horario: "19h30 – 20h00",
        tipo: "atracao",
        titulo: "Check in no Airbnb (Havelská, 110 00)",
        caminhada: "caminhada de 5min"
      },
      {
        horario: "20h00 – 21h00",
        tipo: "atracao",
        titulo: "Compras no supermercado Lidl"
      }
    ],
    lugaresAnotados: ["Boat Party + Epic"]
  },

  // DIA 4 (pág. 7)
  {
    diaNumero: 4,
    data: "14/11",
    diaSemana: "SÁBADO",
    titulo: "PRAGA",
    cidade: "Praga",
    bandeiras: ["CZ"],
    badge: "PASSE 24H",
    atividades: [
      {
        horario: "07h30 – 08h30",
        tipo: "atracao",
        titulo: "Acordar + tomar café",
        caminhada: "caminhada de 10min"
      },
      {
        horario: "08h40 – 09h20",
        tipo: "atracao",
        titulo: "Old Town Bridge Tower & Travessia da Ponte Carlos (Sem multidões)"
      },
      {
        horario: "09h40 – 10h15",
        tipo: "atracao",
        titulo: "Rua mais estreita (Vinárna Čertovka) + Canal do Diabo"
      },
      {
        horario: "10h15 – 10h40",
        tipo: "deslocamento",
        titulo: "Deslocamento (Tram 22) - parada Malostranské náměstí → Pražský hrad"
      },
      {
        horario: "10h40 – 11h10",
        tipo: "atracao",
        titulo: "Trdelník com Sorvete (5 euros) na subida"
      },
      {
        horario: "11h10 – 14h15",
        tipo: "atracao",
        titulo: "Complexo do Castelo de Praga [450czk / 18 euros]",
        subitens: [
          "Portão Principal (Praça Hradčanské náměstí)",
          "Catedral de São Vito (Katedrála sv. Víta)",
          "Antigo Palácio Real (Starý královský palác) - atrás da catedral",
          "Basílica de São Jorge (Bazilika sv. Jiří)",
          "12h00: Troca da Guarda no Pátio Principal",
          "Rua do Ouro (Golden Lane / Zlatá ulička) - entre na casa nº 22, onde Franz Kafka morou",
          "Torre Daliborka & Saída pelo Mirante Leste"
        ]
      },
      {
        horario: "14h15 – 15h30",
        tipo: "atracao",
        titulo: "Almoço/Lanche na região",
        caminhada: "caminhada de 25 min até o mosteiro"
      },
      {
        horario: "14h30 – 14h50",
        tipo: "atracao",
        titulo: "Mosteiro de Strahov (apenas observar a vista)"
      },
      {
        horario: "15h00 – 15h20",
        tipo: "deslocamento",
        titulo: "Deslocamento (Tram 22) - parada Pohořelec → Malostranské náměstí"
      },
      {
        horario: "15h30 – 16h00",
        tipo: "atracao",
        titulo: "Livraria Shakespeare"
      },
      {
        horario: "16h00 – 16h20",
        tipo: "deslocamento",
        titulo: "Deslocamento (Tram 22) - parada Malostranské náměstí → Národní třída"
      },
      {
        horario: "16h20 – 17h00",
        tipo: "atracao",
        titulo: "Café Louvre",
        subitens: ["(Pausa histórica para café e torta, frequentado por Kafka e Einstein)"]
      },
      {
        horario: "17h00 – 17h15",
        tipo: "deslocamento",
        titulo: "Deslocamento (Tram 17) - parada Národní divadlo → Právnická fakulta"
      },
      {
        horario: "17h30 – 18h20",
        tipo: "atracao",
        titulo: "Passeio de Barco pelo Rio Vltava [110 reais]",
        caminhada: "caminhada de 15 min até o Mercado de Havel"
      },
      {
        horario: "18h40 – 19h00",
        tipo: "atracao",
        titulo: "Mercado de Havel (Havelský Trh)"
      },
      {
        horario: "19h00 – 21h00",
        tipo: "atracao",
        titulo: "Airbnb + Jantar + Banho"
      }
    ],
    lugaresAnotados: ["Karlovy Lázně", "U Sudu", "Duplex Prague", "Vzorkovna Dog Bar"]
  },

  // DIA 5 (pág. 8)
  {
    diaNumero: 5,
    data: "15/11",
    diaSemana: "DOMINGO",
    titulo: "PRAGA - CRACÓVIA",
    cidade: "Praga - Cracóvia",
    bandeiras: ["CZ", "PL"],
    badge: "CHECK OUT 11H",
    transitCard: {
      origem: "PRAHA HL.N.",
      origemHorario: "22h16",
      destino: "KRAKÓW GŁÓWNY",
      destinoHorario: "07h08 (16/11)",
      tipoMeio: "Trem noturno EN 443",
      plataforma: "ver painel",
      lugares: "Vagão 344 · 34 a 36"
    },
    atividades: [
      {
        tipo: "atracao",
        titulo: "Tomar banho"
      },
      {
        horario: "09h30 – 12h00",
        tipo: "atracao",
        titulo: "Vyšehrad",
        subitens: ["(Jardins, ruínas históricas e Basílica de São Pedro e São Paulo)"]
      },
      {
        horario: "12h30 – 13h45",
        tipo: "atracao",
        titulo: "Almoço próximo à orla do rio"
      },
      {
        horario: "14h00 – 14h45",
        tipo: "atracao",
        titulo: "Teatro Nacional",
        subitens: ["(Apreciação externa da fachada)"]
      },
      {
        horario: "20h00 – 21h30",
        tipo: "atracao",
        titulo: "Jantar"
      },
      {
        horario: "21h30 – 22h00",
        tipo: "deslocamento",
        titulo: "Ida para estação"
      }
    ]
  },

  // DIA 6 (pág. 9)
  {
    diaNumero: 6,
    data: "16/11",
    diaSemana: "SEGUNDA-FEIRA",
    titulo: "CRACÓVIA",
    cidade: "Cracóvia",
    bandeiras: ["PL"],
    atividades: [
      {
        horario: "07h10",
        tipo: "atracao",
        titulo: "Chegada em Cracóvia",
        caminhada: "caminhada de 15min"
      },
      {
        horario: "07h30 – 07h50",
        tipo: "atracao",
        titulo: "Barbakan monumento"
      },
      {
        horario: "08h00 – 09h00",
        tipo: "atracao",
        titulo: "Tomar café"
      },
      {
        horario: "09h00 – 09h20",
        tipo: "atracao",
        titulo: "Chegada no Hotel (deixar malas)"
      },
      {
        tipo: "deslocamento",
        titulo: "Trem 78",
        caminhada: "caminhada de 21min"
      },
      {
        horario: "09h40 – 10h00",
        tipo: "atracao",
        titulo: "Chegada na Fábrica de Oskar Schindler para fila do ticket gratuito"
      },
      {
        horario: "10h00 – 12h15",
        tipo: "atracao",
        titulo: "Visita à Fábrica de Oskar Schindler",
        caminhada: "caminhada de 12min"
      },
      {
        horario: "12h25 – 12h50",
        tipo: "atracao",
        titulo: "Praça dos Heróis do Gueto (Cadeiras de ferro) + Resquícios do Muro"
      },
      {
        horario: "12h50 – 13h50",
        tipo: "atracao",
        titulo: "Almoço em Kazimierz",
        subitens: ["(Provar Pierogi e Zapiekanka no Plac Nowy)"]
      },
      {
        horario: "13h50 – 14h50",
        tipo: "atracao",
        titulo: "Antiga Sinagoga (Stara Synagoga) & Caminhada por Kazimierz"
      },
      {
        horario: "14h50 – 15h20",
        tipo: "atracao",
        titulo: "Check-in no Hotel + descanso rápido"
      },
      {
        horario: "15h30 – 16h00",
        tipo: "deslocamento",
        titulo: "Embarque no Trem: Estação Kraków Główny → Wieliczka Rynek Kopalnia",
        subitens: [
          "(~25 minutos de viagem, o trem deixa a 5 min da entrada)",
          "Plataforma: ver painel da estação"
        ]
      },
      {
        horario: "17h00 – 19h20",
        tipo: "atracao",
        titulo: "Minas de Sal de Wieliczka",
        subitens: ["Visita guiada ao circuito subterrâneo e à incrível Capela de Santa Kinga (184 reais)"]
      },
      {
        horario: "19h41 – 20h03",
        tipo: "deslocamento",
        titulo: "Trem de retorno Wieliczka → Kraków Główny",
        subitens: [
          "(chega direto na Estação/Rodoviária Principal)",
          "Plataforma: ver painel da estação"
        ]
      }
    ]
  },

  // DIA 7 (pág. 10)
  {
    diaNumero: 7,
    data: "17/11",
    diaSemana: "TERÇA-FEIRA",
    titulo: "CRACÓVIA - ZAKOPANE",
    cidade: "Cracóvia - Zakopane",
    bandeiras: ["PL"],
    atividades: [
      {
        horario: "07h30 – 09h30",
        tipo: "deslocamento",
        titulo: "Ônibus Cracóvia → Zakopane"
      },
      {
        horario: "09h45 – 11h30",
        tipo: "atracao",
        titulo: "Subida em Gubałówka",
        subitens: [
          "Funicular R$50 ida e volta",
          "Tobogã/Mirante R$21",
          "Queijo Oscypek"
        ]
      },
      {
        horario: "11h45 – 14h30",
        tipo: "atracao",
        titulo: "Caminhada pela Rua Krupówki + Almoço reforçado em Taverna de Madeira"
      },
      {
        horario: "14h30 – 16h15",
        tipo: "atracao",
        titulo: "Passeio cultural",
        subitens: [
          "Vila Koliba R$31 / Casas de madeira",
          "Rampa de Esqui (Wielka Krokiew) R$42"
        ]
      },
      {
        horario: "17h00 – 19h00",
        tipo: "deslocamento",
        titulo: "Ônibus de retorno Zakopane → Cracóvia"
      }
    ]
  },

  // DIA 8 (pág. 11)
  {
    diaNumero: 8,
    data: "18/11",
    diaSemana: "QUARTA-FEIRA",
    titulo: "CRACÓVIA - BUDAPESTE",
    cidade: "Cracóvia - Budapeste",
    bandeiras: ["PL", "HU"],
    transitCard: {
      origem: "KRAKÓW MDA BUS STATION",
      origemHorario: "21h50",
      destino: "BUDAPEST NÉPLIGET",
      destinoHorario: "06h00 (19/11)",
      tipoMeio: "FlixBus N986",
      plataforma: "G14 – G17",
      lugares: "11B · 11A · 10B",
      observacao: "~8h de viagem · € 74"
    },
    atividades: [
      {
        horario: "07h00 – 09h20",
        tipo: "atracao",
        titulo: "Acordar + café da manhã",
        subitens: ["Check out + deixar malas recepção"],
        caminhada: "caminhada de 15min"
      },
      {
        horario: "09h20 – 11h50",
        tipo: "atracao",
        titulo: "Complexo do Castelo de Wawel",
        subitens: ["(Aposentos Reais, Catedral e Estátua do Dragão)"]
      },
      {
        horario: "11h50 – 12h30",
        tipo: "atracao",
        titulo: "Subida pela Rua Grodzka",
        subitens: [
          "Rynek Główny (Praça do Mercado)",
          "Sukiennice (Mercado de Tecidos)",
          'Escultura "Eros Vendado" & Torre da Prefeitura',
          "Basílica de Santa Maria"
        ]
      },
      {
        horario: "12h30 – 13h30",
        tipo: "atracao",
        titulo: "Almoço rápido/lanche na Cidade Velha"
      },
      {
        horario: "13h30 – 14h30",
        tipo: "atracao",
        titulo: "Voltinha no centro histórico"
      },
      {
        horario: "14h30 – 15h10",
        tipo: "atracao",
        titulo: "Rota Real até o Portão de São Floriano & Barbacã",
        caminhada: "caminhada de 20min"
      },
      {
        horario: "15h30 – 17h00",
        tipo: "atracao",
        titulo: "Museu do Exército Nacional (Muzeum Armii Krajowej) R$35",
        caminhada: "caminhada de 20min"
      },
      {
        horario: "17h20 – 17h40",
        tipo: "atracao",
        titulo: "Retirar malas na hospedagem",
        caminhada: "caminhada de 15min"
      },
      {
        horario: "18h00 – 21h20",
        tipo: "atracao",
        titulo: "Jantar tranquilo na Estação Central",
        subitens: ["Voltinha no Shopping Galeria Krakowska"]
      }
    ]
  },

  // DIA 9 (pág. 12)
  {
    diaNumero: 9,
    data: "19/11",
    diaSemana: "QUINTA-FEIRA",
    titulo: "BUDAPESTE",
    cidade: "Budapeste",
    bandeiras: ["HU"],
    atividades: [
      {
        horario: "06h00",
        tipo: "atracao",
        titulo: "Chegada de ônibus"
      },
      {
        horario: "06h00 – 06h30",
        tipo: "deslocamento",
        titulo: "Népliget Flixbus Station - Airbnb",
        subitens: ["(Linha M3 azul: Népliget - Deák Ferenc tér)"]
      },
      {
        horario: "07h00 – 09h00",
        tipo: "atracao",
        titulo: "Café da manhã"
      },
      {
        horario: "09h00 – 09h20",
        tipo: "atracao",
        titulo: "Guardar malas na recepção",
        caminhada: "caminhada de 12min"
      },
      {
        horario: "09h30 – 09h45",
        tipo: "atracao",
        titulo: "Prédio da Ópera Estatal Húngara"
      },
      {
        horario: "09h45 – 10h00",
        tipo: "atracao",
        titulo: "Av. Andrássy"
      },
      {
        horario: "10h00 – 11h30",
        tipo: "atracao",
        titulo: "Casa do Terror (1h30) 70 reais"
      },
      {
        horario: "11h30 – 12h30",
        tipo: "atracao",
        titulo: "Almoço",
        caminhada: "caminhada de 25min"
      },
      {
        horario: "12h55 – 13h15",
        tipo: "atracao",
        titulo: "Grande Sinagoga de Budapeste (fachada)"
      },
      {
        horario: "13h20 – 13h40",
        tipo: "atracao",
        titulo: "Museu Nacional da Hungria (fachada)"
      },
      {
        horario: "13h40 – 14h10",
        tipo: "atracao",
        titulo: "Algum lugar pra comer trdelnik"
      },
      {
        horario: "14h20 – 15h00",
        tipo: "atracao",
        titulo: "Underground Railway Museum (15 reais)",
        subitens: ["Pequeno e barato"]
      },
      {
        horario: "15h20 – 16h00",
        tipo: "atracao",
        titulo: "Check in Airbnb + banho"
      },
      {
        horario: "16h00 – 19h00",
        tipo: "atracao",
        titulo: "Mercado de Natal da Praça Vörösmarty",
        subitens: ["(Degustação de doces e artesanato)"]
      }
    ]
  },

  // DIA 10 (pág. 13)
  {
    diaNumero: 10,
    data: "20/11",
    diaSemana: "SEXTA-FEIRA",
    titulo: "BUDAPESTE",
    cidade: "Budapeste",
    bandeiras: ["HU"],
    atividades: [
      {
        horario: "08h45 – 09h20",
        tipo: "deslocamento",
        titulo: "Deslocamento Airbnb → Praça dos Heróis",
        subitens: ["Metrô M3 + conexão com M1 (aprox. 30–40 min)"]
      },
      {
        horario: "09h20 – 10h15",
        tipo: "atracao",
        titulo: "Praça dos Heróis",
        subitens: ["Castelo de Vajdahunyad (fotos externas no parque)"]
      },
      {
        horario: "10h15 – 11h00",
        tipo: "deslocamento",
        titulo: "Deslocamento para a Ilha Margarida",
        subitens: ["Bonde 1 (Villamos 1) (aprox. 35–45 min)"]
      },
      {
        horario: "11h00 – 13h00",
        tipo: "atracao",
        titulo: "Ilha Margarida",
        subitens: [
          "Torre de Água",
          "Ruínas históricas (Ruínas do Convento Dominicano)",
          "Ruínas da Igreja de São Miguel",
          "Japanese Garden (Jardim Japonês)",
          "Margaret Island Water Tower (Torre de Água - vista por fora)"
        ]
      },
      {
        horario: "12h00 – 13h40",
        tipo: "atracao",
        titulo: "Almoço/Lanche"
      },
      {
        horario: "13h40 – 14h00",
        tipo: "deslocamento",
        titulo: "Deslocamento para o Parlamento Húngaro",
        subitens: ["Bonde 26 (Szabadtéri Színpad - Jászai Mari tér)"]
      },
      {
        horario: "14h00 – 14h30",
        tipo: "atracao",
        titulo: "Parlamento Húngaro (fachada)"
      },
      {
        horario: "14h30 – 15h00",
        tipo: "atracao",
        titulo: "Monumento “Sapatos às Margens do Danúbio”"
      },
      {
        horario: "15h00 – 15h40",
        tipo: "atracao",
        titulo: "Pausa para o Gelato na Gelarto Rosa"
      },
      {
        horario: "15h40 – 16h45",
        tipo: "atracao",
        titulo: "Passeio de barco pelo Rio Danúbio [~€ 25]",
        subitens: ["Ver o pôr do sol e os edifícios começando a acender"]
      },
      {
        horario: "17h00 – 18h30",
        tipo: "deslocamento",
        titulo: "Deslocamento de volta ao centro",
        subitens: ["Caminhada noturna pela Ponte das Correntes iluminada"]
      },
      {
        horario: "20h00 – 21h00",
        tipo: "atracao",
        titulo: "Jantar no centro de Budapeste"
      }
    ]
  },

  // DIA 11 (pág. 14)
  {
    diaNumero: 11,
    data: "21/11",
    diaSemana: "SÁBADO",
    titulo: "BUDAPESTE",
    cidade: "Budapeste",
    bandeiras: ["HU"],
    atividades: [
      {
        horario: "07h30 – 08h30",
        tipo: "atracao",
        titulo: "Acordar + café da manhã",
        caminhada: "caminhada de 17min"
      },
      {
        horario: "08h50 – 09h20",
        tipo: "atracao",
        titulo: "Chain Bridge",
        caminhada: "caminhada de 10min"
      },
      {
        horario: "09h30 – 10h30",
        tipo: "atracao",
        titulo: "Castle Garden Bazaar (Várkert Bazár) + Complexo do Castelo de Buda",
        caminhada: "caminhada de 20min"
      },
      {
        horario: "11h00 – 11h30",
        tipo: "atracao",
        titulo: "Ruas Tárnok e Úri"
      },
      {
        horario: "11h40 – 12h40",
        tipo: "atracao",
        titulo: "Hospital in the Rock (170 reais)"
      },
      {
        horario: "12h40 – 14h00",
        tipo: "atracao",
        titulo: "Almoço"
      },
      {
        horario: "14h00 – 15h00",
        tipo: "atracao",
        titulo: "(sem atividade definida)"
      },
      {
        horario: "15h00 – 16h00",
        tipo: "atracao",
        titulo: "Bastião dos Pescadores & Igreja de Matias"
      },
      {
        horario: "16h15 – 17h00",
        tipo: "deslocamento",
        titulo: "Deslocamento de volta para Pest"
      },
      {
        horario: "17h00 – 18h00",
        tipo: "atracao",
        titulo: "Airbnb: banho + descanso"
      },
      {
        horario: "18h00 – 18h30",
        tipo: "atracao",
        titulo: "Compras no Lidl"
      },
      {
        horario: "15h30 – 16h20",
        tipo: "atracao",
        titulo: "Catedral de São Estêvão"
      },
      {
        horario: "16h15 – 18h30",
        tipo: "atracao",
        titulo: "Mercado de Natal da Basílica de Santo Estêvão"
      }
    ],
    lugaresAnotados: ["Szimpla Kert", "Tesco Hipermarket (cubo mágico)"]
  },

  // DIA 12 (pág. 15)
  {
    diaNumero: 12,
    data: "22/11",
    diaSemana: "DOMINGO",
    titulo: "BUDAPESTE - BRATISLAVA",
    cidade: "Budapeste - Bratislava",
    bandeiras: ["HU", "SK"],
    transitCard: {
      origem: "BUDAPEST NÉPLIGET",
      origemHorario: "06h45",
      destino: "BRATISLAVA BUS STATION",
      destinoHorario: "09h30",
      tipoMeio: "FlixBus 260",
      plataforma: "ver painel",
      lugares: "9D · 8C · 9C",
      observacao: "€ 47"
    },
    atividades: [
      {
        horario: "04h40 – 06h00",
        tipo: "atracao",
        titulo: "Acordar + café da manhã + check out"
      },
      {
        horario: "10h00 – 10h20",
        tipo: "atracao",
        titulo: "Deixar malas na recepção do hotel (Park Inn)",
        caminhada: "caminhada de 30min"
      },
      {
        horario: "10h25 – 10h45",
        tipo: "atracao",
        titulo: "Catedral de São Martinho + Medieval City Walls",
        caminhada: "caminhada de 5min"
      },
      {
        horario: "10h45 – 11h20",
        tipo: "atracao",
        titulo: 'Escultura "Čumil"',
        subitens: [
          "Antiga Prefeitura / Stará radnica",
          "Palácio do Primaz",
          "Torre de São Miguel"
        ]
      },
      {
        horario: "11h30 – 11h40",
        tipo: "atracao",
        titulo: "Palácio Presidencial",
        caminhada: "caminhada de 10min"
      },
      {
        horario: "11h40 – 13h00",
        tipo: "atracao",
        titulo: "Almoço no Centro Histórico"
      },
      {
        horario: "13h00 – 13h20",
        tipo: "atracao",
        titulo: "Igreja Azul de Bratislava (Kostol svätej Alžbety)",
        caminhada: "caminhada de 20min"
      },
      {
        horario: "13h40 – 16h00",
        tipo: "atracao",
        titulo: "Castelo de Bratislava (14 euros)",
        caminhada: "caminhada de 20min"
      },
      {
        horario: "16h20 – 18h00",
        tipo: "atracao",
        titulo: "Tomar sorvete/café - Luculus Ice Saloon",
        subitens: [
          "Bronze Model of Bratislava",
          "Caminhada pela beira do rio"
        ]
      },
      {
        horario: "18h00 – 18h20",
        tipo: "deslocamento",
        titulo: "Deslocamento pro Airbnb (Park Inn)"
      }
    ]
  },

  // DIA 13 (pág. 16)
  {
    diaNumero: 13,
    data: "23/11",
    diaSemana: "SEGUNDA-FEIRA",
    titulo: "BRATISLAVA - VIENA",
    cidade: "Bratislava - Viena",
    bandeiras: ["SK", "AT"],
    transitCard: {
      origem: "BRATISLAVA HL.ST.",
      origemHorario: "06h00",
      destino: "WIEN HBF",
      destinoHorario: "07h18",
      tipoMeio: "Trem RJX 160",
      plataforma: "ver painel",
      chegada: "plataformas 3 a 12",
      observacao: "bilhete só vale neste trem, sem troca ou reembolso · Sem lugar marcado"
    },
    atividades: [
      {
        horario: "04h40 – 05h30",
        tipo: "atracao",
        titulo: "Acordar + café da manhã (no hotel) + check out"
      },
      {
        horario: "07h40 – 08h00",
        tipo: "atracao",
        titulo: "Deixar malas no Airbnb",
        caminhada: "20 min de caminhada"
      },
      {
        horario: "08h30 – 09h00",
        tipo: "deslocamento",
        titulo: "Deslocamento até o Palácio Belvedere"
      },
      {
        horario: "09h00 – 11h00",
        tipo: "atracao",
        titulo: "Palácio de Belvedere",
        subitens: [
          "Espelho d'água",
          "Mirante do Terraço Superior",
          "Esfinges de Pedras"
        ]
      },
      {
        horario: "11h00 – 11h15",
        tipo: "atracao",
        titulo: "Karlskirche (Igreja de São Carlos Borromeu)",
        subitens: ["(Fachada monumental)"]
      },
      {
        horario: "11h15 – 12h30",
        tipo: "atracao",
        titulo: "Almoço no mercado de Natal da Karlsplatz"
      },
      {
        horario: "12h30 – 13h30",
        tipo: "atracao",
        titulo: "Caminhada passando por:",
        subitens: [
          "Ópera de Viena",
          "Sorvete na Gelateria La Romana dal 1947",
          "A Estátua de Mozart e a Clave de Sol"
        ]
      },
      {
        horario: "13h30 – 15h30",
        tipo: "atracao",
        titulo: "Mercado de Natal da Maria-Theresien-Platz",
        subitens: ["(excelente para artesanato)"],
        caminhada: "10 min de caminhada"
      },
      {
        horario: "15h45 – 17h45",
        tipo: "atracao",
        titulo: "Mercado de Natal da Rathausplatz (Praça da Prefeitura)",
        subitens: ["Garantir as canecas oficiais + patinar no gelo"]
      },
      {
        horario: "17h45 – 18h15",
        tipo: "deslocamento",
        titulo: "TRAM 1 de Rathausplatz/Burgtheater até Prater Hauptallee"
      },
      {
        horario: "18h30 – 21h00",
        tipo: "atracao",
        titulo: "Wintermarkt no Prater",
        subitens: ["(com a roda-gigante Riesenrad e clima festivo noturno)"]
      }
    ]
  },

  // DIA 14 (pág. 17)
  {
    diaNumero: 14,
    data: "24/11",
    diaSemana: "TERÇA-FEIRA",
    titulo: "VIENA",
    cidade: "Viena",
    bandeiras: ["AT"],
    atividades: [
      {
        horario: "06h35 – 08h35",
        tipo: "atracao",
        titulo: "Acordar",
        subitens: [
          "Café da manhã",
          "Arrumar malas",
          "Check out"
        ]
      },
      {
        horario: "08h35 – 08h50",
        tipo: "deslocamento",
        titulo: "Hotel - Estação de trem"
      },
      {
        horario: "08h50 – 09h30",
        tipo: "deslocamento",
        titulo: "Trem expresso para o Aeroporto de Viena (VIE) [40 min]",
        subitens: ["Plataforma: ver painel da estação"]
      },
      {
        horario: "09h30 – 12h20",
        tipo: "atracao",
        titulo: "Procedimentos de embarque e voo de volta (12h20)"
      }
    ]
  }
];

export const BANDEIRAS_MAP: Record<string, { bandeira: string; nome: string }> = {
  AT: { bandeira: "🇦🇹", nome: "Áustria" },
  CZ: { bandeira: "🇨🇿", nome: "República Tcheca" },
  PL: { bandeira: "🇵🇱", nome: "Polônia" },
  HU: { bandeira: "🇭🇺", nome: "Hungria" },
  SK: { bandeira: "🇸🇰", nome: "Eslováquia" }
};
