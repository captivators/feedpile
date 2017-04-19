const localStorageMock = (() => {
  let store = {
    "profile": '{"name":"faiz"}',
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
