import MaterialIcons from '@react-native-vector-icons/material-icons'
import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Date } from '../types/date'
import SelectDateModal from './SelectDateModal'

interface CalendarHeaderProps {
    currentMonth: number;
    currentYear: number;
    onTodayPress: () => void
    onDateChange: (date: Date) => void
}

const CalendarHeader = (props: CalendarHeaderProps) => {
    const { currentMonth, currentYear, onDateChange } = props
    const [dateModalVisible, setDateModalVisible] = useState(false);

    const monthName = useMemo(() => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return monthNames[currentMonth - 1]
    }, [currentMonth]);

    const onModalOpen = useCallback(() => {
        setDateModalVisible(true);
    }, []);

    const onModalClose = useCallback(() => {
        setDateModalVisible(false);
    }, []);

    const _onDateChange = useCallback((date: Date) => {
        onDateChange(date);
        setDateModalVisible(false);
    }, [onDateChange]);

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.left}>
                    <MaterialIcons name="menu" size={30} color="#e3e3e3" />
                    <TouchableOpacity onPress={onModalOpen}>
                        <Text style={styles.monthText}>{`${monthName} ${currentYear}`}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.right}>
                    <MaterialIcons name="search" size={32} color="#e3e3e3" />
                    <MaterialIcons name="today" size={30} color="#e3e3e3" onPress={props.onTodayPress} />
                </View>
            </View>
            {dateModalVisible && (
                <SelectDateModal
                    open={dateModalVisible}
                    onCancel={onModalClose}
                    onConfirm={_onDateChange}
                />
            )}
        </>
    )
}

export default CalendarHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 32
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    monthText: {
        color: '#e3e3e3',
        fontSize: 20,
        fontWeight: '600'
    }
})