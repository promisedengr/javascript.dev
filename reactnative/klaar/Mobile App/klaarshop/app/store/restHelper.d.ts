import {
  ActionCreatorWithPayload,
  ActionCreatorWithPreparedPayload,
} from '@reduxjs/toolkit';

type RestActions = 'request' | 'success' | 'failure' | 'needUpdate';

export type RestActionTypes = {[K in RestActions]: string};
export type BaseFieldsType = {[key: string]: string};
export interface BaseErrorType {
  description: string;
  code?: number;
  fields?: BaseFieldsType;
}

export type RestStateType<D = any> = {
  error?: BaseErrorType;
  data?: D;
  fetching: boolean;
  needUpdate: boolean;
};

export type NodeRestStateType<T extends string, R> = {
  [K in T]: RestStateType;
} &
  R;

export type SimpleNode<R> = {
  [key: string]: RestStateType;
} & R;

export type CreateErrorPreparedAction = (
  data: BaseErrorType,
) => {
  payload: any;
  error: BaseErrorType;
};

export type RestActionsType = {
  request: ActionCreatorWithPayload<any, RestActionTypes['request']>;
  success: ActionCreatorWithPayload<any, RestActionTypes['success']>;
  needUpdate: ActionCreatorWithPayload<any, RestActionTypes['needUpdate']>;
  failure: ActionCreatorWithPreparedPayload<
    [BaseErrorType],
    any,
    RestActionTypes['failure'],
    BaseErrorType
  >;
};
