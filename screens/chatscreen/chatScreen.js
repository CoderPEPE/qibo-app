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
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";

const { width } = Dimensions.get("window");

const ChatScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
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
          </View>

          {chatList()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={styles.profileContainer}>
          <Image
            src={userInfo.userCredential.user.photoURL} // Replace with your default avatar
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
          <MaterialIcons name="chat" size={35} color={Colors.blackColor} />
        </View>
      </View>
    );
  }

  function chatList() {
    return (
      <View>
        <View style={styles.titleWrapStyle}>
          <Text style={styles.titleStyle}>Recent Chats</Text>
        </View>

        {/* Chat Item Component */}
        <TouchableOpacity style={styles.chatItemContainer}>
          <View style={styles.chatItemProfile}>
            <Image
              source={require("../../assets/images/profile-photo.png")}
              style={styles.chatItemProfileImage}
            />
          </View>
          <View style={styles.chatItemTextContainer}>
            <Text style={styles.chatItemName}>Sarah</Text>
            <Text style={styles.chatItemLastMessage}>Hey, how are you?</Text>
          </View>
          <View style={styles.chatItemRightContainer}>
            <Text style={styles.chatItemTime}>2:30 PM</Text>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  ...StyleSheet.create({
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
    // New styles for chat items
    chatItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginVertical: Sizes.fixPadding,
      backgroundColor: "white",
      borderRadius: Sizes.fixPadding * 2.0,
      padding: Sizes.fixPadding,
      shadowColor: "#0005",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      elevation: 3
    },
    chatItemProfile: {
      borderColor: Colors.pinkColor,
      borderWidth: 2,
      borderRadius: 25,
      overflow: "hidden",
      marginRight: Sizes.fixPadding * 1.5
    },
    chatItemProfileImage: {
      width: 50,
      height: 50
    },
    chatItemTextContainer: {
      flex: 1
    },
    chatItemName: {
      ...Fonts.blackColor18Bold
    },
    chatItemLastMessage: {
      ...Fonts.grayColor16Medium,
      marginTop: 5
    },
    chatItemRightContainer: {
      alignItems: "flex-end"
    },
    chatItemTime: {
      ...Fonts.grayColor13Medium
    },
    unreadBadge: {
      backgroundColor: Colors.greenColor,
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5
    },
    unreadText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold"
    }
  })
});

export default ChatScreen;
