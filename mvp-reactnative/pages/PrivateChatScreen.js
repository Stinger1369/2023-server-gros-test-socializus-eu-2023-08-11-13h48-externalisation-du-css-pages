//🇫🇷 Page détails conversation privée (Figma Frame 27)
//🇬🇧 Private chat screen (Figma Frame 27) 
import { SafeAreaView, ScrollView, StyleSheet, Image, TextInput, View } from 'react-native'
import styles from "./Styles/PrivateChatScreenCss"
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { hostname } from "../backendconnect/hostname"

// Composants
import Message from '../components/Message'
import sendArrow from "../assets/images/send.png"
import plus from "../assets/images/plus.png"
import joinFile from "../assets/images/joinFile.png"
import messageEmoji from "../assets/images/messageEmoji.png"

import { TouchableOpacity } from 'react-native-gesture-handler'//🇫🇷 Composant pour les boutons/ (gb) component button (Figma Frame 27)
import { useRoute } from '@react-navigation/native'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'//
import { io } from 'socket.io-client'

const socket = io(`${hostname}`)

//Méthode de conversation privée entre les utilisateurs
const PrivateChatScreen = () => {
    const route = useRoute()
    const chatId = route.params.chatId
    const [user, setUser] = useState({})
    const [state, setState] = useState({})
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const socketRef = useRef()
    const scrollViewRef = useRef()

    useEffect(() => {// useffect pour recuperer les messages de la converation privée/ (gb) useffect to retrieve the messages of the private converation (Figma Frame 27)
        AsyncStorage.getItem("user")
        .then(res => {
            const user = JSON.parse(res)
            setUser(user)
            Axios.get(
                `${hostname}/api/private_chats/${chatId}`,//🇫🇷 Récupération de la conversation privée (gb) get private chat/ (gb) retrieving the private conversation   (Figma Frame 27)
                {
                    headers: {// 🇫🇷 En-tête de la requête (gb) request header (Figma Frame 27)/ (gb) request header (Figma Frame 27
                        authorization: `Bearer ${user.token}`
                    }
                }
            )
            .then(res => {
                const {messages, ...others} = res.data// 🇫🇷 Récupération des messages (gb) get messages/(gb)obtaining messages(Figma Frame 27)
                setState(others)// 🇫🇷 Récupération de l'utilisateur (gb) get user (Figma Frame 27)
                setMessages(messages)
            })
            .catch(err => console.log("PrivateChatScreenError :", err))// 🇫🇷 Erreur de récupération des messages (gb) error retrieving messages (Figma Frame 27)
        })
        .catch(err => console.log("PrivateChatScreenAsyncStorageError :", err))// 🇫🇷 Erreur de récupération de l'utilisateur (gb) error retrieving user (Figma Frame 27)
    }, [chatId])

    useLayoutEffect(() => {
        socketRef.current = io(`${hostname}`)// 🇫🇷 Connexion au serveur (gb) connection to the server (Figma Frame 27)

        socketRef.current.emit("join_room", {room: state._id})// 🇫🇷 Connexion à la conversation privée (gb) connection to the private conversation (Figma Frame 27)
    }, [state])

    useEffect(() => {
        //socket.emit("join_room", {room: state._id})
        
        socketRef.current.on("receive_message", data => {
            // const msgs = [...messages, data.message]
            // setMessages(msgs)
            if (data.author !== user._id) {
                // Axios.get(
                //     `${hostname}/api/private_chats/${chatId}`,
                //     {
                //         headers: {
                //             authorization: `Bearer ${user.token}`
                //         }
                //     }
                // )
                // .then(res => {
                //     const {messages, ...others} = res.data
                //     setMessages(messages)
                // })
                // .catch(err => console.log("PrivateChatScreenError :", err))
                setMessages(messages => {
                    return [...messages, data.message]
                })
            }
            // setState((state) => {
            //     const msgs = [...state.messages, data.message]
            //     state.messages.push(data.message)
            //     return state
            // })
            //setState({messages: [...state.messages, data.message], ...state})
        })

    }, [user, chatId])

    console.log(messages)
// Méthode d'envoie de la conversation privée à un utilisateur en passant par l'api du backoffice.socializus/(gb) method of sending the private conversation to a user by passing through the backoffice.socializus api (Figma Frame 27
    const sendMessage = () => {
        if(message.length > 0) {
            console.log("Début d'envoi")
            Axios.put(
                `${hostname}/api/private_chats/${chatId}/update_messages?action=add`,
                {
                    message: {
                        from: user._id, 
                        avatar: user.avatar,// 🇫🇷 En-tête de la requête (gb) request header (Figma Frame 27)/ (gb) request header (Figma Frame 27
                        to: user._id === state.user1 ? state.user2?._id : state.user1?._id,
                        text: message
                    } 
                },
                {
                    headers: {//
                        authorization: `Bearer ${user.token}`
                    }
                }
            )
            .then(res => {
                console.log("Message envoyé")
                setMessage("")
                setMessages(res.data.messages)
                scrollViewRef.current.scrollToEnd()
                socketRef.current.emit("send_message", {room: state._id, author: user._id, message: res.data.messages[res.data.messages.length-1]})
            })
            .catch(err => console.log("PrivateChatScreenSendMessageError :", err))
        }
    }
    return (
        <SafeAreaView style={styles.privateChat}>
            {/*🇫🇷 Ce ScrollView affiche la liste des messages envoyés dans la conversation*/}
            {/*🇬🇧 This ScrollView displays the messages sent in the conversation*/}
            <ScrollView style={styles.messageBox} ref={scrollViewRef}>
                {
                    messages.map((id, index) => (<Message key={index} id={id} />))
                }
            </ScrollView>
            {/*🇫🇷 Ce ScrollView affiche la liste des messages envoyés dans la conversation*/}
            {/*🇬🇧 This ScrollView displays the messages sent in the conversation*/}
            <View style={styles.controlBar}>
                <View style={styles.textBar}>
                    <TouchableOpacity style={styles.emojiBox}>
                        <Image style={styles.emojiImage} source={messageEmoji}/>//
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <TextInput style={{color: '#000'}} placeholder="Type a message" value={message} onChangeText={setMessage}/>
                    </View>
                    <View style={styles.otherAction}>
                        <TouchableOpacity style={styles.plus}>
                            <Image style={styles.plusImage} source={plus}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.join}>
                            <Image style={styles.join} source={joinFile}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.send} onPress={sendMessage}>
                    <Image style={styles.sendArrow} source={sendArrow}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default PrivateChatScreen

