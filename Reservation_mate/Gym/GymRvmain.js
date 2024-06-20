import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // expo-linear-gradient import
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';

const iconsData = [
  { id: 1, name: '풋살장', engName: 'FootballCenter', position: { top: 200 }, 
  image: require('../../assets/football-icon.png') },
  { id: 2, name: '체육관', engName: 'SportsCenter', position: { top: 300 }, 
  image: require('../../assets/gym-icon.png') },
  { id: 3, name: '운동장', engName: 'Ground', position: { top: 400 }, 
  image: require('../../assets/track-icon.png') },
];

const GymRvmain = () => {
  const route = useRoute();
  const { userId } = route.params;
  const navigation = useNavigation();
  const handleIconClick = (engName) => {
    navigation.navigate(engName, { userId });
  };  
  
  return (
    <UserProvider>
      <View>
        
        <View style={styles.header}>
          <LinearGradient style={styles.headerContainer} colors={['#bfe1fb', '#bfe1fb']}>
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
              <View style={styles.buttonContent}>
                <Image source={icon.image} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{icon.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
              <ImageBackground source={require('../../assets/back-icon.png')}style={styles.backIcon}
                resizeMode="contain"/>
            </TouchableOpacity>
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
    backgroundColor: '#bfe1fb', // 배경색 설정
   
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: wp('3%'), // 왼쪽 마진 추가
    padding: 10,
  },
  backIconContainer: {
    position: 'absolute', // 절대 위치 지정
    left: wp('2%'), // 좌측 여백 조정
    top: hp('5%'), // 상단 여백 조정
  },
  backIcon:{
    width: wp('7%'),
    height:hp('7%'),

  },
  buttonsContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  button: {
    flexDirection: 'row', // 버튼 안의 요소들을 가로로 정렬하기 위해 필요
    width: wp('70%'), // 버튼의 너비를 강제로 지정
    height: hp('20%'), // 버튼의 높이를 강제로 지정
    backgroundColor: '#95cdf7',
    borderRadius: 30,
    marginVertical: hp('-3%'),
    alignItems: 'center', // 가로 중앙 정렬을 위해 추가
    justifyContent: 'center', // 세로 중앙 정렬을 위해 추가
    borderColor: '#60b4f3',
    borderWidth: 5,
  },
  buttonText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
  },
  buttonContent: {
    width: '100%', // 버튼 컨텐츠의 너비를 100%로 설정하여 이미지가 버튼을 가득 채우도록 함
    height: '100%', // 버튼 컨텐츠의 높이를 100%로 설정하여 이미지가 버튼을 가득 채우도록 함
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: hp('10%'), // 이미지의 너비를 강제로 지정
    height: hp('10%'), // 이미지의 높이를 강제로 지정
    resizeMode: 'contain', // 이미지를 버튼에 맞게 조정
  },
});

export default GymRvmain;