/*
 * utils/validation.js
 */

export const validateUser = (user) => {
  let valid = false;
  let isArray = false;
  let incompleteUser;
  if (user) {
    incompleteUser = { ...user };
    if (user?.role) {
      if (user.role?.name) {
        isArray = Array.isArray(user.role?.name);
        valid = isArray;
      }
    }
  } else {
    valid = false;
    incompleteUser = {};
  }
  if (!valid) {
    if (!isArray) {
      let incompleteRole = {
        name: ["user without confirmation"],
      };
      incompleteUser["role"] = incompleteRole;
    }
  }
  return incompleteUser;
};
