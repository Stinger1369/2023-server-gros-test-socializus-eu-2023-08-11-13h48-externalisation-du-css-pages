import {StyleSheet, Text, View, Image} from 'react-native'

import Avatar from "../assets/images/avatar.svg";
import Terms from "../assets/images/terms.svg";
import Notifications from "../assets/images/notifications.svg";
import Phone from "../assets/images/phone.svg";
import ContactUs from "../assets/images/contact-us.svg";
import Settings from "../assets/images/setting1.svg";
import VIP from "../assets/images/vip1.svg";
import User3 from "../assets/images/user3.svg";
import Json from "../assets/json/en.json"



import React from 'react'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
// import styles from './styles';
const CustomDrawerContent2 = (props) => {
    const {panel} = Json
    //text
    //console.log('avatar :',props.user.avatar)
    //console.log('userName :',props.user.userName)

    
    const text = "me"
    const image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    //end text
    
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}
               /* contentContainerStyle={{backgroundColor:'#59c09b'}}*/
            >
                {/*Style the image */}
                <View style={{width: '100%',/* backgroundColor:'#59c09b',*/paddingHorizontal:'6%',padding:"2.5%"}}>
                    <View style={{width:70,alignItems:'center'}}>
                        <Image source={{uri: props.user.avatar || image}} style={{ width: 65,height: 65,borderRadius: 65/2,marginBottom:"3%"}}/>
                        <Text>{props.user.userName || text}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'white'}}>
                   
                    <DrawerItem
                        icon={()=> <VIP width="35" height="35" /> }
                        label={drawer.vip}
                        onPress={() => props.navigation.closeDrawer()}
                        labelStyle={{fontSize:20,marginLeft:"-15%"}}
                        style={{marginBottom: "-1%"}}
                    />
                   
                    {/* <DrawerItem
                        icon={()=> <Notifications width="35" height="35" /> }
                        label="Notifications"
                        onPress={() => props.navigation.closeDrawer()}
                        labelStyle={{fontSize:20,marginLeft:"-15%"}}
                        style={{marginBottom: "-2%"}}
                    /> */}

                    {/* <DrawerItem
                        icon={()=> <Avatar width="35" height="35" /> }
                        label="Sponsorship"
                        onPress={() => props.navigation.closeDrawer()}
                        labelStyle={{fontSize:20,marginLeft:"-15%"}}
                        style={{marginBottom: "-2%"}}
                /> */}

                    <DrawerItem
                        icon={()=> <ContactUs width="35" height="35" /> }
                        label={drawer.contact}
                        onPress={() => {props.navigation.navigate("Contact Us"); props.navigation.closeDrawer()}}
                        labelStyle={{fontSize:20,marginLeft:"-15%"}}
                        style={{marginBottom: "-1%"}}
                    />

                    {/* <DrawerItem
                        icon={()=> <Terms width="35" height="35" /> }
                        label="Terms and Conditions"
                        onPress={() => props.navigation.closeDrawer()}
                        labelStyle={{fontSize:20,marginLeft:"-15%"}}
                        style={{marginBottom: "-2%"}}
                /> */}

                    <DrawerItem
                        icon={()=> <Settings width="35" height="35" /> }
                        label={drawer.settings}
                        onPress={() => props.navigation.closeDrawer()}
                        labelStyle={{fontSize:20,marginLeft:"-15%"}}
                        style={{marginBottom: "-1%"}}
                    />

                    
            </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawerContent2

const styles = StyleSheet.create({})

