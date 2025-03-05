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
    id: 1,
    startTime: new Date('2025-03-28T09:30:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T09:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Izzy Saunders | MFMS Co-President and Lila Grayson | MFMS Co-President',
    title: 'Opening Remarks',
    location: 'Robertson Auditorium',
  },
  {
    id: 2,
    startTime: new Date('2025-03-28T09:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T10:15:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Panel #1',
    location: 'Robertson Auditorium',
  },
  {
    id: 3,
    startTime: new Date('2025-03-28T10:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T10:55:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Panel #2',
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
    speakers: '',
    title: 'Panel #3',
    location: 'Robertson Auditorium',
  },
  {
    id: 6,
    startTime: new Date('2025-03-28T11:35:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T12:10:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Panel #4',
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
    speakers: '',
    title: 'Conversation #1',
    location: 'Robertson Auditorium',
  },
  {
    id: 9,
    startTime: new Date('2025-03-28T13:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T14:20:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'To Be Announced',
    location: 'To Be Announced',
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
    speakers: '',
    title: 'Keynote #1',
    location: 'Robertson Auditorium',
  },
  {
    id: 12,
    startTime: new Date('2025-03-28T16:05:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T16:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Conversation #2',
    location: 'Robertson Auditorium',
  },
  {
    id: 13,
    startTime: new Date('2025-03-28T16:40:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T16:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: '',
    title: 'Fashion Forward Showcase Winner Announcement',
    location: 'Robertson Auditorium',
  },
  {
    id: 14,
    startTime: new Date('2025-03-28T16:50:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    endTime: new Date('2025-03-28T17:00:00').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
    speakers: 'Kylie Stenzler | MFMS COO',
    title: 'Closing Remarks',
    location: 'Robertson Auditorium',
  },
];

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