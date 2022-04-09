import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ShellEventBus } from "../EventBus";
import {
  ChangeSidebarState,
  ChangeSidebarStateEvent,
} from "../EventBus/Events/UIEvents";

export enum NavigationActionKind {
  UPDATE_SIDEBAR = "UPDATE_SIDEBAR",
}

export interface NavigationState {
  sidebarOpen: boolean;
}

export interface NavigationAction {
  type: NavigationActionKind;
  payload: boolean;
}

const reducer = (state: NavigationState, action: NavigationAction) => {
  const { type, payload } = action;
  switch (type) {
    case NavigationActionKind.UPDATE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: payload,
      };

    default:
      return state;
  }
};

const initialState: NavigationState = {
  sidebarOpen: false,
};

const NavigationContext = createContext<{
  state: NavigationState;
  dispatch: Dispatch<NavigationAction>;
}>({ state: initialState, dispatch: () => null });

export const NavigationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { changeSidebarState } = useNavigation();

  useEffect(() => {
    const onChangeSidebarStateEvent = (event: ChangeSidebarState) => {
      changeSidebarState(event.payload.isOpen);
    };

    ShellEventBus.on(ChangeSidebarStateEvent, onChangeSidebarStateEvent);
    return () => {
      ShellEventBus.off(ChangeSidebarStateEvent, onChangeSidebarStateEvent);
    };
  }, [changeSidebarState]);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const { state, dispatch } = useContext(NavigationContext);

  const { sidebarOpen } = state;

  const changeSidebarState = useCallback(
    (isOpen: NavigationState["sidebarOpen"]) =>
      dispatch({ type: NavigationActionKind.UPDATE_SIDEBAR, payload: isOpen }),
    [dispatch]
  );

  return { sidebarOpen, changeSidebarState };
};
