// import { StyleSheet, Text, View } from 'react-native'
// import React, {useState,useEffect} from 'react'
// import { AntDesign } from '@expo/vector-icons'; 
// import { FontAwesome } from '@expo/vector-icons';

// const Network = () => {
//   const [connections, setConnections] = useState([]);

//   const [userId, setUserId] = useState("");
//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.userId;
//       setUserId(userId);
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchConnections();
//     }
//   }, [userId]);

//   const fetchConnections = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.1.11:3000/connections/${userId}`
//       );
//       setConnections(response.data.connections);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(connections);
//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         marginHorizontal: 12,
//         marginTop: 10,
//       }}
//     >
//       <Text style={{ fontWeight: "500" }}>
//         {connections?.length} Connections
//       </Text>
//       <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
//         <AntDesign name="search1" size={22} color="black" />
//         <FontAwesome name="bars" size={22} color={"black"} />
//       </View>
//     </View>

//     <View
//       style={{
//         height: 2,
//         borderColor: "#E0E0E0",
//         borderWidth: 2,
//         marginTop: 12,
//       }}
//     />

//     <View style={{ marginHorizontal: 10, marginTop: 10 }}>
//       {connections?.map((item, index) => (
//         <View style={{flexDirection:"row",alignItems:"center",gap:10,marginVertical:10}} key={index}>
//           <Image
//             style={{ width: 48, height: 48, borderRadius: 24 }}
//             source={{ uri: item?.profileImage }}
//           />

//           <View style={{ flexDirection: "column", gap: 2,flex:1 }}>
//             <Text style={{ fontSize: 15, fontWeight: "500" }}>
//               {item?.name}
//             </Text>

//             <Text style={{ color: "gray" }}>
//               B.Tech | Computer Science Technology
//             </Text>

//             <Text style={{ color: "gray" }}>
//               connected on {moment(item?.createdAt).format("MMMM Do YYYY")}
//             </Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
//           >
//             <Entypo name="dots-three-vertical" size={20} color="black" />
//             <Feather name="send" size={20} color="black" />
//           </View>
//         </View>
//       ))}
//     </View>
//   </View>
//   )
// }

// export default Network

// const styles = StyleSheet.create({})

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import UserProfile from "../../components/UserProfile";
import ConnectionRequest from "../../components/ConnectionRequest";
import { useRouter } from "expo-router";

const Network = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      fetchUsers();
      fetchFriendRequests();
      fetchConnections();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.11:3000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://192.168.1.11:3000/users/${userId}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.11:3000/connection-request/${userId}`
      );
      if (response.status === 200) {
        const connectionRequestsData = response.data?.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.profileImage,
        }));
        setConnectionRequests(connectionRequestsData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.11:3000/connections/${userId}`
      );
      setConnections(response.data.connections);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => router.push("/network/connections")}
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Manage My Network
        </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </Pressable>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Invitations (0)</Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View>
        {connectionRequests?.map((item, index) => (
          <ConnectionRequest
            item={item}
            key={index}
            connectionRequests={connectionRequests}
            setConnectionRequests={setConnectionRequests}
            userId={userId}
          />
        ))}
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Grow your network faster</Text>
          <Entypo name="cross" size={24} color="black" />
        </View>

        <Text>
          Find and contact the right people. Plus see who's viewed your profile
        </Text>
        <View
          style={{
            backgroundColor: "#FFC72C",
            width: 140,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 8,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Try Premium
          </Text>
        </View>
      </View>
      <FlatList
        data={users}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <UserProfile userId={userId} item={item} key={index} />
        )}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "500" }}>
          {connections?.length} Connections
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AntDesign name="search1" size={22} color="black" />
          <FontAwesome name="bars" size={22} color={"black"} />
        </View>
      </View>

      <View
        style={{
          height: 2,
          borderColor: "#E0E0E0",
          borderWidth: 2,
          marginTop: 12,
        }}
      />

      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        {connections?.map((item, index) => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }} key={index}>
            <Image
              style={{ width: 48, height: 48, borderRadius: 24 }}
              source={{ uri: item?.profileImage }}
            />

            <View style={{ flexDirection: "column", gap: 2, flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.name}
              </Text>

              <Text style={{ color: "gray" }}>
                B.Tech | Computer Science Technology
              </Text>

              <Text style={{ color: "gray" }}>
                connected on {moment(item?.createdAt).format("MMMM Do YYYY")}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Entypo name="dots-three-vertical" size={20} color="black" />
              <Feather name="send" size={20} color="black" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Network;

const styles = StyleSheet.create({});
