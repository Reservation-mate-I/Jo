import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // expo-linear-gradient import
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const iconsData = [
  { id: 1, name: '풋살장', engName: 'FootballCenter', position: { top: 200 } },
  { id: 2, name: '체육관', engName: 'SportsCenter', position: { top: 300 } },
  { id: 3, name: '운동장', engName: 'Ground', position: { top: 400 } },
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
        
        <View style={styles.header}>
          <LinearGradient style={styles.headerContainer} colors={['#DDF3FF', '#DDF3FF']}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
              <Image source={require('../../assets/back-icon.png')} style={styles.backIcon} />
            </TouchableOpacity>


            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../../assets/GWNU-LOGO.png')}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
              <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
            </View>
            <View style={styles.spacer}/>
          </LinearGradient>
        </View>

        <View style={styles.user}>
          <View style={styles.userBackground}>
            {userId && <Text style={styles.userText}>{`${userId}님 환영합니다!`}</Text>}
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {iconsData.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              onPress={() => handleIconClick(icon.engName)}
              style={[styles.button, { top: icon.position.top }]}>
              <Text style={styles.buttonText}>{icon.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: hp('5%'),
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: hp('15%'),
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: wp('22%'),
    marginLeft: wp('-10%'),
  },
  imageStyle: {
    top: hp('1%'),
    width: wp('16%'),
    height:hp('7%'),
    left: wp('9%'),
  },
  textContainer: {
    width: wp('60%'),
    alignItems: 'center',
  },
  textStyle: {
    fontSize: hp('3%'), 
    top: hp('1%'), 
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#343a40',
  },
  subHeader: {
    fontSize: hp('1%'), 
    top: hp('2%'), 
    fontWeight: 'bold',
    color: '#868296',
  },
  user: {
    alignSelf: 'flex-start',  
    marginTop: '5%',
    width: '100%', // 전체 가로 설정
  },
  userBackground: {
    backgroundColor: '#DDF3FF', // 배경색 설정
   
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: wp('3%'), // 왼쪽 마진 추가
    padding: 10,
  },
  backIconContainer: {
    position: 'absolute', // 절대 위치 지정
    left: wp('5%'), // 좌측 여백 조정
    top: hp('6%'), // 상단 여백 조정
  },
  backIcon:{
    width: wp('5%'),
    height: hp('5%'),
  },
  buttonsContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DDF3FF',
    paddingHorizontal: wp('8%'),
    paddingVertical: hp('2%'),
    borderRadius: 10,
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#343a40',
  },
});

export default GymRvmain;