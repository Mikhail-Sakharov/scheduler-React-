import {GetItemsQuery} from './types/get-items.query';

const MonthNamesMap = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря'
};

export const getDeadlineDate = (date: string) => {
  const day = `${date[8]}${date[9]}`;
  const month = MonthNamesMap[`${date[5]}${date[6]}` as keyof typeof MonthNamesMap];
  const time = date.match(/(?<=T)\d{2}:\d{2}/);

  const deadlineDate = `${day} ${month}, ${time ? time[0] : ''}`;

  return deadlineDate;
};

export const getQueryString = (queryArgs?: GetItemsQuery) => {
  if (!queryArgs) {return '';}

  const queryParams = [
    `${queryArgs.listsIds !== undefined ? `listsIds=${queryArgs.listsIds.join(',')}` : ''}`,
    `${queryArgs.deadline !== undefined ? `deadline=${queryArgs.deadline}` : ''}`
  ];

  const isNotEmptyString = queryParams.filter((param) => param !== '').join('') !== '';

  const queryString = isNotEmptyString ? `?${queryParams.filter((param) => param !== '').join('&')}` : '';

  return queryString;
};
