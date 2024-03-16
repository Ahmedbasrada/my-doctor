import { Formik } from 'formik';
import * as yup from 'yup';
import styles from '../styles/authStyles'
import { Text, Input, CheckBox, Button } from 'react-native-elements';


export default function SignInForm(props) {
    const validationSchema = yup.object().shape({
        email: yup
                    .string()
                    .email("يجب إدخال بريد إلكتروني صحيح")
                    .required('البريد الإلكتروني مطلوب'),
        password: yup
                    .string()
                    .required('يجب عليك إدخال كلمة مرور صالحة')
                    .min(5, "يجب أن تكون كلمة المرور أكثر من خمسة محارف"),
                userType: yup.boolean(),
        })

        return(
            <Formik
             initialValues ={{
                email: '',
                password: ''
            }}

            validationSchema={validationSchema}
            onSubmit={values => props.submit(values)}
            
            >
                {({handleBlur,handleChange,handleSubmit,values, errors, isValid})=> (
                    <>
                     <Input
                        name="email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder='البريد الإلكتروني'
                        style={[styles.textInput, errors.name && styles.errorInput]}
                        keyboardType='email-address'
                        />

                    {errors.email&&
                        <Text p style={styles.textError}>{errors.email}</Text>
                    }
                    <Input
                            name="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                            placeholder="كلمة المرور"
                            style={[styles.textInput, errors.password && styles.errorInput]}
                        />
                        {errors.password &&
                            <Text p style={styles.textError}>{errors.password}</Text>
                        }

                         <Button title='تسجيل الدخول' style={{ marginTop: '20px'}} onPress={handleSubmit} />

                    </>
                )}
            </Formik>
        )
}

