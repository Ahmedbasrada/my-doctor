import {ActivityIndicator, Text, View} from 'react-native'
import style from '../styles/loaderStyle'


const Loader = (props) => {

    if(!props.loading){
        return null
    }

    return(
        <View style={style.container}>
            <ActivityIndicator size={75} color='blue'/>
            {props.title && <Text style={style.text}>{props.title}</Text>}
        </View>
    )
}

export default Loader;