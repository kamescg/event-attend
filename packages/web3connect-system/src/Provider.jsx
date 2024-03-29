/* --- Global --- */
import React, { useContext, useReducer, useState, useEffect } from 'react';
import Fortmatic from 'fortmatic';

/* --- Module --- */
import Context from './Context';
import reducerActions from './reducer';

/* --- Effects --- */
import {} from './effects';

/* --- Provider Component --- */
const Provider = ({ children, ...props }) => {
  const [web3, setWeb3] = useState();
  const [dispatched, setDispatched] = useState(props.dispatched);
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducerActions, initialState);

  useEffect(() => {
    if (!dispatched) {
      let fm = new Fortmatic(key);
      const web3Instance = new Web3(fm.getProvider());

      setWeb3(web3Instance);
      dispatch({
        type: 'SET_PROVIDER',
        payload: web3Instance
      });
      setDispatched(true);
    }
  }, [props.setup]);

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch: dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.defaultProps = {
  dispatched: false
};
export default Provider;
