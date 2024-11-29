import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import LoadingScreen from "./components/loadingScreen";
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import searchScreen from "./screens/search/searchScreen";
import subscriptionScreen from "./screens/profile/subscriptionScreen";
import exploreSubscription from "./screens/exploreSubscription/exploreSubscription";
import paymentFailedScreen from "./screens/paymentFailed/paymentFailedScreen";
import signinScreen from "./screens/auth/signinScreen";
import signupScreen from "./screens/auth/signupScreen";
import welcomeScreen from "./screens/auth/welcomeScreen";
import chooseMusicScreen from "./screens/chooseMusic/chooseMusicScreen";
import splashScreen from "./screens/splashScreen";
import QuestionScreen from "./screens/explore/question";
import ResultsScreen from "./screens/explore/ResultsScreen";
import CheckInScreen from "./screens/checkinScreen/checkinScreen";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={welcomeScreen} />
        <Stack.Screen
          name="Splash"
          component={splashScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="Signin"
          component={signinScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="Signup" component={signupScreen} />
        <Stack.Screen name="ChooseMusic" component={chooseMusicScreen} />
        <Stack.Screen
          name="BottomTabBar"
          component={bottomTabBarScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="Search" component={searchScreen} />
        <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
        <Stack.Screen name="Subscribe" component={subscriptionScreen} />
        <Stack.Screen
          name="ExploreSubscription"
          component={exploreSubscription}
        />
        <Stack.Screen name="PaymentFailed" component={paymentFailedScreen} />
        <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
