import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import News from "../components/News";
import Firebase from "../../firebase";
import { Overlay, Icon } from "react-native-elements";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../core/theme";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

const NewsScreen = () => {
  const db = Firebase.firestore();
  const navigation = useNavigation();
  const [arr, setArr] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState();
  const [currentDesc, setCurrentDesc] = useState();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    db.collection("news")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        let visual = [];
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data());
          visual.push(
            <News
              key={documentSnapshot.id}
              title={documentSnapshot.data().title}
              desc={documentSnapshot.data().description}
              createdAt={documentSnapshot.data().createdAt.seconds}
              onPress={() => {
                setCurrentTitle(documentSnapshot.data().title);
                setCurrentDesc(documentSnapshot.data().description);
                toggleOverlay();
              }}
            />
          );
        });
        setArr(visual);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.btn_primary, theme.colors.btn_secondary]}
      start={[0.4, 0.7]}
      end={[1, 0.8]}
    >
      <Animatable.View animation="slideInLeft">
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 25,
            elevation: 20,
            margintop: 15,
            marginHorizontal: 25,
          }}
          animationType="fade"
        >
          <Animatable.View style={{ height: 500 }} animation="zoomInUp">
            <ScrollView>
              <View style={{ paddingHorizontal: 15 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 15,
                  }}
                >
                  {currentTitle}
                </Text>
                <Text>{currentDesc}</Text>
              </View>
            </ScrollView>
            <Button
              style={{ marginVertical: 5 }}
              icon={
                <Icon
                  name="arrow-left"
                  type="material-community"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              title="Leave"
              onPress={toggleOverlay}
            />
          </Animatable.View>
        </Overlay>
      </Animatable.View>
      <ScrollView>
        <View style={styles.container}>
          {arr}
          {arr}
          {arr}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
