import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import barber from '../images/fondo.jpg';
import barba from '../images/barba.png';
import corte from '../images/corte.png';
import cejas from '../images/cortebarbaycejas.png';
import corteybarba from '../images/corteybarba.png';
import Footer from '../components/Footer';
import { useUserContext } from '../provider/UserProvider';

const hairCuts = [
    {
        image: corte,
        name: "Cabello",
        price: "$2000"
    },
    {
        image: barba,
        name: "Barba",
        price: "$1000"
    },
    {
        image: corteybarba,
        name: "Corte + Barba",
        price: "$2500"
    },
    {
        image: cejas,
        name: "Corte + Barba + Cejas",
        price: "$2700"
    },
];

export const Home = ({ navigation }) => {
    const { username, setSelectedCut: setUserSelectedCut } = useUserContext();
    console.log('usernamehomeusername: ', username);
    
    const [localSelectedCut, setLocalSelectedCut] = useState(null);

    useEffect(() => {
        if (localSelectedCut) {
            setUserSelectedCut(localSelectedCut);
            navigation.navigate('Hairdressers', { selectedCut: localSelectedCut });
        }
    }, [localSelectedCut]);

    const handleHairdressers = (cut) => {
        if (cut === localSelectedCut) {
            setLocalSelectedCut(null);
        } else {
            setLocalSelectedCut(cut);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleHairdressers(item)}>
            <View style={styles.cards}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={barber} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <View style={styles.viewText}>
                        <Text style={styles.welcomeText}>Bienvenido {username}, elige cómo te cortarás el pelo esta semana 💆‍♂️</Text>
                    </View>
                    <FlatList
                        data={hairCuts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                    />
                    <Footer navigation={navigation}/>
                </View>
            </ImageBackground>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewText: {
        backgroundColor: '#228b86',
        borderRadius: 9,
        borderWidth: 5,
        borderColor: '#7bd4cd',
        marginBottom: 50,
        padding: 10,
        width: '100%'
    },
    cards: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 20,
        height: 200,
        marginBottom: 20,
        alignItems: 'center',
        width: windowWidth / 2 - 30,
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    name: {
        textAlign: 'center',
        fontFamily: 'FrederickatheGreat-Regular',
        color: 'black',
        fontSize: 15
    },
    price: {
        fontFamily: 'FrederickatheGreat-Regular',
        fontSize: 18,
        marginTop: 5,
    },
    backgroundImage: {
        flex: 1, // Para que el fondo de pantalla ocupe toda la pantalla
        resizeMode: 'cover', // Para que la imagen se ajuste al tamaño del contenedor
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'FrederickatheGreat-Regular',
        lineHeight: 40,
    },
});

export default Home;
