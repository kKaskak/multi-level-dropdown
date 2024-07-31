import { useState, useCallback } from 'react';

type Result = [boolean, () => void, () => void, () => void];

const useBinaryState = (initialState: boolean = false): Result => {
  const [state, setState] = useState(initialState);

  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState(prevState => !prevState), []);

  return [ state, on, off, toggle ];
};

export default useBinaryState;
