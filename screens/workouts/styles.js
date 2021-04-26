import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
        height: "auto",
        borderColor: "#016fb9",
        marginBottom: 25,
        backgroundColor: "#f5f4f4",
        alignItems: 'center'
    },
    loadingText: {
        margin: 'auto'
    },
    scrollview: {
        backgroundColor: 'white'
    },
    superContainer: {
        marginTop: 0,
        height: "100%",
        borderColor: "#016fb9",
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 0,
        height: "auto",
        borderColor: "#016fb9",
        backgroundColor: "white"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 'auto'
    },
    microHeader: {
        width: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 'auto',
        color: '#000000',
    },
    dayHeader: {
        width: 'auto',
        fontSize: 13,
        color: '#000000',
        height: 20
    },
    movementName: {
        backgroundColor: 'red',
        width: '100%'
    },
    linearGradient: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: "#000000",
        shadowOffset: { height: 10, width: 10 },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        shadowColor: "#000000",
        elevation: 1,
        width: 10
    }
})
