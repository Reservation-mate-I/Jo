import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getDatabase, ref, update, get } from 'firebase/database';

const PasswordChangeScreen = ({ route }) => {
  const { userId } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userId);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserInfo(snapshot.val());
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdatePassword = async () => {
    if (!userInfo) {
      return;
    }

    if (password !== userInfo.password) {
      Alert.alert("현재 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword === '') {
      Alert.alert("새로운 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);

    try {
      await update(userRef, {
        password: newPassword
      });
      Alert.alert("비밀번호가 성공적으로 변경되었습니다.");
      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      Alert.alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>사용자 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 사용자 정보 표시 및 비밀번호 수정 인터페이스 */}
      <TextInput
        placeholder="현재 비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="새로운 비밀번호"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="새로운 비밀번호 확인"
        secureTextEntry={true}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleUpdatePassword} style={styles.button}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PasswordChangeScreen;
