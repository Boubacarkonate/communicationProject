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
                _id: doc.data().id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user:{ _id: doc.data().userUid } 
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
        <GiftedChat
            messages={messages}
            user={{ _id: user?.uid }}
            onSend={(messages) => onSend(messages)}
        />
    );
}

const styles = StyleSheet.create({

});
