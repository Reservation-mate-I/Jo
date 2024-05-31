import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal } from 'react-native';

const { width } = Dimensions.get('window');

export default function PasswordChangeScreen({ route, navigation }) {
  const { studentId } = route.params; // 전달된 학번(아이디) 값을 가져옵니다.
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // 모달 가시성 상태

  const handleChangePassword = () => {
    // 비밀번호 변경 로직
    console.log('Student ID:', studentId);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);

    // 입력이 성공적으로 완료되면 모달을 표시합니다.
    setModalVisible(true);
  };

  const handleOkPress = () => {
    setModalVisible(false);
    navigation.navigate('뒤로가기'); // LoginScreen으로 이동
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>비밀번호 변경</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>학번(아이디) <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="변경하는 해당 ID 표시(수정 못하게 처리)"
            value={studentId}
            editable={false} // 수정 불가 처리
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>새 비밀번호 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="영어, 숫자, 특수기호로 이루어진 4~12자리"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>새 비밀번호 확인 <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
          <Text style={styles.changeButtonText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </ScrollView>

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
            <Text style={styles.modalText}>변경이 완료 되었습니다.</Text>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
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
  changeButton: {
    backgroundColor: '#000',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 18,
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
