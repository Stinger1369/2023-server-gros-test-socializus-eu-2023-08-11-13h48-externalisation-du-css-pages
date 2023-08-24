// ENG - Here is the array that fills the lists of round flags. Fell free to commentarize flags if they're unnecessary or add some (the pattern is at the end of the array).  - ENG
// FR - Voilà le tableau qui remplit les listes de drapeaux arrcountriesListCircleFlagsondis. n4hésitez pas à commentariser les drapeaux non nécessaires ou en ajouter (le patron est à la fin du tableau) - FR

import France from "./flags-svg-round/france.svg";
import English from "./flags-svg-round/united-kingdom.svg";
import Spanish from "./flags-svg-round/spain.svg";
import Portuguese from "./flags-svg-round/portugal.svg";
import German from "./flags-svg-round/germany.svg";
import Italian from "./flags-svg-round/italy.svg";
import Russian from "./flags-svg-round/russia.svg";
import Chinese from "./flags-svg-round/china.svg";
import Bulgarian from "./flags-svg-round/bulgaria.svg";
import Hindi from "./flags-svg-round/india.svg";
import Japanese from "./flags-svg-round/japan.svg";
import Israeli from "./flags-svg-round/israel.svg";
import Arabic from "./flags-svg-round/arab-league.svg";
import Hungarian from "./flags-svg-round/hungary.svg";
import Polish from "./flags-svg-round/poland.svg";
import Romanian from "./flags-svg-round/romania.svg";
import Greek from "./flags-svg-round/greece.svg";
import Croatian from "./flags-svg-round/croatia.svg";
import Czech from "./flags-svg-round/czech-republic.svg";
import Danish from "./flags-svg-round/denmark.svg";
import Estonian from "./flags-svg-round/estonia.svg";
import Finnish from "./flags-svg-round/finland.svg";
import Latvian from "./flags-svg-round/latvia.svg";
import Lithuanian from "./flags-svg-round/lithuania.svg";
import Dutch from "./flags-svg-round/netherlands.svg"
import Norwegian from "./flags-svg-round/norway.svg";
import Serbian from "./flags-svg-round/serbia.svg";
import Slovakian from "./flags-svg-round/slovakia.svg";
import Swedish from "./flags-svg-round/sweden.svg";
import Ukrainian from "./flags-svg-round/ukraine.svg";
import Madagascar from "./flags-svg-round/madagascar.svg";
import Scotland from "./flags-svg-round/scotland.svg";
import Iceland from "./flags-svg-round/iceland.svg";
import Ireland from "./flags-svg-round/ireland.svg";
import Bosnia from "./flags-svg-round/bosnia.svg";
import Slovenia from "./flags-svg-round/slovenia.svg";


import Json from "./json/en.json";
const { language_iso_639_1 } = Json;

export const countriesListCircleFlags = [
  {
    language: language_iso_639_1.fr,
    flag: <img src={France}/>,
    bigram: "FR",
 },
  {
    language: language_iso_639_1.en,
    flag: <img src={English}/>,
    bigram: "EN",
 },
  {
    language: language_iso_639_1.es,
    flag: <img src={Spanish}/>,
    bigram: "ES",
 },
  {
    language: language_iso_639_1.pt,
    flag: <img src={Portuguese}/>,
    bigram: "PT",
 },
  {
    language: language_iso_639_1.de,
    flag: <img src={German}/>,
    bigram: "DE",
 },
  {
    language: language_iso_639_1.it,
    flag: <img src={Italian}/>,
    bigram: "IT",
 },
  {
    language: language_iso_639_1.ru,
    flag: <img src={Russian}/>,
    bigram: "RU",
 },
  {
    language: language_iso_639_1.zh,
    flag: <img src={Chinese}/>,
    bigram: "ZH",
 },
  {
    language: language_iso_639_1.bg,
    flag: <img src={Bulgarian}/>,
    bigram: "BG",
 },
  {
    language: language_iso_639_1.hi,
    flag: <img src={Hindi}/>,
    bigram: "IN",
 },
  {
    language: language_iso_639_1.ja,
    flag: <img src={Japanese}/>,
    bigram: "JA",
 },
  {
    language: language_iso_639_1.he,
    flag: <img src={Israeli}/>,
    bigram: "HE",
 },
  {
    language: language_iso_639_1.ar,
    flag: <img src={Arabic}/>,
    bigram: "AR",
 },
  {
    language: language_iso_639_1.hu,
    flag: <img src={Hungarian}/>,
    bigram: "HU",
 },
  {
    language: language_iso_639_1.pl,
    flag: <img src={Polish}/>,
    bigram: "PL",
 },
  {
    language: language_iso_639_1.ro,
    flag: <img src={Romanian}/>,
    bigram: "RO",
 },
  {
    language: language_iso_639_1.el,
    flag: <img src={Greek}/>,
    bigram: "EL",
 },
  {
    language: language_iso_639_1.hr,
    flag: <img src={Croatian}/>,
    bigram: "HR",
 },
  {
    language: language_iso_639_1.cs,
    flag: <img src={Czech}/>,
    bigram: "CS",
 },
  {
    language: language_iso_639_1.da,
    flag: <img src={Danish}/>,
    bigram: "DA",
 },
  {
    language: language_iso_639_1.et,
    flag: <img src={Estonian}/>,
    bigram: "ET",
 },
  {
    language: language_iso_639_1.fi,
    flag: <img src={Finnish}/>,
    bigram: "FI",
 },
  {
    language: language_iso_639_1.lv,
    flag: <img src={Latvian}/>,
    bigram: "LV",
 },
  {
    language: language_iso_639_1.lt,
    flag: <img src={Lithuanian}/>,
    bigram: "LT",
 },
  {
    language: language_iso_639_1.nl,
    flag: <img src={Dutch}/>,
    bigram: "NL",
 },
  {
    language: language_iso_639_1.no,
    flag: <img src={Norwegian}/>,
    bigram: "NO",
 },
  {
    language: language_iso_639_1.sr,
    flag: <img src={Serbian}/>,
    bigram: "SR",
 },
  {
    language: language_iso_639_1.sk,
    flag: <img src={Slovakian}/>,
    bigram: "SK",
 },
  {
    language: language_iso_639_1.sv,
    flag: <img src={Swedish}/>,
    bigram: "SV",
 },
  {
    language: language_iso_639_1.uk,
    flag: <img src={Ukrainian}/>,
    bigram: "UK",
 },
 {
    language: language_iso_639_1.mg,
    flag: <img src={Madagascar}/>,
    bigram: "MG",
 },
  {
    language: language_iso_639_1.gd,
    flag: <img src={Scotland}/>,
    bigram: "GD",
  },
  {
    language: language_iso_639_1.is,
    flag: <img src={Iceland}/>,
    bigram:"IS",
  },
  {
    language: language_iso_639_1.ga,
    flag: <img src={Ireland}/>,
    bigram: "GA",
  },
  {
    language: language_iso_639_1.bs,
    flag: <img src={Bosnia}/>,
    bigram: "BS",
  },
  {
    language: language_iso_639_1.sl,
    flag: <img src={Slovenia}/>,
    bigram:"SL",
  },

  //   {
  //     language: "",
  //     flag: <img src={Flag}/>,
  //  },
];