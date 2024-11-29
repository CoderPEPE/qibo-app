import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { useAtom } from "jotai";
import bodyConstitutionResult from "../../store/bodyConstitutionResult";

const { width } = Dimensions.get("window");

const ResultsScreen = ({ navigation, route }) => {
  const [bodyConstitution, setBodyConstitution] = useAtom(
    bodyConstitutionResult
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <LinearGradient
        start={{ x: 1, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        colors={["rgb(236, 163, 167)", "rgb(193, 122, 126)"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Constitution Results</Text>
          <View style={styles.resultsContainer}>
            <Text style={styles.resultText}>
              Balanced Constitution:{" "}
              <Text style={styles.resultValue}>
                {bodyConstitution.balancedConverted.toFixed(2)}%
              </Text>
            </Text>
            <Text style={styles.resultText}>
              Yang Deficiency:{" "}
              <Text style={styles.resultValue}>
                {bodyConstitution.yangDeficientConverted.toFixed(2)}%
              </Text>
            </Text>
            {/* Add more results here if necessary */}
          </View>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() =>
              navigation.navigate("QuestionScreen", { reset: true })}
          >
            <Text style={styles.buttonText}>Retake the Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() =>
              navigation.push("BottomTabBar", { pageView: "main" })}
          >
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Sizes.fixPadding * 2
  },
  title: {
    ...Fonts.whiteColor35Bold,
    marginBottom: Sizes.fixPadding * 3,
    textAlign: "center"
  },
  resultsContainer: {
    width: width * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  resultText: {
    ...Fonts.darkRedColor20Bold,
    marginBottom: Sizes.fixPadding * 2
  },
  resultValue: {
    ...Fonts.primaryColor20Bold
  },
  restartButton: {
    marginTop: Sizes.fixPadding * 4,
    backgroundColor: Colors.darkRed,
    paddingVertical: Sizes.fixPadding * 1.5,
    paddingHorizontal: Sizes.fixPadding * 3,
    borderRadius: Sizes.fixPadding * 2
  },
  buttonText: {
    ...Fonts.whiteColor18Bold,
    textAlign: "center"
  }
});

export default ResultsScreen;
