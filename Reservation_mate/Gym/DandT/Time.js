import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const TimeComponent = ({ visible, onClose, onSelectTime }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectingStart, setSelectingStart] = useState(false);
  const [selectingEnd, setSelectingEnd] = useState(false);

  const times = Array.from({ length: 14 }, (_, i) => {
    const hour = 9 + i;
    return `${hour < 10 ? `0${hour}` : hour}:00`;
  });

  const handleTimeSelection = (selectedTime) => {
    if (selectingStart) {
      setStartTime(selectedTime);
      setSelectingStart(false);
    } else if (selectingEnd) {
      if (startTime && selectedTime > startTime) {
        setEndTime(selectedTime);
        setSelectingEnd(false);
      } else {
        alert("End time should be later than start time");
      }
    }
  };

  const handleConfirmClick = () => {
    if (startTime && endTime) {
      onSelectTime({ startTime, endTime });
      onClose();
    } else {
      alert("Please select start time and end time");
    }
  };

  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Time Selection</Text>

            <TouchableOpacity onPress={() => setSelectingStart(true)} style={styles.timeButton}>
              <Text style={styles.timeButtonText}>Start Time: {startTime || "Not selected"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectingEnd(true)} style={styles.timeButton}>
              <Text style={styles.timeButtonText}>End Time: {endTime || "Not selected"}</Text>
            </TouchableOpacity>

            {(selectingStart || selectingEnd) && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.timeSlot}
                    onPress={() => handleTimeSelection(time)}
                  >
                    <Text style={styles.timeSlotText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmClick}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalWrapper: {
    maxWidth: windowWidth * 0.8,
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  timeSlot: {
    width: windowWidth * 0.2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  timeSlotText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  timeButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TimeComponent;
