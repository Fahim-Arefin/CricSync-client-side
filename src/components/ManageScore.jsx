// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrPowerReset } from "react-icons/gr";
import useAuth from "../hooks/useAuth";

import {
  changeBatsman,
  changeBatting,
  changeRun,
  addRunPerBall,
  reset,
  outPlayer,
} from "../store";
import Button from "./Button";
import { MdSportsCricket } from "react-icons/md";
import { ToastContainer } from "react-toastify";

function ManageScore({ match }) {
  const { successToast, errorToast } = useAuth();
  const { _id, team1, team2 } = match;
  const dispatch = useDispatch();
  const {
    battingTeam,
    batsman,
    runPerBall,
    isLoading,
    error,
    team1OverFinished,
    team2OverFinished,
  } = useSelector((state) => {
    return state.matches;
  });

  const handleTeamChange = (e) => {
    dispatch(changeBatting(e.target.value));
  };

  const handleBatsmanChange = (e) => {
    dispatch(changeBatsman(e.target.value));
  };

  const handleRunChange = (e) => {
    dispatch(changeRun(e.target.value));
  };

  const handleBoundary = (run) => {
    dispatch(changeRun(run));
  };

  const handleAddRun = async (e) => {
    e.preventDefault();
    const data = {
      battingTeam,
      batsman,
      runPerBall,
    };
    dispatch(addRunPerBall({ _id, ...data }))
      .unwrap()
      .then((data) => {
        if (data.msg) {
          if (team1OverFinished) {
            errorToast(`${battingTeam} Played All the Over or All out`, 2000);
          } else {
            errorToast(`${battingTeam} Played All the Over or All out`, 2000);
          }
        }
        if (data.invalid) {
          errorToast(`Player is already out`, 2000);
        }

        console.log("Inside dispatch then", data);
      })
      .catch(() => {
        errorToast(error, 2000);
      });
  };

  const handleOut = () => {
    const data = {
      battingTeam,
      batsman,
    };
    dispatch(outPlayer({ _id, ...data }))
      .unwrap()
      .then((data) => {
        if (data.msg) {
          if (data.msg === "finished") {
            errorToast("Over finished or All out", 2000);
          } else {
            errorToast("Player is Already out", 2000);
          }
        } else {
          successToast("Player is Out", 2000);
        }
      })
      .catch(() => {
        errorToast(error, 2000);
      });
  };

  const handleReset = () => {
    dispatch(reset(_id))
      .unwrap()
      .then(() => {
        successToast("Match Reset Successfull!", 2000);
      })
      .catch(() => {
        errorToast(error, 2000);
      });
  };

  console.log(battingTeam);
  console.log(batsman);
  console.log(runPerBall);

  return (
    <div className="mb-6 text-center text-sm bg-gray-100 p-6 my-12">
      <div className="mb-6 text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Manage ScoreBoard</h1>
        <select
          value={battingTeam}
          onChange={handleTeamChange}
          className="input-field w-fit"
          required
        >
          <option value="">Select Batting Team </option>
          <option value={team1?.name}>{team1?.name}</option>
          <option value={team2?.name}>{team2?.name}</option>
        </select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <form onSubmit={handleAddRun} className="col-span-2 ">
          <div className="space-y-2">
            {/* select batsman */}
            <select
              value={batsman}
              onChange={handleBatsmanChange}
              className="input-field w-[50%]"
              required
            >
              <option value="">Select BatsMan</option>
              {battingTeam === team1?.name ? (
                <>
                  {team1?.players.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {team2?.players.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            {/* add run */}
            <div>
              <input
                value={runPerBall}
                onChange={handleRunChange}
                type="number"
                min={0}
                max={6}
                className="input-field w-[50%]"
                placeholder="Add Run"
              />
            </div>
            {/* boudaries */}
            <div className="flex justify-center space-x-6">
              <div
                onClick={() => handleBoundary(6)}
                className="cursor-pointer bg-cyan-500 w-24 px-4 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:border-blue-300"
              >
                Six
              </div>
              <div
                onClick={() => handleBoundary(4)}
                className="cursor-pointer bg-green-500 w-24 px-4 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:border-blue-300"
              >
                Four
              </div>
              <Button
                type="button"
                disabled={
                  team1OverFinished === true && team2OverFinished === true
                }
                onClick={handleOut}
                className="disabled:cursor-not-allowed cursor-pointer bg-red-500 w-24 px-4 py-1 rounded-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:border-blue-300"
              >
                Out
              </Button>
            </div>
            <Button
              disabled={
                team1OverFinished === true && team2OverFinished === true
              }
              primary
              className="flex justify-center items-center mx-auto space-x-1 text-center px-4 py-1 w-52 rounded-md"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <MdSportsCricket />
              )}
              {team1OverFinished === true && team2OverFinished === true ? (
                <span>Match Finished</span>
              ) : (
                <span>{isLoading ? "Adding..." : "Add Run"}</span>
              )}
            </Button>
            <Button
              disabled={
                team1OverFinished === true && team2OverFinished === true
              }
              onClick={handleReset}
              type="button"
              secondary
              outline
              className="flex justify-center items-center mx-auto space-x-1 text-center px-4 py-1 w-52 rounded-md"
            >
              <GrPowerReset className="mt-[2px]" />
              <span>Reset</span>
            </Button>
          </div>
        </form>
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
    </div>
  );
}

export default ManageScore;
