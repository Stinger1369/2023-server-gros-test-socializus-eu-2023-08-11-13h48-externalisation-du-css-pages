/*🇫🇷 Page de la Maps (Figma Frame 23) 
Ici, soit:
- Vous demandez d'abord la position exacte de l'utilisateur. S'il ne veut pas activer le GPS,
 récupérez sa ville dans ses données et modifiez la variable location.  

- Vous récupérez directement l'adresse ou la ville de l'utilisateur à partir de leurs données.
Ajoutez un FAB (de la librairie react-native-elements) pour demander la permission à l'utilisateur
 d'avoir sa position exacte (au cas où il n'est pas dans sa ville de résidence).

Dans tous les cas, à partir de la donnée de position, on récupère la liste des activités
dont l'adresse est proche de la position actuelle (ou la ville) de l'utilisateur. Une liste de
marqueurs sera mise en place, il faudra faire en sorte de les placer sur la carte (voir la doc de react-native-maps). 
Il faudra aussi que l'utilisateur puisse accéder à la fiche de l'activité détaillée à partir du marqueur.
🇫🇷 */

/* 🇬🇧 Maps Page (Figma Frame 23) 
Here, either:
- Ask for the user's exact location. If they don't wish to activate geolocation,
 get their address or city from their data.

- Fetch the user's address or city from their data. Add a FAB
 (from the react-native-elements library) for asking permission to get the user's exact
  location (they may not be in the city of residence).

In any case, from the location data, it will fetch the activities' addresses near the
user's location. A list of markers will then be created, which then have to be put on
the map (see react-native-maps doc). Also make sure the user can view the event details
from the marker.
🇬🇧 */
import { hostname } from "../backendconnect/hostname"
import axios from "axios";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

const MapsScreen = ({ fromStack }) => {
  //(fr)initialisation des states
  //(GB) state initialization
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState({
    latitude: 48.85714319815175,
    longitude: 2.347655098840397,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04
  });

  const fetchActivitiesLocations = async () => {
    try {
      const response = await axios.get(
        `${hostname}/api/activities/getlist`
      );
      const stepArray = [];
      response.data.forEach((event) => {
        stepArray.push({
          id: event._id,
          latitude: event.mapLatitude,
          longitude: event.mapLongitude,
          title: event.title,
          description: "no"
        });
      });
      setMarkers(stepArray);
      console.log(markers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {fetchActivitiesLocations()}, []);

  if ((fromStack = "activities")) {
    return (
      markers.length > 0 && (
        <MapView
          //🇫🇷 Les coordonnées de la MapView sont manquantes
          //🇬🇧 MapView dimensions are missing
          style={{ flex: 1 }}
          initialRegion={location}
          showsUserLocation={true}
        >
          <Marker coordinate={location} pinColor="#3A8569" />
          {/* {console.log(markers)}
          {markers.map((marker) => {
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.longitude,
                  longitude: marker.latitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })} */}
        </MapView>
      )
    );
  }
};

export default MapsScreen;
