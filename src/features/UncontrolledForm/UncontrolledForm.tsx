import { FC, FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import cls from './UncontrolledForm.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Input } from '@/components';
import { addData, selectCountries } from '../dataSlice';
import { schema } from '@/lib/validate';

interface UncontrolledFormProps {
  close: () => void;
}

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ close }) => {
  const nameField = useRef<HTMLInputElement | null>(null);
  const ageField = useRef<HTMLInputElement | null>(null);
  const emailField = useRef<HTMLInputElement | null>(null);
  const passwordField = useRef<HTMLInputElement | null>(null);
  const confirmPasswordField = useRef<HTMLInputElement | null>(null);
  const manField = useRef<HTMLInputElement | null>(null);
  const femaleField = useRef<HTMLInputElement | null>(null);
  const acceptField = useRef<HTMLInputElement | null>(null);
  const fileField = useRef<HTMLInputElement | null>(null);
  const countryField = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username: nameField.current?.value || '',
      age: ageField.current?.value || '',
      email: emailField.current?.value || '',
      password: passwordField.current?.value || '',
      confirmPassword: confirmPasswordField.current?.value || '',
      gender: manField.current?.checked
        ? 'Male'
        : femaleField.current?.checked
          ? 'Female'
          : '',
      accept: acceptField.current?.checked || '',
      file: fileField.current?.files?.[0] || '',
      country: countryField.current?.value || '',
    };

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setError({});
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            addData({
              ...formData,
              file: reader.result as string,
            })
          );
          close();
        };
        if (fileField.current?.files?.[0]) {
          reader.readAsDataURL(fileField.current.files[0]);
        }
      })
      .catch((err: ValidationError) => {
        const error: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            error[e.path] = e.message;
          }
        });
        setError(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={cls.form}>
      <label className={cls.label} htmlFor="name">
        Name*
      </label>
      <Input
        placeholder="Name"
        ref={nameField}
        id="name"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{error.username}</p>
      <label className={cls.label} htmlFor="age">
        Age*
      </label>
      <Input
        placeholder="Age"
        type="number"
        min={0}
        ref={ageField}
        id="age"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{error.age}</p>
      <label className={cls.label} htmlFor="email">
        Email*
      </label>
      <Input
        placeholder="Email"
        type="text"
        ref={emailField}
        id="email"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{error.email}</p>
      <label className={cls.label} htmlFor="password">
        Password*
      </label>
      <Input
        placeholder="Password"
        type="password"
        ref={passwordField}
        id="password"
        className={cls.input}
      />
      <p className={[cls.error, cls.password].join(' ')}>
        &nbsp;{error.password}
      </p>
      <label className={cls.label} htmlFor="confirmPassword">
        Confirm Password*
      </label>
      <Input
        placeholder="Confirm Password"
        type="password"
        ref={confirmPasswordField}
        id="confirmPassword"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{error.confirmPassword}</p>
      <label className={cls.label}>Gender*</label>
      <div>
        <input
          className={cls['custom-radio']}
          name="gender"
          type="radio"
          id="male"
          value="male"
          ref={manField}
        />
        <label htmlFor="male">Male</label>
      </div>
      <div className={cls.input}>
        <input
          className={cls['custom-radio']}
          name="gender"
          type="radio"
          id="female"
          value="female"
          ref={femaleField}
        />
        <label htmlFor="female">Female</label>
      </div>
      <p className={cls.error}>&nbsp;{error.gender}</p>
      <input
        type="checkbox"
        className={cls['custom-checkbox']}
        id="accept"
        name="accept"
        value="yes"
        ref={acceptField}
      />
      <label
        htmlFor="accept"
        className={[cls.labelCheckbox, cls.input].join(' ')}
      >
        I accept Terms and Conditions agreement*
      </label>
      <p className={cls.error}>&nbsp;{error.accept}</p>
      <label className={cls.label} htmlFor="file">
        File*
      </label>
      <Input
        type="file"
        ref={fileField}
        id="file"
        className={cls.input}
        accept=".jpeg, .png"
      />
      <p className={cls.error}>&nbsp;{error.file}</p>
      <label className={cls.label} htmlFor="country">
        Country*
      </label>
      <Input
        ref={countryField}
        list="countryList"
        placeholder="Country"
        id="country"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{error.country}</p>
      <datalist id="countryList">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <Button className={cls.button}>Submit</Button>
    </form>
  );
};
