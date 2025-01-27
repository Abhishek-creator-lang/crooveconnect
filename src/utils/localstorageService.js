import * as _ from "lodash";
import * as crypto from "crypto-js";

const getDescryptedVal = (val) => {
  let decryptObj = crypto.AES.decrypt(val, process.env.REACT_APP_LOCAL_SORAGE_SECRET_KEY);
  return _.attempt(_.invoke, decryptObj, "toString", crypto.enc.Utf8);
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorageItem = (key) => {
  let retrievedVal = localStorage.getItem(key);

  if (_.isNull(retrievedVal)) {
    return null;
  }
  let decryptedVal = getDescryptedVal(retrievedVal, key);
  // let decryptedVal = getDescryptedVal(retrievedVal, this.secretKey);

  // value modified by user
  if (_.isError(decryptedVal) || _.isEmpty(decryptedVal)) {
    localStorage.removeItem(key);
    return null;
  }

  let decryptedObj = _.attempt(JSON.parse.bind(null, decryptedVal));
  return _.isError(decryptedObj) ? decryptedVal : decryptedObj;
};

export const setLocalStorageItem = (key, val) => {
  let parsedVal;

  console.log(key,val, 'hey')

  // Check whether value is an object
  if (_.isObject(val) || _.isArray(val)) {
    parsedVal = _.attempt(JSON.stringify.bind(null, val));
  }
  // If value is string
  else if (_.isString(val)) {
    parsedVal = val;
  } 
  else if (_.isNumber(val)) {
    parsedVal = String(val);
  }
  
  // Encrypt key and store in localStorage
  if (!_.isError(parsedVal) && !_.isUndefined(parsedVal)) {
    parsedVal = crypto.AES.encrypt(parsedVal, process.env.REACT_APP_LOCAL_SORAGE_SECRET_KEY);
    // parsedVal = crypto.AES.encrypt(parsedVal, this.secretKey);
    localStorage.setItem(key, parsedVal);
  }
};
