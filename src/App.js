import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBppbCq0WQnpQ4b95NbZ7btkBJw8qBiPas",
            authDomain: "auth-fc9b1.firebaseapp.com",
            databaseURL: "https://auth-fc9b1.firebaseio.com",
            projectId: "auth-fc9b1",
            storageBucket: "auth-fc9b1.appspot.com",
            messagingSenderId: "766469616171"
        });

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ loggedIn: user ? true : false });
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
                );
            case false:
                return <LoginForm />
            default: 
                return <Spinner size="large" />
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
