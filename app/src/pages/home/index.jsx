import CreateGoal from "../../components/createGoal";
import { Container, Count, Header } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetGoals } from "../../features/goals/goalSlice";

const Index = () => {
  const { user } = useSelector((state) => state.auth);
  const { goals } = useSelector((state) => state.goal);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGoals());
  }, [dispatch]);
  return (
    <Container>
      <Header>
        <div className="greeting">
          Welcome {`${user?.firstName} ${user?.lastName}`}
        </div>
        <div className="title">DashBoard</div>
      </Header>
      <CreateGoal />
      <Count>goals: {goals?.length}</Count>
    </Container>
  );
};

export default Index;
