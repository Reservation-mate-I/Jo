import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const STimePicker = ({ visible = true, onClose, onSelectTime }) => {
    const [startTime, setStartTime] = useState(null);
  
    const times = Array.from({ length: 14 }, (_, i) => {
      const hour = 9 + i;
      return `${hour < 10 ? `0${hour}` : hour}:00`;
    });
  
    const handleTimeSelection = (selectedTime) => {
      setStartTime(selectedTime);
      onSelectTime(selectedTime);
      onClose();
    };
  
    return (
      <Modal transparent visible={visible} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.overlay} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>시작 시간 선택</Text>
            <ScrollView style={styles.scrollView}>
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
            <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
              <Text style={styles.confirmButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // 화면 하단에 위치하도록 설정
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 20,
      width: windowWidth * 0.8,
      maxHeight: windowHeight * 0.5,
      overflow: 'hidden',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    scrollView: {
      maxHeight: '70%',
    },
    timeSlot: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    timeSlotText: {
      fontSize: 16,
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
  });
  
export default STimePicker;
