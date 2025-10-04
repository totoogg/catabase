import { countriesLower } from '@/const/countries';
import * as Yup from 'yup';

const FIRST_UPPER_CASE_REGEXP = /^[A-Z]/;
const PASSWORD_REGEXP = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

const MAX_FILE_SIZE = 1048576;
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg'];

export const schema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .matches(FIRST_UPPER_CASE_REGEXP, {
      message: 'The first letter must be capitalized',
    }),
  age: Yup.number()
    .typeError('Age is required')
    .required('Age is required')
    .positive('Age must be a positive number'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      PASSWORD_REGEXP,
      'Password must have 1 number, 1 uppercased letter, 1 lowercased letter and 1 special character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm password')
    .oneOf([Yup.ref('password')], 'The passwords do not match'),
  gender: Yup.string().required('Gender is required'),
  accept: Yup.boolean().oneOf(
    [true],
    'You must accept Terms and Conditions agreement'
  ),
  file: Yup.mixed<File>()
    .required('File is required')
    .test('fileSize', 'The file is too big (> 1 MB)', (value) => {
      return value && value.size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported format (png | jpeg)', (value) => {
      return value && ALLOWED_FILE_TYPES.includes(value.type);
    }),
  country: Yup.string()
    .required('Country is required')
    .test({
      test: (value) => !value || countriesLower.includes(value?.toLowerCase()),
      message: 'Such a country does not exist',
    }),
});
