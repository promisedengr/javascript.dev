import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import {
    addRestReducers, createRestActions,

    getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { AddSubCategoryRestActions, CreateCategoryRestActions, GetByIdCategoryRestActions, GetCategoriesListRestActions } from './CategoriesActions';

export type SubCategoryPayload = {
    categotyId: string
    subcategory: string
};

export type CreateCategoryPayload = {
    name: string
    sucategories: string[]
    requiredColors?: boolean
}

export type GetByIdPayload = {
    categoryId: string
}

export type CategoryT = {
    subcategories: string[],
    _id: string,
    name: string,
    requiredFields: {
        colors: boolean,
        sizes: boolean
    }

}

export type CategoriesListResponse = {
    categories: CategoryT[]
}


export type CategoriesListPayload = {
    index: string
}


const addSubCategoryRestActions = createRestActions<
    typeof AddSubCategoryRestActions,
    void,
    SubCategoryPayload
>(AddSubCategoryRestActions);


const createCategoryRestActions = createRestActions<
    typeof CreateCategoryRestActions,
    void,
    CreateCategoryPayload
>(CreateCategoryRestActions);

const getByIdCategoryRestActions = createRestActions<
    typeof GetByIdCategoryRestActions,
    CategoryT,
    GetByIdPayload
>(GetByIdCategoryRestActions);

const getCategoriesListRestActions = createRestActions<
    typeof GetCategoriesListRestActions,
    CategoriesListResponse,
    CategoriesListPayload
>(GetCategoriesListRestActions);




const CategoriesReducerActions = {
    addSubCategory: addSubCategoryRestActions,
    createCategory: createCategoryRestActions,
    getById: getByIdCategoryRestActions,
    getCategoriesList: getCategoriesListRestActions
};

// type ClientStep = 'get_data' | 'otp';
// type ClientRestNodes = ClientStep ;
// type ClientStore = {
//     step: ClientStep,    
// };

// type ClientState = NodeRestStateType<ClientRestNodes, ClientStore>;

const initialState = {
    subCategory: getDefaultRestState(),
    createCategory: getDefaultRestState(),
    getById: getDefaultRestState<CategoryT>(),
    getCategoriesList: getDefaultRestState<CategoriesListResponse>()
};

type Builder = ActionReducerMapBuilder<typeof initialState>;

const categoriesReducer = createReducer(initialState, builder =>
(fp.flow([
    addRestReducers(addSubCategoryRestActions, 'addSubCategory'),
    addRestReducers(createCategoryRestActions, 'createCategory'),
    addRestReducers(getByIdCategoryRestActions, 'getById'),
    addRestReducers(getCategoriesListRestActions, 'getCategoriesList'),
])(builder) as Builder)

);

export { categoriesReducer, CategoriesReducerActions };
