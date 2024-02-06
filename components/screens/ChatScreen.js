import React, { useCallback, useLayoutEffect, useState } from 'react'; 
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import FirebaseService from '../../services/FirebaseService';

export default function ChatScreen({ navigation }) {
    const [messages, setMessages] = useState([]);

    const onLogout = async () => {
        await FirebaseService.logout();
    }

    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onLogout} style={{marginRight: 10}}>
                    <Text>Déconnexion</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <GiftedChat 
            messages={messages}
            onSend={onSend}
        />
    );
}

const styles = StyleSheet.create({

});
