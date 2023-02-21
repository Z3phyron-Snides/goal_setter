import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import {
  Container,
  FormContainer,
  InputContainer,
  InputLabel,
  Input,
  Error,
  Button,
  Wrapper,
  FormCtrl,
  LinkButton,
} from "./styles";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signUpValidationSchema } from "../../utils/validatinSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Register, reset } from "../../features/auth/authSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Index = () => {
  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const [view, setView] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const { showConfirmPassword, showPassword } = view;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewToggle = (field) => {
    setView({
      ...view,
      [`show${field}`]: !view[`show${field}`],
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch(Register(values));
      setSubmitting(false);
    }, 400);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, message, isSuccess, navigate, dispatch]);

  return (
    <Container>
      <Wrapper>
        <h2>Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <FormContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FormCtrl>
                <InputContainer>
                  <InputLabel htmlFor="firstName">First name</InputLabel>
                  <Field type="text" name="firstName" as={Input} />
                  <Error name="firstName" component="small" />
                </InputContainer>
                <InputContainer>
                  <InputLabel htmlFor="lastName">Last name</InputLabel>
                  <Field type="text" name="lastName" as={Input} />
                  <Error name="lastName" component="small" />
                </InputContainer>
              </FormCtrl>
              <FormCtrl>
                <InputContainer>
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Field type="email" name="email" as={Input} />
                  <Error name="email" component="small" />
                </InputContainer>
              </FormCtrl>

              <FormCtrl>
                <InputContainer>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    as={Input}
                  />
                  <Error name="password" component="small" />
                  <span
                    className="toggle"
                    onClick={() => handleViewToggle("Password")}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </InputContainer>
                <InputContainer>
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <Field type="password" name="confirmPassword" as={Input} />
                  <Error name="confirmPassword" component="small" />
                  <span
                    className="toggle"
                    onClick={() => handleViewToggle("ConfirmPassword")}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </InputContainer>
              </FormCtrl>
              <LinkButton>
                Already got an account? <Link to="/auth/signin">Sign in</Link>
              </LinkButton>
              <Button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </FormContainer>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Index;
