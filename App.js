import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import UserProvider from './provider/UserProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { Home } from './screens/Home';
import { Hairdressers } from './screens/Hairdressers';
import { useFonts } from 'expo-font';
import { CalendarJulianUsers } from './screens/CalendarJulianUsers';
import { CalendarPeiaUsers } from './screens/CalendarPeiaUsers';
import { Dashboard } from './screens/Dashboard';



const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'FrederickatheGreat-Regular': require('./fonts/FrederickatheGreat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    // La fuente aún se está cargando, puedes mostrar un componente de carga o un mensaje de espera aquí.
    return null;
  }

  

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Hairdressers' component={Hairdressers} />
          <Stack.Screen name='CalendarJulianUsers' component={CalendarJulianUsers} />
          <Stack.Screen name='CalendarPeiaUsers' component={CalendarPeiaUsers} />
          <Stack.Screen name='Dashboard' component={Dashboard} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontFamily: 'FrederickatheGreat-Regular'
  },
});














// import * as React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Login } from './screens/Login';
// import { Register } from './screens/Register'
// import { Home } from './screens/Home';
// import { Hairdressers } from './screens/Hairdressers';


// const stack = createNativeStackNavigator()

// const MyStack = () => {
//   return (
//     <stack.Navigator>
//       <stack.Screen name='Login' component={Login} />
//       <stack.Screen name='Register' component={Register} />
//       <stack.Screen name='Home' component={Home} />
//       <stack.Screen name='Hairdressers' component={Hairdressers} />
//     </stack.Navigator>
//   )
// }


// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack style={styles.container} />
//       <StatusBar style="auto" />
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
