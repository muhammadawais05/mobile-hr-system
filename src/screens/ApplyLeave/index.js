import moment from "moment";
import { Alert } from "react-native";
import React, { useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import {
  View,
  Image,
  TextInput,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import styles from "./styles";
import {
  backButtonStyle,
  applyLeaveButtonStyle,
} from "../../components/Button/style";
import {
  loginErrorStyle,
  loginFieldStyle,
} from "../../components/InputText/style";
import { API, requestPost } from "../../API";
import Button from "../../components/Button";
import Calen from "../../../assets/calen.png";
import { showErrors } from "../../utils/errors";
import Dropdown from "../../components/Dropdown";
import InputText from "../../components/InputText";
import DatePicker from "../../components/DatePicker";
import toastStyle from "../../utils/toastManager/style";
import { defaultStyle } from "../../components/Input/style";
import { dropdownStyle } from "../../components/Dropdown/style";
import FontAwesomeButton from "../../components/FontAwesomeButton";
import HorizontalLineWithText from "../../components/HorizontalLineWithText";

const categoryListOptions = [
  { label: "Full Day", value: "0" },
  { label: "Half Day", value: "1" },
];

const leaveTypeOptions = [
  { label: "Work from home", value: "0" },
  { label: "Planned", value: "1" },
  { label: "Unplanned", value: "2" },
  { label: "Maternity", value: "3" },
  { label: "Paternity", value: "4" },
  { label: "Pilgrimage", value: "5" },
  { label: "Bereavement", value: "6" },
  { label: "Unpaid", value: "7" },
];

const ApplyLeave = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState(null);
  const [openTypeList, setOpenTypeList] = useState(false);
  const [leaveCategory, setLeaveCategory] = useState(null);
  const [leaveEndDate, setLeaveEndDate] = useState(new Date());
  const [leaveDescription, setLeaveDescription] = useState(null);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [leaveStartDate, setLeaveStartDate] = useState(new Date());

  const sendLeaveRequet = async () => {
    const data = {
      leave_detail: {
        leave_type: leaveType,
        category: leaveCategory,
        start_date: leaveStartDate,
        description: leaveDescription,
        end_date: leaveCategory == "1" ? leaveStartDate : leaveEndDate, // In case of half day or single day leave
      },
    };
    try {
      setLoading(true);
      const response = await requestPost(API.APPLY_FOR_LEAVE, data);
      setLoading(false);
      if (response.status == 200) {
        Toast.success("Leave applied successfully");
        setTimeout(() => {
          navigation.navigate("MainScreen");
        }, 2000); // Adjust the delay time as needed
      } else if (response.status == 204) {
        Toast.error("Attendance is already marked.");
      }
    } catch (error) {
      setLoading(false);
      showErrors(error?.response?.data?.msg);
    }
  };

  const ApplyLeaveHandler = () => {
    if (!leaveType || !leaveCategory || !leaveDescription || !leaveStartDate) {
      Toast.error("All fields are required");
    } else {
      if (
        leaveCategory == "1" ||
        (leaveCategory == "0" && leaveEndDate >= leaveStartDate)
      ) {
        sendLeaveRequet();
      } else {
        Toast.error("Incorrect leave end date.");
      }
    }
  };

  return (
    <>
      <View style={styles.containerTop}>
        <ToastManager style={toastStyle} />
        <View>
          <FontAwesomeButton
            size={30}
            icon="arrow-left"
            style={backButtonStyle}
            onPress={() => {
              navigation.navigate("MainScreen");
            }}
          />
        </View>
        <View>
          <Image source={Calen} style={styles.mainLogo} />
        </View>
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <Dropdown
              value={leaveCategory}
              style={dropdownStyle}
              open={openCategoryList}
              setValue={setLeaveCategory}
              items={categoryListOptions}
              setOpen={setOpenCategoryList}
              placeholder="Select leave category"
            />
            <View style={Object.assign({}, defaultStyle, styles.dateRowStyle)}>
              <View>
                <InputText
                  label={
                    Platform.OS === "ios"
                      ? "Start Date: "
                      : moment(leaveStartDate).format("MMMM D, YYYY")
                  }
                  style={loginFieldStyle}
                />
              </View>
              <View>
                <DatePicker
                  date={leaveStartDate}
                  minimumDate={new Date()}
                  setDate={setLeaveStartDate}
                />
              </View>
            </View>
            {leaveCategory == "0" && (
              <>
                <HorizontalLineWithText text="to" />
                <View
                  style={Object.assign({}, defaultStyle, styles.dateRowStyle)}
                >
                  <View>
                    <InputText
                      style={loginFieldStyle}
                      label={
                        Platform.OS === "ios"
                          ? "End Date: "
                          : moment(leaveEndDate).format("MMMM D, YYYY")
                      }
                    />
                  </View>
                  <View>
                    <DatePicker
                      date={leaveEndDate}
                      minimumDate={new Date()}
                      setDate={setLeaveEndDate}
                    />
                  </View>
                </View>
              </>
            )}
            <Dropdown
              value={leaveType}
              open={openTypeList}
              style={dropdownStyle}
              setValue={setLeaveType}
              items={leaveTypeOptions}
              setOpen={setOpenTypeList}
              placeholder="Select leave type"
            />
            <View>
              <TextInput
                multiline={true}
                value={leaveDescription}
                onChangeText={(val) => {
                  setLeaveDescription(val);
                  setError(" ");
                }}
                placeholderTextColor={"#9E9E9E"}
                placeholder={"Enter description"}
                underlineColorAndroid="transparent"
                style={Object.assign({}, defaultStyle, styles.textAreaStyle)}
              />
            </View>
            <Button
              loading={loading}
              title="Apply Leave"
              onPress={ApplyLeaveHandler}
              style={applyLeaveButtonStyle}
            />
            <InputText label={error} style={loginErrorStyle} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ApplyLeave;
