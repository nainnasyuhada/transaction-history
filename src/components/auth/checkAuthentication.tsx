import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const onCheckBiometric = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  const {available, biometryType} = await rnBiometrics.isSensorAvailable();

  if (available && biometryType === BiometryTypes.FaceID) {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Confirm your identity',
    });

    if (result.success) {
      return 'success';
    } else {
      return 'fail-auth';
      //   return Alert.alert('Oops!', 'Failed to authenticate with face ID.');
    }
  } else {
    return 'fail-notAvailable';
    // return Alert.alert('Oops!', 'Face ID is not available on this device.');
  }
};
