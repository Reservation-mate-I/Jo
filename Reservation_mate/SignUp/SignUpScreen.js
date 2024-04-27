import React from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,  BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons'; // 사용할 아이콘 라이브러리 선택
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const validatePassword = (pw) => {
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,12}$/;
    return re.test(pw);
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
        phone: phone
      });
      alert("회원가입이 성공적으로 완료되었습니다.");
      navigation.navigate('LoginPage');
    }

  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <LinearGradient style={styles.headerContainer} colors = {['#a0a0a0','#f8f9fa', '#f8f9fa']}>
        <View style = {styles.headerbutton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backbutton}>
              <Icon name="ios-arrow-back" size={35}/> 
            </View>
          </TouchableOpacity>
        
        </View>

        <View style = {styles.headermid}>
          <Text style={styles.titlestyle}>회원가입</Text>
          

        </View>
        <View style={styles.spacer}>
        </View>     
      </LinearGradient>
      
      <View style = {styles.bodyContainer}>
        <View style = {styles.bodyfirst}>
          <Text style = {styles.fontstyle}>학번</Text>
        
          <TextInput
            placeholder="학번"
            placeholderTextColor="#a0a0a0"
            style={styles.input}
            value={id}
            onChangeText={setId}
          />
        </View>
        <View style = {styles.bodyfirst}>
          <Text style = {styles.fontstyle}>비밀번호</Text>
          <TextInput
            style={styles.input}
            placeholder="영어, 숫자, 특수기호로 이루어진 4~12자리"
            placeholderTextColor="#a0a0a0"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style = {styles.bodyfirst}>
          <Text style = {styles.fontstyle}>비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor="#a0a0a0"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style = {styles.bodyfirst}>
          <Text style = {styles.fontstyle}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름"
            placeholderTextColor="#a0a0a0"
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style = {styles.bodyfirst}>
          <Text style = {styles.fontstyle}>전화번호</Text>
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            placeholderTextColor="#a0a0a0"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style = {styles.bodyfirst}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignUp}
        >
          <Text style={styles.signupfont}>가입하기</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.bottomContainer}>
      </View> 
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    
  },
  headerContainer: {
    width: '100%',
    flex: 1,
    height: hp('15%'),
    flexDirection: 'row',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  headerbutton: {
    width: wp('22%'),
    flex: 1,
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  headermid: {
    width: wp('22%'),
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlestyle: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    top: hp('2%'),
  },
  spacer: {
    width: wp('18%'),
    
    height: '100%',
    flex: 1,
  },
  backbutton: {
    top: hp('2%'),
    left: wp('1%'),
  },
  bodyContainer: {
    height: hp('68%'),
    width: wp('100%'),
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyfirst: {
    height: hp('5%'),
    flexDirection: 'column', 
    alignItems: 'flex-start',
    margin: hp('3%'),
  },
  fontstyle: {
    margin: hp('1%'),
    margin: wp('1%'),
    fontWeight: 'bold',
  },
  input: {
    width: hp('35%'),
    height: hp('6%'),
    padding: wp('3%'),
    margin: hp('1%'),
    margin: wp('1%'),
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: '#ced4da',

  },
  signupButton: {
    width: hp('35%'),
    height: hp('6%'),
    padding: wp('3%'),
    margin: hp('1%'),
    margin: wp('1%'),
    backgroundColor: '#808080', 
    borderWidth: 1,
    borderColor: '#ced4da',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupfont: {
    margin: hp('1%'),
    margin: wp('1%'),
    fontWeight: 'bold',
    color: 'white',
  },
  bottomContainer: {
    bottom: 0,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('17%'),
    backgroundColor: '#f8f9fa',
  },
  bottomImageStyle: {
    width: wp('40%'),
    height: hp('15s%'),
  },
});

export default SignUpScreen;