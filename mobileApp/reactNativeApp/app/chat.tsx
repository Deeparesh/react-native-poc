import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

export default function ChatScreen() {
  const router = useRouter();
  const contacts = [
    { id: "1", name: "Your Note", image: require("../assets/images/robo.png") },
    { id: "2", name: "Sarnjay", image: require("../assets/images/1.jpeg"), route: "/locationMapScreen.tsx" },
    { id: "3", name: "Vishnu", image: require("../assets/images/2.png") },
    { id: "4", name: "Melvin", image: require("../assets/images/1.jpeg") },
    { id: "5", name: "Dharma", image: require("../assets/images/2.png") },
  ];

  const chats = [
    { id: "1", name: "Sam", time: "Active 18m ago" },
    { id: "2", name: "Alwin", time: "Active 18m ago" },
  ];


  return (
    <ImageBackground
      source={require("../assets/images/homeBg.png")}
      style={styles.bg}
      resizeMode="cover"
    >


      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity>
          <Ionicons name="link" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#ccc" style={{ marginRight: 8 }} />
        <TextInput placeholder="Search" placeholderTextColor="#ccc" style={styles.searchInput} />
        <TouchableOpacity>
          <Feather name="sliders" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactScroll}>
        {contacts.map((item) => (
          <View key={item.id} style={styles.avatarContainer}>
            {item.name === "Your Note" ? (
              <View style={styles.addCircle}>
                <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (item.route) {
                    router.push(item.route as any);
                  }
                }}
              >
                <Image source={item.image} style={styles.avatar} />
              </TouchableOpacity>
            )}
            <Text style={styles.avatarName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <Text style={styles.activeTab}>Message</Text>
        <Text style={styles.inactiveTab}>Request</Text>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList}>
        {chats.map((chat) => (
          <View key={chat.id} style={styles.chatCard}>
            <Image source={require("../assets/images/robo.png")} style={styles.chatAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatTime}>{chat.time}</Text>
            </View>
            <MaterialIcons name="photo-camera" size={20} color="#aaa" />
          </View>
        ))}
      </ScrollView>


    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bg: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D2D3B",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
  },
  contactScroll: {
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginRight: 12,
  },
  addCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#9F6BF1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  avatarName: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#6C57A6",
    paddingBottom: 4,
  },
  activeTab: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveTab: {
    color: "#C994E3",
    fontWeight: "bold",
  },
  chatList: {
    flex: 1,
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2A3A",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatName: {
    color: "#fff",
    fontWeight: "bold",
  },
  chatTime: {
    color: "#aaa",
    fontSize: 12,
  },
});
