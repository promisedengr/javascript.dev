import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";

export const updateSearchPhrase = newPhrase =>
  (dispatch, getState, { httpApi, debounce }) => {
    dispatch(
      searchActions.updateSearchPhraseStart({ newPhrase }),
    );

    const debounced = debounce(httpApi.getFirst5MatchingContacts, 300);

    debounced({ namePart: newPhrase })
      .then(({ data }) => {
        const matchingContacts = data.map(contact => ({
          id: contact.id,
          value: contact.name,
        }));
        // TODO something is wrong here
        dispatch(
          searchActions.updateSearchPhraseSuccess({ matchingContacts }),
        );
      })
      .catch(() => {
        // TODO something is missing here
        dispatch(
          searchActions.updateSearchPhraseFailure(),
        );
      });
  };

export const selectMatchingContact = selectedMatchingContact =>
  (dispatch, getState, { httpApi, dataCache }) => {

    // TODO something is missing here
    const cachedContact = dataCache.load({ key: selectedMatchingContact.id });

    if (cachedContact) {
      return dispatch(
        contactDetailsActions.fetchContactDetailsSuccess({ contactDetails: cachedContact }),
      );
    }

    const getContactDetails = ({ id }) => {
      return httpApi
          .getContact({ contactId: selectedMatchingContact.id })
          .then(({ data }) => ({
            id: data.id,
            name: data.name,
            phone: data.phone,
            addressLines: data.addressLines,
          }));
    };

    dispatch(
      searchActions.selectMatchingContact({ selectedMatchingContact }),
    );

    dispatch(
      contactDetailsActions.fetchContactDetailsStart(),
    );

    getContactDetails({ id: selectedMatchingContact.id })
      .then((contactDetails) => {
        // TODO something is missing here
        dataCache.store({
          key: contactDetails.id,
          value: contactDetails,
        });
        // TODO something is wrong here
        dispatch(
          contactDetailsActions.fetchContactDetailsSuccess({ contactDetails }),
        );
      })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure(),
        );
      });
  };
