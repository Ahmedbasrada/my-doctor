import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';// لي الانتقال بين الصفحات
import { createNativeStackNavigator } from '@react-navigation/native-stack';// لي عمل الصفحات stack
import HomeScreen from './screens/home'
import DoctorsScreen from './screens/doctor';
import SignUpScreen from './screens/SignUp';
import SignInScreen from './screens/SignIn';
import ProfileScreen from './screens/Profile';
import UpdateProfileScreen from './screens/updateProfile';
import useScript from './hooks/useSecript';
import {GOOGLE_API_KEY} from '@env'
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator()


export default function App() {
  
  if(Platform.OS == "web") {
    useScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`)
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
         headerStyle:{
          backgroundColor:'#007bff'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
          textAlign: 'right'
        }
      }}
      >
        <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name='Doctors'
        component={DoctorsScreen}
        options={{title:  'صفحه الاطباء'}}
        />
         <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{title:  'تسجيل مستخدم جديد'}}
        />
         <Stack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{title:  'تسجيل الدخول'}}
        />
        <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{title:  'صفحه المستخدم'}}
        />
        <Stack.Screen
        name='updateProfile'
        component={UpdateProfileScreen}
        options={{title:  'صفحه التعديل'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
