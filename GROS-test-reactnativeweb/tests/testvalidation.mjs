// * 🇫🇷 Pour etre capable de lancer ces tests il faut renommer ../utils/validation.js en ../utils/validation.mjs
// * 🇬🇧 To be able to launch these tests it is necessary to rename ../utils/validation.js en ../utils/validation.mjs
import { validateUser } from "../utils/validation.js";

// * 🇫🇷 Tous les utilisateurs suivants sont des utilisateurs non valides - un utilisateur simulé est généré pour le remplacer
// * 🇬🇧 All the following are invalid users - a simulated one is generated to replace it
let test1 = validateUser();
let test2 = validateUser({});
let test3 = validateUser({ role: "error" });
let test4 = validateUser({ role: { name: "error" } });
// * 🇫🇷 Tous les utilisateurs suivants sont des utilisateurs valides - ils sont conservés tels quels
// * 🇬🇧 All the following are valid users - they are kept like they are
let test5 = validateUser(test1);
let test6 = validateUser({
  role: { name: ["user without confirmation", "good1", "good2", "good3"] },
});
