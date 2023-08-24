// Import des langues a partir du dossier assets :
// ordre alphabetique des langues 
//FR import des listes de langues
//GB language list imports
import ar from "../../assets/json/ar.json";
import bg from "../../assets/json/bg.json";
import bs from "../../assets/json/bs.json";
import cs from "../../assets/json/cs.json";
import da from "../../assets/json/da.json";
import de from "../../assets/json/de.json";
import en from "../../assets/json/en.json";
import es from "../../assets/json/es.json";
import et from "../../assets/json/et.json";
import fi from "../../assets/json/fi.json";
import fr from "../../assets/json/fr.json";
import ga from "../../assets/json/ga.json";
import gd from "../../assets/json/gd.json";
import el from "../../assets/json/el.json";
import he from "../../assets/json/he.json";
import hi from "../../assets/json/hi.json";
import hr from "../../assets/json/hr.json";
import hu from "../../assets/json/hu.json";
import is from "../../assets/json/is.json";
import it from "../../assets/json/it.json";
import ja from "../../assets/json/ja.json";
import lt from "../../assets/json/lt.json";
import lv from "../../assets/json/lv.json";
import mg from "../../assets/json/mg.json";
import nl from "../../assets/json/nl.json";
import no from "../../assets/json/no.json";
import pl from "../../assets/json/pl.json";
import pt from "../../assets/json/pt.json";
import ro from "../../assets/json/ro.json";
import ru from "../../assets/json/ru.json";
import sk from "../../assets/json/sk.json";
import sl from "../../assets/json/sl.json";
import sr from "../../assets/json/sr.json";
import sv from "../../assets/json/sv.json";
import uk from "../../assets/json/uk.json";
import zh from "../../assets/json/zh.json";

import {
    langueEn, 
    langueFr,
    langueAr,
    langueBg,
    langueBs,
    langueCs,
    langueDa,
    langueDe,
    langueEs,
    langueEt,
    langueFi,
    langueGa,
    langueGd,
    langueGrk,
    langueHe,
    langueHi,
    langueHr,
    langueHu,
    langueIs,
    langueIt,
    langueJa,
    langueLt,
    langueLv,
    langueMg,
    langueNl,
    langueNo,
    languePl,
    languePt,
    langueRo,
    langueRu,
    langueSk,
    langueSl,
    langueSr,
    langueSv,
    langueUk,
    langueZh

} from "../../constantes";

//Creation d'une constante qui permet de switcher les langues 

export const getLangue = (state = en, action) =>{
    // Gestion de la langue par défaut en anglais
    //Premier switch en francais
    switch(action.type){
        case "English": 
            return (state = en);
        case "French": 
            return (state = fr);
        // Gestiion des autres langues :
        case "Arabic": 
            return (state = ar);
        case "Bulgarian": 
            return (state = bg);
        case  "Bosnia":
            return (state = bs);
        case "Czech":
            return (state = cs);
        case "Danish":
            return (state = da);
        case "German":
            return (state =de);
        case "Spanish":
            return (state =es);
        case "Estonian":
            return (state= et);
        case "Finnish":
            return (state = fi);
        case "Ireland":
            return (state = ga);
        case "Scotland":
            return (state = gd);
        case "Greek":
            return (state = el); // anciennement appelé grk / before called grk
        case "Israeli": //mod Hebrew
            return (state = he);
        case "Hindi":
            return (state = hi);
        case "Croatian":
            return (state = hr);
        case "Hungarian":
            return (state = hu);
        case "Iceland":
            return (state =is);
        case "Italian":
            return (state =it);
        case "Japanese":
            return (state =ja);
        case "Lithuanian":
            return (state =lt);
        case "Latvian":
            return (state =lv);
        case "Madagascar":
            return (state = mg);
        case "Dutch" :
            return (state = nl);
        case "Norwegian":
            return (state = no);
        case "Polish":
            return (state =pl);
        case "Portuguese" :
            return (state =pt);
        case "Romanian" :
            return (state =ro);
        case "Russian":
            return (state = ru);
        case "Slovakian":
            return (state = sk);
        case "Slovenia" :
            return (state =sl);
        case "Serbian" :
            return (state =sr);
        case "Swedish" :
            return (state =sv);
        case "Ukrainian" :
                return (state =uk);
        case "Chinese" :
            return (state = zh);
        default :
            return state;       
        
    }
}