"use client"
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Image as AnimatableImage, View as AnimatableView } from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Image } from 'react-native';
export default function Index() {

  const DEFAULT_EMAIL = 'admin@gmail.com';
  const DEFAULT_PASSWORD = 'Password@1';
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);



  const handleLogin = () => {
   
    validateEmail(email);
    validatePassword(password);
  
    
    if (
      !email ||
      !password ||
      emailError ||
      passwordError
    ) {
      setShowError(false); 
      return;
    }
  
    
    if (
      email === DEFAULT_EMAIL &&
      password === DEFAULT_PASSWORD
    ) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
  
      setShowError(false); 
      setTimeout(() => {
        router.replace('/home');
      }, 1500);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
        text2: 'Please check your email or password',
      });
  
      setShowError(true);
    }
  };
  

  const validateEmail = (value: string) => {
    setEmail(value);
    if (!value) {
      setEmailError('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError('Enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };



  return (
    <LinearGradient colors={['white', 'white']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.logoContainer}>
          <AnimatableImage
            animation="bounceIn"
            source={require('../assets/images/loginImg.png')}
            // source={require('/images/react-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Log in</Text>
        </View>

        <AnimatableView animation="fadeInUpBig" style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={validateEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={[styles.input, emailError ? styles.inputError : null]}
            secureTextEntry
            value={password}
            onChangeText={validatePassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient colors={['#F46D42', '#F46D42']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </AnimatableView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#2C3E75',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  button: {
    marginTop: 10,
  },
  buttonGradient: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});