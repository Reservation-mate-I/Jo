import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const RS_Check = () => {
  const { userId } = useUser(); 
  const navigation = useNavigation();
  
  return (
    <UserProvider>
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                    <Icon name="ios-arrow-back" size={35}/> 
                </View>
            </TouchableOpacity>
        </View>
        <View>
            <View>
                <Text>국립 강릉원주대학교</Text>
                <Text>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
            </View>
            <View>
                <View>{userId && <Text>{`${userId}님의 예약내역`}</Text>}
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: 'lightgray', margin: 10 }}>
                <Text>No.1</Text>
                <Text>체육 시설 예약_체육관</Text>
                <Text>일정</Text>
                <Text>2024년 04월 09일 12:00-14:00</Text>
                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ padding: 5, backgroundColor: 'lightblue'}}>
                        <Text>예약 변경</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{ padding: 5, backgroundColor: 'lightgreen'}}>
                        <Text>예약 취소</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </UserProvider>
  );
};

export default RS_Check;
