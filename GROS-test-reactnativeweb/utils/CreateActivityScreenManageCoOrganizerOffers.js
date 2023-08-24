//🇫🇷 Fonction de gestion des offres des co-organisateurs
//🇬🇧 Function for managing co-organizer offers

export const manageCoOrganizerOffers = (offer, setOptionInArray, setCoOrganizerOffers, coOrganizerOffers) => {
    if (!coOrganizerOffers.includes(offer)) {
      setOptionInArray(true);
      setCoOrganizerOffers((previousArray) => {
        return [...previousArray, offer];
      });
    } else {
      setOptionInArray(false);
      setCoOrganizerOffers((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== offer;
        });
      });
    }
  };
