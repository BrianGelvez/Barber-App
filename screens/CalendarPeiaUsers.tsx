import React, { useState } from 'react';
import { View, Image, StyleSheet, Button, SafeAreaView, Dimensions, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useUserContext } from '../provider/UserProvider';
import { addDoc, collection } from 'firebase/firestore';
import firebase from '../database/firebase'; // Asegúrate de importar tu configuración de Firebase
import barber from '../images/fondohome.jpg';



export const CalendarPeiaUsers = () => {
  const { username } = useUserContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time' | 'datetime'>('date');
  const [show, setShow] = useState(false);
  const { selectedHairdresser } = useUserContext();
  console.log( 'peluquero:', selectedHairdresser);
  




  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const scheduleAppointment = async () => {
    try {
      const turnosRef = collection(firebase.db, 'turnos'); // Referencia a la colección "turnos"

      // Formatea la fecha, el día de la semana y la hora
      const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const hora = date.toLocaleTimeString(); // Formato de hora: HH:MM:SS AM/PM

      const newTurno = {
        username: username, // Nombre de usuario obtenido desde el contexto
        fecha: formattedDate, // Almacena la fecha en un formato más detallado
        hora: hora, // Almacena la hora en una propiedad separada
      };

      await addDoc(turnosRef, newTurno); // Agrega el nuevo turno a la colección "turnos"
      alert('Cita agendada con éxito');
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      alert('Error al agendar la cita');
    }
  };


  return (
    <View style={styles.container}>
      <Image source={barber} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay}>
        <SafeAreaView>
          <Button onPress={showDatepicker} title="Seleccionar Fecha" />
          <Button onPress={showTimepicker} title="Seleccionar Hora" />
          <Button onPress={scheduleAppointment} title="Agendar Cita" />

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          {/* Aquí puedes mostrar las citas agendadas si lo deseas */}
        </SafeAreaView>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
    ...StyleSheet.absoluteFillObject, // Para cubrir todo el espacio
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    ...StyleSheet.absoluteFillObject, // Para cubrir todo el espacio
    alignItems: 'center',
    justifyContent: 'center',
  },
});
