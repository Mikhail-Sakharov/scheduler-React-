import {DateCalendar, LocalizationProvider} from '@mui/x-date-pickers';
import {ruRU} from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Dayjs} from 'dayjs';

function Calendar(): JSX.Element {
  const handleDateCalendarChange = (value: Dayjs | null) => {
    console.log(value?.toISOString());
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
