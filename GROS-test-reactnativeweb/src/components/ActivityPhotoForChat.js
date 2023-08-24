/*  ENG - This component gets an image from the Web using a search
  function which can be used to illustrate the user's activity. Careful
  with the future Unsplash updates, I edited the UnsplashSearch.tsx to
  style the component  as set in Figma. The code is in the folder "helpCodes".
 If you want to redefine the moment where the chosen image is deleted so the user can choose another one, just move the functions setActivityImage(null) and setTrigger(false) elsewhere.
   - ENG */

/*  FR - Ce composant se charge d'aller chercher et montrer la photo que
 l'utilisateur va choisir pour illustrer leur activité. Attention avec les
éventuelles futures mises à jour d'Unsplash, j'ai édité le fichier
UnsplashSearch.tsx pour styliser le composant à l'image du Figma.
Le code est dans le dossier "helpCodes".

Si vous voulez redéfinir le moment où l'image choisie s'efface pour que l'utilisateur puisse en enregistrer une autre, déplacer les fonctions setActivityImage(null) et setTrigger(false) ailleurs.
- FR
//🇫🇷 Recherche de l'image de l'activité (Frame 34C sur Figma)
//🇬🇧 Search and display of Activity image (Frame 34C of Figma) */
const urlImage =
  require("../../../mvp-reactnative/backendconnect/hostname").imageServerUrl();
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  Animated,
  Image,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import styles from "./Styles/ActivityPhotoForChatCss";
import { Camera } from "expo-camera";
import CameraSvg from "../assets/images/camera.svg";
//import UnsplashSearch from "react-native-unsplash";
import Icon from "react-native-vector-icons/FontAwesome5";
import Webcam from "react-webcam";
import { Icon as Iconsec } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";

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

const ActivityPhotoForChat = ({
  activityImage,
  setActivityImage,
  disabled,
  setDisabled,
  scr,
  topic,
}) => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
  });
  const [askPhotoSourceModalVisible, setAskSourceModalVisible] =
    useState(false);
  const [completedCrop, setCompletedCrop] = useState();
  const [unsplashModalVisible, isUnsplashModalVisible] = useState(false);
  const [imageEditorModalVisible, isImageEditorModalVisible] = useState(false);
  const [photoSource, setPhotoSource] = useState(false);
  const [activityPhoto, setActivityPhoto] = useState(null);
  const [takePictureModal, setTakePictureModal] = useState(false);

  const [uploadIcon, setUploadIcon] = useState("dots-horizontal");
  const [uploadStateColor, setUploadStateColor] = useState("#787878");
  const [files, setFiles] = useState("");

  const [crop, setCrop] = useState();
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [photoAuthor, setPhotoAuthor] = useState({
    pseudo: "",
    firstName: "",
    lastName: "",
  });
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [trigger, setTrigger] = useState(false);

  const scale = 1;
  const rotate = 0;
  const aspect = 25 / 15;
  //(fr) Aspect Defini à 25/15 = 1.66 pour avoir l'ensemble de l'image
  //(GB) Define aspect to 25/15 = 1.66 to have all the representation of the picture
  //(fr) aspect de l'image (permet de gerer le cadre de l'image)
  //(GB) Picture aspect (permit to manage image frame)
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  {
    /* (fr) Appel le CanvasPreview pour la réduction de la taille de l'image */
    /* (Gb) Call the CanvasPreview for the reduction of the picture size */
  }
  useDebounceEffect(
    async () => {
      var response = await fetch(activityPhoto);
      var blob = await response.blob();
      var fileSizeInMb = (blob.size / (1024 * 1024)).toFixed(2);
      var profilePicture = false;
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
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      setActivityPhoto(imageSrc);
      setFiles([{ name: `${shortName}.jpeg` }]);
      setTakePictureModal(false);
      isImageEditorModalVisible(!imageEditorModalVisible);
    } catch (error) {
      setTakePictureModal(false);
      isImageEditorModalVisible(false);
      console.log("ActivityPhotoForChat error", error);
    }
  }, [webcamRef]);
  const handleImageSelection = (event) => {
    activityImage && setActivityImage(null);
    setTrigger(false);
    setUploadIcon("");
    setUploadStateColor("");
    setUploadErrorMessage("");
    setFiles(event.target.files);
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      setActivityPhoto(reader.result?.toString() || "")
    );
    console.log(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
    isImageEditorModalVisible(!imageEditorModalVisible);
  };

  {
    /* FR - Découpe de l'image selon les infos récupérées, et enregistrement. - FR */
  }
  {
    /* ENG - Image crop according to the fetched data - ENG */
  }

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

  const sendAvatarImageToSocializusImageServer = async (base64, nom) => {
    let newName = nom.split(".").slice(0, -1).join(".") + ".jpeg";
    let body = { base64: base64, nom: newName };
    try {
      const response = await fetch(
        urlImage + "ajouter-image", // "https://images.socializus.com/server-image/ajouter-image",
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
  useEffect(() => {
    if (activityPhoto && trigger) {
      sendAvatarImageToSocializusImageServer(activityPhoto, files[0].name);
      setTrigger(true);
    }
  }, [trigger]);

  useEffect(() => {
    activityImage &&
    activityImage.includes(
      urlImage /* "https://images.socializus.com/server-image/" */
    )
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
  }, [activityImage]);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotatingDots = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => rotatingDots());
  };

  //The useEffect triggers the animation when the uploadIcon has the dots-circle as a value
  useEffect(() => {
    uploadIcon === "dots-circle" && rotatingDots();
  }, [uploadIcon]);

  const pickOptions = () => {
    setAskSourceModalVisible(!askPhotoSourceModalVisible);
  };

  useEffect(() => {
    if (imageEditorModalVisible) {
      setAskSourceModalVisible(false);
    }
  });
  return (
    <View>
      {/* Photo source modal */}
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
              style={ styles.cropModalBtn }
              onPress={() =>
                isImageEditorModalVisible(!imageEditorModalVisible)
              }
            >
              <Iconsec
                name="close"
                type="font-awesome"
                color="#ccc"
                size={28}
              />
            </TouchableOpacity>
            <ScrollView style={ styles.scrollViewStyle } >
              {!!activityPhoto && (
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
                      source={activityPhoto}
                      style={{ flex: 1 }}
                      onLoad={onImageLoad}
                      crossOrigin="anonymous"
                    />
                  </ReactCrop>
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={ styles.touchableOpacityStyle }
              onPress={() => setCroppedImage()}
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
      {/* Take picture */}
      <Modal animationType="fade" transparent={true} visible={takePictureModal}>
        <View style={[styles.modalContainer, { justifyContent: "flex-end" }]}>
          <View style={styles.askModalView}>
            <View>
              <Camera
                style={ styles.cameraView }
                ref={webcamRef}
                type={Camera.Constants.Type.back}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={capture} style={styles.captureBtn}>
                  <Text style={styles.captureBtnText}>Capture photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={askPhotoSourceModalVisible}
        onRequestClose={() => {
          setAskSourceModalVisible(!unsplashModalVisible);
        }}
      >
        <View style={[styles.modalContainer, { justifyContent: "flex-end" }]}>
          <View style={styles.askModalView}>
            <TouchableOpacity
              style={ styles.touchableOpacityTwo }
              onPress={() =>
                setAskSourceModalVisible(!askPhotoSourceModalVisible)
              }
            >
              <MaterialCommunityIcons name="close" color="#ccc" size={30} />
            </TouchableOpacity>
            <View style={ styles.cameraPhotoView }>
              {/*utilisation de l'appareil photo*/}
              <View style={ styles.cameraPhotoSubView }>
                <TouchableOpacity
                  style={styles.photoSourceIcon}
                  onPress={() => {
                    setTakePictureModal(!takePictureModal);
                    setAskSourceModalVisible(false);
                  }}
                >
                  <Image source={Camera} />
                </TouchableOpacity>
                <Text style={ styles.takePicTxt }>
                  Take new picture
                </Text>
              </View>

              <View style={ styles.libraryPhotoContainer }>
                {" "}
                {/*utilisation de photos dans librairie*/}
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelection}
                  style={{ display: "none" }}
                />
                <label htmlFor="profilePic">
                  <TouchableOpacity
                    style={[styles.photoSourceIcon]}
                    onPress={() => {
                      handleImageSelection;
                    }}
                  >
                    <Icon
                      name="image"
                      type="font-awesome"
                      color="#59c09b"
                      size={30}
                    />
                  </TouchableOpacity>
                </label>
                <Text style={ styles.searchInDeviceTxt }>
                  Search in my device {/*Search in my device*/}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {Platform.OS === "web" ? (
        <>
          <TouchableOpacity onPress={pickOptions}>
            <>
              {activityPhoto !== null ? (
                <View style={ styles.activityPhotoContainer }>
                  <Image
                    source={{ uri: activityPhoto }}
                    style={styles.chosenImageProps}
                  />
                </View>
              ) : (
                <>
                  <View style={styles.photoIconProps}>
                    <Image source={CameraSvg} />
                  </View>
                </>
              )}
            </>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {" "}
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleImageSelection}
            style={{ display: "none" }}
          />
          <label htmlFor="profilePic">
            <View style={styles.photoIconProps}>
              <Image source={CameraSvg} />
            </View>
          </label>
        </>
      )}

      {activityPhoto !== null && photoSource ? (
        <Text style={styles.photoAuthor}>
          Author: {photoAuthor.pseudo} ({photoAuthor.firstName}
          {photoAuthor.lastName})
        </Text>
      ) : null}
      {/* FR - Le canvas est important pour pouvoir récupérer la version coupée de l'image (dimensions et axes d'origine du découpage). Il ne faut pas l'enlever! - FR */}
      {/* ENG - The canvas is important for getting the cropped version of the image (dimensions and crop origin axis). Don't remove it! - ENG */}
      {!!completedCrop && (
        <canvas
          ref={previewCanvasRef}
          style={[ styles.completedCropCanvas, { width: completedCrop.width, height: completedCrop.height }]}
        />
      )}
    </View>
  );
};

export default ActivityPhotoForChat;
