const localStorageMock = (() => {
  let store = {
    "profile": '{"name":"test","identities":[{"user_id":123}]}',
    id_token: ""
  };
  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    }
  };
})();

global.localStorage = localStorageMock;
