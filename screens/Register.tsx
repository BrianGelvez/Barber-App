import { View, Text, ImageBackground, StyleSheet, TextInput, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react';
import firebase from '../database/firebase'
import { collection, addDoc } from "firebase/firestore";
import background from '../images/fondo.jpg'
import logoRegister from '../images/logoRegister.png'


export const Register = (props) => {

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const states = username && phone && password;


    const createNewUser = async () => {
        try {
            if (states !== '') {
                const docRef = await addDoc(collection(firebase.db, "users"), {
                    name: username,
                    phone: phone,
                    password: password,
                    isAdmin: false,
                });
                console.log("Document written with ID: ", docRef.id);
                alert('guardado')
                props.navigation.navigate('Login');
            }
        } catch (error) {
            alert('Completa todo los campos pá')
            console.log(console.error()
            );
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.backgroundImage}>
                    <View style={styles.overlay}>
                        <Image source={logoRegister} style={styles.logo} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            onChangeText={text => setUsername(text)}
                            value={username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefono"
                            onChangeText={text => setPhone(text)}
                            value={phone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                        <TouchableOpacity style={styles.registerButton} onPress={createNewUser}>
                            <Text style={styles.buttonText}>Registrarte</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    backgroundImage: {
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -160, // Ajusta este valor para levantar los elementos
    },
    logo: {
        width: 350,
        height: 350,
        marginBottom: -60,
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    buttonText: {
        backgroundColor: '#04736e',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    registerButton: {
        marginTop: 40,
    },
})