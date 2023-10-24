import { combineReducers } from "redux";

import { reducer as searchReducer } from "./SearchContacts";
import { reducer as contactsReducer } from "./ContactDetails";

// TODO something is wrong here
export default combineReducers({
  search: searchReducer,
  contacts: contactsReducer,
});
