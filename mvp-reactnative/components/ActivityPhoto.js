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
- FR */

//🇫🇷 Recherche de l'image de l'activité (Frame 34C sur Figma)
//🇬🇧 Search for Activity image (Frame 34C of Figma)

const urlImage = require("../backendconnect/hostname").imageServerUrl();
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  Image,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import styles from "./Styles/ActivityPhotoCss";
import PhotoSvg from "../assets/images/photo.svg";
//import UnsplashSearch from "react-native-unsplash";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Icon as Iconsec } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
// import "react-image-crop/dist/ReactCrop.css";
import { activities } from "../assets/activityList/activityListWithIcons";
import Json from "../assets/json/en.json";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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

const ActivityPhotoSearch = ({
  activityImage,
  setActivityImage,
  // disabled,
  // setDisabled,
  // scr,
  topic,
}) => {
  const { modal_Image } = Json;

  const unsplashKey = "V5naPaTjx6P1z10fh5gW_9hRvp1hxrlodqeBz0u1V-Q";
  const [askPhotoSourceModalVisible, setAskSourceModalVisible] =
    useState(false);
  const [completedCrop, setCompletedCrop] = useState();
  const [unsplashModalVisible, isUnsplashModalVisible] = useState(false);
  const [imageEditorModalVisible, isImageEditorModalVisible] = useState(false);
  const [photoSource, setPhotoSource] = useState(false);
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
  const aspect = 16 / 9;
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
      var response = await fetch(activityImage);
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

const handleImageSelection = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
        // Utilisez 'result.uri' pour obtenir le chemin d'accès local de l'image sélectionnée
        setActivityImage(result.uri);
    }
};

  const [activityPhoto, setActivityPhoto] = useState(null);

  const setCroppedImage = async () => {
    try {
      var response = await fetch(activityPhoto);
      if (!response.ok) {
        console.error(`Failed to fetch activityPhoto: ${response.status}`);
        return;
      }

      var blob = await response.blob();
      var fileSizeInMb = (blob.size / (1024 * 1024)).toFixed(2);

      var quality;
      if (fileSizeInMb > 0.03) {
        quality = 0.1; // vous pouvez ajuster cette valeur pour obtenir la taille de fichier désirée
      } else {
        quality = 1;
      }

      if (previewCanvasRef.current) {
        setActivityPhoto(
          previewCanvasRef.current.toDataURL("image/jpeg", quality)
        );
        setTrigger(true);
      }
    } catch (error) {
      console.error(`Failed to set cropped image: ${error.message}`);
    } finally {
      isImageEditorModalVisible(!imageEditorModalVisible);
    }
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
      // setDisabled(false);
    } catch (error) {
      setErreur(true);
      setUploadIcon("close-thick");
      setUploadStateColor("#DA5A58");
      setUploadErrorMessage(createProfile.uploadFailed);
    }
  };

  useEffect(() => {
    if (activityImage && trigger) {
      sendAvatarImageToSocializusImageServer(activityImage, files[0].name);
      setTrigger(true);
    }
  }, [trigger]);

  useEffect(() => {
    activityImage &&
    activityImage.includes(
      urlImage /*"https://images.socializus.com/server-image/"*/
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

  const pickOptions = () => {
    setAskSourceModalVisible(!askPhotoSourceModalVisible);
  };

  useEffect(() => {
    if (imageEditorModalVisible) {
      setAskSourceModalVisible(false);
    }
  });

  //Image pick from Unsplash
  const [searchTerm, setSearchTerm] = useState(
    activities[topic].activityTypeTitle
  );
  const [images, setImages] = useState([]); // Nouvel état pour stocker les images

  useEffect(() => {
    searchUnsplash(searchTerm);
  }, []);

  const searchUnsplash = async (searchQuery) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&client_id=${unsplashKey}`
    );
    const data = await response.json();
    // `results` est un tableau d'objets d'images retournés par l'API de recherche d'Unsplash
    const results = data.results;
    setImages(results); // Mettre à jour l'état avec les images obtenues de la recherche
  };

  const pickFromUnsplash = () => {
    setActivityImage(null);
    setTrigger(false);
    setAskSourceModalVisible(false);
    setPhotoSource(true);
    isUnsplashModalVisible(!unsplashModalVisible);
  };

  const pickUnsplashImage = (chosenImage) => {
    setActivityImage(chosenImage.urls.small);
    setPhotoAuthor({
      pseudo: chosenImage.user.username,
      firstName: chosenImage.user.first_name,
      lastName: chosenImage.user.last_name,
    });
    // setDisabled(false);
    setTimeout(() => {
      isUnsplashModalVisible(false);
    }, 200);
  };

  <FlatList
    data={images}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => pickUnsplashImage(item)}>
        <Image
          source={{ uri: item.urls.small }}
          style={ styles.flatlistImages } // Vous pouvez ajuster la taille de l'image
        />
      </TouchableOpacity>
    )}
  />;
  return (
    <View>
      {/* Photo source modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageEditorModalVisible}
        onRequestClose={() => {
          isImageEditorModalVisible(!imageEditorModalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.cropModalView}>
            <TouchableOpacity
              style={ styles.cropModalButton }
              onPress={() =>
                isImageEditorModalVisible(!imageEditorModalVisible)
              }>
              <Iconsec
                name="close"
                type="font-awesome"
                color="#ccc"
                size={28}
              />
            </TouchableOpacity>
            <ScrollView
              style={ styles.scrollViewStyle }>
              {!!activityImage && (
                <>
                  <ReactCrop
                    crop={crop}
                    onChange={(_, c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    maxWidth={450}
                    maxHeight={260}>
                    <Image
                      ref={imageRef}
                      source={activityImage}
                      style={{ flex: 1 }}
                      onLoad={onImageLoad}
                      crossOrigin="anonymous"
                    />
                  </ReactCrop>
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={ styles.cropImageButton }
              onPress={() => setCroppedImage()}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={askPhotoSourceModalVisible}
        onRequestClose={() => {
          setAskSourceModalVisible(!unsplashModalVisible);
        }}>
        <View style={[styles.modalContainer, { justifyContent: "flex-end" }]}>
          <View style={styles.askModalView}>
            <TouchableOpacity
              style={ styles.modalVisibleButton }
              onPress={() =>
                setAskSourceModalVisible(!askPhotoSourceModalVisible)
              }>
              <MaterialCommunityIcons name="close" color="#ccc" size={30} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}>
              {modal_Image.modal_message}{" "}
              {/*Add illustration from our free or your personal picture library*/}
            </Text>
            <View
              style={ styles.unsplashView }>
              {/*utilisation de unsplash*/}
              <View
                style={ styles.unsplashViewTwo }>
                <TouchableOpacity
                  style={styles.photoSourceIcon}
                  onPress={pickFromUnsplash}>
                  <Icon
                    name="unsplash"
                    type="font-awesome-5"
                    color="#59c09b"
                    size={30}
                  />
                </TouchableOpacity>
                <Text style={ styles.imageTitleText }>
                  {modal_Image.title_unsplash} {/*Search by keyboard*/}
                </Text>
              </View>

              <View
                style={ styles.imageView }>
                {/* {" "} */}
                {/*utilisation de photos dans librairie a remplacer par ImagePicker ou alternative*/}
                {/* <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelection}
                  style={{ display: "none" }}
                /> */}
                  <TouchableOpacity
                    style={[styles.photoSourceIcon]}
                    onPress={ handleImageSelection}>
                    <Icon
                      name="image"
                      type="font-awesome"
                      color="#59c09b"
                      size={30}
                    />
                  </TouchableOpacity>
                <Text style={ styles.searchText }>
                  {modal_Image.title_library} {/*Search in my device*/}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Unsplash modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={unsplashModalVisible}
        onRequestClose={() => {
          isUnsplashModalVisible(!unsplashModalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.unsplashModalView}>
            <TouchableOpacity
              style={{ margin: 5, alignSelf: "flex-end" }}
              onPress={() => isUnsplashModalVisible(!unsplashModalVisible)}>
              <MaterialCommunityIcons name="close" color="#ccc" size={30} />
            </TouchableOpacity>
            <Text style={styles.unsplashModalTitle}>
              {modal_Image.find_message}{" "}
              {/*Trouvez une image pour votre activité*/}
            </Text>
            <Text style={styles.unsplashModalText}>
              {modal_Image.text_unsplash}
              {/*Trouvez l'image parfaite pour illustrer votre activité et attirer plus de personnes grâce à Unsplash.*/}
            </Text>
            <Text
              style={[
                styles.unsplashModalText,
                { marginVertical: 5, fontSize: 13 },
              ]}>
              {modal_Image.suggest_unsplash}
              {/*(Ou revenez pour télécharger votre propre image)*/}
            </Text>

            {/* Utilisez un TextInput pour que l'utilisateur puisse entrer son terme de recherche */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Recherchez une image..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => searchUnsplash(searchTerm)}>
                <Text style={styles.searchButtonText}>Rechercher</Text>
              </TouchableOpacity>
            </View>

            {/* Utilisez FlatList pour afficher les images récupérées */}
            <FlatList
              data={images}
              keyExtractor={(item) => item.id}
              numColumns={2} // Définir le nombre de colonnes sur 2 pour afficher les images deux par deux
              renderItem={({ item }) => (
                <View style={{ flex: 1, padding: 5 }}>
                  <TouchableOpacity onPress={() => pickUnsplashImage(item)}>
                    <Image
                      source={{ uri: item.urls.small }}
                      style={{ width: "100%", aspectRatio: 1 }} // Ajuster la taille de l'image pour occuper la moitié de la largeur de l'écran
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[
          styles.addImageButton,
          { height: activityImage !== null ? 250 : 100 },
        ]}
        onPress={pickOptions}>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            height: 250,
            alignItems: activityImage !== null ? null : "center",
          }}>
          {activityImage !== null ? (
            <View style={{ flex: 1, overflow: "hidden" }}>
              <Image
                source={{ uri: activityImage }}
                style={styles.chosenImageProps}
              />
            </View>
          ) : (
            <>
              <View style={styles.photoIconProps}>
                <PhotoSvg style={{width:34, height:34}}/>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
      {activityImage !== null && photoSource ? (
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
          style={{
            borderWidth: 1,
            objectFit: "contain",
            width: completedCrop.width,
            height: completedCrop.height,
            display: "none",
          }}
        />
      )}
    </View>
  );
};

export default ActivityPhotoSearch;


