import {DateCalendar, LocalizationProvider} from '@mui/x-date-pickers';
import {ruRU} from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Dayjs} from 'dayjs';
import {useAppDispatch} from '../../hooks';
import {setCurrentlySelectedListId, setSelectedDeadline} from '../../store/app-data/app-data';

interface CalendarProps {
  externalValue?: Dayjs | null;
}

function Calendar({externalValue}: CalendarProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDateCalendarChange = (value: Dayjs | null) => {
    dispatch(setCurrentlySelectedListId(null));
    dispatch(setSelectedDeadline(value));
  };

  return (
    <LocalizationProvider
      adapterLocale='ru'
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      dateAdapter={AdapterDayjs}
    >
      <DateCalendar onChange={handleDateCalendarChange} value={externalValue}/>
    </LocalizationProvider>
  );
}

export default Calendar;
