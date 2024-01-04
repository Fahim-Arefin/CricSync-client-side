import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTeam } from "../store";
import { fetchAllMatch } from "../store";
import MatchList from "../components/MatchList";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTeam());
    dispatch(fetchAllMatch());
  }, [dispatch]);

  //accessing state
  const { teams, matches } = useSelector((state) => {
    return {
      teams: state.teams.data,
      matches: state.matches.data,
    };
  });

  console.log("teams", teams);
  console.log("matches", matches);

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
      <div>
        <Button to="/match/new">
          <h2 className="cursor-pointer underline">Create Match Schedule</h2>
        </Button>
      </div>
      <div>
        <MatchList matches={matches} />
      </div>
    </div>
  );
}

export default Home;
