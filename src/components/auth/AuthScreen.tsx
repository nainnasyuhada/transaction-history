import React from 'react'
import { Button, Image, StyleSheet, TextInput, View } from 'react-native'
import Config from "react-native-config";
import { useForm, Controller, SubmitErrorHandler, FormProvider } from 'react-hook-form';
import { User } from '../../types/auth';


const AuthScreen: React.FC<{ navigation: any }> = ({ navigation }) =>  {
  const appEmail = Config.APP_EMAIL;
  const password = Config.APP_PASSWORD;
  const TransactionImage = "https://cdn-icons-png.flaticon.com/512/879/879839.png"

  console.log("here: ", appEmail, password);

  const { ...methods } = useForm();
  const onSubmit = (data: User) => {
    console.log(data);
    navigation.navigate('History')
  };

  const onError: SubmitErrorHandler<User> = (errors, e) => {
    return console.log(errors)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: TransactionImage }} style={styles.image} />
      <FormProvider {...methods}>
        
  <Controller
    control={methods.control}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        placeholder="Insert email"
        keyboardType="email-address"
        style={styles.input}
      />
    )}
    name="email"
    rules={{ required: 'Email is required!' }}
  />
  <Controller
    control={methods.control}
    render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        secureTextEntry
        placeholder="Insert password"
        style={styles.input}
      />
    )}
    name="password"
    rules={{ required: 'Password is required!' }}
  />
</FormProvider>
      <View style={styles.button}>
      <Button
  title="Login"
  color="white"
  onPress={methods.handleSubmit(onSubmit, onError)}
/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007fdc',
    borderRadius: 5,
    fontSize: 16,
    padding:4,
    width: '50%'
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100
  },
  input: {
borderColor: '#1592fe',
borderRadius: 5,
borderWidth: 1,
fontSize: 16,
marginVertical: 8,
padding: 8,
width: '50%'

  }
})


export default AuthScreen
