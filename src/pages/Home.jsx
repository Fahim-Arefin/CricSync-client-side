import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTeam, fetchMyMatch } from "../store";
// import { fetchAllMatch } from "../store";
import MatchList from "../components/MatchList";
import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTeam());
    // dispatch(fetchAllMatch());
    dispatch(fetchMyMatch(user?.email));
  }, [dispatch, user?.email]);

  //accessing state
  const { teams, matches } = useSelector((state) => {
    return {
      teams: state.teams.data,
      matches: state.matches.myData,
    };
  });

  console.log("teams", teams);
  console.log("matches", matches);

  return (
    <div className="">
      <Helmet>
        <title>CricSync | Home</title>
      </Helmet>
      <div className="bg-gray-100 p-4 md:p-12 space-y-6 rounded-md">
        <h1 className="text-center text-2xl font-bold">Cricket Scoreboard</h1>
        <div className="flex flex-col w-full md:flex-row items-center gap-4 justify-center md:space-x-2">
          <div className="shadow-md">
            <Button to="/team/new">
              <div className=" bg-white rounded-md w-full md:w-[404px] h-[240px] md:h-[270px] p-6 space-y-2 text-center">
                <div
                  className="bg-[#FA782F66] w-full md:w-[360px] h-[140px] md:h-[180px] flex justify-center
             items-center rounded-lg cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    viewBox="0 0 53 53"
                    fill="none"
                  >
                    <g>
                      <path
                        d="M37.5417 17.6667C41.4744 17.6608 45.3193 18.8297 48.5833 21.0233V8.83333C48.5833 6.49059 47.6527 4.24379 45.9961 2.58722C44.3395 0.930652 42.0927 0 39.75 0L8.83333 0C6.49059 0 4.24379 0.930652 2.58722 2.58722C0.930652 4.24379 0 6.49059 0 8.83333L0 39.75C0 42.0927 0.930652 44.3395 2.58722 45.9961C4.24379 47.6527 6.49059 48.5833 8.83333 48.5833H21.0233C19.0242 45.5913 17.8749 42.1126 17.698 38.5185C17.5211 34.9243 18.3234 31.3496 20.0192 28.1757C21.7149 25.0019 24.2405 22.3479 27.3266 20.4971C30.4126 18.6463 33.9432 17.668 37.5417 17.6667Z"
                        fill="white"
                      />
                      <path
                        d="M37.5416 22.0833C34.4842 22.0833 31.4955 22.99 28.9534 24.6885C26.4113 26.3871 24.43 28.8014 23.26 31.626C22.0899 34.4507 21.7838 37.5588 22.3803 40.5574C22.9767 43.5561 24.449 46.3105 26.6109 48.4724C28.7728 50.6343 31.5272 52.1065 34.5258 52.703C37.5244 53.2994 40.6326 52.9933 43.4572 51.8233C46.2819 50.6533 48.6961 48.672 50.3947 46.1299C52.0933 43.5878 52.9999 40.599 52.9999 37.5417C52.9953 33.4433 51.3651 29.5141 48.4671 26.6161C45.5691 23.7182 41.64 22.088 37.5416 22.0833ZM41.9583 39.75H39.7499V41.9583C39.7499 42.544 39.5173 43.1057 39.1031 43.5199C38.689 43.934 38.1273 44.1667 37.5416 44.1667C36.9559 44.1667 36.3942 43.934 35.9801 43.5199C35.5659 43.1057 35.3333 42.544 35.3333 41.9583V39.75H33.1249C32.5392 39.75 31.9775 39.5173 31.5634 39.1032C31.1493 38.6891 30.9166 38.1274 30.9166 37.5417C30.9166 36.956 31.1493 36.3943 31.5634 35.9801C31.9775 35.566 32.5392 35.3333 33.1249 35.3333H35.3333V33.125C35.3333 32.5393 35.5659 31.9776 35.9801 31.5635C36.3942 31.1493 36.9559 30.9167 37.5416 30.9167C38.1273 30.9167 38.689 31.1493 39.1031 31.5635C39.5173 31.9776 39.7499 32.5393 39.7499 33.125V35.3333H41.9583C42.5439 35.3333 43.1056 35.566 43.5198 35.9801C43.9339 36.3943 44.1666 36.956 44.1666 37.5417C44.1666 38.1274 43.9339 38.6891 43.5198 39.1032C43.1056 39.5173 42.5439 39.75 41.9583 39.75Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_101_14">
                        <rect width="53" height="53" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="text-[16px] font-semibold cursor-pointer hover:underline">
                  Create New Team
                </div>
              </div>
            </Button>
          </div>
          <div className="shadow-md">
            <Button to="/match/new">
              <div className=" bg-white rounded-md w-full md:w-[404px] h-[240px] md:h-[270px] p-6 space-y-2 text-center">
                <div
                  className="bg-[#FA782F66] w-full md:w-[360px] h-[140px] md:h-[180px] flex justify-center
             items-center rounded-lg cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    viewBox="0 0 53 53"
                    fill="none"
                  >
                    <g>
                      <path
                        d="M37.5417 17.6667C41.4744 17.6608 45.3193 18.8297 48.5833 21.0233V8.83333C48.5833 6.49059 47.6527 4.24379 45.9961 2.58722C44.3395 0.930652 42.0927 0 39.75 0L8.83333 0C6.49059 0 4.24379 0.930652 2.58722 2.58722C0.930652 4.24379 0 6.49059 0 8.83333L0 39.75C0 42.0927 0.930652 44.3395 2.58722 45.9961C4.24379 47.6527 6.49059 48.5833 8.83333 48.5833H21.0233C19.0242 45.5913 17.8749 42.1126 17.698 38.5185C17.5211 34.9243 18.3234 31.3496 20.0192 28.1757C21.7149 25.0019 24.2405 22.3479 27.3266 20.4971C30.4126 18.6463 33.9432 17.668 37.5417 17.6667Z"
                        fill="white"
                      />
                      <path
                        d="M37.5416 22.0833C34.4842 22.0833 31.4955 22.99 28.9534 24.6885C26.4113 26.3871 24.43 28.8014 23.26 31.626C22.0899 34.4507 21.7838 37.5588 22.3803 40.5574C22.9767 43.5561 24.449 46.3105 26.6109 48.4724C28.7728 50.6343 31.5272 52.1065 34.5258 52.703C37.5244 53.2994 40.6326 52.9933 43.4572 51.8233C46.2819 50.6533 48.6961 48.672 50.3947 46.1299C52.0933 43.5878 52.9999 40.599 52.9999 37.5417C52.9953 33.4433 51.3651 29.5141 48.4671 26.6161C45.5691 23.7182 41.64 22.088 37.5416 22.0833ZM41.9583 39.75H39.7499V41.9583C39.7499 42.544 39.5173 43.1057 39.1031 43.5199C38.689 43.934 38.1273 44.1667 37.5416 44.1667C36.9559 44.1667 36.3942 43.934 35.9801 43.5199C35.5659 43.1057 35.3333 42.544 35.3333 41.9583V39.75H33.1249C32.5392 39.75 31.9775 39.5173 31.5634 39.1032C31.1493 38.6891 30.9166 38.1274 30.9166 37.5417C30.9166 36.956 31.1493 36.3943 31.5634 35.9801C31.9775 35.566 32.5392 35.3333 33.1249 35.3333H35.3333V33.125C35.3333 32.5393 35.5659 31.9776 35.9801 31.5635C36.3942 31.1493 36.9559 30.9167 37.5416 30.9167C38.1273 30.9167 38.689 31.1493 39.1031 31.5635C39.5173 31.9776 39.7499 32.5393 39.7499 33.125V35.3333H41.9583C42.5439 35.3333 43.1056 35.566 43.5198 35.9801C43.9339 36.3943 44.1666 36.956 44.1666 37.5417C44.1666 38.1274 43.9339 38.6891 43.5198 39.1032C43.1056 39.5173 42.5439 39.75 41.9583 39.75Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_101_14">
                        <rect width="53" height="53" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="text-[16px] font-semibold cursor-pointer hover:underline">
                  Create New Match
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 md:p-12 space-y-6 rounded-md mt-12">
        <MatchList matches={matches} />
      </div>
    </div>
  );
}

export default Home;
