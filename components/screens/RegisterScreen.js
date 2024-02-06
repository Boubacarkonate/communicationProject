import { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';
import FirebaseService from '../../services/FirebaseService';

export default function RegisterScreen({ navigation }) {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onRegister = async () => {
        try {
            await FirebaseService.register(email, password);
            console.log('Utilisateur inscrit avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
        }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Creer un compte</Text>
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
        <Button onPress={onRegister} title="S'incrire"  />
        <Text style={styles.text}>Déjà inscrit ?</Text>
        <Button 
            color='gray' 
            onPress={() => navigation.navigate('Login')}
            title="Se connecter" 
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
