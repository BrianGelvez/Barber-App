import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import barber from '../images/fondohome.jpg';
import julian from '../images/julian.png';
import peia from '../images/peia.png'
import estrellas from '../images/5estrellas.png';
import instagram from '../images/instagram.png';
import whatsapp from '../images/whatsapp.png';
import facebook from '../images/facebook.png';
import Footer from '../components/Footer';
import { useUserContext } from '../provider/UserProvider';


const socialIconsData = [
    [
        { id: '1', name: 'Instagram', image: instagram, link: 'https://instagram.com/juli_peralta00?igshid=MWZjMTM2ODFkZg==' },
        { id: '2', name: 'WhatsApp', image: whatsapp, link: 'https://wa.me/tuNumeroDeWhatsApp1' },
        { id: '3', name: 'Facebook', image: facebook, link: 'https://www.facebook.com/tuUsuarioDeFacebook1' }
    ],
    [
        { id: '4', name: 'Instagram', image: instagram, link: 'https://instagram.com/francoallende_?igshid=MWZjMTM2ODFkZg==' },
        { id: '5', name: 'WhatsApp', image: whatsapp, link: 'https://wa.me/3521439927' },
        { id: '6', name: 'Facebook', image: facebook, link: 'https://www.facebook.com/tuUsuarioDeFacebook2' }
    ]
];

export const Hairdressers = ({ navigation }) => {
    const scrollViewRef = useRef();
    const { selectedCut, setSelectedHairdresser: setContextHairdresser } = useUserContext();
    console.log('selectecut: ',selectedCut);
    
    const navigateToJulianCalendar = () => {
        const name = 'Julian Peralta';
        setContextHairdresser(name); // Guardar el nombre en useUserContext
        navigation.navigate('CalendarJulianUsers');
      };
      
      const navigateToFrancoCalendar = () => {
        const name = 'Franco Allende';
        setContextHairdresser(name); // Guardar el nombre en useUserContext
        navigation.navigate('CalendarPeiaUsers');
      };

    const handleSocialMediaClick = (url) => {
        Linking.openURL(url);
    };

    const renderSocialIcons = (icons) => {
        return (
            <View style={styles.socialIconsContainer}>
                {icons.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => handleSocialMediaClick(item.link)}>
                        <Image source={item.image} style={styles.socialIcon} />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Image source={barber} style={styles.backgroundImage} resizeMode="cover" />
            <View style={styles.overlay}>
                <View style={styles.viewText}>
                    <Text style={styles.text}>Corte elegido: {selectedCut.name} </Text>
                    <Text style={styles.text}>Total: {selectedCut.price}</Text>
                    <Text style={styles.text}>Selecciona con quién te quieres cortar </Text>
                </View>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const selectedIndex = event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
                        // Do something with the selected index (0 or 1)
                    }}
                >
                    {socialIconsData.map((icons, index) => (
                        <View key={index} style={styles.viewHairdresser}>
                            <Image source={index === 0 ? julian : peia} style={styles.hairdresser} />
                            <View style={styles.estrellasContainer}>
                                <Text style={styles.name}>
                                    {index === 0 ? 'Julian Peralta' : 'Franco Allende'}
                                </Text>
                                {renderSocialIcons(icons)}
                                <Image source={estrellas} style={styles.estrellas} />
                                <TouchableOpacity
                                    onPress={index === 0 ? navigateToJulianCalendar : navigateToFrancoCalendar}
                                    style={styles.buttonCalendar}
                                >
                                    <Text style={styles.buttonTextCalendar}>
                                        {index === 0 ? 'Ver Calendario de Julian' : 'Ver Calendario de Franco'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <Footer navigation={navigation} />
            </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        ...StyleSheet.absoluteFillObject, // Para cubrir todo el espacio
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: windowWidth,
        height: windowHeight,
        ...StyleSheet.absoluteFillObject, // Para cubrir todo el espacio
    },
    text: {
        padding: 5,
        color: '#ffffff',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'FrederickatheGreat-Regular',
    },
    hairdresser: {
        width: 250,
        height: 250,
        borderRadius: 100,

    },
    viewHairdresser: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Cambia el color de fondo si lo deseas
        alignItems: 'center', // Centra los elementos horizontalmente
        borderRadius: 15,
        width: windowWidth,
        justifyContent: 'center',
    },
    estrellasContainer: {
        alignItems: 'center', // Centra las estrellas horizontalmente dentro del contenedor
        marginTop: 10, // Puedes ajustar este valor según sea necesario para la separación deseada
    },
    estrellas: {
        width: 155, // Ajusta el tamaño de las estrellas según tus preferencias
        height: 50,
    },
    name: {
        color: 'white',
        fontSize: 30,
        marginBottom: 10,
        fontFamily: 'FrederickatheGreat-Regular',
    },
    socialIconsContainer: {
        flexDirection: 'row', // Para mostrar los íconos horizontalmente
        marginVertical: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    viewText: {
        backgroundColor: '#228b86',
        borderRadius: 9,
        borderWidth: 5,
        borderColor: '#7bd4cd', 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonCalendar: {
        backgroundColor: '#02403d',
        borderRadius: 5,
        padding: 4,
      },
      buttonTextCalendar: {
        color: '#d8d8d8a9'
      }
});
