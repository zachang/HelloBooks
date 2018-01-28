let sessionStorage = {};

export default {
  setItem(key, value) {
    return {
      ...sessionStorage,
      [key]: value
    };
  },
  getItem(key) {
    return sessionStorage[key];
  },
  removeItem(key) {
    return delete sessionStorage[key];
  },
  clear() {
    sessionStorage = {};
  }
};