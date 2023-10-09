import { View, ImageBackground, Image, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import { useUserContext } from '../provider/UserProvider';
import barber from '../images/fondo.jpg';


export const Dashboard = () => {

    const { username } = useUserContext();
    console.log(username);


    return (
        <View style={styles.container}>
            <ImageBackground source={barber} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1, // Para que el fondo de pantalla ocupe toda la pantalla
        resizeMode: 'cover', // Para que la imagen se ajuste al tamaño del contenedor
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})