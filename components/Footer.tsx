import React from 'react';
import brick from '../images/brick.png';
import hairdresser from '../images/peluquero.png';
import calendar from '../images/calendario.png';
import cc from '../images/metodo-de-pago.png';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useUserContext } from '../provider/UserProvider'; // Asegúrate de importar useUserContext desde tu archivo UserProvider

const Footer = ({ navigation }) => {
    const { username, selectedCut } = useUserContext();

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { username: username })}>
                <Image source={brick} style={styles.imageFooter} />
                <Text style={styles.buttonText}>Elegir Corte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                if (selectedCut) {
                    navigation.navigate('Hairdressers', { selectedCut: selectedCut });
                } else {
                    alert('Selecciona un corte primero');
                }
            }}>
                <Image source={hairdresser} style={styles.imageFooter} />
                <Text style={styles.buttonText}>Peluquero</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DateAndTime')}>
                <Image source={calendar} style={styles.imageFooter} />
                <Text style={styles.buttonText}>Fecha y Hora</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PaymentMethod')}>
                <Image source={cc} style={styles.imageFooter} />
                <Text style={styles.buttonText}>Método de Pago</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#04736e',
        borderRadius: 6,
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'FrederickatheGreat-Regular',
    },
    imageFooter: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
});

export default Footer;
