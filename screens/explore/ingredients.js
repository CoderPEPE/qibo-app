    // Start of Selection
    import React, { useState, useEffect } from "react";
    import { SafeAreaView, View, Dimensions, FlatList, ScrollView, StatusBar, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
    import * as Progress from 'react-native-progress';
    import { Colors, Fonts, Sizes, } from "../../constants/styles";
    import { MaterialIcons } from '@expo/vector-icons';
    import Entypo from '@expo/vector-icons/Entypo';
    import { useAtom } from "jotai";
    import userInfoAtom from "../../store/userInfo";
    import { doc, getDoc } from 'firebase/firestore';
    import { FIREBASE_DB } from '../../firebase/config'; // Adjust the path as necessary
    
    const { width } = Dimensions.get('window');
    
    const initialIngreList = [
        {
            id: '1',
            image: require('../../assets/images/ingredients/1.png'),
            libraryFor: 'Ai Ye',
            locked: true        
        },
        {
            id: '2',
            image: require('../../assets/images/ingredients/2.png'),
            libraryFor: 'Bai Bian Dou',
            locked: true
        },
        {
            id: '3',
            image: require('../../assets/images/ingredients/3.png'),
            libraryFor: 'Bai Bu',
            locked: true
        },
        {
            id: '4',
            image: require('../../assets/images/ingredients/4.png'),
            libraryFor: 'Bai Fu Zi',
            locked: true
        },
        {
            id: '5',
            image: require('../../assets/images/ingredients/3.png'),
            libraryFor: 'Bai Bu',
            locked: true
        },
        {
            id: '6',
            image: require('../../assets/images/ingredients/4.png'),
            libraryFor: 'Bai Fu Zi',
            locked: true
        },
    ];
    
    const IngredientScreen = ({ navigation }) => {
    
        const [userInfo, setUserInfo] = useAtom(userInfoAtom);
        const [ingreList, setIngreList] = useState(initialIngreList);
    
        useEffect(() => {
            const fetchConsecutiveCheckIns = async () => {
                try {
                    const userRef = doc(FIREBASE_DB, "users", userInfo.userCredential.user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const consecutiveCheckIns = userDoc.data().consecutiveCheckIns || 0;
                        const unlockedCount = Math.floor(consecutiveCheckIns / 6);
                        const finalUnlockedCount = Math.min(unlockedCount, initialIngreList.length); // Ensure we don't exceed the list length
                        const updatedIngreList = initialIngreList.map((ingredient, index) => ({
                            ...ingredient,
                            locked: index >= finalUnlockedCount
                        }));
                        setIngreList(updatedIngreList);
                    }
                } catch (error) {
                    console.error("Error fetching consecutive check-ins:", error);
                }
            };
    
            fetchConsecutiveCheckIns();
        }, [userInfo]);
    
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
                        {tileView()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    
        function header() {
            return (
                <View style={styles.headerWrapStyle}>
                    <Entypo name="chevron-thin-left" size={22} style={{ marginLeft: -5, marginRight: 20 }} color="black" onPress={() => navigation.push('BottomTabBar', { pageView: 'main' })} />
                    <View style={styles.profileContainer}>
                        <Image src={userInfo.userCredential.user.photoURL} style={styles.profilePhoto} />
                    </View>
                    <View style={styles.helloContainer}>
                        <Text style={{ marginTop: -15, ...Fonts.blackColor24ExtraBold }}>Ingredients</Text>
                    </View>
                    <View style={styles.boltContainer}>
                        <TouchableOpacity
                            style={styles.boltButton}
                            onPress={() => navigation.push("CheckInScreen")}
                        >
                            <Text style={styles.boltText}>
                                Daily Check-in{"\n"}
                                For Rewards</Text>
                            <MaterialIcons name="bolt" size={35} color={Colors.blackColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    
        function tileView() {
            const renderItem = ({ item, index }) => (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        marginBottom: Sizes.fixPadding * 2.5,
                        flex: 1,
                        marginLeft: index % 2 === 0 ? Sizes.fixPadding * 2.0 : Sizes.fixPadding - 2.0,
                        marginRight: index % 2 === 0 ? Sizes.fixPadding - 2.0 : Sizes.fixPadding * 2.0,
                        borderRadius: 36,
                        overflow: 'hidden',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        shadowColor: '#105042',
                        shadowOffset: {
                            width: -2,
                            height: -5,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 10,
                        shadowSpread: 2,
                        elevation: 9
                    }}
                >
                    {item.locked ?
                        <>
                            <Image
                                source={item.image}
                                style={styles.tileImage}
                                blurRadius={20}
                            />
                        </>
                        :
                        <>
                            <Image
                                source={item.image}
                                style={styles.tileImage}
                            />
                            <Text style={styles.tileTitle}>
                                {item.libraryFor}
                            </Text>
                        </>
                    }
                    {item.locked &&
                        <View style={styles.lockContainer}>
                            <MaterialIcons name="lock-outline" size={50} color="white" style={styles.lockIcon} />
                        </View>
                    }
                </TouchableOpacity>
            )
            return (
                <FlatList
                    data={ingreList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={false}
                />
            )
        }
        function bottomImage() {
            return (
                <View style={styles.container}>
                    <Image source={require('../../assets/images/Shape.png')} style={styles.backImage} />
                </View>
            )
        }
    
    }
    
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignItems: 'center',
        },
        absolute: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        backImage: {
            width: '100%',
            height: 280,
        },
        headerWrapStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 1.0,
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
            marginTop: Sizes.fixPadding,
            marginLeft: Sizes.fixPadding * 1.5,
        },
        boltContainer: {
            marginLeft: 'auto',
            position: 'relative',
        },
        notifyNumber: {
            position: 'absolute',
            top: -8,
            right: -2,
            ...Fonts.greenColor13ExtraBold
        },
        topContainer: {
            paddingBottom: Sizes.fixPadding * 2.8,
            marginTop: Sizes.fixPadding * 1.2,
            marginBottom: Sizes.fixPadding * 2.8,
            backgroundColor: 'white',
            shadowColor: '#0005',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.5,
            elevation: 5,
            borderRadius: Sizes.fixPadding * 3.2,
        },
        tileTitle: {
            paddingHorizontal: Sizes.fixPadding * 1.3,
            backgroundColor: Colors.greenColor,
            position: 'absolute',
            bottom: Sizes.fixPadding * 1.3,
            borderRadius: Sizes.fixPadding * 2,
            ...Fonts.WhiteColor18ExtraBold
        },
        tileImage: {
            width: '100%',
            height: 160.0,
            borderRadius: Sizes.fixPadding - 5.0,
        },
        lockContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -25 }, { translateY: -25 }],
        },
        lockIcon: {
            position: 'absolute',
        },
        boltButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        boltText: {
            textAlign: "center",
            marginBottom: 5,
            ...Fonts.greenColor13SemiBold
        },
    })
    
    export default IngredientScreen;
