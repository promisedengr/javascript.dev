

export const validateName = (name) => /^[A-Z][A-Za-z0-9_-]{2,20}$/.test(name)


export const validatePhone = (phone) => /^\+\d{2,3}\d{2}\d{7}$/.test(phone)
// phone = '+' + phone.replace(/[^0-9]/g, '');



export const validatePassword = (password) => password.length > 6
// if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password) === false) {
//    return false;
// } else {
//    return true;
// }


export const validatePasswordOtpCode = (code) => {
   if (/^[a-zA-Z0-9]{8}$/.test(code) === false) {
      return false;
   } else {
      return true;
   }
}

export const validateEmail = (email) => {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
      return false;
   } else {
      return true;
   }
}