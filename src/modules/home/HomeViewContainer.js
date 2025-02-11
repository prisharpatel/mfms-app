import React, { useState } from 'react';
import HomeScreen from './HomeView';

const HomeContainer = () => {
  const [isExtended, setIsExtended] = useState(false);

  return <HomeScreen isExtended={isExtended} setIsExtended={setIsExtended} />;
};

export default HomeContainer;
