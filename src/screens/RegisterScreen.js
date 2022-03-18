import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { nameValidator } from "../helpers/nameValidator";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { theme } from "../core/theme";
import CheckBox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    name: "",
    nameError: "",
    emailError: "",
    password_1: "",
    password_2: "",
    passwordError: "",
    termError: "",
    secureTextEntry_1: true,
    secureTextEntry_2: true,
    toggleCheckBox: false,
  });

  const handleNameInputChange = (text) => {
    setData({
      ...data,
      name: text,
    });
  };

  const handleEmailInputChange = (text) => {
    setData({
      ...data,
      email: text,
    });
  };

  const handlePasswordInputChange_1 = (text) => {
    setData({
      ...data,
      password_1: text,
    });
  };

  const handlePasswordInputChange_2 = (text) => {
    setData({
      ...data,
      password_2: text,
    });
  };

  const updateSecureTextEntry_1 = () => {
    setData({
      ...data,
      secureTextEntry_1: !data.secureTextEntry_1,
    });
  };

  const updateSecureTextEntry_2 = () => {
    setData({
      ...data,
      secureTextEntry_2: !data.secureTextEntry_2,
    });
  };

  const setToggleCheckBox = (value) => {
    setData({
      ...data,
      toggleCheckBox: value,
    });
  };

  const onSignUpPressed = () => {
    const nameError = nameValidator(data.name);
    const emailError = emailValidator(data.email);
    const termError = data.toggleCheckBox
      ? ""
      : "You must accept the Privacy Policy.";
    let err = "";
    if (data.password_1 == data.password_2) {
      err = passwordValidator(data.password_1);
    } else {
      err = "Passwords does not match.";
    }
    const passwordError = err;

    if (emailError || passwordError || nameError || termError) {
      alert(
        nameError + "\n" + emailError + "\n" + passwordError + "\n" + termError
      );
      setData({
        ...data,
        nameError: nameError,
        emailError: emailError,
        passwordError: passwordError,
        termError: termError,
      });
      return;
    }

    const auth = Firebase.auth();
    auth
      .createUserWithEmailAndPassword(data.email, data.password_1)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const db = Firebase.firestore();
        const userUid = auth.currentUser.uid;
        db.collection("users").doc(userUid).set({
          name: data.name,
          email: data.email,
        });
        //alert("Registerd with\n" + user.email);
        // ...
        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode + "\n" + errorMessage);
      });
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.btn_primary, theme.colors.btn_secondary]}
      start={[0.4, 0.7]}
      end={[1, 0.8]}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Create an Account!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>User credentials</Text>
        <View style={{ marginLeft: 15 }}>
          <TextInput
            placeholder="Name and Surname"
            style={styles.textInput}
            autoCapitalize="words"
            returnKeyType="next"
            onChangeText={(text) => handleNameInputChange(text)}
            leftIcon={
              <Icon
                name="user"
                type="font-awesome-5"
                color="#05375a"
                size={20}
                iconStyle={{ marginBottom: 10 }}
              />
            }
            rightIcon={
              /*
            data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Icon
                  name="check-circle"
                  type="feather"
                  color="green"
                  size={20}
                  style={{}}
                />
              </Animatable.View>
            ) : */ null
            }
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleEmailInputChange(text)}
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            leftIcon={
              <Icon
                name="envelope"
                type="font-awesome-5"
                color="#05375a"
                size={20}
                iconStyle={{ marginBottom: 10 }}
              />
            }
            rightIcon={
              /*
            data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Icon
                  name="check-circle"
                  type="feather"
                  color="green"
                  size={20}
                  style={{}}
                />
              </Animatable.View>
            ) : */ null
            }
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handlePasswordInputChange_1(text)}
            secureTextEntry={data.secureTextEntry_1}
            leftIcon={
              <Icon
                name="key"
                type="font-awesome-5"
                color="#05375a"
                size={20}
                iconStyle={{ marginBottom: 10 }}
              />
            }
            rightIcon={
              <TouchableOpacity onPress={updateSecureTextEntry_1}>
                {data.secureTextEntry_1 ? (
                  <Icon name="eye-off" type="feather" color="grey" size={20} />
                ) : (
                  <Icon name="eye" type="feather" color="grey" size={20} />
                )}
              </TouchableOpacity>
            }
          />
          <TextInput
            placeholder="Password Again"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handlePasswordInputChange_2(text)}
            secureTextEntry={data.secureTextEntry_2}
            leftIcon={
              <Icon
                name="key"
                type="font-awesome-5"
                color="#05375a"
                size={20}
                iconStyle={{ marginBottom: 10 }}
              />
            }
            rightIcon={
              <TouchableOpacity onPress={updateSecureTextEntry_2}>
                {data.secureTextEntry_2 ? (
                  <Icon name="eye-off" type="feather" color="grey" size={20} />
                ) : (
                  <Icon name="eye" type="feather" color="grey" size={20} />
                )}
              </TouchableOpacity>
            }
          />
          <View style={styles.termContainer}>
            <CheckBox
              value={data.toggleCheckBox}
              onValueChange={(value) => setToggleCheckBox(value)}
              backgroundColor="#fff"
            />
            <View style={styles.term}>
              <Text>
                <View>
                  <Text style={styles.termtext}>
                    I acknowledge that I have read and agree to the
                  </Text>
                </View>
                <View>
                  <Text style={styles.termlink}> Terms and Conditions </Text>
                </View>
                <View>
                  <Text style={styles.termtext}>and </Text>
                </View>
                <View>
                  <Text style={styles.termlink}> Privacy Policy. </Text>
                </View>
              </Text>
            </View>
          </View>
          <Button title={"Sign Up"} onPress={onSignUpPressed} />
          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            style={{ marginTop: -15, alignSelf: "center" }}
          >
            <View style={styles.row}>
              <Text style={styles.allreadyHave}>
                Allready have an account?{" "}
              </Text>

              <View>
                <Text style={styles.link}> Login </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.btn_primary,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    padding: 5,
  },
  allreadyHave: {
    color: theme.colors.btn_primary,
    fontSize: 15,
  },
  termContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  term: {
    marginHorizontal: 15,
  },
  termlink: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 13,
  },
  termtext: {
    fontSize: 12,
    color: "grey",
  },
});
