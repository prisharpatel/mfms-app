import { compose, withState } from 'recompose';

import TicketsScreen from './TicketsScreen';

export default compose(withState('isExtended', 'setIsExtended', false))(
  TicketsScreen,
);
