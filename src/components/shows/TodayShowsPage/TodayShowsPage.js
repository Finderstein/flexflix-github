import { useState } from "react";
import { getTodayShows } from "../../../api/tvmaze.api";
import { useGetAsyncData } from "../../hooks/useGetAsyncData";
import BigShowCard from "../../utilities/Cards/BigShowCard";

const TodayShowsPage = () => {
	const [todayShows, setTodayShows] = useState();

	useGetAsyncData(() => getTodayShows(0, false), setTodayShows);

	return (
		<div className="container">
			<h2 className="mt-3">Shows airing today</h2>
			<div className="row">
				{todayShows &&
					todayShows.map((show) => (
						<BigShowCard key={`ShowCard${show.id}`} {...show} />
					))}
			</div>
		</div>
	);
};

export default TodayShowsPage;
