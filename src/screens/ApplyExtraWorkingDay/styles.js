import { StyleSheet } from "react-native";
import { scaledHeight } from "../../utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
  containerTop: {
    flexDirection: "row",
    height: scaledHeight(350),
    backgroundColor: "#e5e5e5",
    justifyContent: "space-between",
  },
  mainLogo: {
    top: 0,
    right: 0,
    position: "absolute",
  },
  inputContainer: {
    opacity: 1,
    alignSelf: "center",
    width: Platform.OS == "ios" ? "90%" : "100%",
  },
  dateRowStyle: {
    width: "70%",
    margin: "4%",
    paddingTop: 5,
    paddingRight: 10,
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#e5e5e5",
    justifyContent: "space-between",
  },
  textAreaStyle: {
    width: "70%",
    padding: 10,
    marginTop: 8,
    paddingTop: 10,
    borderRadius: 20,
    alignSelf: "center",
    height: scaledHeight(100),
    backgroundColor: "#e5e5e5",
  },
});

export default styles;
