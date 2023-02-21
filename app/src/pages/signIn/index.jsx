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
  LinkButton,
  Wrapper,
  FormCtrl,
} from "./styles";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signInValidationSchema } from "../../utils/validatinSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Login, reset } from "../../features/auth/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const Index = () => {
  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const [view, setView] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const { showPassword } = view;

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
      dispatch(Login(values));
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
        <h2>Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signInValidationSchema}
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
              </FormCtrl>
              <LinkButton>
                Don't have an account? <Link to="/auth/signup">Sign up</Link>
              </LinkButton>
              <Button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </FormContainer>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

export default Index;
