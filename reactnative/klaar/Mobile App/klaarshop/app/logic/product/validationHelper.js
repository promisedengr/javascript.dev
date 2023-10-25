export const validateNameProduct = (name) => {
   if (/^[\=\-\s\!\.\(\)\?\,a-zA-Zа-яА-Я0-9]{3,64}$/.test(name) === false) {
      return false;
   } else {
      return true;
   }
};

export const validateDescriptionProduct = (text) => text.length > 0 && text.length < 1025



export const validateCategory = (category) => {
   if (category === 'Not selected') {

      return false;
   } else {
      return true;
   }

};


export const validateAdress = (adress) => {
   if (/^[\,\s\(\)\-\.a-zA-Zа-яА-Я0-9]{1,48}$/.test(adress) === false) {
      return false;
   } else {
      return true;
   }
};
export const validateCurrency = (currency) => {
   if (/^(rub|usd)$/.test(currency) === false) {
      return false;
   } else {
      return true;
   }
};
export const validatePrice = (price) => !!(price.length < 15 && (+price || +price === 0))



export const validateGroupPrice = (price) => {
   if (/^([1-9]\d{0,10}|\d{1,10}\.\d{1,2})$/.test(price) === false) {
      return false;
   } else {
      return true;
   }
};

export const validateGroupBuy = (num) => {
   if (/^[2-9]{1}$/.test(num) === false) {
      return false;
   } else {
      return true;
   }
};

export const validateEndDate = (date) => {
   if (/^(\-\d{1,13}|\d{1,13})$/.test(date) === false) {
      return false;
   } else {
      return true;
   }
};

export const validateAmount = (num) => {
   if (/^[1-9]{1}\d{0,1}$/.test(num) === false) {
      return false;
   } else {
      return true;
   }
};