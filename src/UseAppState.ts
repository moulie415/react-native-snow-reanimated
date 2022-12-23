
import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const useAppState = (onForeground?: () => void, onBackground?: () => void) => {
  const appState = useRef(AppState.currentState);

  const onChange = useCallback((nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      isValidFunction(onForeground) && onForeground();
    }

    if (appState.current.match(/^active|foreground/) && 
    nextAppState === 'inactive') {
      // App is going into background
      isValidFunction(onBackground) && onBackground();
    }

    appState.current = nextAppState;
  }, [onForeground])

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onChange);

    return () => {
      subscription.remove();
    };
  }, [onChange]);

  const isValidFunction = (func) => {
    return func && typeof func === 'function';
  }
  return { appState: appState.current };
}

export default useAppState;