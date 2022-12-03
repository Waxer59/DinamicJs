import { useDispatch, useSelector } from 'react-redux';
import { addCode, setActiveCode } from '../../store/slices/code/codeSlice';

export const useCodeStore = () => {
  const dispatch = useDispatch();
  const { code, activeCode } = useSelector((state) => state.code);

  const onSetCode = (text) => {
    dispatch(addCode(text));
  };

  const onSetActiveCode = (text) => {
    dispatch(setActiveCode(text));
  }

  return {
    onSetCode,
    onSetActiveCode,
    activeCode,
    code,
  };
};
