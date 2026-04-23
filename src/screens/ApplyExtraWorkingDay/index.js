import moment from "moment";
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
import InputText from "../../components/InputText";
import DatePicker from "../../components/DatePicker";
import toastStyle from "../../utils/toastManager/style";
import { defaultStyle } from "../../components/Input/style";
import FontAwesomeButton from "../../components/FontAwesomeButton";
import HorizontalLineWithText from "../../components/HorizontalLineWithText";

const ApplyExtraWorkingDay = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extraWorkingDayEndDate, setExtraWorkingDayEndDate] = useState(
    new Date()
  );
  const [extraWorkingDayDescription, setExtraWorkingDayDescription] =
    useState(null);
  const [extraWorkingDayStartDate, setExtraWorkingDayStartDate] = useState(
    new Date()
  );

  const sendExtraWorkingDayRequest = async () => {
    const data = {
      extra_working_day_detail: {
        end_date: extraWorkingDayEndDate,
        start_date: extraWorkingDayStartDate,
        description: extraWorkingDayDescription,
      },
    };
    try {
      setLoading(true);
      const response = await requestPost(API.APPLY_FOR_EXTRA_WORKING_DAY, data);
      setLoading(false);

      if (response.status == 200) {
        Toast.success(response.data.msg);
        setTimeout(() => {
          navigation.navigate("MainScreen");
        }, 2000); // Adjust the delay time as needed
      }
    } catch (error) {
      setLoading(false);
      showErrors(error?.response?.data?.msg);
    }
  };

  const ApplyExtraWorkingDay = () => {
    if (
      !extraWorkingDayDescription ||
      !extraWorkingDayStartDate ||
      !extraWorkingDayDescription
    ) {
      Toast.error("All fields are required");
    } else {
      if (extraWorkingDayEndDate >= extraWorkingDayStartDate) {
        sendExtraWorkingDayRequest();
      } else {
        Toast.error("Incorrect end date.");
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
            <View style={Object.assign({}, defaultStyle, styles.dateRowStyle)}>
              <View>
                <InputText
                  label={
                    Platform.OS === "ios"
                      ? "Start Date: "
                      : moment(extraWorkingDayStartDate).format("MMMM D, YYYY")
                  }
                  style={loginFieldStyle}
                />
              </View>
              <View>
                <DatePicker
                  date={extraWorkingDayStartDate}
                  setDate={setExtraWorkingDayStartDate}
                />
              </View>
            </View>
            <HorizontalLineWithText text="to" />
            <View style={Object.assign({}, defaultStyle, styles.dateRowStyle)}>
              <View>
                <InputText
                  style={loginFieldStyle}
                  label={
                    Platform.OS === "ios"
                      ? "End Date: "
                      : moment(extraWorkingDayEndDate).format("MMMM D, YYYY")
                  }
                />
              </View>
              <View>
                <DatePicker
                  date={extraWorkingDayEndDate}
                  setDate={setExtraWorkingDayEndDate}
                />
              </View>
            </View>
            <View>
              <TextInput
                multiline={true}
                value={extraWorkingDayDescription}
                onChangeText={(val) => {
                  setExtraWorkingDayDescription(val);
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
              title="Apply"
              style={applyLeaveButtonStyle}
              onPress={ApplyExtraWorkingDay}
            />
            <InputText label={error} style={loginErrorStyle} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ApplyExtraWorkingDay;
