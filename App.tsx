import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import CalendarHeader from './component/CalendarHeader';
import DateComponent from './component/DateComponent';

const App = () => {
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
    console.log("Clicked on day: ", day);
    
    setCurrentDate(day);
  }, []);

  // // Optimize the component rendering by using React.memo in DateComponent
  // // and only passing what's necessary
  // const renderDayComponent = useCallback((date: DayProps & {
  //   date?: DateData;
  // }) => {
  //   const isSelectedDay = date.date?.dateString === currentDate;
  //   return <DateComponent 
  //   key={date.date?.dateString}
  //     state={date.state}
  //     dateTime={date.date as DateData}
  //     onDayPress={onDayPress} 
  //     isSelected={isSelectedDay} 
  //   />;
  // }, [currentDate, onDayPress]);

  const onMonthChange = useCallback((month: DateData) => {
    setCurrentMonth({
      month: month.month,
      year: month.year
    });
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
    <>
      <View style={styles.container}>
        <CalendarHeader currentMonth={currentMonth.month} currentYear={currentMonth.year} />
        <Calendar
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="#010101"
      />
    </>
  )
}

export default App

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