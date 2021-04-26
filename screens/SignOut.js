import * as React from 'react';
import { View, Text } from '../components/Themed';
import { Auth } from 'aws-amplify';

class SignOutScreen extends React.Component {
    state = {}

    async componentDidMount() {
        console.log(this.props)
        await Auth.signOut();
        this.props.updateAuthState('loggedOut');
    }

    render() {
        return (
            <View>
                <Text>hi</Text>
            </View>
        );
    }
}

// function SignOutScreen({ updateAuthState }) {
//     Auth.signOut().then(() => {
//         console.log(this.props)
//         updateAuthState('loggedOut');
//     })

//     return (
//         <View>
//             <Text>hi</Text>
//         </View>
//     );
// }

export default SignOutScreen