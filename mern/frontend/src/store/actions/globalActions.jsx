import config from 'config';
import useFetch from 'hooks/useFetch';
import { assetService } from 'services/blockchain/assetService';
import { sugarHeadService } from 'services/blockchain/sugarHeadService';

import { actionTypes } from './types';

const setCurrentPhase = () => {
  return async (dispatch) => {
    const currentPhase = parseInt(await sugarHeadService.getCurrentPhase());
    dispatch({
      type: actionTypes.setCurrentPhase,
      currentPhase,
    });
  };
};

const setPrice = () => {
  return async (dispatch) => {
    const price = parseInt(await sugarHeadService.getPrice());
    dispatch({
      type: actionTypes.setPrice,
      price,
    });
  };
};

const setCurrentTokenId = () => {
  return async (dispatch) => {
    const currentTokenId = parseInt(await sugarHeadService.getCurrentTokenId());
    dispatch({
      type: actionTypes.setCurrentTokenId,
      currentTokenId,
    });
  };
};
``;
const setUsedTokenIdsOf = (address) => {
  return async (dispatch) => {
    const usedTokenIdsOf = await assetService.getUsedTokenIdsOf(address);
    console.log('uninininoninonion', usedTokenIdsOf);
    dispatch({
      type: actionTypes.setUsedTokenIdsOf,
      usedTokenIdsOf,
    });
  };
};

const setTokenIds = (from) => {
  return async (dispatch) => {
    const tokenIds = await sugarHeadService.getTokenIdsOf(from);
    console.log('token', tokenIds);
    dispatch({
      type: actionTypes.setTokenIds,
      tokenIds,
    });
  };
};

const setCoins = () => {
  console.log('here111111111111111');
  return async (dispatch) => {
    console.log('here');
    const { data } = useFetch(`${config.apiBaseURL}coins`);
    console.log('token', data);
    dispatch({
      type: actionTypes.setCoins,
      data,
    });
  };
};

const setClaimable = () => {
  return {
    type: actionTypes.setClaimable,
  };
};

export {
  setClaimable,
  setCoins,
  setCurrentPhase,
  setCurrentTokenId,
  setPrice,
  setTokenIds,
  setUsedTokenIdsOf,
};
