// Data pro stránku: atrakce, itinerář, rozpočet.
// Ceny ověřeny k 17. 10. 2026, není-li uvedeno "odhad".

const DKK = 3.254; // Kč za 1 DKK (ČNB 16. 10. 2026)

// Cesta k souboru na Wikimedia Commons (část za /commons/thumb/)
const MUST = [
  {
    id: "tivoli",
    name: "Tivoli Gardens – Jul i Tivoli",
    day: "So 14. 11. odpoledne a večer",
    desc: "Historický zábavní park v centru. Od 13. 11. běží vánoční sezóna se světly, trhy a horskými drahami. Nejhezčí je po setmění (od ~16:00).",
    addr: "Vesterbrogade 3, 1630 København V",
    lat: 55.6736, lng: 12.5683,
    transit: "København H (hlavní nádraží), přímo naproti · M3 Rådhuspladsen",
    hours: "Sezóna 13. 11. 2026 – 3. 1. 2027. Denní časy 2026 ověřte na webu (2025: Ne–Čt 11–22, Pá–So 11–23).",
    price: "Vstup od 200 DKK · Turpas (neomezené jízdy) od 199 DKK · vstup + Turpas od 389 DKK. <strong>Děti od 8 let platí jako dospělí.</strong> Ceny se mění podle dne, kupte online.",
    duration: "4–6 h",
    web: "https://www.tivoli.dk/en",
    status: "good",
    note: "Otevřeno od pátku 13. 11.: první den vánoční sezóny.",
    photos: [
      "1/1c/Christmas_market_at_Tivoli%2C_Copenhagen_%2823567982029%29.jpg",
      "c/ce/Christmas_market_at_Tivoli%2C_Copenhagen_%2823309014673%29.jpg"
    ]
  },
  {
    id: "zoo",
    name: "ZOO København",
    day: "So 14. 11. dopoledne",
    desc: "Jedna z nejstarších zoo v Evropě. Sloní pavilon od Normana Fostera, lední medvědi, Arktida, africká savana a vyhlídková věž.",
    addr: "Roskildevej 32, 2000 Frederiksberg",
    lat: 55.6728, lng: 12.5214,
    transit: "Bus 6A, zastávka Zoologisk Have (z Rådhuspladsen ~15 min) · M3 Frederiksberg Allé + 10 min pěšky",
    hours: "13.–17. 11.: denně 10:00–16:00",
    price: "Dospělý 260 DKK · dítě 3–14 let 160 DKK (online) · věž +25 DKK",
    duration: "3–4 h",
    web: "https://www.zoo.dk/en",
    status: "ok",
    photos: [
      "b/be/Norman_foster%2C_elephant_house%2C_copenhagen_zoo%2C_dec._07_%282118258136%29.jpg",
      "f/ff/General_view_-_Copenhagen_Zoo_-_DSC09119.JPG"
    ]
  },
  {
    id: "nyhavn",
    name: "Nyhavn",
    day: "Pá 13. 11. večer",
    desc: "Barevné domky ze 17. století, historické dřevěné lodě a stánky s párky. Odsud vyjíždějí lodě po kanálech. V listopadu tu bývá vánoční trh.",
    addr: "Nyhavn, 1051 København K",
    lat: 55.6797, lng: 12.5906,
    transit: "Metro Kongens Nytorv (M1/M2/M3/M4)",
    hours: "Nonstop · vánoční trh v roce 2025 od 7. 11. (termín 2026 zatím neoznámen)",
    price: "Zdarma",
    duration: "30–60 min",
    web: "https://www.visitcopenhagen.com/copenhagen/planning/nyhavn-gdk474735",
    status: "ok",
    photos: [
      "c/ce/Kopenhagen_%28DK%29%2C_Nyhavn_--_2017_--_1711.jpg",
      "8/84/2018_-_Nyhavn_on_sunset.jpg"
    ]
  },
  {
    id: "broens",
    name: "Broens Gadekøkken + kluziště",
    day: "Pá 13. 11. večeře",
    desc: "Street food na nábřeží u mostu Inderhavnsbroen naproti Nyhavnu. V zimě je tu venkovní kluziště Broens Skøjtebane (od 30. 10. 2026).",
    addr: "Strandgade 95, 1401 København K",
    lat: 55.6785, lng: 12.5945,
    transit: "Z Nyhavnu 5 min pěšky přes most · metro Christianshavn",
    hours: "Jídlo: Ne–Čt 11:30–20:00, Pá–So 11:00–21:00 · časy kluziště ověřte",
    price: "Jídlo ~100–150 DKK/porce · bruslení a půjčovné neověřeno (odhad ~80 DKK)",
    duration: "1–2 h",
    web: "https://www.broensstreetfood.dk",
    web2: ["Kluziště", "https://broensskoejtebane.dk"],
    status: "good",
    note: "V zimě otevřeno, navíc s kluzištěm.",
    photos: [
      "3/33/The_Inderhavnsbroen_%28The_Inner_Harbour_Bridge%29_5.jpg"
    ]
  },
  {
    id: "christianshavn",
    name: "Christianshavn: věž Vor Frelsers Kirke a Christiania",
    day: "Ne 15. 11. dopoledne",
    desc: "Čtvrť s kanály jako malý Amsterdam. Na věž kostela Vor Frelsers vedou venkovní točité schody kolem špice (~400 schodů) a nahoře je vyhlídka na celé město. Svobodné městečko Christiania je plné maleb a dílen. Navštivte jen krátce a za světla.",
    addr: "Sankt Annæ Gade 29, 1416 København K (kostel)",
    lat: 55.6728, lng: 12.5939,
    transit: "Metro Christianshavn (M1/M2), 5 min pěšky",
    hours: "Věž: denně 9:00–20:00 (poslední vstup 30 min před zavřením). <strong>Za deště, sněhu a silného větru se zavírá.</strong>",
    price: "Věž: dospělý 70 DKK, dítě 20 DKK · časový slot online (Pá–Po v 10–17 h ho mohou vyžadovat) · Christiania zdarma",
    duration: "2–3 h celkem",
    web: "https://www.vorfrelserskirke.dk/kontakt/taarnet/",
    status: "warn",
    note: "Věž závisí na počasí. Mějte náhradní plán.",
    photos: [
      "7/78/2019_-_Vor_Frelsers_Kirke_-_2.jpg",
      "0/07/Vor_Frelsers_Kirke-spire_stairway.jpg",
      "5/50/Christiania_entrance.jpg"
    ]
  },
  {
    id: "confecture",
    name: "Confecture",
    day: "Ne 15. 11. dopoledne",
    desc: "Malá čokoládovna chocolatiera Patricka Pörtnera na nábřeží Christianshavnského kanálu. Proslavily ji ručně dělané flødeboller (čokoládové „indiánky“), v zimě tu mají horkou čokoládu.",
    addr: "Overgaden Oven Vandet 40A, 1415 København K",
    lat: 55.6727, lng: 12.5918,
    transit: "Metro Christianshavn, 3 min pěšky",
    hours: "Denně 10:00–18:00",
    price: "Podle útraty (počítáme ~200 DKK)",
    duration: "20–30 min",
    web: "https://www.confecture.dk",
    status: "ok",
    photoNote: "Foto: Christianshavnský kanál, kde čokoládovna stojí",
    photos: [
      "d/d7/I11_423_Christianshavns_Kanal.jpg"
    ]
  },
  {
    id: "holmen",
    name: "Skibene på Holmen (fregata F352 Peder Skram)",
    day: "Ne 15. 11., jen zvenku",
    desc: "Muzejní lodě studené války: fregata Peder Skram (F352), raketový člun Sehested a ponorka Sælen. Provozují je dobrovolníci.",
    addr: "Elefanten / A.H. Vedels Plads, 1439 København K (Holmen)",
    lat: 55.6886, lng: 12.6050,
    transit: "Přístavní autobus (lodní linka) zastávka Operaen · bus 2A · pěšky z Christianshavnu ~20 min",
    hours: "<strong>V listopadu zavřeno.</strong> Poslední otevírací dny v roce 2026 byly 10.–18. 10.",
    price: "(Dospělý 160 DKK, 5–18 let 90 DKK, až se znovu otevře)",
    duration: "Pohled z nábřeží 15–20 min",
    web: "http://www.skibenepaaholmen.dk",
    status: "closed",
    note: "Zavřeno. Fregatu uvidíte z nábřeží na Holmenu nebo od Opery.",
    photos: [
      "0/09/Copenhagen_A_H_Vedels_plads_frigate_Peder_Skram_IMG_5521.jpg",
      "6/6f/Peder_Skram_20240710_164701710.jpg"
    ]
  },
  {
    id: "lego",
    name: "LEGO® Store København",
    day: "Ne 15. 11. odpoledne",
    desc: "Oficiální prodejna LEGO na Strøgetu: Pick & Build stěna, Build-a-Minifigure, stoly na stavění a Minifigure Factory. Kluci si tu můžou utratit kapesné.",
    addr: "Vimmelskaftet 37 (Strøget), 1161 København K",
    lat: 55.6785, lng: 12.5759,
    transit: "Metro Gammel Strand nebo Kongens Nytorv",
    hours: "Po–So 10:00–18:00, <strong>Ne 11:00–17:00</strong>",
    price: "Vstup zdarma",
    duration: "30–60 min",
    web: "https://www.lego.com/en-dk/stores/store/copenhagen",
    status: "ok",
    photos: [
      "2/2f/Lego_Store_Copenhagen_02.jpg",
      "c/c9/Lego_Store_Copenhagen_03.jpg"
    ]
  },
  {
    id: "blaplanet",
    name: "Den Blå Planet (národní akvárium)",
    day: "Po 16. 11. dopoledne (var. B: Út 17. 11.)",
    desc: "Největší akvárium severní Evropy v budově ve tvaru víru. Velký oceánský tunel se žraloky kladivouny, mořské vydry a amazonský prales.",
    addr: "Jacob Fortlingsvej 1, 2770 Kastrup",
    lat: 55.638, lng: 12.656,
    transit: "Metro M2 Kastrup, ~10 min pěšky (2 zastávky od letiště)",
    hours: "Denně · <strong>Po 16. 11. 10:00–21:00</strong>, Út–Ne 10:00–17:00",
    price: "Online: dospělý 219 DKK, dítě 3–11 let 116 DKK (u pokladny 249/131; víkend dražší) · časový slot",
    duration: "2–3 h",
    web: "https://denblaaplanet.dk/en/",
    status: "ok",
    note: "Blízko letiště, ideální na den odletu. Úschovnu kufrů ověřte předem.",
    photos: [
      "0/09/National_Aquarium_Denmark%2C_Kastrup%2C_Denmark_%28Unsplash%29.jpg",
      "2/29/The_Blue_Planet_%2816701120141%29.jpg"
    ]
  }
];

const OPTIONAL = [
  {
    id: "dragor",
    name: "Dragør: stará rybářská vesnice",
    day: "Po 16. 11. oběd (v itineráři)",
    desc: "Žluté domky s doškovými střechami, dlážděné uličky a přístav kousek od letiště. Na oběd s rybou jde dobře spojit s Den Blå Planet.",
    addr: "Dragør Havn, 2791 Dragør",
    lat: 55.5925, lng: 12.6722,
    transit: "Z letiště bus 35, z centra 250S (dříve 350S). Ověřte v Rejseplanen.",
    hours: "Nonstop",
    price: "Zdarma",
    duration: "1,5–2 h",
    web: "https://www.visitcopenhagen.com/copenhagen/planning/dragor-gdk1086506",
    status: "ok",
    photos: ["e/e5/Fiskerihavn_-_Drag%C3%B8r_-_panoramio.jpg"]
  },
  {
    id: "rundetarn",
    name: "Rundetårn (Kulatá věž)",
    day: "Ne 15. 11. (v itineráři)",
    desc: "Na věž se nejde po schodech, ale po spirálové rampě. Nahoře je skleněná podlaha a nejstarší funkční hvězdárna v Evropě.",
    addr: "Købmagergade 52A, 1150 København K",
    lat: 55.6813, lng: 12.5757,
    transit: "Metro Nørreport, 5 min pěšky",
    hours: "Po–Út 10–21, St–Ne 10–18 · hvězdárna Po a Út 18–21 (za jasna)",
    price: "Dospělý 60 DKK, <strong>do 17 let zdarma</strong>",
    duration: "45 min",
    web: "https://www.rundetaarn.dk/en/",
    status: "ok",
    photos: [
      "0/02/Kopenhagen_%28DK%29%2C_Runder_Turm_--_2017_--_1633.jpg",
      "e/e8/002_Copenhagen_landmark_-_The_Round_Tower_%28Rundetaarn%29_spiral_ramp.jpg"
    ]
  },
  {
    id: "experimentarium",
    name: "Experimentarium",
    day: "Plán B do deště · var. B: Po 16. 11.",
    desc: "Vědecké centrum se stovkami interaktivních exponátů (fyzika, lidské tělo, voda, bubliny). Pro 9leté kluky ideální na deštivý den.",
    addr: "Tuborg Havnevej 7, 2900 Hellerup",
    lat: 55.7284, lng: 12.5797,
    transit: "S-vlak Hellerup + 15 min pěšky, nebo bus 1A",
    hours: "Denně 9:30–17:00",
    price: "~255 DKK dospělý, ~159 DKK dítě (neověřeno), online −10 %",
    duration: "3–4 h",
    web: "https://www.experimentarium.dk",
    status: "ok",
    photos: [
      "9/99/20171005_Experimentarium_Hellerup_0062_%2837729624156%29.jpg",
      "1/19/Experimentarium%2C_Hellerup.jpg"
    ]
  },
  {
    id: "planetarium",
    name: "Tycho Brahe Planetarium",
    day: "Plán B do deště",
    desc: "Planetárium s filmem v kopuli a výstavou o vesmíru. Je 10 min pěšky od Tivoli.",
    addr: "Gl. Kongevej 10, 1610 København V",
    lat: 55.6744, lng: 12.5581,
    transit: "S-vlak Vesterport",
    hours: "Po 12–18:30, Út–St 9:30–20, Čt 9:30–20:30, Pá 9:30–21:30, So 9:30–20:30, Ne 9:30–19",
    price: "Dospělý 210 DKK, dítě 3–11 let 125 DKK (včetně jednoho filmu)",
    duration: "1,5–2 h",
    web: "https://www.planetarium.dk/en",
    status: "ok",
    photos: [
      "3/39/Tycho_Brahe_Planetarium_%28Copenhagen%29.jpg",
      "3/34/Tycho_Brahe_Planetarium_interior.jpg"
    ]
  },
  {
    id: "kastellet",
    name: "Kastellet + Malá mořská víla",
    day: "Var. B: Po 16. 11.",
    desc: "Hvězdicová pevnost s valy, kanóny a větrným mlýnem, po valech se dá běhat. Za 5 min chůze je socha Malé mořské víly.",
    addr: "Gl. Hovedvagt, Kastellet 1, 2100 København Ø",
    lat: 55.6911, lng: 12.5939,
    transit: "S-vlak Østerport, 5 min pěšky",
    hours: "Areál denně 6–22",
    price: "Zdarma",
    duration: "1 h",
    web: "https://www.visitcopenhagen.com/copenhagen/planning/kastellet-gdk474710",
    status: "ok",
    photos: [
      "7/7e/Windmill_of_Kastellet_%28Copenhagen%29.jpg",
      "c/ca/Denmark%2C_Copenhagen%2C_Little_Mermaid%2C_Langelinie_Promenade_150422-26.jpg"
    ]
  },
  {
    id: "amalienborg",
    name: "Amalienborg: střídání stráží",
    day: "Kterýkoli den ve 12:00",
    desc: "Královská garda v medvědích čepicích. Kolem 11:30 vyráží od Rosenborgu přes Kongens Nytorv a ve 12:00 se střídá na náměstí paláce.",
    addr: "Amalienborg Slotsplads, 1257 København K",
    lat: 55.6840, lng: 12.5933,
    transit: "Metro Marmorkirken",
    hours: "Denně 12:00",
    price: "Zdarma",
    duration: "30–45 min",
    web: "https://www.kongehuset.dk/en",
    status: "ok",
    photos: ["6/6f/Royal_Guard_at_Amalienborg%2C_Copenhagen%2C_20220617_0846_6667.jpg"]
  },
  {
    id: "canal",
    name: "Plavba po kanálech (Stromma)",
    day: "Volitelně · So 14. 11. vánoční plavba",
    desc: "Hodinová plavba v krytých vyhřívaných lodích kolem Nyhavnu, Opery, Holmenu (fregata F352 z vody!) a Malé mořské víly. V sobotu večer jezdí vánoční plavba (1,5 h).",
    addr: "Nyhavn 3 / Ved Stranden 26, København K",
    lat: 55.6795, lng: 12.5880,
    transit: "Metro Kongens Nytorv / Gammel Strand",
    hours: "Celoročně · listopadový jízdní řád ověřte",
    price: "Dospělý od 199 DKK, dítě 6–15 let 100 DKK",
    duration: "1 h",
    web: "https://www.stromma.com/en-dk/copenhagen/",
    status: "ok",
    note: "Jediný způsob, jak v listopadu vidět F352 zblízka.",
    photos: ["d/d7/I11_423_Christianshavns_Kanal.jpg"]
  },
  {
    id: "copenhill",
    name: "CopenHill",
    day: "Volitelně",
    desc: "Spalovna s umělou sjezdovkou na střeše a nejvyšší lezeckou stěnou na světě. Na střechu se dá zdarma vyjít po turistické stezce s výhledem.",
    addr: "Vindmøllevej 6, 2300 København S",
    lat: 55.6844, lng: 12.6200,
    transit: "Bus 37 / přístavní autobus · 15 min pěšky z Christianshavnu",
    hours: "Listopadová otevírací doba neověřena",
    price: "Stezka zdarma · lyžování ~150 DKK/h + půjčovné (neověřeno)",
    duration: "1–2 h",
    web: "https://www.copenhill.dk/en",
    status: "ok",
    photos: [
      "e/ef/Power_plant_with_ski_slope_Amager_Bakke_05.jpg",
      "6/6e/Copenhill_2.jpg"
    ]
  },
  {
    id: "rosenborg",
    name: "Zámek Rosenborg (korunovační klenoty)",
    day: "So nebo Ne (v Po zavřeno)",
    desc: "Renesanční zámek, v jehož sklepním trezoru jsou dánské korunovační klenoty. Kolem je park Kongens Have.",
    addr: "Øster Voldgade 4A, 1350 København K",
    lat: 55.6856, lng: 12.5778,
    transit: "Metro Nørreport",
    hours: "10:00–16:00 · <strong>v pondělí zavřeno</strong> (2. 11. – 23. 12.)",
    price: "Do 18 let zdarma (vstupenka nutná) · dospělý ~140 DKK (neověřeno)",
    duration: "1–1,5 h",
    web: "https://denkongeligesamling.dk/en/rosenborg-castle/",
    status: "warn",
    photos: ["6/67/Outside_rosenborg_slot.jpg"]
  }
];

const PLACES = [
  { name: "Generator Copenhagen", lat: 55.6830, lng: 12.5862 },
  { name: "Urban House", lat: 55.6716, lng: 12.5609 },
  { name: "CABINN Metro", lat: 55.6293, lng: 12.5788 },
  { name: "Letiště Kodaň (CPH)", lat: 55.6180, lng: 12.6508 }
];

// Itinerář. variant: "AB" = obě varianty, "A" / "B" = jen jedna z nich
const DAYS = [
  {
    variant: "AB", date: "Pátek 13. 11.", title: "Přílet, Nyhavn a Broens",
    items: [
      ["09:00", "Odjezd z Lípy nad Orlicí (D11 → D0 → Ruzyně, ~156 km)"],
      ["11:30", "Parkoviště AeroParking PA Smart / PB Economy, pěšky na Terminál 2"],
      ["11:45", "Odbavení, bezpečnostní kontrola"],
      ["13:45", "<strong>Odlet Norwegian</strong> → 15:05 přílet do Kodaně"],
      ["15:30", "Setkání s druhým dospělým · City Pass 96 h ×2 v aplikaci Rejsebillet · metro M2"],
      ["16:30", "Ubytování"],
      ["17:30", "Nyhavn za tmy (světla, vánoční trh?) → most Inderhavnsbroen"],
      ["18:15", "<strong>Broens Gadekøkken</strong>: večeře a bruslení na kluzišti"],
      ["20:30", "Zpět na ubytování"]
    ],
    alt: "Pokud budou mít kluci energie: večer je slavnostní otevření vánočního Tivoli. Bude tam ale plno, proto ho necháváme na sobotu."
  },
  {
    variant: "AB", date: "Sobota 14. 11.", title: "ZOO a vánoční Tivoli",
    items: [
      ["09:30", "Bus 6A z centra (nebo M3 Frederiksberg Allé)"],
      ["10:00", "<strong>ZOO København</strong>: sloni, lední medvědi, savana, věž"],
      ["13:30", "Oběd (v ZOO nebo na Frederiksbergu)"],
      ["14:30", "Bus 6A zpět k Rådhuspladsen (~15 min)"],
      ["15:00", "<strong>Tivoli</strong>: atrakce za světla, ve 16:00 se rozsvítí vánoční výzdoba"],
      ["18:00", "Večeře v Tivoli (trhy, stánky)"],
      ["20:30", "Zpět na ubytování"]
    ],
    alt: "Alternativa: vánoční plavba Stromma po kanálech (sobota večer, od Ved Stranden 26)."
  },
  {
    variant: "AB", date: "Neděle 15. 11.", title: "Christianshavn, Holmen, LEGO a Rundetårn",
    items: [
      ["09:30", "Metro do stanice Christianshavn"],
      ["10:00", "<strong>Věž Vor Frelsers Kirke</strong> (rezervovaný slot; za deště zavřeno)"],
      ["10:45", "<strong>Confecture</strong>: flødeboller a horká čokoláda"],
      ["11:15", "Procházka podél kanálu Christianshavn · krátce Christiania"],
      ["12:15", "Holmen: <strong>fregata F352 Peder Skram</strong> z nábřeží · Opera · oběd"],
      ["14:00", "Lodní autobus nebo metro do centra → Strøget"],
      ["14:30", "<strong>LEGO Store</strong> (v neděli do 17:00!)"],
      ["15:45", "Rundetårn: rampa na vyhlídku za soumraku"],
      ["17:00", "Vánoční trh Højbro Plads / Nyhavn, večeře"]
    ],
    alt: "Plán B pro déšť: dopoledne Experimentarium (9:30–17) nebo Tycho Brahe Planetarium. Věž přesunout na pondělí ráno (var. B)."
  },
  {
    variant: "A", date: "Pondělí 16. 11.", title: "Den Blå Planet, Dragør a odlet",
    items: [
      ["08:30", "Check-out, kufry s sebou"],
      ["09:30", "Metro M2 do stanice Kastrup"],
      ["10:00", "<strong>Den Blå Planet</strong> (časový slot online)"],
      ["12:45", "Autobus do Dragøru (ověřit v Rejseplanen, ~20 min)"],
      ["13:15", "<strong>Dragør</strong>: přístav, uličky, oběd"],
      ["15:00", "Bus na letiště (~15 min)"],
      ["17:20", "<strong>Odlet SAS</strong> → 18:40 Praha"],
      ["19:15", "Parkoviště → domů kolem 21:30"]
    ],
    alt: "Když bude pršet: Dragør vynechat a zůstat v akváriu déle (v pondělí otevřeno do 21:00)."
  },
  {
    variant: "B", date: "Pondělí 16. 11.", title: "Experimentarium, Kastellet a mořská víla",
    items: [
      ["09:30", "S-vlak do Hellerupu"],
      ["10:00", "<strong>Experimentarium</strong>"],
      ["13:30", "Oběd"],
      ["14:15", "S-vlak do Østerportu → <strong>Kastellet</strong> + Malá mořská víla"],
      ["16:00", "Procházka po Langelinie k Amalienborgu"],
      ["18:00", "Rundetårn: hvězdárna (Po 18–21, za jasna)"],
      ["19:00", "Večeře"]
    ],
    alt: "Rosenborg je v pondělí zavřený."
  },
  {
    variant: "B", date: "Úterý 17. 11.", title: "Den Blå Planet, Dragør a odlet",
    items: [
      ["08:30", "Check-out, kufry s sebou"],
      ["10:00", "<strong>Den Blå Planet</strong> (v úterý 10–17)"],
      ["13:15", "<strong>Dragør</strong>: oběd v přístavu"],
      ["15:00", "Bus na letiště (City Pass 96 h vyprší kolem 15:30)"],
      ["17:20", "<strong>Odlet SAS</strong> → 18:40 Praha"],
      ["19:15", "Parkoviště → domů kolem 21:30"]
    ]
  }
];

// Rozpočet. Hodnoty na osobu: a1 = dospělý 1 (cestuje z ČR), a2 = dospělý 2 (už v Kodani), k = každé dítě.
// shared3 = částka dělená mezi tři cestující z ČR, shared4 = dělená mezi všechny čtyři.
// B = přepsané hodnoty pro variantu B. only = "A"/"B" jen pro jednu variantu. opt = volitelná položka.
const BUDGET = [
  { group: "Cesta z ČR a zpět" },
  { label: "Palivo Lípa – letiště – Lípa", cur: "CZK", shared3: 800 },
  { label: "Parkování AeroParking (online)", cur: "CZK", shared3: 900, B: { shared3: 1100 }, est: true },
  { label: "Letenky Norwegian + SAS vč. kabinových kufrů", cur: "CZK", a1: 3000, k: 3000, B: { a1: 2900, k: 2900 }, est: true },
  { label: "Cestovní pojištění", cur: "CZK", a1: 100, k: 100, B: { a1: 120, k: 120 }, est: true },

  { group: "Kodaň: ubytování a doprava" },
  { label: "Ubytování (3 noci × ~1 400 DKK)", cur: "DKK", shared4: 4200, B: { shared4: 5600, label: "Ubytování (4 noci × ~1 400 DKK)" }, est: true },
  { label: "City Pass Small 96 h (děti zdarma)", cur: "DKK", a1: 280, a2: 280 },

  { group: "Kodaň: atrakce" },
  { label: "ZOO", cur: "DKK", a1: 260, a2: 260, k: 160 },
  { label: "Tivoli (dospělí vstup, děti vstup + Turpas)", cur: "DKK", a1: 220, a2: 220, k: 420, est: true },
  { label: "Den Blå Planet (online, všední den)", cur: "DKK", a1: 219, a2: 219, k: 116 },
  { label: "Věž Vor Frelsers Kirke", cur: "DKK", a1: 70, a2: 70, k: 20 },
  { label: "Rundetårn (děti zdarma)", cur: "DKK", a1: 60, a2: 60, k: 0 },
  { label: "Bruslení na Broens (půjčovné)", cur: "DKK", a1: 80, a2: 80, k: 80, est: true },
  { label: "Experimentarium", cur: "DKK", a1: 255, a2: 255, k: 159, only: "B", est: true },
  { label: "Confecture a sladkosti", cur: "DKK", shared4: 200 },

  { group: "Kodaň: jídlo" },
  { label: "Jídlo (snídaně, oběd, večeře; ~400 DKK dospělý / 280 DKK dítě na den)", cur: "DKK", a1: 1200, a2: 1200, k: 840, B: { a1: 1600, a2: 1600, k: 1120 }, est: true },

  { group: "Volitelné" },
  { id: "canal", label: "Plavba po kanálech (Stromma)", cur: "DKK", a1: 199, a2: 199, k: 100, opt: true },
  { id: "planet", label: "Tycho Brahe Planetarium", cur: "DKK", a1: 210, a2: 210, k: 125, opt: true },
  { id: "exp", label: "Experimentarium (plán B)", cur: "DKK", a1: 255, a2: 255, k: 159, opt: true, only: "A" },
  { id: "lego", label: "Kapesné na LEGO (300 DKK / kluk)", cur: "DKK", k: 300, opt: true },
  { id: "breakfast", label: "Hotelová snídaně místo pekárny (příplatek ~60 DKK / os. / den)", cur: "DKK", a1: 180, a2: 180, k: 180, B: { a1: 240, a2: 240, k: 240 }, opt: true }
];

const RESERVE = 0.10;
