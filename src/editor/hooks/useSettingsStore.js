import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../store/slices/settings/settingsSlice';

export const useSettingsStore = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const onSetSettings = (settings) => {
    dispatch(setSettings(settings));
  };
  return {
    onSetSettings,
    settings
  };
};
