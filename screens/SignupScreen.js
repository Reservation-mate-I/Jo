import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set, get } from 'firebase/database';

const { width } = Dimensions.get('window');

const SignupScreen = () =>{
  const [id, setId] = React.useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const validatePassword = (pw) => {
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,12}$/;
    return re.test(pw);
  };

  const handleSendCode = async () => {
    await sendVerificationCode(phone, setVerificationId, Alert);
  };
  
  const handleVerifyCode = async () => {
    await verifyCode(verificationId, verificationCode, Alert);
  };
  
  const handleSignUp = async () => {
    const db = getDatabase();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!validatePassword(password)) {
      alert("비밀번호는 영어, 숫자, 특수기호(!@#$%^&*)를 포함하여 4~12자리로 구성되어야 합니다.");
      return;
    }

    const userRef = ref(db, 'users/' + id);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      alert("이미 등록된 학번입니다.");
    } else {
      set(userRef, {
        password: password,
        name: name,
        phone: phone,
        email: email
      });
      alert("회원가입이 성공적으로 완료되었습니다.");
      navigation.navigate('LoginScreen');
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>학번(아이디) <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="학번"
          value={id}
          onChangeText={setId}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="영어, 숫자, 특수기호로 이루어진 4~12자리"
          value={password}
            onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 확인 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이름 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>메일주소 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>가입하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -30, // 상단 여백 추가
    marginBottom: 50, // 하단 여백 추가
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00274d',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: '#000',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignupScreen;