import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,ImageBackground, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import {userId} from '../LoginPage';

const SU_Approval = ({ navigation, route }) => {
  const handleGym = () => {
    navigation.navigate('GymRvmain');
  };
  const handleBus = () => {
    navigation.navigate('BusScreen');
  };
  const handleRS_Check = () => {
    navigation.navigate('RS_Check');
  };
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient style={styles.headerContainer} colors = {['#bfe1fb', '#bfe1fb']}>
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
            <ImageBackground source={require('../../assets/back-icon.png')}style={styles.backIcon}
                resizeMode="contain"/>
          </TouchableOpacity>

      </View>
      
      <View style={styles.user}>
        <View style={styles.userBackground}>
          <Text style={styles.userText}>
            {userId === '관리자' ? (
              <Text>관리자님 환영합니다!</Text>
            ) : (
              <Text>{userId}님 환영합니다!</Text>
             )}
          </Text>
        </View>
    </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    paddingVertical: hp('5%'),
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: wp('18%'),
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
  textContainer: {
    width: wp('60%'),
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
  imageStyle: {
    top: hp('1%'),
    width: wp('16%'),
    height:hp('7%'),
    left: wp('9%'),
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
  imageContainer: {
    width: wp('22%'), 
    marginLeft: wp('8%'),
  },
  GymButton: {
    flexDirection: 'row', // 좌우로 나란히 배치
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'space-between', // 각 요소를 양 끝으로 분산
    padding: 10, // 버튼 내부의 패딩
    backgroundColor: '#95cdf7', // 배경 색상
  },
  ButtonText: {
    fontSize: 37,
    fontWeight: 'bold',
    color: '#FFF',
  },
  ArrowText: {
    fontSize: 47,
    color: '#FFF',
    fontWeight: 'bold',
  },
  BusButton: {
    flexDirection: 'row', // 좌우로 나란히 배치
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'space-between', // 각 요소를 양 끝으로 분산
    padding: 10, // 버튼 내부의 패딩
    backgroundColor: '#81c3f6',
  },

  MyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 0,
  },
  MyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  RS_CheckButton: {
    flexDirection: 'row', // 좌우로 나란히 배치
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'space-between', // 각 요소를 양 끝으로 분산
    padding: 10, // 버튼 내부의 패딩
    backgroundColor: '#57aff3',
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
});

export default SU_Approval;
