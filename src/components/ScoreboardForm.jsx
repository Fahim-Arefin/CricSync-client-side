// ScoreboardForm.js
import { useState } from "react";
import axios from "axios";

const ScoreboardForm = () => {
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [overs, setOvers] = useState("");
  const [playerNames, setPlayerNames] = useState(Array(22).fill(""));

  const handlePlayerChange = (index, value) => {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[index] = value;
    setPlayerNames(updatedPlayerNames);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/scoreboard", {
        team1: {
          name: team1Name,
          players: playerNames.slice(0, 11),
        },
        team2: {
          name: team2Name,
          players: playerNames.slice(11),
        },
        overs: parseInt(overs),
      });

      console.log("Scoreboard created successfully:", response.data);
    } catch (error) {
      console.error("Error creating scoreboard:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-3xl mx-auto grid grid-cols-2 gap-4"
      >
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="team1Name"
            >
              Team 1 Name:
            </label>
            <input
              type="text"
              id="team1Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="overs"
            >
              Overs (Team 1):
            </label>
            <input
              type="number"
              id="overs"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
            />
          </div>

          {[...Array(11)].map((_, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`playerName${index}`}
              >
                Player {index + 1} Name (Team 1):
              </label>
              <input
                type="text"
                id={`playerName${index}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={playerNames[index]}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="team2Name"
            >
              Team 2 Name:
            </label>
            <input
              type="text"
              id="team2Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="oversTeam2"
            >
              Overs (Team 2):
            </label>
            <input
              type="number"
              id="oversTeam2"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
            />
          </div>

          {[...Array(11)].map((_, index) => (
            <div key={index} className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`playerNameTeam2${index}`}
              >
                Player {index + 1} Name (Team 2):
              </label>
              <input
                type="text"
                id={`playerNameTeam2${index}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={playerNames[index + 11]}
                onChange={(e) => handlePlayerChange(index + 11, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="col-span-2 flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScoreboardForm;
