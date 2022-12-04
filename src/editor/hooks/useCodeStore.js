import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCode, setActiveCode } from '../../store/slices/code/codeSlice';
import { useRouteUrl } from './useRouteUrl';

export const useCodeStore = () => {
  const dispatch = useDispatch();
  const { saveCodeUrl } = useRouteUrl();
  const { code, activeCode } = useSelector((state) => state.code);

  useEffect(() => {
    if (activeCode !== null) {
      saveCodeUrl(activeCode);
    }
  }, [activeCode]);

  const onSetCode = (text) => {
    dispatch(addCode(text));
  };

  const onSetActiveCode = (text) => {
    dispatch(setActiveCode(text));
  };

  return {
    onSetCode,
    onSetActiveCode,
    activeCode,
    code
  };
};
