import React from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as Progress from "react-native-progress";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";
import bodyConstitutionTestCompleted from "../../store/bodyConstitutionTestCompleted";

const { width } = Dimensions.get("window");

const ExploreScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [bodyConstitutionCompleted, setBodyConstitutionCompleted] = useAtom(
    bodyConstitutionTestCompleted
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {bottomImage()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          <View style={styles.topContainer}>
            {header()}
            {!bodyConstitutionCompleted
              ? bodyConstitutionPrompt()
              : bodyStatusInfo()}
          </View>

          {learningInfo()}
          {lockedField()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={styles.profileContainer}>
          <Image
            src={userInfo.userCredential.user.photoURL}
            style={styles.profilePhoto}
          />
        </View>
        <View style={styles.helloContainer}>
          <Text style={{ ...Fonts.blackColor24Medium }}>Good Morning,</Text>
          <Text style={{ marginTop: -5, ...Fonts.blackColor24Bold }}>
            {userInfo.userCredential.user.displayName}!
          </Text>
        </View>
        <View style={styles.boltContainer}>
          <MaterialIcons name="bolt" size={35} color={Colors.blackColor} />
          <Text style={styles.notifyNumber}>11</Text>
        </View>
      </View>
    );
  }

  function bodyConstitutionPrompt() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("QuestionScreen")} // Navigate to body constitution test screen
        style={styles.bodyConstitutionPromptContainer}
      >
        <ImageBackground
          source={require("../../assets/images/body-status.png")}
          style={styles.bodyConstitutionPrompt}
          resizeMode="stretch"
          borderRadius={Sizes.fixPadding * 2.0}
        >
          <View style={styles.qiContainer}>
            <Text style={{ ...Fonts.whiteColor20Medium }}>Take the</Text>
            <Text style={{ ...Fonts.whiteColor17ExtraBold }}>
              Body Constitution Test
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  function bodyStatusInfo() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("QuestionScreen")}
      >
        <ImageBackground
          source={require("../../assets/images/body-status.png")}
          style={styles.bodyStatusInfo}
          resizeMode="stretch"
          borderRadius={Sizes.fixPadding * 2.0}
        >
          <View style={styles.qiContainer}>
            <Text style={{ ...Fonts.whiteColor20Medium }}>
              Body Constitution
            </Text>
            <Text style={{ ...Fonts.whiteColor17ExtraBold }}>
              Qi Deficiency
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  function learningInfo() {
    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Continue learning</Text>
        </View>
        <ImageBackground
          source={require("../../assets/images/learning-back.png")}
          style={styles.learningTab}
          resizeMode="stretch"
          borderRadius={Sizes.fixPadding * 2.0}
        >
          <View style={styles.learningContainer}>
            <Text style={{ ...Fonts.pinkColor18Bold }}>Completed </Text>
            <Text style={{ ...Fonts.pinkColor18Bold }}>01/</Text>
            <Text style={{ ...Fonts.pinkColor18Bold }}>15</Text>
          </View>
          <View
            style={{
              marginBottom: Sizes.fixPadding * 1,
              marginTop: Sizes.fixPadding * 1
            }}
          >
            <Progress.Bar
              progress={0.07}
              width={Sizes.fixPadding * 20}
              height={Sizes.fixPadding * 1.3}
              color={Colors.whiteColor}
              unfilledColor={Colors.pinkColor}
              borderColor={Colors.pinkColor}
              borderRadius={Sizes.fixPadding * 1.5}
              borderWidth={3}
            />
          </View>
          <TouchableOpacity
            style={styles.greenContainer}
            activeOpacity={0.9}
            onPress={() =>
              navigation.push("BottomTabBar", { pageView: "lessonPage" })}
          >
            <Text
              style={{
                marginRight: Sizes.fixPadding,
                ...Fonts.whitecolor16Bold
              }}
            >
              Continue
            </Text>
            <AntDesign
              name="arrowright"
              color={Colors.whiteColor}
              style={{ marginTop: 2 }}
              size={20}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  function lockedField() {
    return (
      <View>
        <View
          style={{
            marginTop: Sizes.fixPadding * 1.5,
            ...styles.titleWrapStyle
          }}
        >
          <Text style={styles.titleStyle}>Unlocked</Text>
        </View>
        <View style={styles.tilesContainer}>
          <TouchableOpacity
            style={styles.itemBox}
            resizeMode="contain"
            activeOpacity={0.9}
            onPress={() =>
              navigation.push("BottomTabBar", { pageView: "ingredients" })}
          >
            <View style={styles.lockedContainer}>
              <Text style={{ ...Fonts.pinkColor18Bold }}>Ingredients</Text>
              <Text style={styles.countContainer}>4/15</Text>
            </View>
            <Image
              source={require("../../assets/images/tile-back.png")}
              style={styles.tileBackground}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemBox}
            resizeMode="contain"
            activeOpacity={0.9}
            onPress={() =>
              navigation.push("BottomTabBar", { pageView: "recipes" })}
          >
            <View style={styles.lockedContainer}>
              <Text style={{ ...Fonts.pinkColor18Bold }}>Recipes</Text>
              <Text style={styles.countContainer}>23</Text>
            </View>
            <Image
              source={require("../../assets/images/tile-back.png")}
              style={styles.tileBackground}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function bottomImage() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Shape.png")}
          style={styles.backImage}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center"
  },
  backImage: {
    width: "100%",
    height: 280
  },
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 1.0
  },
  titleStyle: {
    marginTop: Sizes.fixPadding * 1.5,
    marginBottom: Sizes.fixPadding - 1.0,
    ...Fonts.blackColor23ExtraBold
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profilePhoto: {
    width: 43,
    height: 43
  },
  profileContainer: {
    borderColor: Colors.pinkColor,
    borderWidth: 3,
    borderRadius: 23,
    overflow: "hidden"
  },
  helloContainer: {
    marginTop: Sizes.fixPadding,
    marginLeft: Sizes.fixPadding * 1.5
  },
  boltContainer: {
    marginLeft: "auto",
    position: "relative"
  },
  notifyNumber: {
    position: "absolute",
    top: -8,
    right: -2,
    ...Fonts.greenColor13ExtraBold
  },
  bodyStatusInfo: {
    marginTop: 10,
    height: 140.0,
    flexDirection: "row",
    alignItems: "center"
  },
  qiContainer: {
    marginLeft: Sizes.fixPadding * 5.0,
    marginBottom: Sizes.fixPadding * 1.5
  },
  topContainer: {
    paddingBottom: Sizes.fixPadding * 1.1,
    marginBottom: Sizes.fixPadding * 2.8,
    backgroundColor: "white",
    shadowColor: "#0005",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    elevation: 5,
    borderRadius: Sizes.fixPadding * 3.2
  },
  learningTab: {
    marginLeft: Sizes.fixPadding * 1.3,
    marginRight: Sizes.fixPadding * 1.3,
    height: 140.0,
    paddingLeft: Sizes.fixPadding * 2.8,
    paddingTop: Sizes.fixPadding * 2.5
  },
  learningContainer: {
    flexDirection: "row"
  },
  greenContainer: {
    borderRadius: 20,
    backgroundColor: Colors.greenColor,
    height: Sizes.fixPadding * 2.6,
    width: Sizes.fixPadding * 11.7,
    flexDirection: "row",
    justifyContent: "center"
  },
  tilesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 1.6,
    marginVertical: Sizes.fixPadding * 0.5
  },
  itemBox: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",

    marginHorizontal: 8,
    borderRadius: Sizes.fixPadding * 1.5,
    height: 100,

    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",

    shadowColor: "#0009",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 50,
    shadowOpacity: 0.5,
    elevation: 8
  },
  tileBackground: {
    position: "absolute",
    bottom: -Sizes.fixPadding * 0.2,
    right: 0,
    width: Sizes.fixPadding * 12.4,
    height: Sizes.fixPadding * 6.4,
    resizeMode: "contain" // Preserve the aspect ratio
  },
  lockedContainer: {
    position: "absolute",
    top: Sizes.fixPadding * 1.5,
    left: Sizes.fixPadding * 1.8
  },
  countContainer: {
    marginTop: Sizes.fixPadding * 0.9,
    borderRadius: 20,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.greenColor,
    height: Sizes.fixPadding * 2.4,
    alignSelf: "flex-start",
    flexDirection: "row",
    textAlign: "center",
    ...Fonts.whitecolor16Bold
  },
  bodyConstitutionPromptContainer: {
    marginTop: 10
  },
  bodyConstitutionPrompt: {
    height: 140.0,
    flexDirection: "row",
    alignItems: "center"
  }
});

export default ExploreScreen;
