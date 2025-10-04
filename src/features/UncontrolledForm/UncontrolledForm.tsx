import { FC, FormEvent, useState } from 'react';
import { ValidationError } from 'yup';
import cls from './UncontrolledForm.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Input } from '@/components';
import { addData, selectCountries } from '../dataSlice';
import { schema } from '@/lib/validate';

interface UncontrolledFormProps {
  close: () => void;
}

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: FC<FormFieldProps> = ({
  label,
  error,
  required = true,
  children,
}) => (
  <>
    <label className={cls.label} htmlFor={label.toLowerCase()}>
      {label}
      {required && '*'}
    </label>
    {children}
    <p className={cls.error}>&nbsp;{error}</p>
  </>
);

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ close }) => {
  const [error, setError] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      username: formData.get('username') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: (formData.get('gender') as string) || '',
      accept: !!formData.get('accept'),
      file: formData.get('file') as File | null,
      country: formData.get('country') as string,
    };

    try {
      await schema.validate(data, { abortEarly: false });
      setError({});

      if (data.file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            addData({
              ...data,
              file: reader.result as string,
            })
          );
          close();
        };
        reader.readAsDataURL(data.file);
      } else {
        dispatch(addData({ ...data, file: '' }));
        close();
      }
    } catch (err) {
      const validationError: Record<string, string> = {};
      if (err instanceof ValidationError) {
        err.inner.forEach((e) => {
          if (e.path) {
            validationError[e.path] = e.message;
          }
        });
      }
      setError(validationError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cls.form}>
      <h2 className={cls.title}>Uncontrolled Form</h2>

      <FormField label="Name" error={error.username}>
        <Input
          placeholder="Name"
          name="username"
          id="name"
          className={cls.input}
        />
      </FormField>

      <FormField label="Age" error={error.age}>
        <Input
          placeholder="Age"
          type="number"
          min={0}
          name="age"
          id="age"
          className={cls.input}
        />
      </FormField>

      <FormField label="Email" error={error.email}>
        <Input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          className={cls.input}
        />
      </FormField>

      <FormField label="Password" error={error.password}>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          className={cls.input}
        />
      </FormField>

      <FormField label="Confirm Password" error={error.confirmPassword}>
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className={cls.input}
        />
      </FormField>

      <FormField label="Gender" error={error.gender}>
        <div>
          <input
            className={cls['custom-radio']}
            name="gender"
            type="radio"
            id="male"
            value="Male"
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className={cls.input}>
          <input
            className={cls['custom-radio']}
            name="gender"
            type="radio"
            id="female"
            value="Female"
          />
          <label htmlFor="female">Female</label>
        </div>
      </FormField>

      <FormField label="Accept Terms" error={error.accept}>
        <input
          type="checkbox"
          className={cls['custom-checkbox']}
          id="accept"
          name="accept"
          value="yes"
        />
        <label
          htmlFor="accept"
          className={[cls.labelCheckbox, cls.input].join(' ')}
        >
          I accept Terms and Conditions agreement
        </label>
      </FormField>

      <FormField label="File" error={error.file}>
        <Input
          type="file"
          name="file"
          id="file"
          className={cls.input}
          accept=".jpeg, .png"
        />
      </FormField>

      <FormField label="Country" error={error.country}>
        <Input
          name="country"
          list="countryList"
          placeholder="Country"
          id="country"
          className={cls.input}
        />
        <datalist id="countryList">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </FormField>

      <Button className={cls.button}>Submit</Button>
    </form>
  );
};
