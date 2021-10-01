import UserPopular from "./SubComponents/UserPopular";
import RandomShow from "./SubComponents/RandomShow";
import AiringToday from "./SubComponents/AiringToday";

const MainPage = () => {
	return (
		<div>
			<AiringToday />
			<div className="container mt-5 mb-3">
				<div className="row d-flex justify-content-between">
					<UserPopular />
					<RandomShow />
				</div>
			</div>
		</div>
	);
};

export default MainPage;
