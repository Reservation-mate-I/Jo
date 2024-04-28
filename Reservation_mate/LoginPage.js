import React, {useState, useEffect} from 'react';
import { useUser} from './UserContext';
import { loginUser } from './Database/firebaseService';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const LoginPage = () => {
  const [id, setId] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = useState(false);
    const { userId, setUserId } = useUser();
    const navigation = useNavigation();

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert("오류", "아이디와 비밀번호를 모두 입력해주세요.", { cancelable: false });
      return false;
    }
    try {
      setLoading(true);
      const isLoggedIn = await loginUser(id, password);
  
      if (isLoggedIn) {
        setUserId(id);
        navigation.navigate('MainScreen');
      } else {
          Alert.alert(
            "로그인 실패",
            "ID 또는 PW가 일치하지 않습니다.",
            { cancelable: false }
          );
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      Alert.alert("로그인 중 에러 발생했습니다. 다시 시도해주세요.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <LinearGradient style={styles.headerContainer} colors = {['#a0a0a0','#f8f9fa', '#f8f9fa']}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('./../assets/GWNU-LOGO.png')}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>국립 강릉원주대학교</Text>
          <Text style={styles.subHeader}>GANGNEUNG-WONJU NATIONAL UNIVERSITY</Text>
        </View>
        <View style={styles.spacer}/>
      </LinearGradient>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyTopContainer}>
        </View>
        <View style={styles.bodyMiddleContainer}>
          <View style={styles.IDbottom}>
            <TextInput
              style={styles.input}
              placeholder="아이디"
              placeholderTextColor="#808080" 
              value={id}
              onChangeText={setId}
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#808080" 
              secureTextEntry={true}
              
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
            <Text style={styles.signupButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        
        <View style={styles.bodyBottomContainer}/>
      </View>

      <View style={styles.bottomImageContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000, // 다른 UI 위로 로딩 인디케이터 표시
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
  },
  imageStyle: {
    top: hp('1%'),
    width: wp('16%'),
    height:hp('7%'),
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
  spacer: {
    width: wp('18%'),
  },
  subHeader: {
    fontSize: hp('1%'), 
    top: hp('2%'), 
    fontWeight: 'bold',
    color: '#868296',
  },
  bodyContainer: {
    height: hp('72%'),
    width: wp('100%'),
  },
  bodyTopContainer: {
    backgroundColor: '#f8f9fa',
    height: hp('15%'),
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },

  bodyMiddleContainer: {
    height: hp('40%'),
    backgroundColor: '#f8f9fa',
    justifyContent: 'center', 
    paddingHorizontal: wp('10%'), 
  },
  bodyMiddletopContainer: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    justifyContent: 'flex-end', 
   alignItems: 'center',
  },
  bodyBottomContainer: {
    height: hp('15%'),
    backgroundColor: '#f8f9fa',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  studentlogin: {
    width: hp('10%'),
    height: hp('6%'),
    padding: 15,
    margin: hp('1%'),
    margin: wp('1%'),
    borderRadius: 10,
    backgroundColor: '#343a40', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  studenttext: {
    fontSize: hp('1.8%'),
    color: 'white',
    fontWeight: 'bold',
  },
  custlogin: {
    width: hp('9%'),
    height: hp('6%'),
    margin: hp('1%'),
    margin: wp('1%'),
    borderRadius: 10,
    backgroundColor: '#343a40', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  custtext: {
    fontSize: hp('1.6%'),
    color: 'white',
    fontWeight: 'bold',
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('16%'),
    backgroundColor: '#f8f9fa',
  },
  loginFormContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: hp('2%'),
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#666666',
  },
loginButton: {
  width: '100%',
  padding: hp('2%'),
  borderRadius: wp('3%'),
  backgroundColor: '#343a40', 
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#ced4da',
},
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#808080',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  signupButtonText: {
    color: 'white', 
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginPage;
