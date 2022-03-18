import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import TextInput from "../components/TextInput";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  const navigation = useNavigation();
  const auth = Firebase.auth();

  //is allready logged in?
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        });
      }
    });
    return unsubscribe;
  }, []);

  const [data, setData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    secureTextEntry: true,
  });

  const handleEmailInputChange = (text) => {
    setData({
      ...data,
      email: text,
    });
  };

  const handlePasswordInputChange = (text) => {
    setData({
      ...data,
      password: text,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const onLoginPressed = () => {
    const emailError = emailValidator(data.email);
    const passwordError = passwordValidator(data.password);
    if (emailError || passwordError) {
      alert(emailError + "\n" + passwordError);
      setData({
        ...data,
        emailError : emailError,
        passwordError : passwordError
      });
      return;
    }
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //alert("Logged In with\n" + user.email);
        // ...
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
        <Text style={styles.text_header}>Welcome to Electus!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(text) => handleEmailInputChange(text)}
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
        <Text style={[styles.text_footer, { marginTop: 25 }]}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={data.secureTextEntry}
          onChangeText={(text) => handlePasswordInputChange(text)}
          leftIcon={
            <Icon
              name="lock"
              type="feather"
              color="#05375a"
              size={20}
              iconStyle={{ marginBottom: 10 }}
            />
          }
          rightIcon={
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon name="eye-off" type="feather" color="grey" size={20} />
              ) : (
                <Icon name="eye" type="feather" color="grey" size={20} />
              )}
            </TouchableOpacity>
          }
        />
        <Button title={"Login"} onPress={onLoginPressed} />
        <TouchableOpacity
          onPress={() => navigation.replace("Register")}
          style={{
            padding: 5,
            alignSelf: "center",
          }}
        >
          <View style={styles.row}>
            <Text style={styles.dontHave}>Don't have an account? </Text>

            <View>
              <Text style={styles.link}> Sign Up </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
};

export default LoginScreen;

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
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.btn_primary,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
  },
  dontHave: {
    color: theme.colors.btn_primary,
    fontSize: 15,
  },
});
