// Action Types
const LOAD_SCHEDULE = 'Schedule/LOAD_SCHEDULE';
const TOGGLE_SESSION = 'Schedule/TOGGLE_SESSION';

const defaultState = {
  schedule: [],
  selectedSessions: [],
  isLoading: false,
};

// Mock data (replace with API call later)
const mockSchedule = [
  {
    id: 1,
    startTime: '09:00',
    endTime: '10:00',
    speaker: 'Steve Madden',
    title: 'Opening Keynote',
    room: 'Kresge Auditorium',
  },
  {
    id: 2,
    startTime: '10:30',
    endTime: '11:00',
    speaker: 'Jonathan Newhouse',
    title: 'Magazines.',
    room: 'Kresge Auditorium',
  },
];

export function loadSchedule() {
  return {
    type: LOAD_SCHEDULE,
    schedule: mockSchedule,
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