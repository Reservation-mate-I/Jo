import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // 모달 가시성 상태
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지

  const handleLogin = () => {
    if (!email || !password) {
      setModalMessage('아이디와 비밀번호를 모두 입력해주세요.');
      setModalVisible(true);
      return;
    }
    // 아이디와 비밀번호가 일치하지 않는 경우
    if (email !== 'expectedEmail' || password !== 'expectedPassword') {
      setModalMessage('로그인 실패\nID 또는 PW가 일치하지 않습니다.');
      setModalVisible(true);
      return;
    }
    // 로그인 로직
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleOkPress = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
        <View style={styles.checkbox}>
          {rememberMe && <View style={styles.checkboxTick} />}
        </View>
        <Text style={styles.label}>아이디 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>또는</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.guestLoginButton}
        onPress={() => navigation.navigate('GuestLogin')}
      >
        <Text style={styles.guestLoginButtonText}>비회원 로그인</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleOkPress}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: width * 1.0, // 화면 너비의 90%로 설정
    height: 200, 
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 왼쪽 정렬
    marginBottom: 20,
    width: '100%',
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
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: 'black',
  },
  label: {
    margin: 8,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginVertical: 10,
    marginHorizontal: 5, 
    fontSize: 16,
    color: '#666',
  },
  guestLoginButton: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestLoginButtonText: {
    color: '#000',
    fontSize: 18,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#0000ff',
  },
  separator: {
    marginHorizontal: 10,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  okButton: {
    borderTopWidth: 1,
    borderColor: 'white',
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  okButtonText: {
    color: 'blue',
    fontSize: 18,
  },
});
