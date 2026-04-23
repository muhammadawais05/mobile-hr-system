import moment from "moment";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { Toast } from "toastify-react-native";
import React, { useState, useEffect } from "react";

import Button from "../Button";
import { showErrors } from "../../utils/errors";
import { MainScreenButtonStyle } from "../Button/style";
import { API, requestGet, requestPost } from "../../API";

const AttendanceManagement = ({ updateAttendanceTime }) => {
  const [loading, setLoading] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const toastMessage = (type, message) => {
    setTimeout(() => {
      type === "success" ? Toast.success(message) : Toast.error(message);
    }, 1000); // Adjust the delay time as needed
  };

  useEffect(() => {
    updateAttendanceTime();
  }, [loading]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await requestGet(API.ATTENDANCE_STATUS);

        if (response.data.attendance_status == "checked_in") {
          setIsCheckedIn(true);
        } else if (response.data.attendance_status == "checked_out") {
          setIsCheckedOut(true);
        } else {
          setIsCheckedIn(false);
        }
      } catch (error) {
        if (error.code == "ERR_BAD_REQUEST") {
          Toast.error("Unauthorized");
        } else {
          Toast.error("Attendance status not fetched");
        }
      }
    };
    checkStatus();
  }, []);

  const attendanceHandler = async (value) => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLoading(false);
      Toast.error("Location Access Denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const data = {
      attendance: {
        status: value,
        lat: location?.coords?.latitude,
        lng: location?.coords?.longitude,
        date: moment().format("DD-MM-YYYY hh:mm:ss"),
      },
    };

    try {
      const response = await requestPost(API.MARK_ATTENDANCE, data);
      setLoading(false);

      if (
        response.data.lat_lng_provided == 0 ||
        response.data.lat_lng_incorrect == 0
      ) {
        Toast.error(response.data.msg);
        return;
      } else if (response.data.data == "checked_in") {
        toastMessage("success", response.data.msg);
        setIsCheckedIn(true);
      } else if (response.data.data == "checked_out") {
        toastMessage("success", response.data.msg);
        setIsCheckedOut(true);
      } else {
        setIsCheckedIn(false);
      }
    } catch (error) {
      setLoading(false);
      showErrors(error?.response?.data?.msg);
    }
  };

  const confimrModal = () => {
    Alert.alert("Confirmation", "Do you want to checkout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => attendanceHandler("checked_out"),
      },
    ]);
  };

  const onButtonPress = () => {
    if (isCheckedIn) {
      confimrModal();
    } else {
      attendanceHandler("checked_in");
    }
  };

  if (isCheckedOut) return null;

  return (
    <Button
      loading={loading}
      onPress={onButtonPress}
      style={MainScreenButtonStyle}
      title={isCheckedIn ? "Check Out" : "Check In"}
    />
  );
};

export default AttendanceManagement;
