import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useState } from "react";
import { supabase } from '../../services/supabase';
import bcrypt from 'react-native-bcrypt';
const logoApple = require('../../assets/apple.png');

export default function Input() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!pseudo || !email || !password || !confirmPassword) {
            Alert.alert('Attention!', 'Tous les champs doivent être remplis.');
            return;
        }

        const pseudoRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!pseudoRegex.test(pseudo)) {
        Alert.alert('Erreur', 'Le pseudo doit comporter entre 3 et 16 caractères et contenir uniquement des lettres, des chiffres, des tirets ou des underscores.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Erreur', 'L\'email n\'est pas valide.');
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        Alert.alert('Erreur', 'Le mot de passe doit comporter au moins 8 caractères, inclure une majuscule, une minuscule, un chiffre et un caractère spécial.');
        return;
    }

        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const salt = bcrypt.genSaltSync(10); 
            const hashedPassword = bcrypt.hashSync(password, salt); 
            const { data, error } = await supabase
                .from('users')
                .insert({ pseudo, email, password: hashedPassword });


            if (error) {
                Alert.alert('Erreur', error.message);
            } else {
                Alert.alert('Succès', 'Inscription réussie !');
                setPseudo('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Un problème est survenu, veuillez réessayer.');
        }
    };

    const handleAppleLogin = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'apple',
            });

            if (error) {
                alert(`Erreur Apple Auth: ${error.message}`);
            } else {
                console.log('Connexion avec Apple réussie', data);
            }
        } catch (error) {
            alert('Une erreur est survenue avec la connexion Apple.');
        }
    };

    return (
        <View style={styles.content}>
            <TextInput
                style={styles.input}
                placeholder="Pseudo"
                value={pseudo}
                onChangeText={setPseudo}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmer mot de passe"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>

            <Text style={styles.alt}>Ou continuer avec</Text>

            <TouchableOpacity style={styles.buttonApple} onPress={handleAppleLogin}>
                <Image source={logoApple} style={{ width: 24, height: 24 }} />
                <Text style={styles.buttonTextApple}>Inscription avec Apple</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        padding: 20,
        borderRadius: 5,
        width: '80%',
        gap: 15,
        top: 20
    },
    input: {
        height: 50,
        borderColor: '#d9d9D9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#a18cd1',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonApple: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonTextApple: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        paddingRight: 20,
    },
    alt: {
        alignSelf: 'center',
    },
});