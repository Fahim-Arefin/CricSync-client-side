import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbLayoutGridAdd } from "react-icons/tb";

import { createMatch, fetchAllTeam } from "../store";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SpinnerWithBlur from "./SpinnerWithBlur";
import { Helmet } from "react-helmet-async";

const CreateMatchForm = () => {
  const { user, successToast, errorToast } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: user.email,
    team1: "",
    team2: "",
    overs: "",
    stadium: "",
    start: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTeam());
  }, [dispatch]);

  const { teams, matches, error, isLoading } = useSelector((state) => {
    return {
      teams: state.teams.data,
      matches: state.matches.data,
      error: state.matches.error,
      isLoading: state.matches.isLoading,
    };
  });

  console.log(teams);
  console.log("matches", matches);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log("Form data submitted:", formData);

    const t1 = teams.find((team) => team._id === formData.team1);
    const t2 = teams.find((team) => team._id === formData.team2);

    const data = {
      author: formData.author,
      team1: t1,
      team2: t2,
      overs: formData.overs,
      stadium: formData.stadium,
      start: formData.start,
    };

    console.log(data);
    dispatch(createMatch(data))
      .unwrap()
      .then(() => {
        successToast("Match Created Successfull!", 2000);
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
      {isLoading && <SpinnerWithBlur />}
      <Helmet>
        <title>CricSync | Create Match</title>
      </Helmet>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 rounded ">
        <h2 className="text-4xl font-bold text-[#f87060] mb-12">
          Create Match
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="team1"
          >
            Team 1:
          </label>
          <select
            id="team1"
            name="team1"
            className="input-field"
            value={formData.team1}
            onChange={handleChange}
            required
          >
            <option value="">Select Team 1</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="team2"
          >
            Team 2:
          </label>
          <select
            required
            id="team2"
            name="team2"
            className="input-field"
            value={formData.team2}
            onChange={handleChange}
          >
            <option value="">Select Team 2</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="overs"
          >
            Overs:
          </label>
          <input
            required
            type="number"
            min={0}
            id="overs"
            name="overs"
            className="input-field"
            value={formData.overs}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stadium"
          >
            Stadium:
          </label>
          <input
            required
            type="text"
            id="stadium"
            name="stadium"
            className="input-field"
            value={formData.stadium}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="start"
          >
            Start Date:
          </label>
          <input
            required
            type="datetime-local"
            id="start"
            name="start"
            className="input-field"
            value={formData.start}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            primary
            className="px-4 py-2 rounded-md flex space-x-2 items-center font-bold"
          >
            <TbLayoutGridAdd />
            <span>{isLoading ? "Creating..." : "Create Match"}</span>
          </Button>
        </div>
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
      </form>
    </div>
  );
};

export default CreateMatchForm;
