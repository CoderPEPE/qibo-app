import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
// import StripeProvider, { useStripe } from "@stripe/stripe-react-native";

const subscribePackageList = [
  {
    id: "1",
    packType: "Starter Pack",
    validityInMonths: 3,
    amount: 8.99
  },
  {
    id: "2",
    packType: "Standered Pack",
    validityInMonths: 6,
    amount: 15.99
  },
  {
    id: "3",
    packType: "Super Saver Pack",
    validityInMonths: 12,
    amount: 25.99
  }
];

const subscriptionAllowsList = [
  "Unlock All Lessons",
  "Unlock All Ingredients",
  "High quality body checker",
  "Integrate AI"
];

const subscriptionScreen = ({ navigation }) => {
//   const stripe = useStripe();
//   const subscribe = async (amount) => {
//     try {
//       const response = await fetch("http://localhost:8080/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ amount })
//       });
//       const data = await response.json();
//       console.log(data);
//       if (!response.ok)
//         return Alert.alert(
//           "Something went wrong, try again later",
//           data.message
//         );
//       const { clientSecret } = data.clientSecret;
//       const initSheet = await stripe.initPaymentSheet({
//         paymentIntentClientSecret: clientSecret
//       });
//       if (initSheet.error)
//         return Alert.alert(
//           "Something went wrong, try again",
//           initSheet.error.message
//         );
//       const paymentSheet = await stripe.presentPaymentSheet({
//         clientSecret
//       });
//       if (paymentSheet.error)
//         return Alert.alert(
//           "Something went wrong, try",
//           paymentSheet.error.message
//         );
//       Alert.alert("Payment successful");
//     } catch (error) {
//       console.log(error);
//       Alert.alert("Something went wrong", error.message);
//     }
//   };

  return (
    // <StripeProvider publishableKey="sk_test_51JLlrQSCrqIF8lRiuhSYY7MVJSgCX6UwcuCBpj1uXQCqGncGi4KA9Zbsa9cj42TtuaNd8fN8QMu0YPXEjT6veHiY00RqWsKaoE">

    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {header()}
          {packages()}
          {subscriptionAllowsInfo()}
        </ScrollView>
      </View>
      </SafeAreaView>
    // </StripeProvider>
  );

  function subscriptionAllowsInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor15Bold
          }}
        >
          Subscription allows
        </Text>
        {subscriptionAllowsList.map((item, index) =>
          <View key={`${index}`}>
            <View
              style={{
                marginBottom: Sizes.fixPadding + 10.0,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.checkIconWrapStyle}>
                <MaterialIcons
                  name="check"
                  color={Colors.whiteColor}
                  size={12}
                />
              </View>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding,
                  ...Fonts.blackColor13SemiBold
                }}
              >
                {item}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  function packages() {
    return subscribePackageList.map(item =>
      <View key={`${item.id}`}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.push("ExploreSubscription")}>
            <ImageBackground
              source={require("../../assets/images/card-design.png")}
              style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                height: 130.0,
                marginBottom: Sizes.fixPadding + 5.0
              }}
              borderRadius={Sizes.fixPadding - 5.0}
            >
              <View
                style={{
                  marginBottom: Sizes.fixPadding + 5.0,
                  marginHorizontal: Sizes.fixPadding * 2.0,
                  justifyContent: "flex-end",
                  flex: 1
                }}
              >
                <Text
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...Fonts.whiteColor15SemiBold
                  }}
                >
                  {item.packType}
                </Text>
                <Text style={{ ...Fonts.whiteColor22Light }}>
                  {item.validityInMonths} MONTHS
                </Text>
                <Text
                  style={{ alignSelf: "flex-end", ...Fonts.whiteColor22Light }}
                >
                  $ {item.amount}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.pop()}
        />
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Subscribe</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 10.0,
    marginTop: Sizes.fixPadding - 40.0
  },
  checkIconWrapStyle: {
    width: 18.0,
    height: 18.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5B2544",
    borderRadius: Sizes.fixPadding - 7.0
  }
});

export default subscriptionScreen;
