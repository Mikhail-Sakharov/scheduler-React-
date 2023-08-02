import {DateCalendar, LocalizationProvider, PickersDay, PickersDayProps} from '@mui/x-date-pickers';
import {ruRU} from '@mui/x-date-pickers/locales';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs, {Dayjs} from 'dayjs';
import {useAppDispatch} from '../../hooks';
import {setCurrentlySelectedListId, setSelectedDeadline} from '../../store/app-data/app-data';
import {Badge} from '@mui/material';
import {useEffect, useState} from 'react';
import {useGetItemsQuery} from '../../services/calendar-api.service';

interface CalendarProps {
  externalValue?: Dayjs | null;
}

const ServerDay = (props: PickersDayProps<Dayjs> & {highlightedDays?: number[]}) => {
  const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      // color='error'
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}/>
    </Badge>
  );
};

function Calendar({externalValue}: CalendarProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const getItemsQuery = useGetItemsQuery(undefined);

  const highlightDays = (month: Dayjs) => {
    const currentMonth = month as Dayjs & {$M: number; $y: number};
    const currentMonthNumber = currentMonth.$M;
    const currentYearNumber = currentMonth.$y;

    const currentMonthItems = getItemsQuery.data?.filter((item) => (
      item.deadline !== null &&
      dayjs(item.deadline).month() === currentMonthNumber &&
      dayjs(item.deadline).year() === currentYearNumber
    ));
    const currentMonthHighlitedDays = currentMonthItems?.map((item) => dayjs(item.deadline).date());

    if (currentMonthHighlitedDays) {
      setHighlightedDays(currentMonthHighlitedDays);
    }
  };

  useEffect(() => {
    highlightDays(dayjs());
  }, [getItemsQuery]);

  const handleMonthChange = (month: Dayjs) => {
    highlightDays(month);
  };

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
      <DateCalendar
        slots={{
          day: ServerDay
        }}
        slotProps={{
          day: {highlightedDays} as any
        }}
        onMonthChange={handleMonthChange}
        onChange={handleDateCalendarChange}
        value={externalValue}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
