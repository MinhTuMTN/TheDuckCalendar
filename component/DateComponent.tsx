import dayjs from 'dayjs';
import React, { useMemo, useCallback } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import { solar2lunar } from 'solarlunar';

interface DateComponentProps {
  state: any;
  dateTime: DateData;
  onDayPress: (date: DateData) => void;
  isSelected: boolean;
}

function DateComponent(props: DayProps & {
    date?: DateData;
    current?: DateData;
}) {
    
  const { current, state, dateTime, onPress } = {
    current: props.current,
    state: props.state,
    dateTime: props.date,
    onPress: props.onPress
  };

  const shortLunarString = useMemo(() => {
    if (!dateTime) return '';
    const lunar: any = solar2lunar(dateTime.year, dateTime.month, dateTime.day);
    return `${lunar.lDay}/${lunar.lMonth}`;
  }, [dateTime]);

  const isToday = useMemo(() => {
    if (!dateTime) return false;
    return dayjs(dateTime.dateString).isSame(dayjs(), 'day');
  }, [dateTime]);

  const _onPress = useCallback(() => {
          onPress?.(dateTime);
      }, [onPress, dateTime]);

  const isDisabled = useMemo(() => state === 'disabled', [state]);
  console.log("Rendering", dateTime?.dateString);
  const isSelected = useMemo(() => {
    
      return dateTime?.dateString === current;
  }, [current, dateTime]);
  
 
  return (
    <Pressable
      onPress={_onPress}
      style={[styles.dateComponent, isSelected && styles.selectedDate]}
    >
      <Text
        style={[
          styles.primaryDate,
          isToday && styles.primaryToday,
          isDisabled && styles.disabledDate,
        ]}
      >
        {dateTime?.day}
      </Text>
      <Text style={[styles.secondaryDate, isDisabled && styles.disabledDate]}>
        {shortLunarString}
      </Text>
    </Pressable>
  );
}

function areEqual(prevProps : any, nextProps : any) {
    const { prevCurrent,  prevDateTime} = {
        prevCurrent: prevProps.current,
        prevDateTime: prevProps.date,
    };

    const { nextCurrent,  nextDateTime} = {
        nextCurrent: nextProps.current,
        nextDateTime: nextProps.date,
    };

    const prevSelected = prevCurrent === prevDateTime?.dateString;
    const nextSelected = nextCurrent === nextDateTime?.dateString;

  return prevDateTime?.dateString === nextDateTime?.dateString && prevSelected === nextSelected;
}

export default React.memo(DateComponent, areEqual);

const styles = StyleSheet.create({
  dateComponent: {
    width: (Dimensions.get('window').width - 20) / 7,
    height: Dimensions.get('window').height * 0.6 / 5,
    alignItems: 'center',
  },
  selectedDate: {
    borderColor: '#269278',
    borderWidth: 2,
    borderRadius: 5,
  },
  disabledDate: {
    color: '#484848',
  },
  primaryDate: {
    color: '#e4e4e4',
    fontSize: 15,
    fontWeight: '600',
    padding: 2,
    aspectRatio: 1,
    height: 25,
    textAlign: 'center',
  },
  primaryToday: {
    backgroundColor: '#fd5056',
    borderRadius: 5,
  },
  secondaryDate: {
    fontSize: 11,
    color: '#acacac',
  },
});
