const { body } = require("express-validator");

const activityValidator = [
  body("howToFind").isString(),
  body("description").isString(),
  body("topic").isNumeric(),
  body("ageRestriction").isBoolean(),
  body("activityImage").isString(),
  body("title").isString(),
  body("startTime").isString(),
  body("attendeeLimit").isNumeric(),
  body("address").isString(),
  body("date").isDate({ format: "DD/MM/YYYY" }),
  body("price").isNumeric().optional().default(0),
  body("nbFriends").isNumeric().optional().default(0),
  body("howManyGuests").isNumeric().optional().default(0),
  body("parity").isBoolean().optional().default(false),
  body("isOnline").isBoolean().optional().default(false),
  body("hasPrice").isBoolean().optional().default(false),
  body("friendsOnly").isBoolean().optional().default(false),
  body("allowGuests").isBoolean().optional().default(false),
  body("repeatEvent").isBoolean().optional().default(false),
  body("selectPeople").isBoolean().optional().default(false),
  body("ageRestriction").isBoolean().optional().default(false),
  body("hasReminderName").isBoolean().optional().default(false),
  body("allowCoOrganiser").isBoolean().optional().default(false),
  body("helpForOrganizers").isBoolean().optional().default(false),
  body("isAttendeeLimited").isBoolean().optional().default(false),
  body("requestCoOrganizers").isBoolean().optional().default(false),
  body("allowPhoneNumberDisplay").isBoolean().optional().default(false),
  body("author").isString().optional().default(null),
  body("infoLine").isString().optional().default(null),
  body("location").isObject().optional().default(null),
  body("otherLink").isString().optional().default(null),
  body("ticketLink").isString().optional().default(null),
  body("fbPageLink").isString().optional().default(null),
  body("meetupLink").isString().optional().default(null),
  body("telegramLink").isString().optional().default(null),
  body("parityValues").isObject().optional().default(null),
  body("reminderName").isString().optional().default(null),
  body("whatsappLink").isString().optional().default(null),
  body("fbGroupLink").isString().optional().default(null),
  body("coOrganizerGift").isString().optional().default(null),
  body("repeatEventFrequency").isString().optional().default(null),
  body("ages").isArray().optional().default([]),
  body("attendees").isArray().optional().default([]),
  body("waitingList").isArray().optional().default([]),
  body("repeatEventDays").isArray().optional().default([]),
  body("coOrganizerOffers").isArray().optional().default([]),
  body("coOrganizerRequests").isArray().optional().default([]),
];

module.exports = activityValidator;