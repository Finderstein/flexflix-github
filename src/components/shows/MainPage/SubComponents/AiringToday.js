import { useState } from "react";
import { Link } from "react-router-dom";
import BigShowCard from "../../../utilities/Cards/BigShowCard";
import { getTodayShows } from "../../../../api/tvmaze.api";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";

const AiringToday = () => {
	const [todayShows, setTodayShows] = useState();

	useGetAsyncData(getTodayShows, setTodayShows);

	return (
		<div className="container">
			<h2 className="mt-3">Popular shows airing today</h2>
			<div className="row">
				{todayShows &&
					todayShows.map((show) => (
						<BigShowCard key={`ShowCard${show.id}`} {...show} />
					))}
				<Link
					to="/airing-today"
					className="btn btn-outline-info btn-lg mt-4 btn-more-shows"
				>
					More shows today...
				</Link>
			</div>
		</div>
	);
};

export default AiringToday;
