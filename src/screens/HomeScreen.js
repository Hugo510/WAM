import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <LinearGradient colors={['#f56565', '#c53030']} style={styles.container}>
                {/* Envuelve el contenido en KeyboardAvoidingView */}
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flexContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.userInfo}>
                            <View style={styles.avatar}>
                                <Image source={require('../assets/images/yo.jpg' )} style={styles.avatarImage} />
                            </View>
                            <View>
                                <Text style={styles.username}>Hugo510</Text>
                                <View style={styles.streak}>
                                    <Ionicons name="flame-sharp" size={16} color="#FFA500" />
                                    <Text style={styles.streakText}>7 Day Streak</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.xp}>
                            <Text style={styles.xpAmount}>1,234</Text>
                            <Text style={styles.xpLabel}>XP</Text>
                        </View>
                    </View>

                    {/* Main Content */}
                    <ScrollView style={styles.mainContent}>
                        {/* Daily Challenges */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Icon name="book" size={20} color="white" />
                                <Text style={styles.cardTitle}>Daily Goals</Text>
                            </View>
                            <View style={styles.cardContent}>
                                <View style={styles.challengeRow}>
                                    <Text style={styles.challengeText}>Complete 2 lessons</Text>
                                    <View style={styles.progressBar}>
                                        <View style={[styles.progress, { width: '50%' }]} />
                                    </View>
                                </View>
                                <View style={styles.challengeRow}>
                                    <Text style={styles.challengeText}>Earn 100 XP</Text>
                                    <View style={styles.progressBar}>
                                        <View style={[styles.progress, { width: '75%' }]} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Course Activities */}
                        <View style={styles.activitiesContainer}>
                            <TouchableOpacity style={styles.activityButton}>
                                <Icon name="book" size={24} color="white" />
                                <Text style={styles.activityText}>Continue Course</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.activityButton2}>
                                <Ionicons name="car-sport-sharp" size={24} color="white" />
                                <Text style={styles.activityText}>Practice Quiz</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Leaderboard */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="podium-sharp" size={20} color="white" />
                                <Text style={styles.cardTitle}>Top Learners</Text>
                            </View>
                            <View style={styles.cardContent}>
                                {['TopLearner99', 'CourseAce42', 'StudyMaster7'].map((learner, index) => (
                                    <View key={index} style={styles.leaderboardItem}>
                                        <View style={styles.leaderboardInfo}>
                                            <Text style={styles.rank}>{index + 1}.</Text>
                                            <Image source={{ uri: '/placeholder-avatar.jpg' }} style={styles.leaderboardAvatar} />
                                            <Text style={styles.leaderboardName}>{learner}</Text>
                                        </View>
                                        <View style={styles.leaderboardXP}>
                                            <Text style={styles.xpAmount}>{2468 - index * 100} XP</Text>
                                            <Text style={styles.levelText}>Level {15 - index}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Achievements */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="trophy-sharp" size={20} color="white" />
                                <Text style={styles.cardTitle}>Recent Achievements</Text>
                            </View>
                            <View style={styles.cardContent}>
                                <View style={styles.achievementRow}>
                                    <View style={styles.achievementInfo}>
                                        <Icon name="award" size={24} color="yellow" />
                                        <View>
                                            <Text style={styles.achievementTitle}>First Course Completed</Text>
                                            <Text style={styles.achievementSubtitle}>Finished your first full course</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.achievementXP}>100 XP</Text>
                                </View>
                                <View style={styles.achievementRow}>
                                    <View style={styles.achievementInfo}>
                                        <Icon name="award" size={24} color="aqua" />
                                        <View>
                                            <Text style={styles.achievementTitle}>Quiz Master</Text>
                                            <Text style={styles.achievementSubtitle}>Ace 5 quizzes in a row</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.achievementXP}>50 XP</Text>
                                </View>
                                <View style={styles.achievementRow}>
                                    <View style={styles.achievementInfo}>
                                        <Icon name="award" size={24} color="gray" />
                                        <View>
                                            <Text style={styles.achievementTitle}>Streak Keeper</Text>
                                            <Text style={styles.achievementSubtitle}>Maintain a 7-day study streak</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.achievementXP}>75 XP</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer */}
                    <TouchableOpacity style={styles.footerButton}>
                        <Icon name="book" size={20} color="black" />
                        <Text style={styles.footerButtonText}>Explore Courses</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    flexContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        padding: wp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        borderWidth: 2,
        borderColor: 'yellow',
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: wp('3%'),
    },
    avatarImage: {
        width: wp('12%'),
        height: wp('12%'),
    },
    username: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: 'white',
    },
    streak: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakText: {
        marginLeft: wp('2%'),
        fontSize: wp('3.5%'),
        color: 'white',
    },
    xp: {
        alignItems: 'flex-end',
    },
    xpAmount: {
        fontSize: wp('7%'),
        fontWeight: 'bold',
        color: 'white',
    },
    xpLabel: {
        fontSize: wp('3%'),
        color: 'white',
    },
    mainContent: {
        paddingHorizontal: wp('4%'),
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: wp('4%'),
        borderRadius: wp('4%'),
        marginBottom: hp('2%'),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    cardTitle: {
        marginLeft: wp('2%'),
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: 'white',
    },
    cardContent: {
        marginTop: hp('1%'),
    },
    challengeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    challengeText: {
        color: 'white',
        fontSize: wp('4%'),
    },
    progressBar: {
        width: wp('40%'),
        height: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: 'green',
    },
    activitiesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    activityButton: {
        width: '48%',
        height: hp('12%'),
        backgroundColor: '#1E90FF',
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityButton2: {
        width: '48%',
        height: hp('12%'),
        backgroundColor: 'orange',
        borderRadius: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityText: {
        color: 'white',
        fontSize: wp('4%'),
        marginTop: hp('1%'),
    },
    leaderboardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    leaderboardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rank: {
        fontSize: wp('5%'),
        color: 'white',
        marginRight: wp('2%'),
    },
    leaderboardAvatar: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: 50,
        marginRight: wp('2%'),
    },
    leaderboardName: {
        fontSize: wp('4%'),
        color: 'white',
    },
    leaderboardXP: {
        alignItems: 'flex-end',
    },
    xpAmount: {
        fontSize: wp('4%'),
        color: 'white',
        fontWeight: 'bold',
    },
    levelText: {
        fontSize: wp('3%'),
        color: 'white',
    },
    achievementRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    achievementInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    achievementTitle: {
        color: 'white',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    achievementSubtitle: {
        color: 'white',
        fontSize: wp('3%'),
    },
    achievementXP: {
        fontSize: wp('3.5%'),
        color: 'white',
    },
    footerButton: {
        backgroundColor: '#FFD700',
        padding: wp('4%'),
        borderRadius: wp('4%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('2%'),
    },
    footerButtonText: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: 'black',
        marginLeft: wp('2%'),
    },
});