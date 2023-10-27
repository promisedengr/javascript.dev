import { actionTypes } from '../actions/types';

const initialState = {
  currentPhase: 1,
  price: 0,
  currentTokenId: 0,
  tokenIds: [],
  claimable: false,
  coins: [],
  usedTokenIdsOf: [],
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setCurrentPhase:
      return {
        ...state,
        currentPhase: action.currentPhase,
      };

    case actionTypes.setPrice:
      return {
        ...state,
        price: action.price,
      };

    case actionTypes.setCurrentTokenId:
      return {
        ...state,
        currentTokenId: action.currentTokenId,
      };

    case actionTypes.setTokenIds:
      return {
        ...state,
        tokenIds: action.tokenIds,
      };

    case actionTypes.setClaimable:
      return {
        ...state,
        claimable: true,
      };

    case actionTypes.setUsedTokenIdsOf:
      return {
        ...state,
        usedTokenIdsOf: action.usedTokenIdsOf,
      };

    default:
      return state;
  }
};

export { globalReducer };
