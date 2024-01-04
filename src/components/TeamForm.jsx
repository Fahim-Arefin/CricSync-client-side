// TeamForm.js
import { useState } from "react";
import { BsUpload } from "react-icons/bs";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createTeam } from "../store";
import { useSelector } from "react-redux";
import SpinnerWithBlur from "../components/SpinnerWithBlur";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";

const TeamForm = () => {
  const { user, successToast, errorToast } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => {
    return state.teams;
  });

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
    dispatch(createTeam(team))
      .unwrap()
      .then(() => {
        successToast("Team Created Successfull!", 2000);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        errorToast(error, 2000);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <Helmet>
        <title>CricSync | Create Team</title>
      </Helmet>
      {isLoading && <SpinnerWithBlur />}
      <h1 className="max-w-3xl mx-auto text-4xl text-[#f87060] font-bold mb-12">
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
          <Button
            primary
            className="px-4 py-2 rounded-md flex space-x-2 items-center font-bold"
          >
            <BsUpload />
            <span>{isLoading ? "Submitting.." : "Submit"}</span>
          </Button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          display: "inline-block",
          width: "auto",
        }}
      />
    </div>
  );
};

export default TeamForm;
