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
  const { encodeText, decodeByCode, decodeText } = useRouteUrl();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { codeSaved, activeCode, uploadedCode } = useSelector(
    (state) => state.code
  );
  const { saveCodeUrl } = useRouteUrl();

  const onAddCodeSaved = (name, code = encodeText(activeCode)) => {
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
      return decodeByCode(code.code);
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
    onSetActiveCode(decodeText());
    onSetCodeSaved(Array.isArray(codeSaved) ? codeSaved : []);
  }, []);

  useEffect(() => {
    setLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED, codeSaved);
  }, [codeSaved]);

  useEffect(() => {
    saveCodeUrl(activeCode);
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
