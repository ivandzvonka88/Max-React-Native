import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Workouts: {
            screens: {
              WorkoutsScreen: 'one',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'two',
            },
          },
          Payment: {
            screens: {
              PaymentScreen: 'two',
            },
          }
        },
      },
      NotFound: '*',
    },
  },
};
