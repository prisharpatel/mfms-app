import { compose, withState } from 'recompose';

import AboutScreen from './AboutView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  AboutScreen,
);
