import * as React from 'react';
import { styles } from './styles.js'
import { fetchUserData } from "../../state/thunk";
import { connect } from "react-redux";
import { Auth } from 'aws-amplify';
import { getDates } from "./utils";
import { fetchData, fetchMoreData, submitResults } from "./api";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text, View, StatusBar, ScrollView, Keyboard
} from 'react-native';
import Micro from './components/1Micros'
import Day from './components/2Days'
import Movement from './components/3Movements'
import MicroNotes from './components/MicroNotes'
import DropDownMenu from '../../components/AppDropDownMenu'
import MenuButton from '../../components/MenuButton'

class WorkoutsScreen extends React.Component {
  state = {
    email: '',
    password: '',
    expanded: '',
    items: [],
    microIdx: 0,
    dayIdx: 0,
    contentOffset: { x: 0, y: 0 },
    kb: false,
    loadingMovement: ''
  }


  async componentDidMount() {
    var cognito_id = null

    Keyboard.addListener('keyboardWillShow', () => this.setState({ kb: true }))
    Keyboard.addListener('keyboardWillHide', () => this.setState({ kb: false }))

    await Auth.currentSession().then((value) => {
      cognito_id = value.accessToken.payload.username
    })

    const { start_date, end_date, tomorrow } = await getDates();

    await this.props.fetchUserData(cognito_id).then((data) => {
      // Check if user has already paid for services
      // If not, redirect to payments page
      if (!data.stripe_id) {
        console.log('freeloader!')
        // return this.props.history.push("/payments");
      } else {
        this.setState({
          cognito_id: data.cognito_id,
          admin: false,
          minDate: start_date,
          maxDate: end_date,
          tomorrow: tomorrow,
          ...data,
        });

        var range = null

        fetchData(
          {
            cognito_id,
            start_date,
            end_date,
            tomorrow,
            micro_hold_offset: this.state.micro_hold_offset,
          },
          this,
          range
        );
      }
    });
  }


  render() {
    if (this.state.items.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.superContainer}>
          <MenuButton navigation={this.props.navigation} />
          <ScrollView
            style={styles.scrollview}
            ref={(ref) => { this.scrollViewRef = ref; }}
            scrollEnabled={!this.state.show}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => this.setState({ contentOffset: e.nativeEvent.contentOffset })}
            onContentSizeChange={(width, height) => this.setState({ contentHeight: height })}
            scrollEventThrottle={16}
          >
            <SafeAreaView style={styles.container}>
              <StatusBar style="light-content" />
              <Micro
                parent={this}
              />
              <Day
                parent={this}
                microIdx={this.state.microIdx}
                days={this.state.items[this.state.microIdx].days}
              />
              <MicroNotes
                parent={this}
                idxs={[this.state.microIdx, this.state.dayIdx]}
              />
              <Movement
                parent={this}
                idxs={[this.state.microIdx, this.state.dayIdx]}
              />
              <DropDownMenu
                show={this.state.show}
                position={this.state.position}
                contentOffset={this.state.contentOffset}
                contentHeight={this.state.contentHeight}
                buttonStyle={this.state.dropdownButtonStyle}
                choices={this.state.dropdownChoices}
                parent={this}
                buttonText='RIR'
                onPress={(child) => submitResults(child, this.state.idxs, this)}
              />
              <View style={{ height: this.state.kb ? 350 : 50 }} />
            </SafeAreaView >
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (cognito_id) => dispatch(fetchUserData(cognito_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsScreen);