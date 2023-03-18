import { useNavigate } from 'react-router-dom';
import { encode, decode, isValid } from 'js-base64';

export const useRouteUrl = () => {
  const base64Param = document.location.pathname.replace('/', '');
  const navigate = useNavigate();

  const getBase64Param = () => {
    return base64Param;
  };

  const decodeBase64 = (code) => {
    const decodedText = isValid(code) ? decode(code) : '';
    return decodedText;
  };

  const encodeBase64 = (text) => {
    const encodedText = encode(text);
    return encodedText;
  };

  const saveBase64ToUrl = (text) => {
    const encodedText = encodeBase64(text);
    navigate(`/${encodedText}`);
  };
  return {
    saveBase64ToUrl,
    decodeBase64,
    encodeBase64,
    getBase64Param
  };
};
