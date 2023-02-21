import React, { useEffect } from "react";
import { Formik } from "formik";
import { Button, Error, FormWrapper, Input, Label } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { CreateGoal, reset } from "../../features/goals/goalSlice";
import { toast } from "react-hot-toast";

const Index = ({ onSubmit }) => {
  const initialValues = {
    goal: "",
  };

  const { isSuccess, isError, message } = useSelector((state) => state.goal);

  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};

    if (!values.goal) {
      errors.goal = "Required";
    }

    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(CreateGoal(values));

    resetForm();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, isError, message]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => (
        <FormWrapper>
          <Label htmlFor="goal">Name</Label>
          <Input
            type="text"
            id="goal"
            name="goal"
            placeholder="Enter goal name"
          />
          <Error name="goal" component={"small"} />

          <Button type="submit" disabled={!formik.isValid}>
            Create Goal
          </Button>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Index;
