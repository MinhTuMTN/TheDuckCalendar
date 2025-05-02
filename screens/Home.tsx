import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import CalendarHeader from '../components/CalendarHeader';
import DateComponent from '../components/DateComponent';
import { Date } from '../types/date';
import { convertToDateData } from '../utils/dateUtils';

const Home = () => {
    const [currentDate, setCurrentDate] = React.useState<DateData>({
        year: dayjs().year(),
        month: dayjs().month() + 1,
        day: dayjs().date(),
        dateString: dayjs().format('YYYY-MM-DD'),
        timestamp: dayjs().unix()
    });
    const [currentMonth, setCurrentMonth] = React.useState({
        month: dayjs().month() + 1,
        year: dayjs().year()
    });

    const onDayPress = useCallback((day: DateData) => {
        setCurrentDate(day);
    }, []);

    const onMonthChange = useCallback((month: DateData) => {
        setCurrentMonth({
            month: month.month,
            year: month.year
        });
    }, []);

    const onTodayPress = useCallback(() => {
        setCurrentDate({
            year: dayjs().year(),
            month: dayjs().month() + 1,
            day: dayjs().date(),
            dateString: dayjs().format('YYYY-MM-DD'),
            timestamp: dayjs().unix()
        });

        setCurrentMonth({
            month: dayjs().month() + 1,
            year: dayjs().year()
        })

    }, []);

    

    const onDateChange = useCallback((date: Date) => {
        console.log(date);
        
        const result = convertToDateData(date);        
        setCurrentDate(result);
        console.log(result);
        

        setCurrentMonth({
            month: date.solar.month() + 1,
            year: date.solar.year()
        })
    }, []);

    const calendarTheme = useMemo(() => {
        return {
            calendarBackground: '#171717',
            weekVerticalMargin: 0,
            'stylesheet.calendar.main': {
                monthView: {
                    paddingHorizontal: 10
                }
            },
            'stylesheet.calendar.header': {
                headerContainer: {
                    display: 'none'
                },
                week: {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginHorizontal: 10,
                    position: 'relative'
                },
                dayHeader: {
                    marginBottom: 7,
                    textAlign: 'center',
                    fontSize: 13,
                    width: '14.2%',
                    color: '#a3a3a3',
                },
                dayTextAtIndex0: {
                    color: '#fd5056'
                }
            }
        }
    }, []);

    return (
        <View style={styles.container}>
            <CalendarHeader
                currentMonth={currentMonth.month}
                currentYear={currentMonth.year}
                onTodayPress={onTodayPress}
                onDateChange={onDateChange}
            />
            <Calendar
                initialDate={`${currentMonth.year}-${currentMonth.month}-01`}
                style={styles.calendar}
                theme={calendarTheme}
                hideArrows
                onMonthChange={onMonthChange}
                dayComponent={DateComponent}
                enableSwipeMonths
                current={currentDate.dateString}
                onDayPress={onDayPress}
            />
            <View style={styles.detail}>

            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#010101',
        flex: 1
    },
    calendar: {
        backgroundColor: '#171717',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderRadius: 20
    },
    detail: {
        height: Dimensions.get('window').height * 0.3
    }
})