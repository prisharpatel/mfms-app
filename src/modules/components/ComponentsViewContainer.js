import React, { useState } from 'react';
import ComponentsScreen from './ComponentsView';

const ComponentsContainer = () => {
  const [radioGroupsState, setRadioGroupsState] = useState([0, 0]);

  return (
    <ComponentsScreen 
      radioGroupsState={radioGroupsState} 
      setRadioGroupsState={setRadioGroupsState} 
    />
  );
};

export default ComponentsContainer;
