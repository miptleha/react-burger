import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsOrdersAllActions } from './actions/orders-all';
import { wsOrdersUserActions } from './actions/orders-user';

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(socketMiddleware(wsOrdersAllActions))
        .concat(socketMiddleware(wsOrdersUserActions)),
      devTools: process.env.NODE_ENV !== 'production'
});
