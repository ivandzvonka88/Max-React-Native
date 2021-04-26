import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Auth } from "aws-amplify";
import { fetchUserData } from "../state/thunk";
import { connect } from "react-redux";

import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';

class LoginScreen extends React.Component {
  state = { email: '', password: '' }

  handleChange(value, field) {
    console.log(value, field)
    this.setState({ [field]: value })
  }

  handleSubmit() {
    const { fetchUserData } = this.props
    console.log('submitting?')
    return Auth.signIn(this.state.email, this.state.password)
      .then(async (user) => {
        console.log(user)
        await fetchUserData(user.username);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          value={this.state.email}
          onChangeText={text => this.handleChange(text, "email")}
          style={styles.email}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput
          label="Password"
          value={this.state.password}
          onChangeText={text => this.handleChange(text, "password")}
          style={styles.password}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          onPress={() => this.handleSubmit()}
          style={styles.submitButton}
        >
          LOGIN
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 20,
    width: '80%',
  },
  password: {
    marginTop: 20,
    width: '80%',
  },
  submitButton: {
    marginVertical: 20
  }
});

const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (cognito_id) => dispatch(fetchUserData(cognito_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);