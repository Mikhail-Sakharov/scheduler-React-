import {DateCalendar, LocalizationProvider} from '@mui/x-date-pickers';
import {ruRU} from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Dayjs} from 'dayjs';
import {useAppDispatch} from '../../hooks';
import {fetchItemsAction} from '../../store/api-actions';

function Calendar(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDateCalendarChange = (value: Dayjs | null) => {
    dispatch(fetchItemsAction({
      deadline: value?.toISOString()
    }));
  };

  return (
    <LocalizationProvider
      adapterLocale='ru'
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      dateAdapter={AdapterDayjs}
    >
      <DateCalendar onChange={handleDateCalendarChange}/>
    </LocalizationProvider>
  );
}

export default Calendar;
