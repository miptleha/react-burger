import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { refreshToken } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { getEventMessage } from '../../utils/message';

import type { AppDispatch, RootState, wsActionsTypes } from '../../utils/types';

export const socketMiddleware = (wsActions: wsActionsTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let timerWsReconnect = 0;
    let isWsConnected = false;
    let url = '';

    return next => (action: AnyAction) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        url = action.url;
        if (action.addToken) {
          url += `?token=${getCookie('accessToken')}`;
        }
        
        let cnt = 0;
        //проблемы с Firefox, иногда не может соединиться
        while (cnt < 10) {
          try {
            socket = new WebSocket(url);
            break;
          } catch {
            cnt++;
          }
        }
        
        isWsConnected = true;
        window.clearTimeout(timerWsReconnect);
        dispatch({ type: wsActions.onSuccess });
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsActions.onOpen });
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch({ type: wsActions.onError, error: getEventMessage(event) });
            socket?.close();
          }
          if (isWsConnected) {
            dispatch({ type: wsActions.onClosed });
            timerWsReconnect = window.setTimeout(() => {
              dispatch({ type: wsActions.onStart, url: url });
            }, 3000)
          }
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (!parsedData?.success) {
            if (parsedData?.message === 'Invalid or missing token') {
              refreshToken();
            }
            dispatch({ type: wsActions.onError, error: parsedData?.message });
          } else {
            const { success, ...restParsedData } = parsedData;
            dispatch({ type: wsActions.onMessage, message: restParsedData });
          }
        };

        socket.onerror = event => {
          dispatch({ type: wsActions.onError, error: getEventMessage(event) });
        };

        if (action.type === wsActions.onDisconnect) {
          window.clearTimeout(timerWsReconnect);
          isWsConnected = false;
          timerWsReconnect = 0;
          socket.close();
          dispatch({ type: wsActions.onClosed });
        }
      }
      next(action);
    };
  };
};
