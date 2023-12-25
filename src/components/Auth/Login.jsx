import { MDBContainer, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import axios from "axios";
import { Button } from "react-bootstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),

  password: Yup.string().required("Please enter a password."),
});

function Login({ haveAccount, setHaveAccount, setLogedIn }) {
  const [authToken, setAuthToken] = useState(null);

  const log = async (username, password) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      const authToken = response.data.token;
      console.log("🚀 ~ file: Login.jsx:27 ~ log ~ authToken:", authToken);
      setAuthToken(authToken);
      localStorage.setItem("authToken", authToken);

      setLogedIn(true);
    } catch (error) {
      console.error("خطأ في عملية تسجيل الدخول:", error);
    }
  };

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Perform form submission logic here
    console.log("Form submitted successfully", values);

    log(values.username, values.password);

    // You can reset the form or perform other actions if needed
    setSubmitting(false);
  };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-100">
          <Field name="username">
            {({ field, meta }) => (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  required
                  label="username"
                  id="form3"
                  type="text"
                  {...field}
                />
                <ErrorMessage
                  name="username_required"
                  component="div"
                  className="text-danger"
                />
              </>
            )}
          </Field>
          <Field name="password">
            {({ field, meta }) => (
              <>
                <MDBInput
                  required
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  {...field}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </>
            )}
          </Field>

          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>

      <div className="text-center">
        <p>
          Not a member?{" "}
          <Button variant="link" onClick={() => setHaveAccount(!haveAccount)}>
            Register
          </Button>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Login;
