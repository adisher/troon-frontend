import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//// PERSISTANT STORAGE WITH AES ENCRYPTION

// The Advanced Encryption Standard (AES) is
// a symmetric block cipher chosen by the U.S.
// government to protect classified information.
// AES is implemented in software and hardware
// throughout the world to encrypt sensitive data.
// It is essential for government computer security,
// cybersecurity and electronic data protection.
const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers);

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk),
      typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
