

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