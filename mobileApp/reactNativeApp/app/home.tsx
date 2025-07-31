import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = () => {
        setModalVisible(false);
        router.replace('/');
    };

    return (
        <ImageBackground
            source={require('../assets/images/homeBg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            {/* Logout Icon */}
            <View style={{ position: 'absolute', top: StatusBar.currentHeight || 40, right: 20, zIndex: 9999 }}>
            <TouchableOpacity
                style={styles.logoutIcon}
                onPress={() => setModalVisible(true)}
            >
                <Feather name="log-out" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
            <LinearGradient
                colors={['#7435FD', '#7D3DFB', '#C381E7']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >

                <View style={styles.leftCol}>
                    <Text style={styles.planTitle}>Premium Plan</Text>
                    <Text style={styles.planDesc}>Unlock your AI chatapp & get all premium features</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.rightCol}>
                    <Image
                        source={require('../assets/images/robo.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            </LinearGradient>


            <Text style={styles.sectionTitle}>Popular Bots</Text>

            <View style={styles.popularBotsContainer}>
                <View style={styles.leftBotCol}>
                    <LinearGradient
                        colors={['#7435FD', '#7D3DFB', '#C381E7']}
                        start={{ x: 0.1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.botCard}
                    >
                        <Image
                            source={require('../assets/images/chat.png')}
                            style={styles.chatImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.botText}>Uncover Ideas with your Voice Recordings</Text>
                        <TouchableOpacity style={styles.startButton} >
                            <Text style={styles.buttonText}>Start now</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>


                <View style={styles.rightBotCol}>
                    <LinearGradient
                        colors={['#7435FD', '#7D3DFB', '#C381E7']}
                        start={{ x: 0.1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.botCard}
                    >
                        <TouchableOpacity style={styles.row} onPress={() => router.push('/chat')}>
                            <Text style={styles.botText}>Start New Chat</Text>
                            <Feather name="arrow-right" size={18} color="#fff" />
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                        colors={['#7435FD', '#7D3DFB', '#C381E7']}
                        start={{ x: 0.1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.botCard}
                    >
                       <TouchableOpacity style={styles.row} onPress={() => router.push('/profile')}>
                            <Text style={styles.botText}>Search by Image</Text>
                            <Feather name="arrow-right" size={18} color="#fff" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>

            {/* Logout Confirmation Modal */}
            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.yesButton} onPress={handleLogout}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


        </ImageBackground>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffffcc',
        borderRadius: 16,
        padding: 20,
        width: '90%',
        maxWidth: 500,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        zIndex: 1,
    },
    leftCol: {
        flex: 1,
        justifyContent: 'center',
    },
    rightCol: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    planDesc: {
        fontSize: 14,
        color: '#9A98A3',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'flex-start'
    },
    startButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        textAlign: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'left'
    },
    popularBotsContainer: {
        flexDirection: 'row',
        width: '90%',
        maxWidth: 500,
        height: 300,
        gap: 10,
        alignContent: 'center'
    },
    leftBotCol: {
        flex: 1,
        justifyContent: 'center'
    },
    rightBotCol: {
        flex: 1,
        justifyContent: 'space-between',
    },
    botCard: {
        backgroundColor: 'red',
        borderRadius: 12,
        padding: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    botImage: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    chatImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    botText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#ffffff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, // spacing between text and icon
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxWidth: 300,
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    yesButton: {
        backgroundColor: '#7435FD',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    logoutIcon: {
        position: 'absolute',
        top: StatusBar.currentHeight || 40,
        right: 0,
        zIndex: 9999, // Ensures it's topmost
        pointerEvents: 'box-only', // Makes it receive touch
        backgroundColor: 'rgba(0,0,0,0.3)', // optional
        padding: 10,
        borderRadius: 20,
    }

});
