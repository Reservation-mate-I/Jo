import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

export default function GuestLoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);

  const handleGuestLogin = () => {
    // 비회원 로그인 로직
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('SMS Consent:', smsConsent);
  };

  const toggleSmsConsent = () => {
    setSmsConsent(!smsConsent);
  };

  return (
    <View style={styles.container}>
      {/* 비회원 로그인 텍스트를 상단에 배치 */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>비회원 로그인</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="이름"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleGuestLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
          <View style={styles.separatorContainer}>
            <View style={styles.line} />
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={toggleSmsConsent} style={styles.checkbox}>
              {smsConsent && <View style={styles.checkboxTick} />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>sms 알림 동의</Text>
          </View>
        </View>
      </ScrollView>
      {/* 화면 하단에 로고 배치 */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // 비회원 로그인 텍스트를 감싸는 컨테이너
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 60,
  },
  // 스크롤 컨테이너 스타일
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // 나머지 요소들을 중앙에 배치
    alignItems: 'center',
    paddingVertical: 50, // 요소들을 중간에 두기 위해 패딩 추가
  },
  // 스크롤 뷰 내부 콘텐츠 스타일
  content: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center', // 요소들을 세로 중앙에 배치
  },
  // 비회원 로그인 텍스트 스타일
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#00274d', 
  },
  // 입력 필드 스타일
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  // 로그인 버튼 스타일
  loginButton: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
  },
  // 구분선 컨테이너 스타일
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  // 구분선 스타일
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  // 체크박스 컨테이너 스타일
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 체크박스 체크 스타일
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: 'black',
  },
  // 체크박스 라벨 스타일
  checkboxLabel: {
    marginLeft: 8,
  },
  // 로고 컨테이너 스타일
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // 로고 이미지 스타일
  logo: {
    width: width * 0.6, // 화면 너비의 60%
    height: width * 0.3, // 높이 30%
    resizeMode: 'contain',
  },
});
