import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DatePicker = ({ onSelectDate, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
    onClose();
  };

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <Text style={styles.header}>날짜를 선택해주세요</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day) => handleDateSelection(day.dateString)}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: 'blue' },
                }}
                minDate={new Date().toISOString().split('T')[0]} 
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  calendarContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default DatePicker;
