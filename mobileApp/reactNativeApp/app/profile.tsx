import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (

    <ImageBackground
    source={require('../assets/images/homeBg.png')}
    style={styles.container}
    resizeMode="cover"
>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Image
          source={require('../assets/images/2.png')}
          style={styles.profileImage}
        />
        <View style={styles.nameRow}>
          <Text style={styles.name}>Sanjay</Text>
          <Text style={styles.status}>Online</Text>
        </View>
        {/* <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="#fff" />
        </TouchableOpacity> */}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <View style={styles.actionButton}>
          <Ionicons name="call" size={24} color="#fff" />
          <Text style={styles.actionLabel}>Audio</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="videocam" size={24} color="#fff" />
          <Text style={styles.actionLabel}>Video</Text>
        </View>
        <View style={styles.actionButton}>
          <Feather name="search" size={24} color="#fff" />
          <Text style={styles.actionLabel}>Search</Text>
        </View>
      </View>

      {/* Media Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Media, links & doc</Text>
          <Feather name="chevron-right" size={20} color="#fff" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              source={require('../assets/images/robo.png')}
              style={styles.mediaImage}
            />
          ))}
        </ScrollView>
      </View>

      {/* Options */}
      <View style={styles.optionRow}>
        <MaterialIcons name="notifications-none" size={24} color="#fff" />
        <Text style={styles.optionText}>Notifications</Text>
      </View>
      <View style={styles.optionRow}>
        <MaterialIcons name="star-border" size={24} color="#fff" />
        <Text style={styles.optionText}>Starred messages</Text>
        <Text style={styles.optionCount}>10</Text>
      </View>
      <View style={styles.optionRow}>
        <Ionicons name="people-outline" size={24} color="#fff" />
        <Text style={styles.optionText}>Create groups</Text>
      </View>

      {/* Danger Section */}
      <View style={styles.dangerRow}>
        <Text style={styles.dangerText}>Block Sanjay</Text>
        <Text style={styles.dangerText}>Report</Text>
      </View>

      {/* Bottom Icons */}
      {/* <View style={styles.bottomIcons}>
        <FontAwesome name="user" size={20} color="#fff" />
        <Feather name="lock" size={20} color="#fff" />
        <Feather name="info" size={20} color="#fff" />
        <Feather name="search" size={20} color="#fff" />
        <Feather name="settings" size={20} color="#fff" />
      </View> */}
    </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      alignItems: 'center',
      marginBottom: 16,
      marginTop:40
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginVertical: 12,
    },
    nameRow: {
      alignItems: 'center',
    },
    name: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold',
    },
    status: {
      color: '#A0E89F',
      fontSize: 13,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#381B73',
      borderRadius: 12,
      paddingVertical: 16,
      marginBottom: 20,
    },
    actionButton: {
      alignItems: 'center',
    },
    actionLabel: {
      color: '#fff',
      marginTop: 6,
    },
    section: {
      marginBottom: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    sectionTitle: {
      color: '#fff',
      fontWeight: 'bold',
    },
    mediaImage: {
      width: 70,
      height: 70,
      borderRadius: 10,
      marginRight: 10,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2C2A3A',
      padding: 12,
      borderRadius: 12,
      marginBottom: 10,
    },
    optionText: {
      color: '#fff',
      marginLeft: 10,
      flex: 1,
    },
    optionCount: {
      color: '#aaa',
    },
    dangerRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 16,
    },
    dangerText: {
      color: '#FF6B6B',
      fontWeight: 'bold',
    },
    bottomIcons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      backgroundColor: '#3D2A61',
      borderRadius: 16,
    },
  });
  