import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


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

  const MyPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleImageSelect = (isCamera) => {
      const options = {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
      };
  
      if (isCamera) {
        launchCamera(options, (response) => {
          handleImageResponse(response);
        });
      } else {
        launchImageLibrary(options, (response) => {
          handleImageResponse(response);
        });
      }
    };
  
    const handleImageResponse = (response) => {
      if (response.didCancel) {
        console.log('사용자가 선택을 취소했습니다.');
      } else if (response.error) {
        console.log('에러 발생:', response.error);
      } else {
        setSelectedImage({ uri: response.uri });
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            Alert.alert(
              '사진 추가',
              '사진을 추가할 방법을 선택하세요.',
              [
                {
                  text: '앨범에서 선택',
                  onPress: () => handleImageSelect(false),
                },
                {
                  text: '카메라로 찍기',
                  onPress: () => handleImageSelect(true),
                },
                {
                  text: '취소',
                  style: 'cancel',
                },
              ],
              { cancelable: true }
            );
          }}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
          ) : (
            <Text>사진 추가</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const handlePasswordChange = () => {
    navigation.navigate('PasswordChange', { userId: userId });
  };

  const handleDeleteAccount = () => {
    setModalVisible(true);
  };
  const handleLogout = () => {
    // 로그아웃 기능 구현
    navigation.navigate('LoginPage');
  };

  const cancelDeleteAccount = () => {
    setModalVisible(false);
    setPassword('');
  };

  const confirmDeleteAccount = async () => {
    try {
      // 현재 비밀번호 확인 후 회원 탈퇴 처리
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}/password`);
      const snapshot = await get(userRef);
      const savedPassword = snapshot.val();
      if (password === savedPassword) {
        await remove(ref(db, `users/${userId}`));
        setModalVisible(false);
        navigation.navigate('LoginPage');
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
      <LinearGradient style={styles.headerContainer} colors={['#a0a0a0', '#f8f9fa', '#f8f9fa']}>
        <View style={styles.header}>
          <Text style={styles.title}>마이 페이지</Text>
        </View>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <Text style={styles.info}>학번: {userId}</Text>
        <Text style={styles.info}>이름: {userInfo.name}</Text>
        <Text style={styles.info}>전화번호: {userInfo.phone}</Text>
        <TouchableOpacity onPress={handlePasswordChange}>
          <Text style={styles.passwordChangeButton}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.deleteAccountButton}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 8,
    color: '#343a40',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
  deleteAccountButton: {
    fontSize: 18,
    color: 'red',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  passwordChangeButton: {
    fontSize: 18,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 10,
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
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  logoutButton: {
    fontSize: 18,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default MyPage;