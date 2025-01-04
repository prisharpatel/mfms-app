import { compose, withState } from 'recompose';

import SpeakersScreen from './SpeakersView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  SpeakersScreen,
);
