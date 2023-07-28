import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {ruRU} from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import {Dayjs} from 'dayjs';

type DeadlineDatePickerProps = {
  setDeadline: (value: Dayjs | null) => void;
  value?: Dayjs | null;
  disabled?: boolean;
};

function DeadlineDatePicker({setDeadline, value, disabled}: DeadlineDatePickerProps): JSX.Element {

  const handleDatePickerChange = (dateValue: Dayjs | null) => {
    setDeadline(dateValue);
  };

  return (
    <LocalizationProvider
      adapterLocale='ru'
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      dateAdapter={AdapterDayjs}
    >
      <DatePicker onChange={handleDatePickerChange} value={value ?? null} disabled={disabled}/>
    </LocalizationProvider>
  );
}

export default DeadlineDatePicker;
