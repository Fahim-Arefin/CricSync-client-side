// TeamForm.js
import { useState } from "react";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const TeamForm = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [team, setTeam] = useState({
    author: user?.email,
    name: "",
    players: Array(11).fill({ name: "", runs: 0, wickets: 0 }),
  });

  const handleTeamChange = (field, value) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      [field]: value,
    }));
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedTeam = { ...team };
    updatedTeam.players[index] = {
      ...team.players[index],
      [field]: value,
    };

    setTeam(updatedTeam);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(team);

    try {
      const response = await axiosPublic.post("/teams/new", team);
      console.log("Team created successfully:", response.data);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="max-w-3xl mx-auto text-2xl text-[#f87060] font-bold mb-12">
        Create your team
      </h1>
      <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="teamName"
          >
            Team Name:
          </label>
          <input
            required
            type="text"
            id="teamName"
            className="input-field"
            value={team.name}
            onChange={(e) => handleTeamChange("name", e.target.value)}
          />
        </div>

        {team.players.map((player, index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`playerName${index}`}
            >
              Player {index + 1} Name:
            </label>
            <input
              required
              type="text"
              id={`playerName${index}`}
              className="input-field"
              value={player.name}
              onChange={(e) =>
                handlePlayerChange(index, "name", e.target.value)
              }
            />
          </div>
        ))}

        <div className="flex items-center justify-between">
          <Button primary className="px-4 py-2 rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
