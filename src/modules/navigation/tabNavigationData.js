import HomeScreen from '../home/HomeViewContainer';
import ScheduleScreen from '../schedule/ScheduleViewContainer';
import AboutScreen from '../about/AboutViewContainer';
import SpeakersScreen from '../speakers/SpeakersViewContainer';
import TicketsScreen from '../tickets/TicketsViewContainer';
import SpeakerDetails from '../speakers/SpeakerDetails'

const iconHome = require('../../../assets/images/home.png');
const iconMFMS = require('../../../assets/images/transparent_black.png');
const iconCalendar = require('../../../assets/images/calendar.png');
const iconTickets = require('../../../assets/images/tickets.png');
const iconSpeakers = require('../../../assets/images/speakers.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Schedule',
    component: ScheduleScreen,
    icon: iconCalendar,
  },
  {
    name: 'Speakers',
    component: SpeakersScreen,
    icon: iconSpeakers,
  },
  {
    name: 'Tickets',
    component: TicketsScreen,
    icon: iconTickets,
  },
  {
    name: 'MFMS',
    component: AboutScreen,
    icon: iconMFMS,
  },
];

export default tabNavigationData;