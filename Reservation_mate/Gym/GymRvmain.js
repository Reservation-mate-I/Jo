import React from 'react';
import { View, Text, TouchableOpacity, Image, 
  Alert} from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const iconsData = [
  { id: 1, name: '풋살장', engName: 'FootballCenter', position: {top: 55 } },
  { id: 2, name: '체육관', engName: 'SportsCenter', position: {top: 180 } },
  { id: 3, name: '운동장', engName: 'Ground', position: {top: 300 } },
];

const GymRvmain = () => {
  const { userId } = useUser(); 
  const navigation = useNavigation();
  const handleIconClick = (engName) => {
    navigation.navigate(engName);
  };  
  
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
            <View>{userId && <Text>{`${userId}님 환영합니다!`}</Text>}
            </View>
            <View>
              {iconsData.map((icon) => (
              <TouchableOpacity
                key={icon.id}
                onPress={() => handleIconClick(icon.engName)}>
                <Text>{icon.name}</Text>
              </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
    </UserProvider>
  );
};

export default GymRvmain;
