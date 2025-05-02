import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Date } from '../types/date';
import { convertSolarToLunar, getDateString, getReverseMode } from '../utils/dateUtils';
import DatePicker from './DatePicker';

interface SelectDateModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: (date: Date) => void;
}

const SelectDateModal = (props: SelectDateModalProps) => {
    const { open, onCancel, onConfirm } = props;
    const [selectedMode, setSelectedMode] = useState<'lunar' | 'solar'>('solar');
    const [currentDate, setCurrentDate] = useState({
        solar: dayjs(),
        lunar: convertSolarToLunar(dayjs())
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onDateChange = useCallback((date: Date) => {
        setCurrentDate(date);
        console.log('SelectDateModal ', date);
        
    }, []);

    const onModeChange = useCallback(() => {
        if (isButtonDisabled) return;

        setSelectedMode(prev => prev === 'solar' ? 'lunar' : 'solar');

        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 700
    );
    }, [isButtonDisabled]);

    const currentDateTitle = useMemo(() => {
        return getDateString(currentDate, selectedMode)
    }, [selectedMode, currentDate]);

    const convertDate = useMemo(() => {
        return getDateString(currentDate, getReverseMode(selectedMode), true)
    }, [selectedMode, currentDate])

    const _onCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    const _onConfirm = useCallback(() => {
        onConfirm(currentDate);
    }, [onConfirm, currentDate]);

    return (
        <Modal visible={open} transparent={true} animationType="slide" >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {currentDateTitle}
                        </Text>
                        <TouchableOpacity 
                            style={styles.calendarMode}
                            onPress={onModeChange}
                            disabled={isButtonDisabled}
                        >
                            <Text style={styles.calendarModeText}>{selectedMode === 'solar' ? 'Solar' : 'Lunar'}</Text>
                        </TouchableOpacity>
                    </View>
                    <DatePicker
                        onDateChange={onDateChange}
                        mode={selectedMode}
                    />
                    <View style={styles.modalFooter}>
                        <Text style={styles.modalFooterText}>{convertDate}</Text>
                        <View style={styles.footerAction}>
                        <TouchableOpacity style={styles.footerButton} onPress={_onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={styles.modalFooterSeparator} />
                        <TouchableOpacity style={styles.footerButton} onPress={_onConfirm}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default React.memo(SelectDateModal);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    modalTitle: {
        fontSize: 16,
        color: '#fff',
        textDecorationLine: 'underline',
        paddingLeft: 16,
        flex: 8,
        textAlign: 'center',
    },
    calendarMode: {
        flex: 2,
        paddingHorizontal: 1.5,
        paddingVertical: 3,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendarModeText: {
        color: '#fff',
    },
    closeButton: {
        padding: 8,
    },
    modalContent: {
        borderRadius: 32,
        rowGap: 8,
        backgroundColor: '#252525',
    },
    modalFooter: {
        paddingTop: 16,
        flexDirection: 'column',
    },
    modalFooterText: {
        color: '#04d2a5',
        fontSize: 15,
        paddingLeft: 24,
    },
    footerAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    footerButton: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#7dce91',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalFooterSeparator: {
        width: 1,
        height: '35%',
        backgroundColor: '#fafafa50',
    },
})