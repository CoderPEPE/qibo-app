import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Dimensions, ImageBackground, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from 'react-native-progress';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';
import { useAtom } from "jotai";
import userInfoAtom from "../../store/userInfo";
import bodyConstitutionResult from "../../store/bodyConstitutionResult";
import bodyConstitutionTestCompleted from "../../store/bodyConstitutionTestCompleted";

const { width } = Dimensions.get('window');

const questionList = ['Where you energetic?', 'Did you get tired easily?', 'Question3', 'Question4', 'Question5', 'Question6', 'Question7', 'Question8', 'Question9', 'Question10'];
const answerList = ['None', 'Rarely', 'Sometimes', 'Often', 'Always']

const QuestionScreen = ({ navigation, route }) => {

    const [bodyConstitution, setBodyConstitution] = useAtom(bodyConstitutionResult);

    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const [bodyConstitutionCompleted, setBodyConstitutionCompleted] = useAtom(bodyConstitutionTestCompleted);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        if (route?.params?.reset) {
          setCurrentQuestionIndex(0);
          updateState({
            questionCnt: 0,
            selectedAnswer: 0,
            responses: {},
        }); // Reset to the first question
        }
      }, [route.params]);

    const [state, setState] = useState({
        pageTitle: questionList[0],
        selectedAnswer : 0,
        questionCnt: 0,
        responses: {}
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data}));

    const{
        pageTitle,
        selectedAnswer,
        questionCnt,
        responses
    } = state;

    const calculateScores = (responses) => {
        const reverseItems = [2, 7, 8, 9, 22, 54];
        const reversed_scores = reverseItems.reduce((acc, item) => {
          acc[item] = 6 - (responses[item] || 0);
          return acc;
        }, {});

        const calculateConvertedScore = (originalScore, itemCount) => {
            return ((originalScore - itemCount) / (itemCount * 4)) * 100;
        };
        const balancedScores = [
            responses[1],
            reversed_scores[2],
            reversed_scores[7],
            reversed_scores[8],
            reversed_scores[9],
            reversed_scores[22],
            responses[53],
            reversed_scores[54],
        ];
        const balancedOriginal = balancedScores.reduce(
            (acc, score) => acc + (score || 0),
            0
          );
        const balancedConverted = calculateConvertedScore(balancedOriginal, 8);

        const yangDeficientScores = [
            responses[18],
            responses[19],
            responses[20],
            responses[22],
            responses[23],
            responses[52],
            responses[55],
        ];
        const yangDeficientOriginal = yangDeficientScores.reduce(
            (acc, score) => acc + (score || 0),
            0
          );
          const yangDeficientConverted = calculateConvertedScore(
            yangDeficientOriginal,
            7
          );
      
          return {
            balancedConverted,
            yangDeficientConverted,
          };
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
            // Store the selected answer for the current question
            const updatedResponses = { ...responses, [questionCnt]: selectedAnswer };
        
            // Check if all questions are answered
            if (questionCnt + 1 === questionList.length) {
              const scores = calculateScores(updatedResponses);
              setBodyConstitution(scores);
              setBodyConstitutionCompleted(true);
              console.log("Scores: ", scores);
              // Navigate to result screen or display the scores
              navigation.navigate("ResultsScreen", { scores });
            } else {
              updateState({
                questionCnt: questionCnt + 1,
                selectedAnswer: 0,
                responses: updatedResponses,
              });
            }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <LinearGradient
                start={{ x: 1, y: 0.2 }}
                end={{ x: 1, y: 1 }}
                colors={['rgb(236, 163, 167)', 'rgb(193, 122, 126)']}
                style={{ flex: 1 }}
            >      
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
                >
                    <View style={styles.topContainer}>
                        {header()}
                    </View>
                    {listView()}
                </ScrollView>
            </LinearGradient>
            {bottomButton()}
        </SafeAreaView>
    )

    function header() {
        return (
            <View
                style={styles.headerWrapStyle}
             >
                <View style={styles.profileContainer}>
                    <Image src={userInfo.userCredential.user.photoURL} style={styles.profilePhoto}/>
                </View>
                <View style={styles.helloContainer}>
                    <View style={{marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row'}}>
                        <Text style={{...Fonts.darkRedColor24Regular}}>Hi, </Text>
                        <Text style={{...Fonts.darkRedColor24Bold}}>{userInfo.userCredential.user.displayName}!</Text>
                    </View>
                    <Text style={{...Fonts.darkRedColor15Light}}>Answer the questions to complete</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...Fonts.darkRedColor15Light}}>your </Text>
                        <Text style={{...Fonts.darkRedColor15SemiBold}}>Body Constitution</Text>
                    </View>
                </View>
            </View>
        )
    }

    function listView() {
        return(
        <View>
            <Text style={styles.questionTitle}>{questionList[questionCnt]}</Text>
            <FlatList
                data={answerList}
                keyExtractor={(item, index) => index.toString()}                    
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (                        
                    <TouchableOpacity
                        style={[
                            styles.answerItem,
                            selectedAnswer === index + 1 ? styles.selectedAnswer : null,
                        ]}
                        activeOpacity={0.9}
                        onPress={() => updateState({selectedAnswer: index + 1})}
                    >
                        <View style={styles.moduleId}>
                            <Text style={{...Fonts.WhiteColor24ExtraBold}}>{index + 1}</Text>
                        </View>
                        <Text style={{marginLeft: Sizes.fixPadding * 1.5, ...Fonts.SemiDarkRedColor20Bold}}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>)
    }

    function bottomButton() {
        return(
        <View style={styles.bottomButtonContainer}>
            <View style={styles.progressViewContainer}>
                <View style={styles.progressInfoContainer}>
                    <Text style={{...Fonts.whiteColor14Bold}}>Progress</Text>
                    <Text style={styles.counter}>{questionCnt + 1} of {questionList.length}</Text>
                </View>
                <View style={{marginBottom: Sizes.fixPadding * 1, marginTop: Sizes.fixPadding * 1}}>
                    <Progress.Bar
                        progress={(questionCnt + 1) / (questionList.length)}
                        width={width * 0.9}
                        height={Sizes.fixPadding * 0.6}
                        color="#B9777C"
                        unfilledColor="#FBD2D3"
                        borderRadius={Sizes.fixPadding * 1.5}
                        borderWidth={1}
                        borderColor="#FBD2D3"
                    />
                </View>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    disabled={questionCnt == 0}
                    onPress={() => updateState({questionCnt : questionCnt - 1, selectedAnswer : 0})}
                    style={styles.bottomBtn}
                >
                    <Entypo name="chevron-left" size={25} color={questionCnt == 0 ? Colors.secondSemiDarkRed : Colors.darkRed}/>
                    <Text style={questionCnt == 0 ? {...Fonts.disabledButton} : {...Fonts.darkRedColor20Bold}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={selectedAnswer == 0 ? true : false}
                    onPress={handleNext}
                    style={styles.bottomBtn}
                >
                    <Text style={selectedAnswer == 0 ? {...Fonts.disabledButton} : {...Fonts.darkRedColor20Bold}}>Next</Text>
                    <Entypo name="chevron-right" size={25} color={selectedAnswer == 0 ? Colors.secondSemiDarkRed : Colors.darkRed}/>
                </TouchableOpacity>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAF4F4',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding * 3.5,
        overflow: "hidden",
        borderBottomRightRadius: Sizes.fixPadding * 3.2,
        borderBottomLeftRadius: Sizes.fixPadding * 3.2,
    },
    profilePhoto: {
        width: 43,
        height: 43,       
    },
    profileContainer: {
        borderColor: Colors.pinkColor,
        borderWidth: 3,
        borderRadius: 23,
        overflow: 'hidden',
    },
    helloContainer: {
        marginTop: Sizes.fixPadding * 1.8,
        marginLeft: Sizes.fixPadding * 1.5,
    },
    topContainer: {

    },
    answerItem: {
        marginHorizontal: Sizes.fixPadding * 2,
        marginVertical: Sizes.fixPadding * 0.7,
       
        height: Sizes.fixPadding * 6.0,
        backgroundColor: Colors.backDarkRed,
        flexDirection: 'row',

        alignItems: 'center',
        position: 'relative',


        borderRadius: Sizes.fixPadding * 2
    },

    selectedAnswer: {
        shadowColor: '#0009',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.9,
        elevation: 5,

        borderWidth: 2,
        borderColor: Colors.semiDarkRed,
    },

    moduleId: {
        marginLeft: Sizes.fixPadding * 1.5,

        alignItems: 'center',
        justifyContent: 'center',
        width: Sizes.fixPadding * 4.0,
        height: Sizes.fixPadding * 4.0,
        backgroundColor: Colors.semiDarkRed,
        borderRadius: Sizes.fixPadding * 2,
    },
    moduleIdPink: {
        marginLeft: Sizes.fixPadding * 3.0,

        alignItems: 'center',
        justifyContent: 'center',
        width: Sizes.fixPadding * 5.2,
        height: Sizes.fixPadding * 5.2,
        backgroundColor: Colors.pinkColor,
        borderRadius: Sizes.fixPadding * 3,
    },
    foodContainer: {
        width: Sizes.fixPadding * 22,
        marginLeft: Sizes.fixPadding * 2.0,
    },
    lessonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    bottomButtonContainer: {
        width: '100%',

        position: 'absolute',
        bottom: Sizes.fixPadding * 3.8,
        
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    btnContainer: {
        flexDirection: 'row',
    },
    bottomBtn: {
        backgroundColor: Colors.backDarkRed,

        width: Sizes.fixPadding * 11.0,
        height: Sizes.fixPadding * 3.8,

        borderRadius: Sizes.fixPadding * 2,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding,
        elevation: 2,
    },
    questionTitle: {        
        marginBottom: Sizes.fixPadding * 1.5,
        marginLeft: Sizes.fixPadding * 2.0,
        ...Fonts.WhiteColor28ExtraBold
    },
    progressInfoContainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'transparent'
    },
    progressViewContainer: {
        width: '90%',
        marginBottom: Sizes.fixPadding * 0.9
    },
    counter: {
        position: 'absolute',
        right: 0,
        ...Fonts.whiteColor14Bold
    }
})

export default QuestionScreen;
