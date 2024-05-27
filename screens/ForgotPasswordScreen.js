import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal } from 'react-native';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // 모달 가시성 상태

  const handleFindPassword = () => {
    // 비밀번호 찾기 로직
    console.log('Student ID:', studentId);
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);
    
    // 입력이 성공적으로 완료되면 모달을 표시합니다.
    setModalVisible(true);
  };

  const handleOkPress = () => {
    setModalVisible(false);
    navigation.navigate('PasswordChange', { studentId }); // PasswordChangeScreen으로 이동하며 studentId를 전달
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>비밀번호 찾기</Text>
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
        <TouchableOpacity style={styles.findButton} onPress={handleFindPassword}>
          <Text style={styles.findButtonText}>확인</Text>
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
            <Text style={styles.modalText}>확인이 완료 되었습니다.</Text>
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
    marginTop: -100,
    marginBottom: 100, 
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
  findButton: {
    backgroundColor: '#000',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  findButtonText: {
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
