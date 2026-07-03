// Strukturierte CH-Polizei-Gehaltsdaten für das Occupation/Salary-Schema auf
// polizei-gehalt-schweiz. GESETZ: nur belegte Zahlen. Quelle: Kantonspolizei Zürich
// (zh.ch, offiziell), Brutto-Monatslohn nach Eintrittsalter, Stand 2026 — Tavily-verifiziert:
//   Polizeischule/ZHPS:            CHF 5'892 – 6'866
//   Praxisjahr/Flughafen:          CHF 6'087 – 7'061 (+ Dienstzulagen)
//   Nach eidg. Berufsprüfung:      CHF 6'431 – 7'461 (+ Dienstzulagen)
// median = Bereichsmitte, q1/q3 = Bereichsgrenzen. Deckt die sichtbare Tabelle.
export const POLIZEI_CH_GEHALT_ROWS: { gruppe: string; median: string; q1?: string; q3?: string }[] = [
  { gruppe: 'Während Polizeischule (Kapo ZH)', median: "CHF 6'379", q1: "CHF 5'892", q3: "CHF 6'866" },
  { gruppe: 'Praxisjahr / Flughafen (Kapo ZH)', median: "CHF 6'574", q1: "CHF 6'087", q3: "CHF 7'061" },
  { gruppe: 'Nach eidg. Berufsprüfung (Kapo ZH)', median: "CHF 6'946", q1: "CHF 6'431", q3: "CHF 7'461" },
];

export const POLIZEI_CH_GEHALT_QUELLE =
  'Kantonspolizei Zürich (zh.ch), Brutto-Monatslohn nach Eintrittsalter, Stand 2026';
