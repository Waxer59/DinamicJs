import { useParams, useNavigate } from "react-router-dom";
import { encode, decode, isValid } from 'js-base64';

export const useRouteUrl = ({text = ""}) => {
    const { code } = useParams();
    const navigate = useNavigate();

    const decodeText = () => {
        let decodedText = isValid(code) ? decode(code) : "";
        return decodedText;
    }
    
    const saveCodeUrl = (text) => {
        let encodedText = encode(text);
        navigate(`/${encodedText}`);
    }

    return{
        decodeText,
        saveCodeUrl
    }
};
