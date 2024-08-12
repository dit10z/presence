import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, Pressable, Animated, TextInput as RNTextInput} from 'react-native';
import {View, Text, Colors, Incubator} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {useStores} from '@app/stores';
import {useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {BButton} from '@app/components/button';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const {Toast} = Incubator;

export type Props = {
  type?: 'push';
};

function MyCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}>
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(7, 'Username must be at least 7 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
});

export const AuthLogin: NavioScreen<Props> = observer(({type = 'push'}) => {
  useAppearance(); // for Dark Mode
  const {t, navio, api} = useServices();
  const {auth} = useStores();

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const toggleToastVisibility = () => {
    setToastVisible(!toastVisible);
  };

  const login = async (values: { username: string, password: string }) => {
    setLoading(true);

    try {
      const {status} = await api.auth.login(); // fake login

      if (status === 'success') {
        setLoading(false); // Set loading to false before showing toast
        setToastVisible(true); // Show toast on successful login
        auth.set('state', 'logged-in');
        setTimeout(() => {
          setToastVisible(false); // Hide toast after navigating
          navio.setRoot('tabs', 'AppTabs');
        }, 1000); // Delay of 5000 milliseconds (5 seconds)
      }
    } catch (e) {
      // handle error
      setLoading(false); // Ensure loading state is reset on error
    }
  };

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View margin-40 paddingT-75>
          <View marginT-s6 style={styles.image}>
            <Image
              style={styles.image}
              source={require('../../../assets/tujuhsembilan.png')}
              contentFit="contain"
            />
          </View>
          
          <View flex marginT-30>
            <Text text50>Presensi 79</Text>
            <Text grey30 marginT-4>Please login here</Text>
          </View>

          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={login}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
              <View marginT-s6>
                <AnimatedInput
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={touched.username && errors.username}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <AnimatedInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={!passwordVisible}
                  error={touched.password && errors.password}
                  rightIcon={
                    <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                      <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                    </Pressable>
                  }
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.checkboxContainer}>
                  <MyCheckbox />
                  <Text style={styles.checkboxLabel}>{`Remember Me`}</Text>
                </View>

                <BButton label={loading ? 'Logging in ...' : 'Login'} onPress={handleSubmit} marginT-s6 />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Toast
        visible={toastVisible}
        position={'top'}
        autoDismiss={5000}
        onDismiss={() => setToastVisible(false)}
        message="Login successful!"
        preset="success"
        centerMessage
      />
    </View>
  );
});

type AnimatedInputProps = {
  label: string;
  error?: string | false;
  rightIcon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  secureTextEntry?: boolean;
};

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

const AnimatedInput: React.FC<AnimatedInputProps> = ({ label, error, rightIcon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(props.value === '' ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, props.value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: 10,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 2.5], // Adjust the top margin here
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.grey50, error ? 'red' : Colors.blue30],
    }),
  };

  const inputStyle = {
    borderColor: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.grey50, error ? 'red' : Colors.blue30],
      extrapolate: 'clamp',
    }),
    borderWidth: 1, // Ensure borderWidth is set
    borderRadius: 10, // Ensure borderRadius is set
    height: 55, // Ensure height is set
    padding: 10, // Ensure padding is set
    fontSize: 16, // Ensure fontSize is set
  };

  return (
    <View style={{ marginVertical: 12 }}>
      <View style={styles.inputContainer}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <AnimatedTextInput
          {...props}
          style={[styles.input, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur(e);
          }}
        />
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
    </View>
  );
};

AuthLogin.options = props => ({
  headerBackTitleStyle: false,
});

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 55,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.grey50,
    borderRadius: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey50,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#0078D7',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '300', // Changed from 'light' to '300'
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 60,
  },
});

export default AuthLogin;
