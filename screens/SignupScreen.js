import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    // 회원가입 로직
    console.log('Student ID:', studentId);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);
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
          value={studentId}
          onChangeText={setStudentId}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="영어, 숫자, 특수기호로 이루어진 4~12자리"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호 확인 <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
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
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
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
