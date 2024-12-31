import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useState } from "react";
import { supabase } from '../../services/supabase';
import bcrypt from 'react-native-bcrypt';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
const logoDiscord = require('../../assets/discord.png');

const DISCORD_CLIENT_ID = '1323600935540232233';
const DISCORD_ENDPOINT = 'https://discord.com/api/v10';

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

    const redirectUri = makeRedirectUri({
        scheme: 'yourauthapp',
        path: 'discord-auth'
    });

    const handleDiscordLogin = async () => {
        try {
            const authRequestOptions = {
                responseType: AuthSession.ResponseType.Token,
                clientId: DISCORD_CLIENT_ID,
                scopes: ['identify', 'email'],
                redirectUri
            };

            const discovery = {
                authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
                tokenEndpoint: 'https://discord.com/api/oauth2/token',
            };

            const authRequest = new AuthSession.AuthRequest(authRequestOptions);
            authRequest.url = await authRequest.makeAuthUrlAsync(discovery);

            const result = await authRequest.promptAsync(discovery);

            if (result.type === 'success') {
                const userResponse = await fetch(`${DISCORD_ENDPOINT}/users/@me`, {
                    headers: {
                        'Authorization': `Bearer ${result.authentication?.accessToken}`
                    }
                });
                
                const discordUser = await userResponse.json();

                // Vérifier si l'utilisateur existe déjà
                const { data: existingUser } = await supabase
                    .from('users')
                    .select()
                    .eq('email', discordUser.email)
                    .single();

                if (existingUser) {
                    // Mise à jour de l'utilisateur existant
                    const { error: updateError } = await supabase
                        .from('users')
                        .update({
                            discord_id: discordUser.id,
                            avatar_url: discordUser.avatar 
                                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                                : null
                        })
                        .eq('email', discordUser.email);

                    if (updateError) throw updateError;
                } else {
                    // Création d'un nouvel utilisateur
                    const { error: insertError } = await supabase
                        .from('users')
                        .insert({
                            pseudo: discordUser.username,
                            email: discordUser.email,
                            discord_id: discordUser.id,
                            avatar_url: discordUser.avatar 
                                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                                : null
                        });

                    if (insertError) throw insertError;
                }

                Alert.alert('Succès', 'Connexion avec Discord réussie !');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Un problème est survenu avec l\'authentification Discord.');
            console.error(error);
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

            <TouchableOpacity style={styles.buttonDiscord} onPress={handleDiscordLogin}>
                <Image source={logoDiscord} style={{ width: 24, height: 24 }} />
                <Text style={styles.buttonTextDiscord}>Inscription avec Discord</Text>
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
    buttonDiscord: {
        backgroundColor: '#5865F2',
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
    buttonTextDiscord: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        paddingRight: 20,
    },
    alt: {
        alignSelf: 'center',
    },
});