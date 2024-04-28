import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DateComponent = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Date</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => handleDateSelection(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  calendarContainer: {
    marginTop: 20,
  },
});

export default DateComponent;
