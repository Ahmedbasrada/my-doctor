import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/authStyles';
import ProfileForm from '../components/ProfileForm.js';
import axios from '../config/axios.js';
import { SIGNUP_URL } from '../config/urls.js';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Loader from '../components/loader.js';
import Alert from '../components/Alert';

export default function SignUpScreen(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: '',
    message: '',
    type: '',
  });
  const {navigation} = props;


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const signUp = async value => {
    setLoading(true);
    const body = {
      name: value.name,
      email: value.email,
      password: value.password,
      userType: value.userType ? 'doctor' : 'normal',
      phone: value.phone,
      addres: value.addres,
      specialization: value.specialization,
      workingHours: value.workingHours,
      location: {
        latitude: location ? location.latitude : null,
        longitude: location ? location.longitude : null,
      },
    };
    try {
      const response = await axios.post(SIGNUP_URL, body);
      console.log(response,'catch');
      setVisible(true);
      setAlert({ title: 'تسجيل صحيح', 
      message: 'لقد تم التسجيل بشكل صحيح, هل تريد التوجه لصفحه تسجيل الدخول',
       type: 'question' });

    } catch (e) {
      console.log(e.response.data.message.errors[0].message, 'catch');
      setVisible(true);
      setAlert({ title: 'تنبيه', 
      message: e.response.data.message.errors[0].message, type: 'alert' });


    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Loader title='جاري أنشاء حساب جديد' loading={loading} />
      {visible && (
         <Alert 
         visible={visible} 
         title={alert.title} 
         message={alert.message} 
         type={alert.type} 
         onClose={() => setVisible(false)} 
         onClick={() => {
           setVisible(false)
           navigation.navigate("SignIn");
         }} />
 
      )}
      <View style={style.container}>
        <Icon ralsed name='user' type='front-awesome' color='#f50' size={50} />
        <Text h4>تسجيل حساب جديد</Text>
      </View>
      <KeyboardAvoidingView behavior='padding' enabled>
        <ProfileForm
        user={null}
        disabled = {false}
        buttonTitle ='تسجيل حساب'
        checkBox = {true}
         submit={value => signUp(value)} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
