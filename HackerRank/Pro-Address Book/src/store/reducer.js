import { combineReducers } from "redux";

import { reducer as addressBook } from "../AddressBook";

export default combineReducers({
  addressBook,
});
