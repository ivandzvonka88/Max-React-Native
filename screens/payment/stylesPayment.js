import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

let windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    pageSuperContainer: {
        height: '100%',
        backgroundColor: "white",
        flex: 1
    },
    pageContainer: {
        alignItems: 'flex-start',
        alignContent: 'center',
        paddingTop: 70,
        padding: 10,
        flex: 1,
        backgroundColor: "transparent"
    },
    accordionWrapper: {
        backgroundColor: 'transparent',
        flex: 0,
        margin: 8,
        borderRadius: 5,
        shadowOffset: { height: 4, width: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: "gray",
        width: '100%',
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    purchaseButtonWrapper: {
        flex: 1,
        borderRadius: 5,
        width: '95%',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: 35,
        marginBottom: 20,
        backgroundColor: 'green',
        paddingVertical: 5
    },
    purchaseButton: {
        paddingHorizontal: 7,
        paddingVertical: 4,
        color: 'white',
        borderRadius: 8,
        alignSelf: 'center'
    },
    formGroup: {
        flex: 0,
        backgroundColor: "transparent",
        paddingVertical: 10,
        margin: 0,
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    formRow: {
        flex: 0,
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 7,
        marginVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: 'transparent',
        maxHeight: 38
    },
    inputContainer: {
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        marginVertical: 0,
        borderColor: 'green',
        borderWidth: 2
    },
    dropdownContainer: {
        flex: 0,
        width: '30.0%',
        alignItems: "center",
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        borderColor: 'green',
        borderWidth: 2
    },
    toggleContainer: {
        flexDirection: 'row',
        maxHeight: 40,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        height: '100%',
        borderColor: 'gray'
    },
    unselectedToggle: {
        backgroundColor: 'lightgray',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        margin: 3,
        padding: 3,
        paddingHorizontal: 4,
        maxHeight: 40,
        maxWidth: 40
    },
    selectedToggle: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 3,
        padding: 3,
        paddingHorizontal: 4,
        shadowOffset: { height: 1, width: -1 },
        shadowRadius: 6,
        shadowOpacity: 0.5,
        shadowColor: "gray",
        maxHeight: 40,
        maxWidth: 40
    },
    formGroupHeader: {
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'center',
        paddingLeft: 5,
        width: '100%',
        marginBottom: 10
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left'
    },
    submitButton: {
        marginTop: windowHeight * 0.12,
        maxHeight: windowHeight * 0.09,
        width: '70%',
        backgroundColor: 'white',
        minHeight: '25%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        borderStyle: 'solid',
        alignItems: 'center',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'center'
    }
});

export { styles }