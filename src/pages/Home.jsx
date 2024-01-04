import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTeam } from "../store/async thunk/fetchAllTeam";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTeam());
  }, [dispatch]);

  //accessing state
  const { data } = useSelector((state) => {
    return state.teams;
  });

  console.log(data);

  return (
    <div className="">
      <Helmet>
        <title>CricSync | Home</title>
      </Helmet>
      <h1>Cricket Scoreboard</h1>
      <div>
        <Button to="/team/new">
          <h2 className="cursor-pointer underline">Create Team</h2>
        </Button>
      </div>
    </div>
  );
}

export default Home;
