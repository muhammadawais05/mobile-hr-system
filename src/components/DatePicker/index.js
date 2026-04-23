import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

import { calenderIconStyle } from './style'
import FontAwesomeButton from '../FontAwesomeButton'

const DatePicker = ({ date, setDate, minimumDate  }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };


  return (
    <>
      {Platform.OS === 'android' && (
        <FontAwesomeButton
        size={25}
        icon="calendar"
        onPress={showDatepicker}
        style={calenderIconStyle}
      />
      )}
      {(Platform.OS === 'ios' || show) && (
        <DateTimePicker
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChange}
          themeVariant="light"
          minimumDate={minimumDate}
           style={{marginBottom: 5}}
        />
      )}
    </>
  )
}

export default DatePicker
