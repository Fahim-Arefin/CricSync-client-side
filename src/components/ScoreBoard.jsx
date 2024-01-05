import { useSelector } from "react-redux";

function ballsToOvers(ballCount) {
  const overs = Math.floor(ballCount / 6);
  const balls = ballCount % 6;
  return `${overs}.${balls}`;
}

const ScoreBoard = ({ match }) => {
  const { team1, team2, overs, stadium, start } = match;
  const { team1Total, team2Total, team1Wicket, team2Wicket } = useSelector(
    (state) => {
      return state.matches;
    }
  );

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{stadium}</h2>
        <p className="text-sm text-gray-600">
          Start Time: {new Date(start).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">Overs: {overs}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {team1 && (
          <div className="col-span-1 bg-white p-4 rounded-md shadow-md w-full lg:w-auto">
            <div className="flex space-x-6 items-center">
              <h3 className="text-lg font-bold mb-4">{team1.name}</h3>
              <h3 className="font-bold mb-4 text-sm text-gray-500">
                <span>(</span>
                {team1Total}/{team1Wicket}
                <span>)</span>
              </h3>
              <h3 className="font-bold mb-4 text-sm text-gray-500">
                <span>(</span>
                {ballsToOvers(team1.ballPlayed)} overs
                <span>)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full overflow-x-auto">
                <thead>
                  <tr className="">
                    <th className="font-semibold text-left">Player</th>
                    <th className="font-semibold">Run</th>
                    <th className="font-semibold">Ball</th>
                    <th className="font-semibold">4S</th>
                    <th className="font-semibold">6S</th>
                    <th className="font-semibold">S/R</th>
                  </tr>
                </thead>
                <tbody>
                  {team1.players.map((playerScore) => (
                    <tr key={playerScore._id}>
                      <td className="text-left">
                        <span>{playerScore?.name} </span>
                        <span className="text-red-500 text-xs">
                          {playerScore?.isOut && "(Out)"}
                        </span>
                      </td>
                      <td className="text-center">{playerScore?.runs}</td>
                      <td className="text-center">{playerScore?.balls}</td>
                      <td className="text-center">{playerScore?.fours}</td>
                      <td className="text-center">{playerScore?.sixes}</td>
                      <td className="text-center">
                        {playerScore?.balls === 0
                          ? 0
                          : (
                              (playerScore?.runs / playerScore?.balls) *
                              100
                            ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {team2 && (
          <div className="col-span-1 bg-white p-4 rounded-md shadow-md w-full lg:w-auto">
            <div className="flex space-x-6 items-center">
              <h3 className="text-lg font-bold mb-4">{team2.name}</h3>
              <h3 className="font-bold mb-4 text-sm text-gray-500">
                <span>(</span>
                {team2Total}/{team2Wicket}
                <span>)</span>
              </h3>
              <h3 className="font-bold mb-4 text-sm text-gray-500">
                <span>(</span>
                {ballsToOvers(team2.ballPlayed)} overs
                <span>)</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-semibold text-left">Player</th>
                    <th className="font-semibold">Run</th>
                    <th className="font-semibold">Ball</th>
                    <th className="font-semibold">4S</th>
                    <th className="font-semibold">6S</th>
                    <th className="font-semibold">S/R</th>
                  </tr>
                </thead>
                <tbody>
                  {team2.players.map((playerScore) => (
                    <tr key={playerScore._id}>
                      <td className="text-left">
                        <span>{playerScore?.name} </span>
                        <span className="text-red-500 text-xs">
                          {playerScore?.isOut && "(Out)"}
                        </span>
                      </td>
                      <td className="text-center">{playerScore?.runs}</td>
                      <td className="text-center">{playerScore?.balls}</td>
                      <td className="text-center">{playerScore?.fours}</td>
                      <td className="text-center">{playerScore?.sixes}</td>
                      <td className="text-center">
                        {playerScore?.balls === 0
                          ? 0
                          : (
                              (playerScore?.runs / playerScore?.balls) *
                              100
                            ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard;
