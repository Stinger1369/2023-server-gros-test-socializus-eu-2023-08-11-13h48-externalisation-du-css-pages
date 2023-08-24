//🇫🇷 Fonction de gestion des demandes des co-organisateurs
  //🇬🇧 Function for managing co-organizer requests

export const manageCoOrganizerRequests = (request, coOrganizerRequests, setCoOrganizerRequests, setOptionInArray) => {
    if (!coOrganizerRequests.includes(request)) {
      setOptionInArray(true);
      setCoOrganizerRequests((previousArray) => {
        return [...previousArray, request];
      });
    } else {
      setOptionInArray(false);
      setCoOrganizerRequests((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== request;
        });
      });
    }
};
