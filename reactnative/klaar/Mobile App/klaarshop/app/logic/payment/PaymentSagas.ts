import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import i18n from 'i18next';
import _ from 'lodash';
import { call, delay, put, select, takeLatest, take } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { showSuccess } from '~/logic/AlertService/AlertService';
import { PaymentActions } from '~/logic/payment/PaymentRedux';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { 
  LoginResponse
} from '~/types/api';
import { store } from './../../store/store';
import { paymentSelector } from './PaymentSelectors';



export function* PaymentSaga() {
  yield* [
    // takeLeading(UserActions.login.request.type, loginRequest)
  ];
}