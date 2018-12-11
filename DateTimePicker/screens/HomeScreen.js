import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      selectedDate: 'Show DatePicker',
      selectedTime: 'Show TimePicker',
    }
  }

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', moment(date));
    this.setState({
      selectedDate: moment(date).format('YYYY-MM-DD')
    })
    this._hideDatePicker();
    
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = (time) => {
    console.log('A date has been picked: ', moment(time));
    this.setState({
      selectedTime: moment(time).format('HH:MM')
    })
    this._hideTimePicker();
    
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this._showDatePicker}>
          <Text>{this.state.selectedDate}</Text>
        </TouchableOpacity>

        <Text> </Text>

        <TouchableOpacity onPress={this._showTimePicker}>
          <Text>{this.state.selectedTime}</Text>
        </TouchableOpacity>

        <DateTimePicker
          mode={'date'}
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
        />

        <DateTimePicker
          mode={'time'}
          is24Hour={true}
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
