// FR - Choix du type d'activité: standard ou à plusieurs étapes (Frame 30) - FR
// ENG - Activity type choices: standard or multi-steps (Frame 30) - ENG

import { createActivityStyle } from "./CreateActivityStyle";
import { Text, View, Image } from "react-native";

const CreateActivityScreen_Step0 = () => {
  return (
    <>
      <View>
        <Text style={createActivityStyle.mainTitle}>
          What kind of activity do you want to create?
        </Text>
      </View>
      <View style={createActivityStyle.imagesContainer}>
        <View>
          <Image style={createActivityStyle.activityTypeImage} source={require("")} />
          <Text>Standard Activity</Text>
        </View>
        <View>
          <Image source={require("")} />
          <Text>Activities with Steps</Text>
        </View>
      </View>
    </>
  );
};

export default CreateActivityScreen_Step0;
