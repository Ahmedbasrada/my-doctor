import styles from '../styles/profileStyles.js';
import Loader from '../components/loader.js';
import Alert from '../components/Alert';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import axios from '../config/axios.js';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DELETE_URL, PROFILE_URL } from '../config/urls.js';
import {transformName} from '../config/helpers.js'
import { Button, Text, Input, CheckBox, Icon } from 'react-native-elements';

const ProfileScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState()
  const [alert, setAlert] = useState({
    title: '',
    message: '',
    type: '',
  })


  useEffect(() =>{
    getProfile()
  },[])
   const getProfile = async () =>{
    setLoading(true)
    try {
        const token = await AsyncStorage.getItem('accessToken')
        axios.defaults.headers.common.Authorization = 'JWT ' + token
        const response = await axios.get(PROFILE_URL) 
        console.log(response.data)
        setUser(response.data)
    } catch (e) {
        console.log(e,'data')
    }finally{
        setLoading(false)
    }
  }

  const showAlert = (title, message, type) =>{
    setAlert({
        title: title,
        message: message,
        type: type
    })
    setVisible(true)
  }

  const confirm = (type) =>{
    showAlert(
        type === "delete" ? "أنت على وشك حذف الحساب": "أنت على وشك تسجيل الخروج",
        type ==='delete'? 'هل بالفعل تريد حذف الحاسب؟': 'هل بالفعل تريد تسجيل الخروج؟',
        type
    )
  }

  const handleAction = async () =>{
    try {
        if (alert.type ==="delete"){
            const token = await AsyncStorage.getItem('accessToken')
            axios.defaults.headers.common.Authorization = 'JWT ' + token
            const response = await axios.delete(DELETE_URL)
            console.log(response)
        }
        await AsyncStorage.clear()
        props.navigation.navigate('Home')
    } catch (e) {
        console.log(e)
        
    }
  }
  const handleConfirm = async () =>{
    setVisible(false)
    await handleAction()
  }
return (
    <ScrollView>
    <View style={styles.container}>
        <Loader loading={loading} />
        <Alert 
        visible={visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setVisible(false)}
        onClick ={() => handleConfirm()}
         />
        {user &&
        <View>
            <View style={styles.userIconContainer}>
                <View style={styles.userMetaContainer}>
                    <View style={styles.userAvtar}>
                        <Text style={styles.userAvtarText}>
                            {transformName(user.name)}
                        </Text>
                    </View>
                    <View style={styles.userMeta}>
                        <Text>{user.name}</Text>
                        <Text>{user.email}</Text>
                    </View>
                </View>
                <View style={styles.iconsConatiner}>
                    <Icon
                    name="edit"
                    type="font-awesome"
                    color="#f50"
                    style={{marginLeft: "5px"}}
                    onPress={() => props.navigation.navigate("updateProfile")}
                    />
                    <Icon
                    name="trash"
                    type="font-awesome"
                    color="#f50"
                    onPress={() => confirm('delete')}
                    />
                </View>
            </View>
            {user.profile &&
            <View style={{ marginBottom: '50px'}}>
             <View style={styles.doctorInfo}>
               <View style={styles.infoCell}>
                 <Text style={styles.infoTitle}>الاختصاص</Text>
                 <Text style={styles.infoText}>
                   {user.profile.specialization}
                 </Text>
               </View>
               <View style={styles.infoCell}>
                 <Text style={styles.infoTitle}>العنوان</Text>
                 <Text style={styles.infoText}>{user.profile.address}</Text>
               </View>
               <View style={styles.infoCell}>
                 <Text style={styles.infoTitle}>ساعات العمل</Text>
                 <Text style={styles.infoText}>
                   {user.profile.workingHours}
                 </Text>
               </View>
               <View style={styles.lastCell}>
                 <Text style={styles.infoTitle}>رقم الهاتف</Text>
                 <Text style={styles.infoText}>{user.profile.phone}</Text>
               </View>
             </View>
           </View>
            }
            <Button buttonStyle={styles.logoutButton} title="تسجيل الخروج" onPress={() => confirm('logout')} />
        </View>
        }

    </View>
</ScrollView>

      );
}


export default ProfileScreen

