import { useDispatch, useSelector } from 'react-redux';
import { addCode } from '../../store/slices/code/codeSlice';

export const useCodeStore = (text = '') => {
  const dispatch = useDispatch();
  const { code } = useSelector((state) => state.code);

  const setCode = (text) => {
    dispatch(addCode(text));
  };

  return {
    setCode,
    code
  };
};
