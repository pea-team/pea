
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const validate = (values:any) => {
  let errors = {} as any;
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'p.';
  }
  return errors;
};

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={validate}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({ errors, touched }) => (
        <Form>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="john@acme.com" type="text" />
          <div className="field-error">
            <ErrorMessage name="email" />
          </div>
          <label htmlFor="password">Password</label>
          <Field name="password" type="text" />
            <ErrorMessage name="password" />
          <button type="submit">Sign In</button>
        </Form>
      )}
    />
  </div>
);

export default SignIn;
