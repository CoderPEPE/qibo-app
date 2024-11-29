// Start of Selection
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions
} from "react-native";
import { handleCheckIn } from "../../db/handleCheckIn";
import { scheduleDailyReminder } from "../notification/scheduleDailyReminder"; // Import your notification utility
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";
import { getUserData, resetCheckIns } from "../../db/users";
import { Sizes, Fonts, Colors } from "../../constants/styles";

const { width } = Dimensions.get("window");

const CheckInScreen = () => {
  const [userInfo] = useAtom(userInfoAtom);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0); // Progress towards weekly reward
  const [nextReward, setNextReward] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(
    () => {
      const initializeCheckIn = async () => {
        if (
          !userInfo ||
          !userInfo.userCredential ||
          !userInfo.userCredential.user
        ) {
          setCheckedInToday(false);
          setConsecutiveDays(0);
          setMessage("Please log in to start your journey!");
          setNextReward("");
          setProgress(0);
          setLoading(false);
          return;
        }

        scheduleDailyReminder(); // Schedule daily notification reminder
        try {
          const userData = await getUserData(userInfo.userCredential.user.uid);
          console.log("userData", userData);
          if (userData) {
            const { lastCheckInDate, consecutiveCheckIns } = userData;

            if (lastCheckInDate) {
              const lastCheckIn = lastCheckInDate.toDate();
              const today = new Date();

              // Create date objects at midnight to ignore time differences
              const todayMidnight = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
              );
              const lastCheckInMidnight = new Date(
                lastCheckIn.getFullYear(),
                lastCheckIn.getMonth(),
                lastCheckIn.getDate()
              );

              const diffTime = todayMidnight - lastCheckInMidnight;
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays === 0) {
                // User has already checked in today
                setCheckedInToday(true);
                setConsecutiveDays(consecutiveCheckIns || 0);
                updateUI(consecutiveCheckIns || 0);
              } else if (diffDays === 1) {
                // Eligible to check in today
                setCheckedInToday(false);
                setConsecutiveDays(consecutiveCheckIns || 0);
                updateUI(consecutiveCheckIns || 0);
              } else if (diffDays >= 2) {
                // More than one day missed, reset check-ins
                await resetCheckIns(userInfo.userCredential.user.uid);
                setCheckedInToday(false);
                setConsecutiveDays(0);
                setMessage("Your check-in streak has been reset. Start again!");
                setNextReward("Unlock a new ingredient in 6 days!");
                setProgress(0);
                updateUI(0);
              }
            } else {
              if (consecutiveCheckIns && consecutiveCheckIns > 0) {
                // Assume user has checked in today if there are consecutive check-ins
                setCheckedInToday(true);
                setConsecutiveDays(consecutiveCheckIns);
                updateUI(consecutiveCheckIns);
              } else {
                // No previous check-in and no consecutive check-ins
                setCheckedInToday(false);
                setConsecutiveDays(0);
                setMessage("Start your journey today!");
                setNextReward("Unlock a new ingredient in 6 days!");
                setProgress(0);
                updateUI(0);
              }
            }
          } else {
            // No user data found, ensure existing data remains untouched
            // Optionally, you can choose to initialize user data here if necessary
            setCheckedInToday(false);
            setConsecutiveDays(0);
            setMessage("Start your journey today!");
            setNextReward("Unlock a new ingredient in 6 days!");
            setProgress(0);
            updateUI(0);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setConsecutiveDays(0);
          setCheckedInToday(false);
          setMessage("Error loading data.");
          setNextReward("");
          setProgress(0);
        } finally {
          setLoading(false);
        }
      };

      initializeCheckIn();
    },
    [userInfo]
  );

  const updateUI = days => {
    if (days === 0) {
      setMessage("Start your journey today!");
      setNextReward("Unlock a new ingredient in 6 days!");
    } else if (days < 6) {
      setMessage(`You're doing great! Day ${days}!`);
      setNextReward(`Unlock a new ingredient in ${6 - days} days!`);
    } else if (days === 6) {
      setMessage("Congrats! You've unlocked a new ingredient!");
      setNextReward("Unlock a new recipe tomorrow!");
    } else {
      setMessage("Amazing streak! Keep it up!");
      setNextReward("Unlock a new recipe every 7 days!");
    }
    setProgress(days % 7 / 7); // Update progress bar
  };

  const checkIn = async () => {
    try {
      const updatedCount = await handleCheckIn(
        userInfo.userCredential.user.uid
      );
      setCheckedInToday(true);
      setConsecutiveDays(updatedCount);
      updateUI(updatedCount);
      Alert.alert("Check-In Successful", "Keep up the great work!");
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to check in. Please try again."
      );
    }
  };

  const handleButtonPress = () => {
    console.log("checkedInToday");
    if (checkedInToday) {
      Alert.alert(
        "Information",
        "You have already checked in today. Rewards can only be claimed once per day."
      );
    } else {
      checkIn();
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {bottomImage()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topContainer}>
            {header()}
          </View>
          <View style={{ flex: 1 }}>
            {body()}
          </View>
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
          <Text style={{ ...Fonts.blackColor24Medium }}>
            Hi, {userInfo.userCredential.user.displayName}!
          </Text>
          <Text style={{ ...Fonts.greenColor15Bold }}>
            Get your daily rewards!
          </Text>
        </View>
      </View>
    );
  }

  function body() {
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.messageText}>
          {message}
        </Text>
        {/* Bottom of the motivation words */}
        <Text style={styles.rewardNote}>
          6th-day reward: unlock new ingredient {"\n"}
          7th-day reward: unlock new recipe {"\n"}
          After all ingredients are unlocked, only recipes are unlocked weekly.
        </Text>
        {/* Top of the progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>
        </View>
        <Text style={styles.nextRewardText}>
          {nextReward}
        </Text>
        <TouchableOpacity
          style={[
            styles.checkInButton,
            checkedInToday ? styles.disabledButton : styles.activeButton
          ]}
          onPress={handleButtonPress}
          disabled={checkedInToday}
        >
          <Text style={styles.buttonText}>
            {checkedInToday
              ? "Please wait for next day rewards"
              : "Check-in now for rewards!"}
          </Text>
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
  topContainer: {
    paddingBottom: Sizes.fixPadding * 1.1,
    marginBottom: Sizes.fixPadding * 2.8,
    backgroundColor: "white"
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center"
  },
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 1.0
  },
  profileContainer: {
    borderColor: Colors.pinkColor,
    borderWidth: 3,
    borderRadius: 23,
    overflow: "hidden"
  },
  profilePhoto: {
    width: 43,
    height: 43
  },
  helloContainer: {
    marginTop: Sizes.fixPadding,
    marginLeft: Sizes.fixPadding * 2.5
  },
  bodyContainer: {
    padding: Sizes.fixPadding * 2.0,
    alignItems: "center",
    marginTop: Sizes.fixPadding * 5.0
  },
  messageText: {
    ...Fonts.greenColor15Bold, // Changed to green color
    fontSize: 20, // Increased font size
    textAlign: "center",
    marginBottom: Sizes.fixPadding
  },
  rewardNote: {
    ...Fonts.blackColor14Medium,
    fontSize: 14,
    textAlign: "center",
    marginBottom: Sizes.fixPadding * 2
  },
  rewardLabel: {
    ...Fonts.blackColor14Medium,
    fontSize: 14,
    textAlign: "left",
    marginBottom: Sizes.fixPadding / 2
  },
  progressBarContainer: {
    width: "100%",
    marginVertical: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 4.0,
    alignItems: "flex-start"
  },
  labelsContainer: {
    marginBottom: Sizes.fixPadding / 2,
    width: "100%"
  },
  progressBarBackground: {
    width: "100%",
    height: 25, // Increased thickness
    backgroundColor: Colors.grayColor,
    borderRadius: 6,
    overflow: "hidden"
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.pinkColor, // Changed to green color
    borderRadius: 5
  },
  nextRewardText: {
    marginTop: Sizes.fixPadding * 4.0,
    ...Fonts.blackColor16Medium,
    textAlign: "center",
    marginBottom: Sizes.fixPadding * 5.0
  },
  checkInButton: {
    width: "80%", // Changed from "100%" to "80%"
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding * 1.0,
    alignItems: "center",
    alignSelf: "center"
  },
  activeButton: {
    backgroundColor: "white",
    elevation: 5
  },
  disabledButton: {
    backgroundColor: "white",
    height: 60,
    elevation: 5
  },
  buttonText: {
    ...Fonts.greenColor15Bold,
    textAlign: "center",
    fontSize: 18,
    marginTop: 7
  },
  backImage: {
    width: "100%",
    height: 280
  }
});

export default CheckInScreen;
