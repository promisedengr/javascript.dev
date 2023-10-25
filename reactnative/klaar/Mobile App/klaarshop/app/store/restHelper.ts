import {ActionReducerMapBuilder, createAction} from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  BaseErrorType,
  CreateErrorPreparedAction,
  RestActionsType,
  RestActionTypes,
  RestStateType,
} from './restHelper.d';

function createRestActions<
  T extends RestActionTypes,
  SuccessPayload = void,
  RequestPayload = void,
  NeedUpdatePayload = void
>(actions: T) {
  return {
    request: createAction<RequestPayload, T['request']>(actions.request),
    success: createAction<SuccessPayload, T['success']>(actions.success),
    needUpdate: createAction<NeedUpdatePayload, T['needUpdate']>(
      actions.needUpdate,
    ),
    failure: createAction<CreateErrorPreparedAction, T['failure']>(
      actions.failure,
      (data: BaseErrorType) => {
        return {
          payload: undefined,
          error: data,
        };
      },
    ),
  };
}

function createRestReducers(
  builder: ActionReducerMapBuilder<RestStateType>,
  restActions: RestActionsType,
): ActionReducerMapBuilder<RestStateType> {
  return builder
    .addCase(restActions.request, state => {
      state.fetching = true;
      state.error = undefined;
      state.needUpdate = false;
    })
    .addCase(restActions.success, (state, action) => {
      state.fetching = false;
      state.data = action.payload;
    })
    .addCase(restActions.failure, (state, action) => {
      state.fetching = false;
      state.error = action.error;
    })
    .addCase(restActions.needUpdate, state => {
      state.needUpdate = true;
    });
}

function getLens(path?: string, payloadId?: string) {
  function payloadLens(state: any, payload: any): RestStateType {
    if (path || (payloadId && _.hasIn(payload, `payload.${payloadId}`))) {
      const node = path ? _.get(state, path) : state;
      if (payloadId) {
        const currentNodeId = _.get(payload, `payload.${payloadId}`);
        if (!node[currentNodeId]) {
          node[currentNodeId] = getDefaultRestState();
        }
        return node[currentNodeId];
      }
      return node;
    }
    return state;
  }

  return function updater<A, S>(
    updateFunc: (state: RestStateType, action: A) => void,
  ) {
    return (state: S, action: A) => {
      updateFunc(payloadLens(state, action), action);
    };
  };
}

function createNodeRestReducers(
  builder: ActionReducerMapBuilder<any>,
  restActions: RestActionsType,
  path?: string,
  payloadId?: string,
): ActionReducerMapBuilder<any> {
  const lens = getLens(path, payloadId);

  return builder
    .addCase(
      restActions.request,
      lens(state => {
        state.fetching = true;
        state.error = undefined;
        state.needUpdate = false;
      }),
    )
    .addCase(
      restActions.success,
      lens((state, action) => {
        state.fetching = false;
        state.data = action.payload;
      }),
    )
    .addCase(
      restActions.failure,
      lens((state, action) => {
        state.fetching = false;
        state.error = action.error;
      }),
    )
    .addCase(
      restActions.needUpdate,
      lens(state => {
        state.needUpdate = true;
      }),
    );
}

function addRestReducers(
  actions: RestActionsType,
  path: string,
  payloadId?: string,
) {
  return (builder: ActionReducerMapBuilder<any>) =>
    createNodeRestReducers(builder, actions, path, payloadId);
}

function getDefaultRestState<D>(): RestStateType<D> {
  return {
    data: undefined,
    fetching: false,
    error: undefined,
    needUpdate: true,
  };
}

function needUpdateSelector(state: any, path: string, id?: string): boolean {
  const nodePath = id ? `${path}.${id}` : path;
  const node = _.get(state, nodePath) as RestStateType;

  if (node) {
    return node.needUpdate || (node.data === undefined && !node.fetching);
  }
  return true;
}

export function restActionCreatorHelper<T extends string>(reducer: T) {
    return function<D extends string> (restAction: D) {

        type TandD = `${T}/${D}`
        type RestActionTypes = {
            request: `${TandD}_request`,
            success:`${TandD}_success` ,
            failure: `${TandD}}_failure`,
            needUpdate: `${TandD}_needUpdate`,
        }
        const reducerAndAction = `${reducer}/${restAction}`
        return {
            request: `${reducerAndAction}_request`,
            success: `${reducerAndAction}_success`,
            failure: `${reducerAndAction}_failure`,
            needUpdate: `${reducerAndAction}_needUpdate`,
        } as RestActionTypes
    }
}

export const dateFormater = (type: `HH-MM` | `DD-MM`) =>  (date: number) => new Date(date * 1000).toISOString().slice(type === 'HH-MM' ? 11 : 0,  type === 'HH-MM' ? 16 : 10)
export const dateDayMonthYear = (timeStamp: number) => new Date(timeStamp).toDateString().split(` `)

export {
  createRestActions,
  addRestReducers,
  createRestReducers,
  createNodeRestReducers,
  getDefaultRestState,
  needUpdateSelector,
};
