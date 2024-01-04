// MatchList.js

import Button from "./Button";
import { TbListDetails } from "react-icons/tb";

const MatchList = ({ matches }) => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-bold text-[#f87060] mb-8">
        Upcoming Matches
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {matches.map((match) => (
          <div
            key={match._id}
            className="bg-white px-12 py-8 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="">
                <p className="text-lg font-bold ">{match.stadium}</p>
                <p className="text-gray-600 text-sm">
                  {new Date(match.start).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  {", "}
                  {new Date(match.start).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
              <p className="text-gray-700 mb-1 text-sm">Overs: {match.overs}</p>
            </div>
            <div className="flex justify-between items-center mb-1">
              <div>
                <p className="text-blue-500 font-semibold text-xl">
                  {match.team1.name}
                </p>
                <p className="text-gray-700 text-center">
                  {match.team1Score
                    ? `${match.team1Score.runs}/${match.team1Score.wickets}`
                    : "0/0"}
                </p>
              </div>
              <p className="text-gray-800 text-xl">vs</p>
              <div>
                <p className="text-red-500 font-semibold text-xl">
                  {match.team2.name}
                </p>
                <p className="text-gray-700 text-center">
                  {match.team2Score
                    ? `${match.team2Score.runs}/${match.team2Score.wickets}`
                    : "0/0"}
                </p>
              </div>
            </div>
            <div className="justify-between items-center">
              <Button
                primary
                className="mt-4 flex space-x-2 justify-center items-center px-3 py-1 rounded-md w-full"
              >
                <TbListDetails />
                <span>Details</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
