//app.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/screens/LoginScreens';
import RegisterScreen from './components/screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import UseAuth from './hooks/UseAuth';
import ChatScreen from './components/screens/ChatScreen';
import { AuthProvider } from './context/AuthContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <AuthProvider>
        <RootNavigator/>
      </AuthProvider>
        

      
  );  
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}


function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  )
}

function RootNavigator(){
  const user = UseAuth();

  return (
  <NavigationContainer >
     { user ? <ChatStack /> : <AuthStack /> } 
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({

});
