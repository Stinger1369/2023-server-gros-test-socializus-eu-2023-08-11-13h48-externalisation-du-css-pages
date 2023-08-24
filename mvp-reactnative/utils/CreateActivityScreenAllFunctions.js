



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

  export const manageFrequencyDays = (day, repeatEventDays, setRepeatEventDays, setDayInArray) => {
    if (!repeatEventDays.includes(day)) {
      setDayInArray(true);
      setRepeatEventDays((previousArray) => {
        return [...previousArray, day];
      });
    } else {
      setDayInArray(false);
      setRepeatEventDays((previousArray) => {
        return previousArray.filter((item, index) => {
          return item !== day;
        });
      });
    }
};