import HomeScreen from '../home/HomeViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/home.png');
const iconMFMS = require('../../../assets/images/transparent_black.png');
const iconCalendar = require('../../../assets/images/calendar.png');
const iconTickets = require('../../../assets/images/tickets.png');
const iconSpeakers = require('../../../assets/images/speakers.png');

const tabNavigationData = [
  {
    name: 'MFMS',
    component: HomeScreen,
    icon: iconMFMS,
  },
  {
    name: 'Calendar',
    component: CalendarScreen,
    icon: iconCalendar,
  },
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Speakers',
    component: PagesScreen,
    icon: iconSpeakers,
  },
  {
    name: 'Tickets',
    component: ComponentsScreen,
    icon: iconTickets,
  },
];

export default tabNavigationData;