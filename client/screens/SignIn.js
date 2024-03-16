import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/authStyles';
import ProfileForm from '../components/ProfileForm.js';
import axios from '../config/axios.js';
import { SIGNIN_URL } from '../config/urls.js';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Loader from '../components/loader.js';
import Alert from '../components/Alert';
import SignInForm from '../components/SignInForm';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function SignInScreen(props){
    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: '',
    message: '',
    type: '',
  });
    
  const signIn = async value => {
    setLoading(true);
    const body = {
      email: value.email,
      password: value.password,
    };
    try {
      const response = await axios.post(SIGNIN_URL, body);
      await AsyncStorage.setItem("accessToken", response.data.accessToken)
      console.log(response);
      setVisible(true);
      setLoading(false);
      props.navigation.navigate("Home")
    } catch (e) {
    setVisible(true);
      console.log(e.response.data.message, 'catch');
      setAlert({ title: 'تنبيه', 
      message:e.response.data.message , type: 'alert' });

    } finally {
      setLoading(false);
    }
  };


    

    return(
        <ScrollView>
            <Loader title='جاري تسجيل الدخول' loading={loading} />
      {visible && (
        <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}

        />
      )}
      <View style={styles.container}>
        <Icon ralsed name='user' type='front-awesome' color='#f50' size={50} />
        <Text h4>تسجيل الدخول</Text>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
            <SignInForm
            submit={value => signIn(value)}
            />
        </View>

        </ScrollView> 
    )
   
}