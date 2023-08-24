import { StyleSheet, Text, View, Image } from 'react-native'
import styles from "./Styles/MessageCss"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
// import { database } from '../config/firebase'
import {
    doc,
    getDoc,
    query
} from 'firebase/firestore'

const Message = ({id, friendUserName, friendAvatar}) => {
    const [state, setState] = useState({})
    const [user, setUser] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem("user")
        .then(res => {
            const user = JSON.parse(res)
            setUser(user)

            const docRef = doc(database, "messages", id)
            getDoc(docRef)
            .then(doc => {
                setState(doc.data())
                setLoaded(true)
            })
            .catch(err => console.log("MessageError :", err))
        })
        .catch(err => console.log("MessageAsyncStorageError :", err))
    }, [id])

    const displayTime = (date) => {
        const [h, m, s] = date.toTimeString().split(":")
        return `${h}:${m}`
    }
    return (
        <View
            style={user._id === state.to ? styles.container1: styles.container2}
        >
            {
                loaded &&
                <>
                { user._id === state.to ? (
                    <>
                    <View style={styles.left}>
                        <Image
                            style={styles.myAvatar}
                            source={{uri: friendAvatar}}
                        />
                    </View>
                    <View style={styles.right}>
                        <View>
                            <Text style={styles.name}>{friendUserName}</Text>
                        </View>
                        <View style={styles.messageContainer}>
                            <Text style={styles.message}>{state.text}</Text>
                            <View style={styles.time}>
                                <Text style={{color: '#fff'}}>{state.createdAt ? displayTime(new Date(state.createdAt)) : 'NaN'}</Text>
                            </View>
                        </View>
                        <View style={styles.polygonLeft}></View>
                    </View>
                    </> 
                ) : (
                    <>
                        <View style={styles.messageContainer}>
                            <Text style={styles.message} >{state.text}</Text>
                            <View style={styles.time}>
                                <Text style={{color: '#fff'}}>{state.createdAt ? displayTime(new Date(state.createdAt)) : 'NaN'}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.polygonRight}></View>
                    </>
                )
                }
                
                </> 
            }
        </View>
    )
}

export default Message

