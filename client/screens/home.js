import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/homeStyles'
import { useEffect,useState } from 'react';

export default function HomeScreen(props) {
    const{navigation} = props
    const [token, setToken] = useState('')


    useEffect(() => {
      const refreshToken = navigation.addListener('focus', () => {
        checkToken();
      })
     return refreshToken
    }, [navigation])
    
    const checkToken = async () =>{
      const token = await AsyncStorage.getItem("accessToken")
      console.log(token)
      setToken(token)
    }
  return (
    <ImageBackground
      source={require('../assets/doc-bg.png')}
      style={styles.background}
      
      >

    <View style={styles.container}>
      <Text style={styles.text}> أهلا بك في تطبيق طبيبي</Text>
      <Text style={styles.text}>التطبيق الأول للربط بين الأطباء و المرضى</Text>
      {token? 
       <>
       <Button title='أستعراض صفحة الأطباء' onPress={() => navigation.navigate('Doctors')}/>
       <Button type='clear' title='الصفحة الشخصية' onPress={() => navigation.navigate('Profile')}/>
       <Text style={styles.labelButton}>أستعراض الملف الشخصي</Text>
       </>
       :
       <>
       <Button title='تسجيل الدخول' onPress={() => navigation.navigate('SignIn')}/>
       <Button type='clear' title='تسجيل مستخدم جديد' onPress={() => navigation.navigate('SignUp')}/>
       <Text style={styles.labelButton}> إنشاء مستخدم جديد</Text>
       </>
       }
    </View>
    </ImageBackground>

  );
}
