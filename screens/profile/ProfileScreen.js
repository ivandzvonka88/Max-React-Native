import * as React from 'react';
import { styles } from './stylesProfile'
import { FormLiftInfo, FormPersonalInfo } from '../../components/UserForms'
import { handleSave } from './api'
import { adjustMaxs } from './utilsProfile'
import { updateUserData, fetchUserData } from "../../state/thunk";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { connect } from "react-redux";
import { Text, View, ScrollView, Dimensions, Pressable, Keyboard, TouchableOpacity } from 'react-native';
import MenuButton from '../../components/MenuButton'
import AppTextInput from '../../components/AppTextInput'
import Accordion from '../workouts/components/accordion'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DropDownMenu from '../../components/AppDropDownMenu'


const handleChange = (text, field_name, parent) => {
  console.log(text, field_name)
  parent.setState({ changed: parent.state.changed.concat(field_name) })


  if (field_name === 'birth_year') {
    if (text.length > 4) {
      text = text.substring(0, 4)
    } else if (parseInt(text) > 2020) {
      text = String(2020)
    }
    parent.setState({ [field_name]: text })
  }

  if (field_name === 'birth_month') {
    if (text.length > 2) {
      text = text.substring(0, 2)
    } else if (parseInt(text) > 12) {
      text = String(12)
    }
    parent.setState({ [field_name]: text })
  }

  // TODO: use moment.js or something to figure out proper dates, 31 for now
  if (field_name === 'birth_day') {
    if (text.length > 2) {
      text = text.substring(0, 2)
    } else if (parseInt(text) > 31) {
      text = String(31)
    }
    parent.setState({ [field_name]: text })
  }

  if (field_name.includes('max')) {
    const [type, lift, record] = field_name.toLowerCase().split('-')
    var maxs_copy = parent.state.maxs_copy
    console.log('maxs_copy:', maxs_copy)

    text = text === "" ? text : parseInt(text).toString()

    if (record === 'xrm') {
      if (text !== "" && parseInt(text) > 8) { text = "8" }
    } else if (record === 'max') {
      text = text.length > 3 ? text.substring(0, 3) : text
    }

    maxs_copy[lift][record] = text
    parent.setState({ maxs_copy })
  }

  if (['bodyweight', 'height'].includes(field_name)) {
    parent.setState({ [field_name]: text })
  }
};

class ProfileScreen extends React.Component {
  state = {
    cognito_id: '',
    kb: false,
    contentOffset: { x: 0, y: 0 },
    male: true,
    metric: true,
    changed: [],
    loading: false,
    date: new Date(),
    showDatePicker: false,
    birth_year: '',
    birth_month: '',
    birth_day: '',
    bodyweight: '',
    height: '',
    comp_styles: {
      squat: "low-bar back squat",
      bench: "medium-grip bench press",
      deadlift: "sumo deadlift",
    },
    errors: {},
    maxs: {
      "low-bar back squat": { max: 0, xrm: 1 },
      "medium-grip bench press": { max: 0, xrm: 1 },
      "sumo deadlift": { max: 0, xrm: 1 },
    },
    maxs_copy: {
      squat: { max: "", xrm: "" },
      bench: { max: "", xrm: "" },
      deadlift: { max: "", xrm: "" },
    }
  }

  async componentDidMount() {
    var cognito_id = null

    Keyboard.addListener('keyboardWillShow', () => this.setState({ kb: true }))
    Keyboard.addListener('keyboardWillHide', () => this.setState({ kb: false }))

    await Auth.currentSession().then((value) => {
      cognito_id = value.accessToken.payload.username
    })

    await this.props.fetchUserData(cognito_id).then((data) => {
      console.log('data:', data)
      // Check if user has already paid for services
      // If not, redirect to payments page

      var maxs = data.maxs
      maxs = !data.metric ? adjustMaxs(maxs, true, true) : maxs
      const comp_styles = data.comp_styles

      const maxs_copy = {
        squat: {
          max: String(maxs[comp_styles.squat]['max']),
          xrm: String(maxs[comp_styles.squat]['xrm'])
        },
        bench: {
          max: String(maxs[comp_styles.bench]['max']),
          xrm: String(maxs[comp_styles.bench]['xrm'])
        },
        deadlift: {
          max: String(maxs[comp_styles.deadlift]['max']),
          xrm: String(maxs[comp_styles.deadlift]['xrm'])
        }
      };

      this.setState({
        maxs,
        maxs_copy,
        comp_styles,
        cognito_id: data.cognito_id,
        bodyweight: String(data.bodyweight),
        height: String(data.height),
        metric: data.metric,
        email: data.email,
        birth_day: String(parseInt(data.birthday.split(" ")[0].split("-")[2])),
        birth_month: String(parseInt(data.birthday.split(" ")[0].split("-")[1])),
        birth_year: String(parseInt(data.birthday.split(" ")[0].split("-")[0]))
      });

      console.log('state after mount:', this.state)
    }
    );
  }

  onTextPress(field) {
    // handles moving the screen to fit the keyboard
    this[field].measure((x, y, width, height, pageX, pageY) => {
      const keyboardLine = Dimensions.get('window').height - 350
      const contentOffsets = this.state.contentOffset
      const keyboardCrossover = pageY + contentOffsets.y - keyboardLine

      if (keyboardCrossover > 0 && keyboardCrossover > contentOffsets.y) {
        this.scrollViewRef.scrollTo(
          { x: 0, y: keyboardCrossover + 50, animated: true }
        )
      }
    })
  }

  handleDropdown = (child) => {
    const fieldName = this.state.dropdownFieldName

    if (fieldName.includes('Styles')) {
      const lift = fieldName.split('Styles')[0]
      var comp_styles = this.state.comp_styles
      comp_styles[lift.toLowerCase()] = child.value

      var changed = this.state.changed
      changed = changed.concat(`${lift}Styles`)

      this.setState({ show: false, comp_styles, changed })
    }
  }

  showDropDown(fieldName, buttonStyle, placeholderText, choices) {
    console.log("fieldName:", fieldName)
    const ref = this[fieldName]

    ref.measure((x, y, width, height, pageX, pageY) => {
      const position = { pageX, pageY, width, height };
      this.setState({
        show: true,
        position,
        dropdownPlaceholderText: placeholderText,
        dropdownFieldName: fieldName,
        dropdownButtonStyle: buttonStyle,
        dropdownChoices: choices
      })
    });
  }

  toggleState = (value) => {
    const state = this.state
    state[value] = !this.state[value]
    state.changed = this.state.changed.concat(value)

    if (value === 'metric') {
      state.maxs_copy = adjustMaxs(state.maxs_copy, true, !this.state[value])

      for (const m in state.maxs_copy) {
        state.maxs_copy[m].max = String(state.maxs_copy[m].max)
      }
    }

    this.setState(state)
  }

  renderToggle = (toggleConfig) => {
    const value = toggleConfig.value;
    const stateValue = this.state[value];
    const children = toggleConfig.children;
    const selectColor = this.state.changed.includes(value) ? "#9e9900" : "green"

    return (
      <View style={styles.toggleContainer} key={value}>
        {children.map((child) => {
          if (stateValue === child.value) {
            return (
              <Pressable key={child.value}>
                <View style={styles.selectedToggle}>
                  <Icon name={child.icon} size={25} color={selectColor} />
                </View>
              </Pressable>
            )
          } else {
            return (
              <Pressable key={child.value} onPress={() => this.toggleState(value)}>
                <View style={styles.unselectedToggle} >
                  <Icon name={child.icon} size={25} color="gray" />
                </View>
              </Pressable>
            )
          }
        }
        )}
      </View>
    )
  }

  saveButton = () => {
    var style = this.state.loading ? [styles.saveButton, { backgroundColor: 'gray' }] : styles.saveButton
    return (
      <TouchableWithoutFeedback
        style={style}
        onPress={() => handleSave(this)}
      >
        <Text style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 20,
          paddingVertical: 4,
          paddingHorizontal: 20
        }}>
          save
      </Text>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View style={styles.pageSuperContainer}>
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
          <SafeAreaView style={styles.pageContainer}>
            <View style={styles.accordionWrapper}>
              <Accordion
                title="Personal Information"
                expanded={true}
                key="personal_info"
              >
                < FormPersonalInfo parent={this} handleChange={handleChange} />
              </Accordion>
            </View>
            <View style={styles.accordionWrapper}>
              <Accordion
                title="Lifts Information"
                expanded={true}
                key="lift_info"
              >
                < FormLiftInfo parent={this} handleChange={handleChange} />
              </Accordion>
            </View>
            <View style={styles.saveButtonWrapper}>
              {this.saveButton()}
            </View>
            <DropDownMenu
              show={this.state.show}
              onPress={(child) => this.handleDropdown(child)}
              position={this.state.position}
              contentOffset={this.state.contentOffset}
              contentHeight={this.state.contentHeight}
              buttonStyle={this.state.dropdownButtonStyle}
              choices={this.state.dropdownChoices}
              parent={this}
              buttonText={this.state.dropdownPlaceholderText}
            />
            <View style={{ height: this.state.kb ? 350 : 0 }} />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: (cognito_id) => dispatch(fetchUserData(cognito_id)),
  updateUserData: (pl) => dispatch(updateUserData(pl))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

