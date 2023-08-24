{
  /* FR - Le composant ProfilePicture est le composant où l'utilisateur choisit et découpe son image de profil. La variable profileImage stocke l'image de profil choisie par l'utilisateur, et avatarImage stocke la version coupée. La majorité du code de ce composant est tiré de react-image-crop; voir la documentation du package pour en savoir plus - FR */
}
{
  /* ENG - The profilePicture component is the component where the user choses and crops their profile image. The profileImage variable stocks the chosen image, and avaarImage stocks the cropped version of the image. The majority of this code is from react-image-crop. Go explore the package documantation for more infos. - ENG */
}

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import styles from "../Styles/ProfilePictureCss"
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import * as ImagePicker from "expo-image-picker";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
//import "react-image-crop/dist/ReactCrop.css";

import { Icon } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Camera from "../../assets/images/camera.svg";
import DefaultPicture from "../../assets/images/user-frame-missing.svg";
import Json from "../../assets/json/en.json";
import { Input } from "@rneui/base";


const { createProfile } = Json;

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};

const ProfilePicture = ({
  avatarImage,
  setAvatarImage,
  profileImage,
  setProfileImage,
  createProfile
}) => {
  {
    /* FR - Les références servant à enregistrer les versions de l'image - FR */
  }
  {
    /* ENG - The references that help saving the different verions of the image - ENG */
  }
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const [erreur, setErreur] = useState(false);
  const [completedCrop, setCompletedCrop] = useState();
  const [imageEditorModalVisible, isImageEditorModalVisible] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [uploadIcon, setUploadIcon] = useState("dots-horizontal");
  const [uploadStateColor, setUploadStateColor] = useState("#787878");
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [files, setFiles] = useState("");
 

  const scale = 1;
  const rotate = 0;
  var aspect = 1 / 1; 

  console.log("Completed crop: " + JSON.stringify(completedCrop));

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      console.log(width);
      console.log(height);
      if(height > width){ //Si la hauteur est superieur à la largeur de l'image alors modifié l'aspect de l'image
        aspect = 1/1;
      }
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
    var response = await fetch(profileImage);
    var blob = await response.blob();
    var fileSizeInMb = (blob.size / (1024 * 1024)).toFixed(2);
    var profilePicture = true;
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imageRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imageRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
          fileSizeInMb,
          profilePicture
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  {
    /* FR - Choix et enregistrement de l'image. L'uri a déjà le preset "data:image/jpeg;base64," - FR */
  }
  {
    /* ENG - Image choice and save. The uri already has the "data:image/jpeg;base64," preset - ENG */
  }
  
  const handleImageSelection = async () => {
    setTrigger(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        //Options
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
      });
      if (result.cancelled === true) {
        return;
      }
      const cropRect = {
        originX: 0,
        originY: 0,
        width: result.width,
        height: result.height,
      };
      console.log(result);
      setCompletedCrop(cropRect);
      setProfileImage(result.uri);
      let base64Img = `data:image/jpeg;base64,${result.base64}`;
      setFiles(base64Img);
      setAvatarImage(base64Img);
      //setCroppedImage();
      //isImageEditorModalVisible(!imageEditorModalVisible);
    }
}

/*useEffect(()=>{
  if(profileImage !== null){
    setCroppedImage();
  }
},[profileImage])*/
  {
    /* FR - Découpe de l'image selon les infos récupérées, et enregistrement. - FR */
  }
  {
    /* ENG - Image crop according to the fetched data - ENG */
  }
const [activityPhoto, setActivityPhoto] = useState(null);

  // console.log("CompletedCrop: " + JSON.stringify(completedCrop));
 const setCroppedImage = async () => {
   var response = await fetch(activityPhoto);
   var blob = await response.blob();

   var fileSizeInMb = (blob.size / (1024 * 1024)).toFixed(2);
   //(FR) Appliquer la compression lorque l'image depasse 500 ko

   if (fileSizeInMb > 0.4 && fileSizeInMb < 1.5) {
     previewCanvasRef.current &&
       setActivityPhoto(previewCanvasRef.current.toDataURL("image/jpeg", 0.8));
     console.log("0.4");
     setTrigger(true);
   }
   if (fileSizeInMb > 1.5) {
     previewCanvasRef.current &&
       setActivityPhoto(previewCanvasRef.current.toDataURL("image/jpeg", 0.3));
     console.log("1.5");
     setTrigger(true);
   }
   if (fileSizeInMb < 0.4) {
     previewCanvasRef.current &&
       setActivityPhoto(previewCanvasRef.current.toDataURL("image/jpeg"));
     console.log("<0.4");
     setTrigger(true);
   }

   isImageEditorModalVisible(!imageEditorModalVisible);
 };
  useEffect(()=>{
    console.log(avatarImage);
  },[avatarImage]);
  // If you ever have to use the non-cropped version of the image chosen by the user, just decomment this and the commented function in the useEffect.
 

const sendAvatarImageToSocializusImageServer = async (base64, nom) => {
  let newName = nom.split(".").slice(0, -1).join(".") + ".jpeg";
  let body = { base64: base64, nom: newName };
  try {
    const response = await fetch(
      "https://images.socializus.com/server-image/ajouter-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    setActivityImage(data.link);
    setDisabled(false);
  } catch (error) {
    setErreur(true);
    setUploadIcon("close-thick");
    setUploadStateColor("#DA5A58");
    setUploadErrorMessage(createProfile.uploadFailed);
  }
};

  // The trigger here is to ensure that the functions are called only once. Without it, you'll be stuck in an infinite loop. And thanks to the dependencies, the useEffect is triggered only when both of the variables are not null.
  useEffect(() => {
    if (profileImage && avatarImage && !trigger) {
      sendAvatarImageToSocializusImageServer(avatarImage, files[0].name);
      setTrigger(true);
    }
  }, [profileImage, avatarImage]);

  useEffect(() => {
    avatarImage 
      ? [
          setUploadIcon("check-bold"),
          setUploadStateColor("#59c09b"),
          setUploadErrorMessage(""),
        ]
      : [
          setUploadIcon("dots-circle"),
          setUploadStateColor("#787878"),
          setUploadErrorMessage(""),
        ];
  }, [avatarImage]);

  // Rotate animation (See the "Animated" component from React Native. This video helped me too: https://www.youtube.com/watch?v=wyY1ejRkrcM)
  // Animation reference: here, the value is 0 so, the animation is at its beginning
  const rotateAnim = useRef(new Animated.Value(0)).current;

// Animation props + the rotateAnim reference reset and recursion to make a loop animation
  const rotatingDots = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => rotatingDots());
  };

// Start and end of the animation, and the properties that the element will have at those moments; just like traditional css animation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const noRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "0deg"],
  });

//The useEffect triggers the animation when the uploadIcon has the dots-circle as a value
  useEffect(() => {
    uploadIcon === "dots-circle" && rotatingDots();
  }, [uploadIcon]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageEditorModalVisible}
        onRequestClose={() => {
          isImageEditorModalVisible(!imageEditorModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.cropModalView}>
            <TouchableOpacity
              style={{ margin: 5, alignSelf: "flex-end" }}
              onPress={() =>
                isImageEditorModalVisible(!imageEditorModalVisible)
              }
            >
              <Icon name="close" type="font-awesome" color="#ccc" size={28} />
            </TouchableOpacity>
            <ScrollView
              style={{ width: "100%", height: "auto", overflow: "hidden" }}
            >
              {!!profileImage && (
                <>
                  <ReactCrop
                    crop={crop}
                    onChange={(_, c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    maxWidth={450}
                    maxHeight={275}
                  >
                    <Image
                      ref={imageRef}
                      source={profileImage}
                      style={{ flex: 1 }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={{ margin: 5, marginBottom: 10, alignSelf: "center" }}
              onPress={() => 
                setCroppedImage()}
            >
              <Icon
                name="check"
                type="font-awesome"
                color="#59c09b"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.imgContainer}>
        {!avatarImage ? (
          <DefaultPicture />
        ) : (
          <Image style={styles.img} source={{ uri : avatarImage}} />
        )}
          <TouchableOpacity
            onPress={()=>
              handleImageSelection()
            }
            style={styles.logo}
          >
            <Camera />
          </TouchableOpacity>

      </View>

      {avatarImage && (
        <Animated.View style={{ transform: [{ rotate: uploadIcon === "dots-circle" ? rotation : noRotation }] }}>
          <MaterialCommunityIcons
            name={uploadIcon}
            color={uploadStateColor}
            size={28}
            style={{ marginVertical: 10, alignSelf: "center" }}
          />
        </Animated.View>
      )}
      {
         erreur ? (<View style={styles.errorCard}><Text style={styles.error}>{createProfile.imageSizeError}</Text></View>) : (<Text></Text>) 
      }

      <Text
        style={{
          marginBottom: 10,
          textAlign: "center",
          fontSize: 16,
          color: "#DA5A58",
        }}
      >
        {uploadErrorMessage}
      </Text>

      {/* FR - Le canvas est important pour pouvoir récupérer la version coupée de l'image (dimensions et axes d'origine du découpage). Il ne faut pas l'enlever! - FR */}
      {/* ENG - The canvas is important for getting the cropped version of the image (dimensions and crop origin axis). Don't remove it! - ENG */}
      {!!completedCrop && (
        <Image
          ref={previewCanvasRef}
          style={{
            borderWidth: 1,
            objectFit: "contain",
            width: completedCrop.width,
            height: completedCrop.height,
            display: "none",
          }}
        />
      )}
    </>
  );
};

export default ProfilePicture;




