import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/navbar/ThemeToggle";
import { getDashboardData } from "../services/dashboard.server";
import type { User } from "../components/UsersPage/users.types";
import {
  saveUsers,
  getUsers,
  getUserByName,
  createUser,
} from "../services/userService";
import { getUsername, setUsername } from "../services/authService";
import { Info } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoginPage() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);
  const [showHelperTooltip, setShowHelperTooltip] = useState(false);
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    id: number;
    type: "success" | "error";
    message: string;
  } | null>(null);

  const time = new Date();
  const days = time.getDate();
  const months = time.getMonth() + 1;
  const years = time.getFullYear();

  function padZero(number: number) {
    return number < 10 ? `0${number}` : `${number}`;
  }

  const date = `${years}-${padZero(months)}-${padZero(days)}`;

  const guestUser: User = {
    id: 0,
    name: "Guest",
    email: "Guest@gmail.com",
    password: "",
    role: "Guest",
    status: "Online",
    joined: date,
    bio: "",
    projects: 0,
    reports: 0,
    tasks: 0,
    commits: 0,
    color: "#22c55e",
    textColor: "#000000",
    activity: [],
  };

  useEffect(() => {
    const username = getUsername();

    if (username) {
      navigate("/");
    }
  }, [navigate]);

  function showToast(type: "success" | "error", message: string) {
    const id = Date.now();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((current) => current?.id === id ? null : current);
    }, 2000);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    let users = getUsers();
    if (users.length === 0) {
      const data = await getDashboardData();
      saveUsers(data.usersData);
      users = getUsers();
    }
    const foundUser = currentUsername ? getUserByName(currentUsername) : null;
    if (!foundUser) {
      showToast("error", "User does not exist");
      return;
    }
    if (foundUser.password !== password) {
      showToast("error", "Incorrect password");
      return;
    }

    setUsername(foundUser.name);
    localStorage.setItem("mode", "comfortable");
    window.dispatchEvent(new Event("usersUpdated"));
    navigate("/");
  }

  async function handleGuestLogin() {
    let users = getUsers();
    if (users.length === 0) {
      const data = await getDashboardData();
      saveUsers(data.usersData);
      users = getUsers();
    }
    const guestExists = users.some((u: User) => u.name === "Guest");
    if (!guestExists) {
      createUser(guestUser);
    }
    setUsername("Guest");
    localStorage.setItem("mode", "comfortable");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 light:bg-[#f1f5f9] transition-all duration-300">
      <div className="
      w-[80%] md:w-full max-w-md
      relative
      bg-slate-900
      light:bg-white
      p-4 md:p-6 lg:p-8
      rounded-xl md:rounded-2xl
      shadow-base md:shadow-lg
      border border-slate-600 light:border-[#e2e8f0]
      transition-all duration-300
      ">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white light:text-[#0f172a] transition-all duration-300">
          Welcome!
        </h1>

        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-0.5 md:gap-1 text-slate-400 light:text-[#475569] relative">
            <p className="transition-all duration-300">Sign in to see your dashboard</p>

            <button
              onClick={() => {setShowAccounts(!showAccounts); setShowHelperTooltip(false)}}
              className="
                cursor-pointer
                hover:text-white
                light:hover:text-slate-900
                transition-colors
                outline-none
                relative
              "
              onMouseEnter={() => setShowHelperTooltip(true)}
              onMouseLeave={() => setShowHelperTooltip(false)}
            >
              <Info size={16} />
            </button>
            <AnimatePresence>
            {showHelperTooltip && (
              <motion.div
                key={showAccounts ? "close" : "open"}
                initial={{
                  opacity: 0,
                  scaleX: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scaleX: 1,
                }}
                exit={{
                  opacity: 0,
                  scaleX: 0.8,
                }}
                transition={{
                  duration: 0.15,
                }}
                style={{
                  transformOrigin: "left center",
                }}
                className="
                absolute 
                top-5
                left-58 
                p-2 
                rounded-2xl 
                rounded-tl-none 
                bg-slate-700 
                text-slate-300 
                flex 
                items-center 
                w-fit
                text-nowrap
                z-999
                shadow-[0_5px_15px_-5px_rgba(0,0,0,0.25)]
                ">
                {showAccounts ? "Click to close" : "Click to test accounts"}
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          <AnimatePresence>
          {showAccounts && (
            <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden"
            >
              <div className="
              mt-2 md:mt-4
              rounded-lg md:rounded-xl
              border border-slate-700 light:border-slate-200
              p-2 md:p-4
              text-sm md:text-base
              transition-all duration-300
              ">
                <div className="flex justify-between transition-all duration-300">
                <h3 className="font-semibold text-white light:text-slate-900 transition-all duration-300">
                  Test Account's Role
                </h3>
                <h3 className="font-semibold mb-2 md:mb-3 text-white light:text-slate-900 transition-all duration-300">
                  Username
                </h3>
                </div>

                <div className="space-y-1.5 md:space-y-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>Admin</span>
                    <span className="font-medium">WolfeZix</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Moderator</span>
                    <span className="font-medium">NovaByte</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Premium</span>
                    <span className="font-medium">PixelCrafter</span>
                  </div>

                  <div className="flex justify-between">
                    <span>User</span>
                    <span className="font-medium">ShadowSync</span>
                  </div>
                </div>

                <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-slate-700 light:border-slate-300 transition-all duration-300">
                  <p className="text-xs md:text-sm text-slate-500">
                    Password: leave empty
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
        <div className="
        absolute
        right-5 md:right-0 top-0
        mt-4 md:mt-6 lg:mt-8
        mr-4 md:mr-6 lg:mr-8
        w-5 h-5 md:w-10 md:h-10
        text-white light:text-[#0f172a]
        ">
          <ThemeToggle />
        </div>

        <form
          className="space-y-2 md:space-y-4 light:text-[#0f172a] transition-all duration-300"
          onSubmit={handleLogin}
        >
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            spellCheck={false}
            className="dashboard-login-input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dashboard-login-input"
          />

          <button
            type="submit"
            className="dashboard-login-button"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="dashboard-login-button"
          >
            Continue as Guest
          </button>
        </form>
      </div>
      
      {toast && (
        <div className="
        fixed
        top-5
        right-5
        md:top-auto
        md:bottom-5
        z-999
        overflow-hidden
        rounded-2xl
        compact:rounded-xl
        border border-slate-700
        bg-slate-900
        shadow-2xl
        min-w-80
        transition-all duration-300
        ">
          {/* Progress bar */}
          <div key={toast.id} className="absolute bottom-0 left-0 h-1 bg-lime-400 animate-[toast_2s_linear_forwards] transition-all duration-300"></div>
          <div className="flex items-center gap-3 px-5 py-4 compact:gap-1.5 compact:px-2.5 compact:py-2 transition-all duration-300">
            {/* Icon */}
            <div
              className={`w-3 h-3 transition-all duration-300 rounded-full ${
                toast.type === "success" ? "bg-lime-400" : "bg-red-400"
              }`}
            ></div>

            {/* Content */}
            <div className="flex flex-col transition-all duration-300">
              <p className="font-semibold transition-all duration-300 text-white">
                {toast.type === "success" ? "Success!" : "Error!"}
              </p>

              <p className="text-sm text-slate-400 transition-all duration-300">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
