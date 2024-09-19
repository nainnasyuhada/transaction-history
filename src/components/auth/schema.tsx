import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required!'),
  password: yup.string().when('errorCount', {
    is: (count: number) => count >= 3,
    then: yup.string().required('Password is required!'),
    otherwise: yup.string(),
  }),
});
