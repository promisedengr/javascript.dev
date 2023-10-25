import { useTranslation } from 'react-i18next';
import * as React from 'react';

export const previousStep = (currentStep) => {
  let prevStep = null;
  switch (currentStep) {
    case 'login':
      break;
    case 'register':
      prevStep = 'login';
      break;
    case 'forgotPassword':
      prevStep = 'login';
      break;
    case 'passwordRecovery':
      prevStep = 'forgotPassword';
      break;
    case 'otp':
      break;
    default:
      break;
  }
  return prevStep;
}

export const currentHeaderTitle = (currentStep) => {
  const { t } = useTranslation();
  let name = '';
  switch (currentStep) {
    case 'login':
      name = t('signIn');
      break;
    case 'register':
      name = t('register');
      break;
    case 'forgotPassword':
      name = t('recoverPassword');
      break;
    case 'passwordRecovery':
      name = t('newPassword');
      break;
    case 'otp':
      name = t('verificationCode');
      break;
    default:
      break;
  }
  return name;
}