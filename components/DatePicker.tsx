import dayjs from 'dayjs';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { monthDays } from 'solarlunar';
import { Date } from '../types/date';
import { convertLunarToSolar, convertSolarToLunar } from '../utils/dateUtils';

interface DatePickerProps {
  onDateChange: (date: Date) => void;
  mode: 'lunar' | 'solar';
}

interface LabelValuePair {
  label: string;
  value: number;
}

interface DatePickerState {
  year: number;
  month: number;
  day: number;
}

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { mode, onDateChange } = props;
  const [selectedDate, setSelectedDate] = useState<DatePickerState>();
  const [days, setDays] = useState<LabelValuePair[]>([]);
  const [months, setMonths] = useState<LabelValuePair[]>([]);
  const [years, setYears] = useState<LabelValuePair[]>([]);

  const onMonthChange = useCallback((value: number) => {
    console.log('onMonthChange', value);
    setSelectedDate((prev) => {
      if (!prev) return { year: dayjs().year(), month: value, day: dayjs().date() };
      return {
        ...prev,
        month: value
      };
    });
  }, []);

  const onDayChange = useCallback((value: number) => {
    console.log('onDayChange', value);
    setSelectedDate((prev) => {
      if (!prev) return { year: dayjs().year(), month: dayjs().month(), day: value };
      return {
        ...prev,
        day: value
      };
    });
  }, []);

  const onYearChange = useCallback((value: number) => {
    console.log('onYearChange', value);
    setSelectedDate((prev) => {
      if (!prev) return { year: value, month: dayjs().month(), day: dayjs().date() };
      return {
        ...prev,
        year: value
      };
    });
  }, []);

  useEffect(() => {
    console.log('DatePicker useEffect 1');
    const _months = [
      { label: 'JAN', value: 0 },
      { label: 'FEB', value: 1 },
      { label: 'MAR', value: 2 },
      { label: 'APR', value: 3 },
      { label: 'MAY', value: 4 },
      { label: 'JUN', value: 5 },
      { label: 'JUL', value: 6 },
      { label: 'AUG', value: 7 },
      { label: 'SEP', value: 8 },
      { label: 'OCT', value: 9 },
      { label: 'NOV', value: 10 },
      { label: 'DEC', value: 11 }
    ]
    setMonths(_months);

    const _years = Array.from({ length: 401 }, (_, index) => index + 1800).map((year) => ({
      label: year.toString(),
      value: year
    }));
    setYears(_years);

    setSelectedDate({
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date()
    });
  }, []);

  // Update days when month or year changes
  useEffect(() => {
    console.log('Update days');
    if (!selectedDate) return;
    let dayInMonth;
    if (mode === 'lunar') {
      dayInMonth = monthDays(selectedDate.year, selectedDate.month + 1);
    } else {
      dayInMonth = dayjs(`${selectedDate.year}-${selectedDate.month + 1}-01`).daysInMonth();
    }

    const _days = Array.from({ length: dayInMonth }, (_, index) => (index + 1)).map((day) => ({
      label: day.toString(),
      value: day
    }));
    setDays(_days);
    
    setSelectedDate((prev) => {
      if (!prev) return { year: dayjs().year(), month: dayjs().month(), day: dayjs().date() };
      return {
        ...prev,
        day: Math.min(dayInMonth, prev.day)
      };
    });
  }, [selectedDate?.month, selectedDate?.year]);

  useEffect(() => {
    console.log('DatePicker useEffect');
    if (!selectedDate) return;

    try {
      let result;
      if (mode === 'solar') {
        const solarDate = dayjs(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`);
        const lunarDate = convertSolarToLunar(solarDate);
        result = {
          solar: solarDate,
          lunar: lunarDate
        };
      } else {
        const lunarDate = dayjs(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`);
        const convertedDate = convertLunarToSolar(lunarDate);
        const solarDate = dayjs(`${convertedDate.cYear}-${convertedDate.cMonth}-${convertedDate.cDay}`);
        result = {
          solar: solarDate,
          lunar: convertSolarToLunar(solarDate)
        };
      }
      onDateChange(result);
    } catch (error) {
      // Handle conversion errors silently
    }
  }, [selectedDate, onDateChange]);

  // On mode change, update the selected date
  useEffect(() => {
    console.log('mode useEffect');
    if (!selectedDate) return;

    try {
      if (mode === 'lunar') {
        const solarDate = dayjs(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`);
        const lunarDate = convertSolarToLunar(solarDate);
        setSelectedDate({
          year: lunarDate.lYear,
          month: lunarDate.lMonth - 1,
          day: lunarDate.lDay
        });
      } else {
        const lunarDate = dayjs(`${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`);
        const convertedDate = convertLunarToSolar(lunarDate);
        setSelectedDate({
          year: convertedDate.cYear,
          month: convertedDate.cMonth - 1,
          day: convertedDate.cDay
        });
      }
    } catch (error) {
      // Reset to current date in case of conversion errors
      const currentDate = dayjs();
      setSelectedDate({
        year: currentDate.year(),
        month: currentDate.month(),
        day: currentDate.date()
      });
    }
  }, [mode]);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#eee4e4' }}>
      <Picker
        textColor='#7dce91'
        textSize={30}
        style={styles.item}
        selectedValue={selectedDate?.month}
        pickerData={months}
        onValueChange={onMonthChange}
      />
      <Picker
        textColor='#7dce91'
        textSize={30}
        style={styles.item}
        selectedValue={selectedDate?.day}
        pickerData={days}
        onValueChange={onDayChange}
      />
      <Picker
        textColor='#7dce91'
        textSize={30}
        style={styles.item}
        selectedValue={selectedDate?.year}
        pickerData={years}
        onValueChange={onYearChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#252525',
    borderRadius: 10,
  }
});

export default memo(DatePicker);
