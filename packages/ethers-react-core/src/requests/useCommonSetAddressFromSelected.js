/**
 * @function useCommonSetAddressFromSelected
 * @description Watch Browser window object for Etheruem selected address.
 * @param {Object} state
 * @param {Object} dispatch
 */

/* --- Global --- */
import { useState, useEffect } from 'react';

/* --- Component --- */
export const useCommonSetAddressFromSelected = (state, dispatch) => {
  const [isAddressSelected, setAddressSelected] = useState();

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      dispatch({
        type: 'SET_ADDRESS',
        input: window.ethereum.selectedAddress
      });
      setAddressSelected(true);
    }
  }, [window.ethereum && window.ethereum.selectedAddress]);

  return isAddressSelected;
};
