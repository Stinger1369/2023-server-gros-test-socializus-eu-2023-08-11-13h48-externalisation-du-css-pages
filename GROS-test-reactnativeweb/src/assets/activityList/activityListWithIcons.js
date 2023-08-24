import AfterworkOn from "./afterwork.svg";
import AfterworkOff from "./afterwork-off.svg";
import AperoOn from "./apero.svg";
import AperoOff from "./apero-off.svg";
import BusinessOn from "./business.svg";
import BusinessOff from "./business-off.svg";
import CultureOn from "./culture.svg";
import CultureOff from "./culture-off.svg";
import DancingOn from "./dancing.svg";
import DancingOff from "./dancing-off.svg";
import GamesOn from "./games.svg";
import GamesOff from "./games-off.svg";
import LinguisticOn from "./linguistic.svg";
import LinguisticOff from "./linguistic-off.svg";
import MealOn from "./meal.svg";
import MealOff from "./meal-off.svg";
import MovieOn from "./movie.svg";
import MovieOff from "./movie-off.svg";
import MusicOn from "./music.svg";
import MusicOff from "./music-off.svg";
import MutualHelpOn from "./mutual-help.svg";
import MutualHelpOff from "./mutual-help-off.svg";
import PartyOn from "./party.svg";
import PartyOff from "./party-off.svg";
import PicnicOn from "./picnic.svg";
import PicnicOff from "./picnic-off.svg";
import PrivatePartyOn from "./private.svg";
import PrivatePartyOff from "./private-off.svg";
import SportOn from "./sports.svg";
import SportOff from "./sports-off.svg";
import TravelOn from "./travel.svg";
import TravelOff from "./travel-off.svg";
import Json from "../json/en.json";

const { activities } = Json;

  export const activitiesList = [
    {
      id: 1,
      activityTypeIcon_On: <img src={AfterworkOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={AfterworkOff} width={50} height={50} />,
      activityTypeTitle: activities.afterwork,
    },
    {
      id: 2,
      activityTypeIcon_On: <img src={AperoOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={AperoOff} width={50} height={50} />,
      activityTypeTitle: activities.apero,
    },
    {
      id: 3,
      activityTypeIcon_On: <img src={BusinessOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={BusinessOff} width={50} height={50} />,
      activityTypeTitle: activities.business,
    },
    {
      id: 4,
      activityTypeIcon_On: <img src={CultureOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={CultureOff} width={50} height={50} />,
      activityTypeTitle: activities.culture,
    },
    {
      id: 5,
      activityTypeIcon_On: <img src={DancingOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={DancingOff} width={50} height={50} />,
      activityTypeTitle: activities.dancing,
    },
    {
      id: 6,
      activityTypeIcon_On: <img src={GamesOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={GamesOff} width={50} height={50} />,
      activityTypeTitle:activities.games,
    },
    {
      id: 7,
      activityTypeIcon_On: <img src={LinguisticOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={LinguisticOff} width={50} height={50} />,
      activityTypeTitle: activities.linguistic,
    },
    {
      id: 8,
      activityTypeIcon_On: <img src={MealOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={MealOff} width={50} height={50} />,
      activityTypeTitle: activities.meal,
    },
    {
      id: 9,
      activityTypeIcon_On: <img src={MovieOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={MovieOff} width={50} height={50} />,
      activityTypeTitle: activities.movies,
    },
    {
      id: 10,
      activityTypeIcon_On: <img src={MusicOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={MusicOff} width={50} height={50} />,
      activityTypeTitle: activities.music,
    },
    {
      id: 11,
      activityTypeIcon_On: <img src={MutualHelpOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={MutualHelpOff} width={50} height={50} />,
      activityTypeTitle: activities.mutualHelp,
    },
    {
      id: 12,
      activityTypeIcon_On: <img src={PartyOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={PartyOff} width={50} height={50} />,
      activityTypeTitle: activities.party,
    },
    {
      id: 13,
      activityTypeIcon_On: <img src={PicnicOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={PicnicOff} width={50} height={50} />,
      activityTypeTitle: activities.picnic,
    },
    {
      id: 14,
      activityTypeIcon_On: <img src={PrivatePartyOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={PrivatePartyOff} width={50} height={50} />,
      activityTypeTitle: activities.privateParty,
    },
    {
      id: 15,
      activityTypeIcon_On: <img src={SportOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={SportOff} width={50} height={50} />,
      activityTypeTitle: activities.sport,
    },
    {
      id: 16,
      activityTypeIcon_On: <img src={TravelOn} width={50} height={50} />,
      activityTypeIcon_Off: <img src={TravelOff} width={50} height={50} />,
      activityTypeTitle: activities.travel,
    },
  ];