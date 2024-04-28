import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useUser, UserProvider } from '../../UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DateComponent from '../DandT/Date';
import TimeComponent from '../DandT/Time';

const FootballCenter = () => {
  const { userId } = useUser(); 
  const SelectDate = SelectDate;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false); 

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const DateClick = () => {
  };  

    return (
        <UserProvider>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View>
                        <Icon name="ios-arrow-back" size={100}/> 
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <View>
                    <Text>국립 강릉원주대학교</Text>
                    <Text>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
                        <Text>풋살장</Text>
                    <TouchableOpacity onPress={() => setShowCalendar(true)}>
                        <View style={[styles.Sbox]}>
                            <Text>날짜</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() => setShowCalendar(true)}>
                            <View style={[styles.box]}>
                                <Text>{showCalendar && <DateComponent onSelectDate={handleDateSelection} />}
                                <TouchableOpacity onPress={() => setShowTimeModal(true)}></TouchableOpacity>
                                <TimeComponent
                                    visible={showTimeModal}
                                    onClose={() => setShowTimeModal(false)}
                                    onSelectTime={handleTimeSelection}/>
                                {selectedDate && <Text>선택한 날짜: {selectedDate}</Text>}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => setShowCalendar(true)}>
                        <View style={[styles.Sbox]}>
                            <Text>시간</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.Sbox]}>
                            <Text>시작</Text>
                    </View>
                    <View style={[styles.Sbox]}>
                            <Text>종료</Text>
                    </View>
                </View>
            </View>
        </UserProvider>
    );
};

const styles = StyleSheet.create({
  Sbox: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  box: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default FootballCenter;
