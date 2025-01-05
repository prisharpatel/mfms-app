import { compose, withState } from 'recompose';

import TicketsScreen from './TicketsView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  TicketsScreen,
);
