import { connect } from 'react-redux';
import { loadItems } from './CalendarState';
import CalendarScreen from './CalendarView';

const mapStateToProps = (state) => ({
  items: state.calendar.items,
});

const mapDispatchToProps = {
  loadItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
