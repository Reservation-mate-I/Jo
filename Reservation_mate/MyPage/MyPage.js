import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Modal, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const MyPage = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

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

  const handlePasswordChange = () => {
    navigation.navigate('PasswordChangeScreen', { userId: userId });
  };

  const handleDeleteAccount = () => {
    setModalVisible(true);
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };
  console.log(userId);

  const cancelDeleteAccount = () => {
    setModalVisible(false);
    setPassword('');
  };

  const confirmDeleteAccount = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}/password`);
      const snapshot = await get(userRef);
      const savedPassword = snapshot.val();
      if (password === savedPassword) {
        await remove(ref(db, `users/${userId}`));
        setModalVisible(false);
        navigation.navigate('LoginScreen');
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
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
        <View style={styles.spacer} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
          <ImageBackground source={require('../../assets/back-icon.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.pageTitle}>마이 페이지</Text>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}>학번:</Text>
          <Text style={styles.infoText}>{userId}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}>이름:</Text>
          <Text style={styles.infoText}>{userInfo.name}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}>전화번호:</Text>
          <Text style={styles.infoText}>{userInfo.phone}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePasswordChange}>
          <Text style={styles.button}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.button}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={[styles.button, styles.deleteButton]}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for delete confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelDeleteAccount}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>회원 탈퇴를 진행하시겠습니까?</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 입력하세요"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={cancelDeleteAccount}>
                <View style={styles.modalButton}>
                  <Text style={styles.buttonText}>취소</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDeleteAccount}>
                <View style={[styles.modalButton, styles.deleteButton]}>
                  <Text style={styles.buttonText}>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    marginLeft: wp('8%'),
  },
  imageStyle: {
    top: hp('1%'),
    width: wp('16%'),
    height: hp('7%'),
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
  spacer: {
    width: wp('18%'),
  },
  backIconContainer: {
    position: 'absolute',
    left: wp('2%'),
    top: hp('5%'),
  },
  backIcon: {
    width: wp('7%'),
    height: hp('7%'),
  },
  pageTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
    marginTop: hp('20%'), // 헤더 높이에 맞춰서 마진을 조정
  },
  userInfoContainer: {
    marginTop: hp('5%'),
    paddingHorizontal: wp('5%'),
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  infoLabel: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#343a40',
  },
  infoText: {
    fontSize: hp('2%'),
    color: '#343a40',
  },
  buttonContainer: {
    marginTop: hp('5%'),
    paddingHorizontal: wp('5%'),
  },
  button: {
    backgroundColor: 'transparent',
    padding: hp('2%'),
    borderRadius: 5,
    marginVertical: hp('1%'),
    borderWidth: 1,
    borderColor: '#007bff',
    textAlign: 'center',
    fontSize: hp('2%'),
    color: '#007bff',
  },
  deleteButton: {
    borderColor: 'red',
    color: 'red',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: hp('3%'),
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: hp('2.5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: hp('1.5%'),
    marginBottom: hp('2%'),
    width: '100%',
    fontSize: hp('2%'),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: hp('2%'),
    borderRadius: 5,
    marginHorizontal: wp('2%'),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: hp('2%'),
  },
});

export default MyPage;
