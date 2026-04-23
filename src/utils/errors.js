import { Alert } from "react-native";

const showErrors = (msg) => {
  Alert.alert("Error", msg, [
    {
      text: "Ok",
      onPress: () => {},
      style: "ok",
    },
  ]);
};

export { showErrors };
