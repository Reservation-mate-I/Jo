import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, StyleSheet } from 'react-native';
import { useUser, UserProvider } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';  // expo-linear-gradient import
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BusScreen = () => {
  const { userId } = useUser(); 
  const navigation = useNavigation();
  const handlePress = () => {
    Alert.alert('Box clicked!');
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
              <ImageBackground source={require('../../assets/back-icon.png')}style={styles.backIcon}
                resizeMode="contain"/>
            </TouchableOpacity>
      </View>
      <View>
      <Text>버스 좌석 예약</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>Can't Touch This!</Text>
      </View>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Text style={styles.boxText}>08:00</Text>
        <Text>x</Text>
        <Text>x</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Text style={styles.boxText}>09:00</Text>
        <Text>x</Text>
        <Text>x</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Text style={styles.boxText}>10:00</Text>
        <Text>x</Text>
        <Text>x</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Text style={styles.boxText}>16:00</Text>
        <Text>o</Text>
        <Text>x</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Text style={styles.boxText}>17:00</Text>
        <Text>o</Text>
        <Text>x</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Text style={styles.boxText}>18:00</Text>
        <Text>o</Text>
        <Text>x</Text>
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
  box: {
    width: 300,
    height: 80,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusScreen;