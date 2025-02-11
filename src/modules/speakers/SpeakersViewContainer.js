import React, { useState } from 'react';
import SpeakersScreen from './SpeakersView';

const SpeakersContainer = () => {
  const [isExtended, setIsExtended] = useState(false);

  return <SpeakersScreen isExtended={isExtended} setIsExtended={setIsExtended} />;
};

export default SpeakersContainer;
