const storageKey = 'dev_colorpicker';

let store = {};

export function get(itemKey) {
  const getStore = window.localStorage.getItem(storageKey);
  try {
    const parse = JSON.parse(getStore);
    store = {
      ...store,
      ...parse,
    };
    return store[itemKey] || null;
  } catch(e) {
    return null;
  }
}

export function set(key, value) {
  store = {
    ...store,
    [key]: value,
  };
  window.localStorage.setItem(storageKey, JSON.stringify(store));
}
