// ENG - Here is the array that fills the lists of flags. Fell free to commentarize flags if they're unnecessary or add some (the pattern is at the end of the array).  - ENG
// FR - Voilà le tableau qui remplit les listes de drapeaux. n'hésitez pas à commentariser les drapeaux non nécessaires ou en ajouter (le patron est à la fin du tableau) - FR

import France from "./flags-svg/france.svg";
import English from "./flags-svg/united-kingdom.svg";
import Spanish from "./flags-svg/spain.svg";
import Portuguese from "./flags-svg/portugal.svg";
import German from "./flags-svg/germany.svg";
import Italian from "./flags-svg/italy.svg";
import Russian from "./flags-svg/russia.svg";
import Chinese from "./flags-svg/china.svg";
import Bulgarian from "./flags-svg/bulgaria.svg";
import Hindi from "./flags-svg/india.svg";
import Japanese from "./flags-svg/japan.svg";
import Israeli from "./flags-svg/israel.svg";
import Arabic from "./flags-svg/arab-league-flag.svg";
import Hungarian from "./flags-svg/hungary.svg";
import Polish from "./flags-svg/poland.svg";
import Romanian from "./flags-svg/romania.svg";
import Greek from "./flags-svg/greece.svg";
import Croatian from "./flags-svg/croatia.svg";
import Czech from "./flags-svg/czech-republic.svg";
import Danish from "./flags-svg/denmark.svg";
import Estonian from "./flags-svg/estonia.svg";
import Finnish from "./flags-svg/finland.svg";
import Latvian from "./flags-svg/latvia.svg";
import Lithuanian from "./flags-svg/lithuania.svg";
import Dutch from "./flags-svg/netherlands.svg";
import Norwegian from "./flags-svg/norway.svg";
import Serbian from "./flags-svg/serbia.svg";
import Slovakian from "./flags-svg/slovakia.svg";
import Swedish from "./flags-svg/sweden.svg";
import Ukrainian from "./flags-svg/ukraine.svg";
import Madagascar from "./flags-svg/madagascar.svg";
import Scotland from "./flags-svg/scotland.svg";
import Iceland from "./flags-svg/iceland.svg";
import Ireland from "./flags-svg/ireland.svg";
import Bosnia from "./flags-svg/bosnia-and-herzegovina.svg";
import Slovenia from "./flags-svg/slovenia.svg";

//import { x } from "../../App";

import Json from "./json/en.json";

// console.log(x);

const { language_iso_639_1 } = Json;

export const countriesListRectFlags = [
  // {
  //   language: language_iso_639_1.d2022_choose,
  // },
  {
    language: language_iso_639_1.fr,
    flag: <img src={France} width={36} height={36} />,
    bigram: "FR",
  },
  {
    language: language_iso_639_1.en,
    flag: <img src={English} width={36} height={36} />,
    bigram: "EN",
  },
  {
    language: language_iso_639_1.es,
    flag: <img src={Spanish} width={36} height={36} />,
    bigram: "ES",
  },
  {
    language: language_iso_639_1.pt,
    flag: <img src={Portuguese} width={36} height={36} />,
    bigram: "PT",
  },
  {
    language: language_iso_639_1.de,
    flag: <img src={German} width={36} height={36} />,
    bigram: "DE",
  },
  {
    language: language_iso_639_1.it,
    flag: <img src={Italian} width={36} height={36} />,
    bigram: "IT",
  },
  {
    language: language_iso_639_1.ru,
    flag: <img src={Russian} width={36} height={36} />,
    bigram: "RU",
  },
  {
    language: language_iso_639_1.zh,
    flag: <img src={Chinese} width={36} height={36} />,
    bigram: "ZH",
  },
  {
    language: language_iso_639_1.bg,
    flag: <img src={Bulgarian} width={36} height={36} />,
    bigram: "BG",
  },
  {
    language: language_iso_639_1.hi,
    flag: <img src={Hindi} width={36} height={36} />,
    bigram: "HI",
  },
  {
    language: language_iso_639_1.ja,
    flag: <img src={Japanese} width={36} height={36} />,
    bigram: "JA",
  },
  {
    language: language_iso_639_1.he,
    flag: <img src={Israeli} width={36} height={36} />,
    bigram: "HE",
  },
  {
    language: language_iso_639_1.ar,
    flag: <img src={Arabic} width={36} height={36} />,
    bigram: "AR",
  },
  {
    language: language_iso_639_1.hu,
    flag: <img src={Hungarian} width={36} height={36} />,
    bigram: "HU",
  },
  {
    language: language_iso_639_1.pl,
    flag: <img src={Polish} width={36} height={36} />,
    bigram: "PL",
  },
  {
    language: language_iso_639_1.ro,
    flag: <img src={Romanian} width={36} height={36} />,
    bigram: "RO",
  },
  {
    language: language_iso_639_1.el,
    flag: <img src={Greek} width={36} height={36} />,
    bigram: "EL",
  },
  {
    language: language_iso_639_1.hr,
    flag: <img src={Croatian} width={36} height={36} />,
    bigram: "HR",
  },
  {
    language: language_iso_639_1.cs,
    flag: <img src={Czech} width={36} height={36} />,
    bigram: "CS",
  },
  {
    language: language_iso_639_1.da,
    flag: <img src={Danish} width={36} height={36} />,
    bigram: "DA",
  },
  {
    language: language_iso_639_1.et,
    flag: <img src={Estonian} width={36} height={36} />,
    bigram: "ET",
  },
  {
    language: language_iso_639_1.fi,
    flag: <img src={Finnish} width={36} height={36} />,
    bigram: "FI",
  },
  {
    language: language_iso_639_1.lv,
    flag: <img src={Latvian} width={36} height={36} />,
    bigram: "LV",
  },
  {
    language: language_iso_639_1.lt,
    flag: <img src={Lithuanian} width={36} height={36} />,
    bigram: "LT",
  },
  {
    language: language_iso_639_1.nl,
    flag: <img src={Dutch} width={36} height={36} />,
    bigram: "NL",
  },
  {
    language: language_iso_639_1.no,
    flag: <img src={Norwegian} width={36} height={36} />,
    bigram: "NO",
  },
  {
    language: language_iso_639_1.sr,
    flag: <img src={Serbian} width={36} height={36} />,
    bigram: "SR",
  },
  {
    language: language_iso_639_1.sk,
    flag: <img src={Slovakian} width={36} height={36} />,
    bigram: "SK",
  },
  {
    language: language_iso_639_1.sv,
    flag: <img src={Swedish} width={36} height={36} />,
    bigram: "SV",
  },
  {
    language: language_iso_639_1.uk,
    flag: <img src={Ukrainian} width={36} height={36} />,
    bigram: "UK",
  },
  {
    language: language_iso_639_1.mg,
    flag: <img src={Madagascar} width={36} height={36} />,
    bigram: "MG",
  },
  {
    language: language_iso_639_1.gd,
    flag: <img src={Scotland} width={36} height={36} />,
    bigram: "GD",
  },
  {
    language: language_iso_639_1.is,
    flag: <img src={Iceland} width={36} height={36} />,
    bigram: "IS",
  },
  {
    language: language_iso_639_1.ga,
    flag: <img src={Ireland} width={36} height={36} />,
    bigram: "GA",
  },
  {
    language: language_iso_639_1.bs,
    flag: <img src={Bosnia} width={36} height={36} />,
    bigram: "BS",
  },
  {
    language: language_iso_639_1.sl,
    flag: <img src={Slovenia} width={36} height={36} />,
    bigram: "SL",
  },
];
