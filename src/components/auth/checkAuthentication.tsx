import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const onCheckBiometric = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (!available || biometryType !== BiometryTypes.FaceID) {
      return 'fail-notAvailable';
    }

    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Confirm your identity',
    });

    return result.success ? 'success' : 'fail-auth';
  } catch (error) {
    console.error(error);
    return 'fail-notAvailable';
  }
};
