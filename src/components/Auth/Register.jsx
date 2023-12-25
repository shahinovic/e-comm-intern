import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter your first name."),
  lastName: Yup.string().required("Please enter your last name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email address."),
  password: Yup.string().required("Please enter a password."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match.")
    .required("Please confirm your password."),
});
function Register({ haveAccount, setHaveAccount, setLogedIn }) {
  const addUser = (user) => {
    axios
      .post("https://dummyjson.com/users/add", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("User added successfully:", response.data.email);
        localStorage.setItem("authToken", response.data.email);
        setLogedIn(true);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Perform form submission logic here
    console.log("Form submitted successfully", values);
    const { firstName, lastName, email, password, confirmPassword } = values;

    addUser({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    setSubmitting(false);
  };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="firstName">
            {({ field, meta }) => (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  label="First name"
                  id="form1"
                  type="text"
                  {...field}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </>
            )}
          </Field>

          <Field name="lastName">
            {({ field, meta }) => (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last name"
                  id="form2"
                  type="text"
                  {...field}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </>
            )}
          </Field>

          <Field name="email">
            {({ field, meta }) => (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form3"
                  type="email"
                  {...field}
                />
                <ErrorMessage
                  name="email"
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

          <Field name="confirmPassword">
            {({ field, meta }) => (
              <>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirm Password"
                  id="form5"
                  type="password"
                  {...field}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </>
            )}
          </Field>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>

      <div className="text-center">
        <p>
          Not a member?{" "}
          <Button variant="link" onClick={() => setHaveAccount(!haveAccount)}>
            Login
          </Button>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Register;
