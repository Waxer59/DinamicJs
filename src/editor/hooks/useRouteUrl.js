import { useParams, useNavigate } from 'react-router-dom';
import { encode, decode, isValid } from 'js-base64';

export const useRouteUrl = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const decodeText = () => {
    const decodedText = isValid(code) ? decode(code) : '';
    return decodedText;
  };

  const decodeByCode = (code) => {
    const decodedText = isValid(code) ? decode(code) : '';
    return decodedText;
  };

  const encodeText = (text) => {
    const encodedText = encode(text);
    return encodedText;
  };

  const saveCodeUrl = (text) => {
    const encodedText = encodeText(text);
    navigate(`/${encodedText}`);
  };
  return {
    decodeText,
    saveCodeUrl,
    decodeByCode,
    encodeText
  };
};
