import { ApiResponse } from 'apisauce';
import { BaseErrorType, BaseFieldsType } from '~/store/restHelper.d';

class RequestError extends Error {
  description: string;
  code?: number;
  fields?: BaseFieldsType;

  constructor({
    description,
    code,
    fields,
  }: {
    description: string;
    code?: number;
    fields?: BaseFieldsType;
  }) {
    super(description);
    this.description = description;
    this.code = code;
    this.fields = fields;
  }
}

function extractError(
  e: any,
  defaultErrorDescription = 'Ошибка',
): BaseErrorType {
  return {
    description: e.description || e.message || defaultErrorDescription,
    code: e.code || -3,
    fields: e.fields,
  };
}

function errorResponseTransform(response: ApiResponse<any>): void {
  // if (_.get(response, 'data.error') !== 0) {
  //   if (!response.data) {
  //     response.data = {};
  //   }
  //   throw new RequestError({
  //     description: response.data.errorDescription,
  //     code: _.get(response.data, 'error', -2),
  //   });
  // }
}

export { RequestError, errorResponseTransform, extractError };

