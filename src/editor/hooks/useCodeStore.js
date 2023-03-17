import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import {
  addCodeSaved,
  removeCodeSaved,
  renameCodeSaved,
  resetUploadedCode,
  setActiveCode,
  setCodeSaved,
  setUploadedCode
} from '../../store/slices/code/codeSlice';
import { useLocalStorage } from './useLocalStorage';
import { useRouteUrl } from './useRouteUrl';

export const useCodeStore = () => {
  const dispatch = useDispatch();
  const { encodeBase64, decodeBase64, getBase64Param } = useRouteUrl();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { saveBase64ToUrl } = useRouteUrl();
  const { codeSaved, activeCode, uploadedCode } = useSelector(
    (state) => state.code
  );

  const onAddCodeSaved = (name, code = encodeBase64(activeCode)) => {
    dispatch(addCodeSaved({ name, code }));
  };

  const onRemoveCodeSaved = (name) => {
    dispatch(removeCodeSaved({ name }));
  };

  const onSetActiveCode = (text) => {
    dispatch(setActiveCode(text));
  };

  const onSetUploadedCode = (text) => {
    dispatch(setUploadedCode(text));
    dispatch(resetUploadedCode());
  };

  const onRenameCodeSaved = (oldName, newName) => {
    dispatch(renameCodeSaved({ oldName, newName }));
  };

  const onGetCodeSavedByName = (name) => {
    const code = codeSaved.find((code) => code.name === name);
    if (code) {
      return decodeBase64(code.code);
    }
    return '';
  };

  const onSetCodeSaved = (codeSaved) => {
    dispatch(setCodeSaved(codeSaved));
  };

  const onCheckNameAndCode = (name = '', code = '') => {
    const Check = codeSaved.find((code) => code.name === name);
    if (Check) {
      return Check.code === code;
    }
    return false;
  };

  useEffect(() => {
    const codeSaved = getLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED);
    onSetActiveCode(decodeBase64(getBase64Param()));
    onSetCodeSaved(Array.isArray(codeSaved) ? codeSaved : []);
  }, []);

  useEffect(() => {
    setLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED, codeSaved);
  }, [codeSaved]);

  useEffect(() => {
    saveBase64ToUrl(activeCode);
  }, [activeCode]);

  return {
    onAddCodeSaved,
    onSetActiveCode,
    onSetUploadedCode,
    onRemoveCodeSaved,
    onCheckNameAndCode,
    onRenameCodeSaved,
    onGetCodeSavedByName,
    onSetCodeSaved,
    uploadedCode,
    activeCode,
    codeSaved
  };
};
