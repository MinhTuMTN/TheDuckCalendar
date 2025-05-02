import dayjs from "dayjs";
import { solar2lunar, lunar2solar } from "solarlunar";
import { Date } from "../types/date";
import { DateData } from "react-native-calendars";

export function convertSolarToLunar(date: dayjs.Dayjs) {
    const lunar = solar2lunar(date.year(), date.month() + 1, date.date());
    return lunar;
}

export function convertLunarToSolar(date: dayjs.Dayjs) {
    const solar = lunar2solar(date.year(), date.month() + 1, date.date());
    return solar;
}

export function getMonthName(month: number, type?: 'short' | 'long') {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return type === 'short' ? shortMonths[month] : months[month];
}

export function getDateString(date: Date, mode: 'solar' | 'lunar', modeName?: boolean) {
    let result = '';
    if (mode === 'solar') {
        result = `${getMonthName(date.solar.month())} ${date.solar.date().toString().padStart(2, '0')}, ${date.solar.year()}`
    } else {
        result = `${getMonthName(date.lunar.lMonth - 1)} ${date.lunar.lDay.toString().padStart(2, '0')}, ${date.lunar.lYear}`
    }

    if (modeName) {
        result = `${result} (${mode === 'solar' ? 'Solar' : 'Lunar'})`
    }
    return result;
}

export function getReverseMode(mode: 'solar' | 'lunar') {
    return mode === 'solar' ? 'lunar' : 'solar';
}

export function isToday(year: number, month: number, day: number) {
    const today = dayjs();
    return year === today.year() && month === today.month() && day === today.date();
}

export function convertToDateData(date: Date) {
    const result : DateData = {
        year: date.solar.year(),
        month: date.solar.month() + 1,
        day: date.solar.date(),
        dateString: date.solar.format('YYYY-MM-DD'),
        timestamp: date.solar.unix()
    }
    return result;
}
