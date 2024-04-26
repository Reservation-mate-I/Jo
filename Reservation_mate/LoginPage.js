import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 페이지</Text>
      <TextInput style={styles.input} placeholder="아이디" />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry={true} />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
            <Text style={styles.signupButtonText}>회원가입</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // 스타일 코드
});

export default LoginPage;
