import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { call, delay, put, select } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { userSelector } from '~/logic/user/UserSelectors';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { ClientInfoResponse } from '~/types/api';
import { CategoriesListResponse, CategoriesReducerActions } from './CategoriesRedux';


function* postSubCategoriesRequest(action: Action) {
    const state = yield select(userSelector);
    let token = state.userToken;
    //let id = state.userId

    if (CategoriesReducerActions.addSubCategory.request.match(action)) {
        try {
            const error = {};

            if (!_.isEmpty(error)) {
                yield delay(200);
                throw new RequestError(error as BaseErrorType);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const getClientDataResponse: ApiResponse<any> = yield call(
                api.postSubCategories,
                token,
                action.payload
            )

            if (getClientDataResponse.data) {

            }

        } catch (error) {
            yield put(CategoriesReducerActions.addSubCategory.failure(extractError(error)));
        }
    }
}


function* postCreateCategoriesRequest(action: Action) {
    const state = yield select(userSelector);
    let token = state.userToken;
    //let id = state.userId

    if (CategoriesReducerActions.createCategory.request.match(action)) {
        try {
            const error = {};

            if (!_.isEmpty(error)) {
                yield delay(200);
                throw new RequestError(error as BaseErrorType);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const getClientDataResponse: ApiResponse<any> = yield call(
                api.postCreateCategory,
                token,
                action.payload
            );

            if (getClientDataResponse.data) {

            }

        } catch (error) {
            yield put(CategoriesReducerActions.createCategory.failure(extractError(error)));
        }
    }
}

function* getByIdCategoryRequest(action: Action) {
    const state = yield select(userSelector);
    let token = state.userToken;
    //let id = state.userId

    if (CategoriesReducerActions.getById.request.match(action)) {
        try {
            const error = {};

            if (!_.isEmpty(error)) {
                yield delay(200);
                throw new RequestError(error as BaseErrorType);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const getByidResponseData: ApiResponse<any> = yield call(
                api.getByIdCategory,
                token,
                action.payload
            );

            if (getByidResponseData.data) {
                yield put(CategoriesReducerActions.getById.success(getByidResponseData.data));
            }

        } catch (error) {
            yield put(CategoriesReducerActions.getById.failure(extractError(error)));
        }
    }
}


function* getCategoriesListRequest(action: Action) {
    const state = yield select(userSelector);
    let token = state.userToken;
    //let id = state.userId

    if (CategoriesReducerActions.getCategoriesList.request.match(action)) {
        try {
            const error = {};

            if (!_.isEmpty(error)) {
                yield delay(200);
                throw new RequestError(error as BaseErrorType);
            }

            const getByidResponseData: ApiResponse<CategoriesListResponse> = yield call(
                api.getCategoriesList,
                token,
                action.payload
            );

            if (getByidResponseData.data) {
                yield put(CategoriesReducerActions.getCategoriesList.success(getByidResponseData.data));
            }

        } catch (error) {
            yield put(CategoriesReducerActions.getCategoriesList.failure(extractError(error)));
        }
    }
}

export function* CategoriesSaga() {
    yield* [
        takeLeading(CategoriesReducerActions.addSubCategory.request.type, postSubCategoriesRequest),
        takeLeading(CategoriesReducerActions.createCategory.request.type, postCreateCategoriesRequest),
        takeLeading(CategoriesReducerActions.getById.request.type, getByIdCategoryRequest),
        takeLeading(CategoriesReducerActions.getCategoriesList.request.type, getCategoriesListRequest),
    ];
}