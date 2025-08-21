import { FC } from 'react';
import cls from './controlledForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store';
import { schema } from '@/lib/validate';
import { Button, Input } from '@/components';
import { addData, selectCountries } from '../dataSlice';

interface ControlledForm {
  close: () => void;
}

export const ControlledForm: FC<ControlledForm> = ({ close }) => {
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);

  const onSubmit = (data: {
    accept?: boolean | undefined;
    username: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    file: File;
    country: string;
  }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        addData({
          ...data,
          age: String(data.age),
          accept: data.accept ? 'true' : 'false',
          file: reader.result as string,
        })
      );
      close();
    };
    if (data.file) {
      reader.readAsDataURL(data.file);
    }
  };

  const handleButtonClick = async () => {
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <h2 className={cls.title}>Controlled Form</h2>
      <label className={cls.label} htmlFor="name">
        Name*
      </label>
      <Input
        placeholder="Name"
        {...register('username')}
        id="name"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{errors.username?.message}</p>
      <label className={cls.label} htmlFor="age">
        Age*
      </label>
      <Input
        placeholder="Age"
        type="number"
        min={0}
        {...register('age')}
        id="age"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{errors.age?.message}</p>
      <label className={cls.label} htmlFor="email">
        Email*
      </label>
      <Input
        placeholder="Email"
        type="email"
        {...register('email')}
        id="email"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{errors.email?.message}</p>
      <label className={cls.label} htmlFor="password">
        Password*
      </label>
      <Input
        placeholder="Password"
        type="password"
        {...register('password')}
        id="password"
        className={cls.input}
      />
      <p className={[cls.error, cls.password].join(' ')}>
        &nbsp;{errors.password?.message}
      </p>
      <label className={cls.label} htmlFor="confirmPassword">
        Confirm Password*
      </label>
      <Input
        placeholder="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        id="confirmPassword"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{errors.confirmPassword?.message}</p>
      <label className={cls.label}>Gender*</label>
      <div>
        <input
          className={cls['custom-radio']}
          type="radio"
          id="male"
          value="Male"
          {...register('gender')}
        />
        <label htmlFor="male">Male</label>
      </div>
      <div className={cls.input}>
        <input
          className={cls['custom-radio']}
          type="radio"
          id="female"
          value="Female"
          {...register('gender')}
        />
        <label htmlFor="female">Female</label>
      </div>
      <p className={cls.error}>&nbsp;{errors.gender?.message}</p>
      <input
        type="checkbox"
        className={cls['custom-checkbox']}
        id="accept"
        value="true"
        {...register('accept')}
      />
      <label
        htmlFor="accept"
        className={[cls.labelCheckbox, cls.input].join(' ')}
      >
        I accept Terms and Conditions agreement*
      </label>
      <p className={cls.error}>&nbsp;{errors.accept?.message}</p>
      <label className={cls.label} htmlFor="file">
        File*
      </label>
      <Controller
        control={control}
        name="file"
        render={({ field }) => (
          <Input
            type="file"
            id="file"
            className={cls.input}
            accept=".jpeg, .png"
            onChange={(e) => field.onChange(e.target.files?.[0])}
          />
        )}
      />
      <p className={cls.error}>&nbsp;{errors.file?.message}</p>
      <label className={cls.label} htmlFor="country">
        Country*
      </label>
      <Input
        {...register('country')}
        list="countryList"
        placeholder="Country"
        id="country"
        className={cls.input}
      />
      <p className={cls.error}>&nbsp;{errors.country?.message}</p>
      <datalist id="countryList">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <Button
        type="button"
        className={cls.button}
        disabled={!isValid}
        onClick={handleButtonClick}
      >
        Submit
      </Button>
    </form>
  );
};
