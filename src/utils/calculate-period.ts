type TReturn = {
  dateStart: string; 
  dateEnd: string;
  success: boolean;
};

const calculatePeriod: any = (filterValue: string) => {
  const period: TReturn = { success: true, dateStart: '', dateEnd: ''};
  const today = new Date();

  if ( filterValue.length < 3 ) {
    period.dateEnd = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const periodEnd = new Date();
    periodEnd.setDate(today.getDate() - parseInt(filterValue));
    period.dateStart = periodEnd.getFullYear() + '-' + (periodEnd.getMonth()+1) + '-' + periodEnd.getDate();
  } else if (filterValue.match(/\d\d.\d\d.\d\d-\d\d.\d\d.\d\d/)) {
    const filterValueParts = filterValue.split('-').map(el => el.split('.').reverse().join('-'));
    period.dateStart = filterValueParts[0];
    period.dateEnd = filterValueParts[1];
  } else {
    period.success = false;
  }

  return period;
}

export default calculatePeriod;