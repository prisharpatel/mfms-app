// Action Types
const LOAD_SCHEDULE = 'Schedule/LOAD_SCHEDULE';
const TOGGLE_SESSION = 'Schedule/TOGGLE_SESSION';

const defaultState = {
  schedule: [],
  selectedSessions: [],
  isLoading: false,
};

const schedule = [
  {
    id: 15,
    startTime: new Date('2025-03-28T08:45:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T09:30:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Check-In',
    location: 'Ross Winter Garden',
  },
  {
    id: 1,
    startTime: new Date('2025-03-28T09:30:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T09:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Izzy Saunders | Co-President of MFMS; Lila Grayson | Co-President of MFMS',
    title: 'Opening Remarks',
    location: 'Robertson Auditorium',
  },
  {
    id: 2,
    startTime: new Date('2025-03-28T09:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T10:15:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Chelsea Parke Kramer | Founder and CEO of Parke; Ella Rose McFadin | Founder of Skin by Ella; Dianna Cohen | Founder of Crown Affair; (Moderator) Jessica Williams | Head of Brand and Partnerships at Shopify',
    title: 'From Followers to Founders: Creators Building Thriving Businesses',
    location: 'Robertson Auditorium',
  },
  {
    id: 3,
    startTime: new Date('2025-03-28T10:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T10:55:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Lori Singer | President of Parlux Fragrances; Jon Dinapoli | Founder and Chief Creative of Jon Michael Design',
    title: 'Beyond the Bottle: Translating Fashion to Fragrance',
    location: 'Robertson Auditorium',
  },
  {
    id: 4,
    startTime: new Date('2025-03-28T10:55:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T11:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Fashion Forward Showcase Video',
    location: 'Robertson Auditorium',
  },
  {
    id: 5,
    startTime: new Date('2025-03-28T11:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T11:30:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Donni Davy | Head Makeup Artist of Euphoria; Sophia Rzankowski | Chief of Staff at Superconnector Studios; James Bee | Photographer; (Moderator) Emily Blaire | CEO & Founder of Emily Blaire Media',
    title: 'Lights, Camera, Style: How Entertainment is Shaping the Beauty and Fashion Industry',
    location: 'Robertson Auditorium',
  },
  {
    id: 6,
    startTime: new Date('2025-03-28T11:35:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T12:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Bonnie Abraham | Senior Vice President of Retail at Balenciaga, Americas; Daniel Jadczak | Chief Information Officer of LVMH Inc. North America; Rebecca Goodman | Vice President of Marketing and Communications at Manolo Blahnik, Americas; (Moderator) James Nakajima',
    //TODO = add moderator title
    title: 'The New Rules of Luxury Fashion',
    location: 'Robertson Auditorium',
  },
  {
    id: 7,
    startTime: new Date('2025-03-28T12:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T13:15:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Wolverine Worldwide',
    title: 'Lunch & Learn',
    location: 'To Be Announced',
  },
  {
    id: 8,
    startTime: new Date('2025-03-28T13:15:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T13:45:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Sami Clarke Barnett | Co-Founder of Form; JT Barnett | Founder of CreatorX; (Moderator) Shelby Silva | VP of Operations at FORM ',
    title: 'The Power of Influence: Fitness, Wellness & Fashion in Media',
    location: 'Robertson Auditorium',
  },
  {
    id: 9,
    startTime: new Date('2025-03-28T13:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T14:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Mike Sainristil | NFL Cornerback for the Washington Commanders and Captain of Michigan National Championship Team 144; Dan Soloman | Celebrity Stylist and CEO of Closet Tours; (Moderator) Seth Ader | Vice President of Brand Marketing at ESPN',
    // TODO = add one more person  - joe holden?
    title: 'Redefining the Game: The Intersection of Sports and Fashion',
    location: 'Robertson Auditorium',
  },
  {
    id: 10,
    startTime: new Date('2025-03-28T14:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T15:25:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Networking & Corporate Coffee Chats',
    location: 'Kresge Suites',
  },
  {
    id: 11,
    startTime: new Date('2025-03-28T15:25:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T16:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Emilie Rubenfeld | President of Carolina Herrera; (Moderator) Marcus Collins',
    title: 'Steering a Fashion Legacy',
    location: 'Robertson Auditorium',
  },
  {
    id: 12,
    startTime: new Date('2025-03-28T16:05:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T16:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Paige Lorenze | Founder, Entrepreneur, and Digital Creator; (Moderator) Rachel Liebenthal | Chief Brand Officer of Dairy Boy',
    title: 'The Business of Being You: Scaling Influence and Lifestyle into a Lasting Brand',
    location: 'Robertson Auditorium',
  },
  {
    id: 13,
    startTime: new Date('2025-03-28T16:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T16:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Fashion Forward Showcase Award Ceremony',
    location: 'Robertson Auditorium',
  },
  {
    id: 14,
    startTime: new Date('2025-03-28T16:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T17:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Kylie Stenzler | COO of MFMS',
    title: 'Closing Remarks',
    location: 'Robertson Auditorium',
  },
];

// Helper function to format speakers text with line breaks
const formatSpeakers = (speakersText) => {
  if (!speakersText) return '';
  
  // Replace commas with line breaks
  return speakersText.split(',').map(speaker => speaker.trim()).join('\n');
};


export function loadSchedule() {
  return {
    type: LOAD_SCHEDULE,
    schedule: schedule,
  };
}

export default function ScheduleReducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_SCHEDULE:
      return {
        ...state,
        schedule: action.schedule,
        isLoading: false,
      };
    case TOGGLE_SESSION:
      return {
        ...state,
        selectedSessions: state.selectedSessions.includes(action.sessionId)
          ? state.selectedSessions.filter(id => id !== action.sessionId)
          : [...state.selectedSessions, action.sessionId],
      };
    default:
      return state;
  }
} 