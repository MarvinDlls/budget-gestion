import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { supabase } from '../../services/supabase';
import { useRouter } from 'expo-router'; // Remplacé useNavigation par useRouter

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Utilisation de useRouter au lieu de useNavigation
    
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Attention!', 'Tous les champs doivent être remplis.');
            return;
        }
    
        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
    
            if (authError) {
                Alert.alert('Erreur', authError.message);
                return;
            }

            // Redirige vers IndexScreen après une connexion réussie
            router.navigate('../(tabs)/index'); // Ajustez le chemin selon votre structure de fichiers
    
        } catch (error) {
            Alert.alert('Erreur', 'Un problème est survenu, veuillez réessayer.');
        }
    };

    return (
        <View style={styles.content}>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});