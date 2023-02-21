import axios from "axios";

const API_URL = "/api/goals/";

//create goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(`${API_URL}`, goalData, config);

  return data;
};

//get all
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`${API_URL}`, config);

  return data;
};

//update by id
const updateGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { id: goalData.id },
  };
  const { data } = await axios.put(`${API_URL}`, goalData.goal, config);

  return data;
};

//delete by id
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { id },
  };
  const { data } = await axios.delete(`${API_URL}`, config);

  return data;
};

const goalService = { createGoal, getGoals, updateGoal, deleteGoal };

export default goalService;
