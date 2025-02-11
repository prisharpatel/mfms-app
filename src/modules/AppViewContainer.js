import React, { useEffect, useState } from 'react';
import { Platform, UIManager } from 'react-native';

import AppView from './AppView';

const AppContainer = () => {
  const [mounted, setMounted] = useState(true); // Track component mount state

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    return () => {
      setMounted(false); // Mark component as unmounted when cleaning up
    };
  }, []);

  if (!mounted) return null; // Prevent updates on an unmounted component

  return <AppView />;
};

export default AppContainer;
