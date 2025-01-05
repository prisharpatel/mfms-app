import { connect } from 'react-redux';
import ScheduleScreen from './ScheduleScreen';
import { loadSchedule } from './ScheduleState';

export default connect(
  state => ({
    schedule: state.schedule.schedule,
    selectedSessions: state.schedule.selectedSessions,
  }),
  {
    loadSchedule,
  },
)(ScheduleScreen); 