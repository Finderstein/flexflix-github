import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import FindShowPage from "./components/shows/FindShowPage/FindShowPage";
import MainPage from "./components/shows/MainPage/MainPage";
import ShowPage from "./components/shows/ShowPage/ShowPage";
import TodayShowsPage from "./components/shows/TodayShowsPage/TodayShowsPage";
import Profile from "./components/users/ProfilePage/ProfilePage";
import AllUsersPage from "./components/users/AllUsersPage/AllUsersPage";
import { UserProvider } from "./contexts/UserContext";
import PrivateRoute from "./components/utilities/PrivateRoute";
import UserPage from "./components/users/UserPage/UserPage";

const App = () => {
	return (
		<BrowserRouter>
			<UserProvider>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route exact path="/find" component={FindShowPage} />
						<Route
							exact
							path="/airing-today"
							component={TodayShowsPage}
						/>
						<Route exact path="/show/:id" component={ShowPage} />
						<Route exact path="/sign-in" component={SignIn} />
						<Route exact path="/sign-up" component={SignUp} />
						<PrivateRoute
							exact
							path="/users"
							component={AllUsersPage}
						/>
						<PrivateRoute
							exact
							path="/profile"
							component={Profile}
						/>
						<PrivateRoute
							exact
							path="/user/:id"
							component={UserPage}
						/>
					</Switch>
					<Footer />
					<button
						onClick={() => {
							document.body.scrollTop = 0; // For Safari
							document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
						}}
						id="myBtn"
						title="Go to top"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-arrow-up"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
							/>
						</svg>
					</button>
				</div>
			</UserProvider>
		</BrowserRouter>
	);
};

export default App;
