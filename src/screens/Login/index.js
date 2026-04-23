import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import ToastManager, { Toast } from "toastify-react-native";
import React, { useState, useEffect, useCallback } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Image,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import styles from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Calen from "../../../assets/calen.png";
import InputText from "../../components/InputText";
import getDeviceId from "../../actions/getDeviceId";
import { BUILD_VERSION } from "../../utils/constants";
import toastStyle from "../../utils/toastManager/style";
import { API, requestGet, requestPost } from "../../API";
import { inputStyle } from "../../components/Input/style";
import { loginButtonStyle } from "../../components/Button/style";
import {
  loginFieldStyle,
  loginErrorStyle,
} from "../../components/InputText/style";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [enrollBiometric, setEnrollBiometric] = useState(false);
  const [authenticationType, setAuthenticationType] = useState([]);

  const alert = useCallback((title, message) => {
    Alert.alert(title, message, [
      {
        text: "No",
        onPress: () => setEnrollBiometric(false),
      },
      {
        text: "Yes",
        onPress: () => setEnrollBiometric(true),
      },
    ]);
  }, []);

  const loadData = async () => {
    const isBiometricEnrolled = await AsyncStorage.getItem(
      "isBiometricEnrolled"
    );
    if (isBiometricEnrolled != "enrolled") {
      alert(
        "Information",
        "Do you want to enroll biometric authentication? If yes then you need to enroll first."
      );
    }
  };

  const suppertedAuthentication = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      const supportedAuthentication =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setAuthenticationType(supportedAuthentication);
    }
  };

  const checkExistingSession = async () => {
    const token = await SecureStore.getItemAsync("isAuth");
    try {
      if (token) {
        const response = await requestGet(API.TOKEN_EXPIRATION);
        if (response.data.message === "Valid token") {
          navigation.navigate("MainScreen");
        } else {
          await SecureStore.deleteItemAsync("isAuth");
        }
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    const checkBuildVersion = async () => {
      try {
        const response = await requestGet(API.GET_BUILD_VERSION);
        if (response.data.build_version === null) {
          Alert.alert(
            "Information",
            "The app version is not specified in the web portal. Kindly get in touch with the technical team for assistance."
          );
        } else if (response.data.build_version === BUILD_VERSION) {
          checkExistingSession();
          loadData();
          suppertedAuthentication();
        } else {
          Alert.alert(
            "Information",
            "The version of your app is outdated. Please consider reinstalling the app.",
            [
              {
                text: "Link to Download Build",
                onPress: () =>
                  Linking.openURL("https://hr.euphoria.pk/mobiles"),
              },
            ]
          );
        }
      } catch (error) {
        console.log("-----------------------------");
        console.log("error: ", error);
        console.log("-----------------------------");
      }
    };

    checkBuildVersion();
  }, []);

  const genericPostRequest = async (
    endpoint,
    data,
    isBiometricSignInCall = false
  ) => {
    setLoading(true);
    try {
      const response = await requestPost(endpoint, data);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      Toast.error(JSON.parse(error.request.response).message);
      if (isBiometricSignInCall) {
        alert("Information", "Do you want to enroll biometric authentication?");
      }
    }
  };

  const handleBiometricSignIn = async () => {
    const isBiometricEnrolled = await AsyncStorage.getItem(
      "isBiometricEnrolled"
    );
    if (isBiometricEnrolled) {
      const data = {
        user: {
          device_id: getDeviceId(),
        },
      };
      const response = await genericPostRequest(API.LOGIN, data, true);
      if (response?.status == 200) {
        await SecureStore.setItemAsync("isAuth", response.data.token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.user.name)
        );
        navigation.navigate("MainScreen");
        Toast.success("Logged In successfully");
      }
    } else {
      alert(
        "Information",
        "No biometric record is regsitered. Please enroll biometric first so that we can save your record."
      );
    }
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isEnrolled) {
        const authResult = await LocalAuthentication.authenticateAsync();
        if (authResult.success) {
          handleBiometricSignIn();
        } else if (authResult.error != "user_cancel") {
          Toast.error("Biometric authentication failed");
        }
      } else {
        Toast.error("No biometric setup on phone");
      }
    } else {
      Toast.error("Biometric unavailable on mobile");
    }
  };

  const SignInHandler = async () => {
    if (!email || !password) {
      Toast.error("All fields are required");
    } else {
      const data = {
        user: {
          email: email,
          password: password,
        },
      };
      const response = await genericPostRequest(API.LOGIN, data);
      if (response?.status == 200) {
        await SecureStore.setItemAsync("isAuth", response.data.token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.user.name)
        );
        navigation.navigate("MainScreen");
        Toast.success("Logged In successfully");
      }
    }
  };

  const handleBiometricEnrollment = async () => {
    if (!email || !password) {
      Toast.error("All fields are required");
    } else {
      const data = {
        user: {
          email: email,
          password: password,
          device_id: getDeviceId(),
        },
      };
      const response = await genericPostRequest(API.BIOMETRIC_ENROLLMENT, data);
      if (response?.status == 200) {
        await AsyncStorage.setItem("isBiometricEnrolled", "enrolled");
        setEnrollBiometric(false);
        Toast.success("Biometric Enrolled Successfully");
        navigation.navigate("Login");
      }
    }
  };

  const handleLoginButton = () => {
    if (enrollBiometric) {
      handleBiometricEnrollment();
    } else {
      SignInHandler();
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const array = [
    {
      id: 1,
      value: { email },
      placeholder: "Email",
      onChangeText: (val) => {
        setEmail(val);
        setError(" ");
      },
    },
    {
      id: 2,
      value: { password },
      secureTextEntry: true,
      placeholder: "Password",
      onChangeText: (val) => {
        setPassword(val.trim());
        setError(" ");
      },
    },
  ];

  return (
    <>
      <View style={styles.containerTop}>
        <ToastManager style={toastStyle} />
        <View style={styles.mainLogo}>
          <Image source={Calen} />
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        onLayout={onLayoutRootView}
        behavior="padding"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            {array.map((item) => {
              return (
                <View key={item.id}>
                  <InputText label={item.placeholder} style={loginFieldStyle} />
                  <Input
                    value={item.value}
                    style={inputStyle}
                    onChangeText={item.onChangeText}
                    secureTextEntry={item.secureTextEntry}
                  />
                </View>
              );
            })}
            <Button
              loading={loading}
              style={loginButtonStyle}
              onPress={handleLoginButton}
              title={enrollBiometric ? "ENROLL" : "LOGIN"}
            />
            <InputText label={error} style={loginErrorStyle} />
            <View style={styles.biometricIconStyle}>
              {authenticationType.includes(2) ? (
                <MaterialCommunityIcons
                  name="face-recognition"
                  size={30}
                  onPress={handleBiometricAuth}
                />
              ) : (
                <FontAwesome5
                  name="fingerprint"
                  size={30}
                  onPress={handleBiometricAuth}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
