import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'

interface CalendarHeaderProps {
    currentMonth: number;
    currentYear: number;
    onTodayPress: () => void
}

const CalendarHeader = (props : CalendarHeaderProps) => {
    const { currentMonth, currentYear } = props

    const monthName = useMemo(() => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return monthNames[currentMonth - 1]
    }, [currentMonth]);
    return (
        <View style={styles.headerContainer}>
            <View style={styles.left}>
                <Feather name="menu" size={30} color="#e3e3e3" />
                <Text style={styles.monthText}>{`${monthName} ${currentYear}`}</Text>
            </View>
            <View style={styles.right}>
                <Feather name="search" size={30} color="#e3e3e3" />
                <MaterialIcons name="today" size={30} color="#e3e3e3" onPress={props.onTodayPress} />
            </View>
        </View>
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
        paddingVertical: 15
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