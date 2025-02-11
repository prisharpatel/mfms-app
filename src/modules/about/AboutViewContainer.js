import React, { useState } from 'react';
import AboutScreen from './AboutView';

const AboutContainer = () => {
  const [isExtended, setIsExtended] = useState(false);

  return <AboutScreen isExtended={isExtended} setIsExtended={setIsExtended} />;
};

export default AboutContainer;
