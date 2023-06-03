import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {ruRU} from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Dayjs} from 'dayjs';

type DeadlineDatePickerProps = {
  setDeadline: (value: string | undefined) => void;
};

function DeadlineDatePicker({setDeadline}: DeadlineDatePickerProps): JSX.Element {

  const handleDatePickerChange = (dateValue: Dayjs | null) => {
    setDeadline(dateValue?.toISOString());
  };

  return (
    <LocalizationProvider
      adapterLocale='ru'
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      dateAdapter={AdapterDayjs}
    >
      <DatePicker onChange={handleDatePickerChange}/>
    </LocalizationProvider>
  );
}

export default DeadlineDatePicker;
