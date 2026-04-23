import moment from "moment";
import { View, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import styles from "./styles";
import Icon from "../../../assets/icon.png";
import { API, requestGet } from "../../API";
import Button from "../../components/Button";
import Eclips from "../../../assets/eclips.png";
import InputText from "../../components/InputText";
import toastStyle from "../../utils/toastManager/style";
import { mainScreenStyle } from "../../components/InputText/style";
import { MainScreenButtonStyle } from "../../components/Button/style";
import AttendanceManagement from "../../components/AttendanceManagement";

const MainScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [leavesCount, setLeavesCount] = useState("");
  const [lastCheckedIn, setLastCheckedIn] = useState("");
  const [attendanceTime, setAttendanceTime] = useState("");
  const [lastCheckedout, setLastCheckedOut] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");

  const attendanceStats = useCallback(async () => {
    try {
      const response = await requestGet(API.ATTENDANCE_DETAILS);
      if (response.data) {
        setLeavesCount(response.data.leaves_count);
        setLastCheckedIn(response.data.attendance_details[0].last_check_in);
        setLastCheckedOut(response.data.attendance_details[0].last_check_out);
      } else {
        Toast.error("Unable to fetch attendance data");
      }
    } catch (error) {
      if (error.code == "ERR_BAD_REQUEST") {
        Toast.error("Unauthorized");
      } else {
        Toast.error("Attendance details not fetched");
      }
    }
  }, []);

  const attendanceToShow = () => {
    if (lastCheckedIn != null && lastCheckedout != null) {
      setAttendanceStatus(
        lastCheckedIn > lastCheckedout ? "last check in" : "last check out"
      );
      setAttendanceTime(
        lastCheckedIn > lastCheckedout ? lastCheckedIn : lastCheckedout
      );
    } else if (lastCheckedIn != null) {
      setAttendanceStatus("last check in");
      setAttendanceTime(lastCheckedIn);
    } else if (lastCheckedout != null) {
      setAttendanceStatus("last check out");
      setAttendanceTime(lastCheckedout);
    } else {
      setAttendanceStatus("last check-in/check-out");
      setAttendanceTime("no record");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const img = await AsyncStorage.getItem("img");
      const name = await AsyncStorage.getItem("user");

      setUser(name);
      setImage(img);
    };
    loadData();
  }, []);

  useEffect(() => {
    attendanceStats();
    attendanceToShow();
  }, [
    leavesCount,
    lastCheckedIn,
    lastCheckedout,
    attendanceTime,
    attendanceStatus,
  ]);

  const generateGreetings = useMemo(() => {
    var currentHour = moment().format("HH");

    if (currentHour >= 3 && currentHour < 12) {
      return "Good Morning ";
    } else if (currentHour >= 12 && currentHour < 15) {
      return "Good Afternoon ";
    } else if (currentHour >= 15 && currentHour < 20) {
      return "Good Evening ";
    } else if (currentHour >= 20 && currentHour < 3) {
      return "Good Night ";
    } else {
      return "Hello ";
    }
  }, []);

  const signOutHandler = async () => {
    await SecureStore.deleteItemAsync("isAuth");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    await AsyncStorage.removeItem("user");
  };

  const handleApplyLeave = () => {
    navigation.navigate("ApplyLeave");
  };

  const handleExtraWorkingDay = () => {
    navigation.navigate("ApplyExtraWorkingDay");
  };

  return (
    <>
      <View style={styles.containerTop}>
        <ToastManager style={toastStyle} />
        <View>
          <InputText style={styles.headerTextStyle} label={attendanceStatus} />
          <InputText
            style={styles.headerBodyTextStyle}
            label={
              attendanceTime != "no record"
                ? moment.utc(attendanceTime).format("HH:mm")
                : attendanceTime
            }
          />
        </View>
        <View style={styles.leaveCountStyle}>
          <InputText style={styles.headerTextStyle} label={"Leave count:"} />
          <InputText
            style={styles.headerBodyTextStyle}
            label={leavesCount ? leavesCount : 0}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={image == null || image == "" ? Icon : { uri: image }}
          />
        </View>
        <InputText
          style={mainScreenStyle}
          label={(generateGreetings + user).replace(/["']/g, "")}
        />
        <AttendanceManagement updateAttendanceTime={attendanceStats} />
        <Button
          title="Apply for Leave"
          onPress={handleApplyLeave}
          style={MainScreenButtonStyle}
        />
        <Button
          style={MainScreenButtonStyle}
          onPress={handleExtraWorkingDay}
          title="Apply Extra Working day"
        />
        <Button
          title="Logout"
          onPress={signOutHandler}
          style={MainScreenButtonStyle}
        />
        <View style={styles.tagView}>
          <Image style={styles.logo} source={Eclips} />
        </View>
      </View>
    </>
  );
};

export default MainScreen;
