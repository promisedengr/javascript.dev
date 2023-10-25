import { restActionCreatorHelper } from "~/store/restHelper";



const categoriesRestHelper = restActionCreatorHelper(`categories`)

export const AddSubCategoryRestActions = categoriesRestHelper(`addSubcategory`)
export const CreateCategoryRestActions = categoriesRestHelper(`createCategory`)
export const GetByIdCategoryRestActions = categoriesRestHelper(`getById`)
export const GetCategoriesListRestActions = categoriesRestHelper(`getCategoriesList`)

