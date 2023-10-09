import React, { useState, useEffect } from 'react';
import { View, TextInput, ImageBackground, Image, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import barber from '../images/fondo.jpg';
import logo from '../images/logo2.png';
import firebase from '../database/firebase';
import { useUserContext } from '../provider/UserProvider';
import { collection, getDocs } from 'firebase/firestore';

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const { setUsername: setContextUsername } = useUserContext();

    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(firebase.db, 'users'));
            const userList = [];
            querySnapshot.forEach((doc) => {
                userList.push({ id: doc.id, ...doc.data() });
            });
            setUsers(userList);
        };

        getUsers();
    }, []);

    const handleLogin = () => {
        const user = users.find((user) => user.name === username && user.password === password);
        if (user) {
            setContextUsername(username); // Almacena el username en el contexto
            if (user.isAdmin) {
                props.navigation.navigate('Dashboard', { username: username }); // Redirige al Dashboard si el usuario es admin
            } else {
                props.navigation.navigate('Home', { username: username });
            }
        } else {
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    };

    const handleRegister = () => {
        props.navigation.navigate('Register');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={barber} style={styles.backgroundImage}>
                    <View style={styles.overlay}>
                        <Image source={logo} style={styles.logo} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                        <Text style={styles.registerText}>¿No tienes usuario?</Text>
                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <Text style={[styles.buttonText, { textDecorationLine: 'underline' }]}>Registrarte</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
};

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
        marginTop: -100,
    },
    logo: {
        width: 350,
        height: 350,
        marginBottom: -60,
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#04736e',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'FrederickatheGreat-Regular'
    },
    registerText: {
        color: 'white',
        fontSize: 16,
        marginTop: 70,
        fontFamily: 'FrederickatheGreat-Regular'
        
    },
    registerButton: {
        marginTop: 10,
    },
});
