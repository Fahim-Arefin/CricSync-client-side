import { useParams } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAMatch, totalSocresAndWicket } from "../store";
import ManageScore from "../components/ManageScore";
import { Helmet } from "react-helmet-async";

function MatchDetails() {
  const { id } = useParams();
  const { selectedMatch: match, error } = useSelector((state) => {
    return state.matches;
  });

  console.log(match);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAMatch(id));
  }, [dispatch, id]);

  useEffect(() => {
    const team1TotalScore = match?.team1?.players?.reduce(
      (sum, curr) => ({ runs: curr.runs + sum.runs }),
      { runs: 0 }
    )?.runs;

    const team2TotalScore = match?.team2?.players?.reduce(
      (sum, curr) => ({ runs: curr.runs + sum.runs }),
      { runs: 0 }
    )?.runs;

    const team1TotalWicket = match?.team1?.players?.reduce((sum, player) => {
      if (player.isOut) {
        return sum + 1;
      }
      return sum;
    }, 0);
    const team2TotalWicket = match?.team2?.players?.reduce((sum, player) => {
      if (player.isOut) {
        return sum + 1;
      }
      return sum;
    }, 0);
    dispatch(
      totalSocresAndWicket({
        team1Total: team1TotalScore,
        team2Total: team2TotalScore,
        team1Wicket: team1TotalWicket,
        team2Wicket: team2TotalWicket,
      })
    );
  }, [dispatch, match]);

  return (
    <div>
      <Helmet>
        <title>CricSync | ScoreBoard</title>
      </Helmet>
      {error || <div>{match?.name}</div>}
      <ScoreBoard match={match} />
      <ManageScore match={match} />
    </div>
  );
}

export default MatchDetails;
