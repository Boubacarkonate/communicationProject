//components/LoginScreen.js

import { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import FirebaseService from '../../services/FirebaseService';

export default function RegisterScreen({ navigation }) {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const logged = async () => {
        await FirebaseService.login(email, password);
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput style={styles.input} 
                keyboardType='email-address' 
                onChangeText={setEmail}
                placeholder='adresse email' 
        />
        <TextInput style={styles.input} 
                autoCorrect={false}
                secureTextEntry={true} 
                onChangeText={setPassword}
                textContentType='password'
                placeholder='Mot de passe' 
        />
        <Button disabled={email.length === 0 || password.length === 0} onPress={logged} title="Se connecter" />
        <Text style={styles.text}>Pas encore inscrit ?</Text>
        <Button 
            color='gray' 
            onPress={() => navigation.navigate('Register')}
            title="S'incrire" 
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    input: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        padding: 12,
    },
    text: {
        fontSize: 18,
        padding: 12,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#444',
        textAlign: 'center',
        paddingBottom: 24
    },
  
});
