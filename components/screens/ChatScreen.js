import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import FirebaseService from '../../services/FirebaseService';
import UseAuth from '../../hooks/UseAuth';
import { query, orderBy, onSnapshot, where } from 'firebase/firestore';

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([]);
    const user = UseAuth();

    const onLogout = async () => {
        await FirebaseService.logout();
    }

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );

        await FirebaseService.addMessage(messages[0]);
    }, []);

    useEffect(() => {
        const q = query(
            FirebaseService.messageCollection,
            orderBy('createdAt', 'desc'),
            // where('userUid', '==', user?.uid)
        );
    
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const messages = querySnapshot.docs.map(doc => ({
                _id: doc.id, // Utilisez doc.id pour obtenir l'ID du document Firestore
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user 
            }));
            setMessages(messages);
        });
    
        return () => unsubscribe();
    }, []);
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={{ marginRight: 10 }}>
                    <Text>Déconnexion</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation, onLogout]);

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.userInfo}>Connecté en tant que : {user.email}</Text>
            <GiftedChat
                messages={messages}
                showUserAvatar={true}
                renderAvatarOnTop={true}
                showAvatarForEveryMessage={true}
                user={{ _id: user?.uid, avatar: 'https://i.pravatar.cc/300', name: 'React Native', }}
                onSend={onSend}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    userInfo: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 10
    }
});
