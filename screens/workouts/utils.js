import moment from 'moment';

export const getDates = () => {
    var end_date = moment().endOf('isoweek').toDate();
    end_date = end_date.toLocaleDateString('en-US');
    var start_date = new Date();
    start_date.setDate(start_date.getDate() - 10);
    start_date = start_date.toLocaleDateString('en-US');
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toLocaleDateString('en-US');
    return { end_date, start_date, tomorrow };
};