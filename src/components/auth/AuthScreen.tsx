import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {User} from '@types/auth';
import {onCheckBiometric} from './checkAuthentication';

const AuthScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const appEmail = Config.APP_EMAIL;
  const appPassword = Config.APP_PASSWORD;
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [errorCount, setErrorCount] = useState<number>(0);

  const {...methods} = useForm();
  const onSubmit = async (data: User) => {
    setErrorCount(errorCount + 1);

    if (errorCount < 3) {
      if (data.email === appEmail) {
        setErrorCount(0);
        setErrorMessage(undefined);

        const resp = await onCheckBiometric();
        switch (resp) {
          case 'fail-notAvailable':
            Alert.alert('Oops!', 'Face ID is not available on this device.');
            break;
          case 'fail-auth':
            Alert.alert('Oops!', 'Failed to authenticate with face ID.');
            break;
          default:
            navigation.navigate('History');
            break;
        }
      } else {
        setErrorMessage('Email not found');
      }
    } else {
      const userEmail = methods.getValues('email');
      const userPassword = methods.getValues('password');

      if (userEmail === appEmail && userPassword === appPassword) {
        navigation.navigate('History');
      } else {
        setErrorMessage('Mismatch password and email');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/transaction-icon.jpg')}
        style={styles.image}
      />
      <FormProvider {...methods}>
        <Controller
          control={methods.control}
          render={({field: {onChange, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder="Insert email"
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
            />
          )}
          name="email"
          rules={{required: 'Email is required!'}}
        />
        {errorCount >= 3 && (
          <Controller
            control={methods.control}
            render={({field: {onChange, value}}) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                secureTextEntry
                placeholder="Insert password"
                style={styles.input}
              />
            )}
            name="password"
            rules={{required: 'Password is required!'}}
          />
        )}
      </FormProvider>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <View style={styles.button}>
        <Button
          title="Login"
          disabled={!methods.getValues('email')}
          color={Platform.OS === 'ios' ? 'white' : '#007fdc'}
          onPress={() => {
            onSubmit({
              email: methods.getValues('email'),
              password: methods.getValues('password'),
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007fdc',
    borderRadius: 5,
    fontSize: 16,
    padding: 4,
    width: '50%',
    color: 'pink',
    fontWeight: 'normal',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 80,
  },
  input: {
    borderColor: '#1592fe',
    borderRadius: 5,
    borderWidth: 1,
    color: '#000000',
    fontSize: 16,
    marginVertical: 8,
    padding: 8,
    width: '50%',
  },
});

export default AuthScreen;
