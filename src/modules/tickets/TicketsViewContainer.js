import React, { useState } from 'react';
import TicketsScreen from './TicketsScreen';

const TicketsContainer = () => {
  const [isExtended, setIsExtended] = useState(false);

  return <TicketsScreen isExtended={isExtended} setIsExtended={setIsExtended} />;
};

export default TicketsContainer;
