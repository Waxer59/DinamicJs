import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCodeTabs,
  resetUploadedCode,
  setActiveCode,
  setUploadedCode
} from '../../store/slices/code/codeSlice';
import { useRouteUrl } from './useRouteUrl';

export const useCodeStore = () => {
  const dispatch = useDispatch();
  const { saveCodeUrl } = useRouteUrl();
  const { codeTabs, activeCode, uploadedCode } = useSelector(
    (state) => state.code
  );

  useEffect(() => {
    if (activeCode !== null) {
      saveCodeUrl(activeCode);
    }
  }, [activeCode]);

  const onSetCodeTabs = (text) => {
    dispatch(addCodeTabs(text));
  };

  const onSetActiveCode = (text) => {
    dispatch(setActiveCode(text));
  };

  const onSetUploadedCode = (text) => {
    dispatch(setUploadedCode(text));
    dispatch(resetUploadedCode());
  };

  return {
    onSetCodeTabs,
    onSetActiveCode,
    onSetUploadedCode,
    uploadedCode,
    activeCode,
    codeTabs
  };
};
