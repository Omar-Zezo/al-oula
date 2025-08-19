import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../store/slices/utils/settings';
import { useEffect, useState } from 'react';

const UseSettings = () => {
  const [settings, setSettings] = useState(null);
    const settingsData = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSettings());
      }, []);
    
      useEffect(() => {
        if (settingsData) {
          if (settingsData.data) {
            if (settingsData.data.data) {
              if (settingsData.data.data.data) {
                setSettings(settingsData.data.data.data);
              }
            }
          }
        }
      }, [settingsData]);

  return settings
}

export default UseSettings
