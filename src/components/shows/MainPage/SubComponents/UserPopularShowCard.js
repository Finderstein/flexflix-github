import { useState } from "react";
import { Link } from "react-router-dom";
import { getShow } from "../../../../api/tvmaze.api";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";
import "../../shows.css";

const UserPopularShowCard = ({ id }) => {
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState();

	useGetAsyncData(() => getShow(id), setShow);

	return (
		<div className="card mb-1">
			{show && (
				<div className="row g-0">
					<div className="col-2">
						<div
							className="spinner-border"
							role="status"
							style={{ display: loading ? "flex" : "none" }}
						>
							<span className="visually-hidden">Loading...</span>
						</div>
						<img
							style={{
								visibility: loading ? "hidden" : "visible",
							}}
							className="card-img-top"
							src={show.image.medium}
							alt={show.name}
							onLoad={() => setLoading(false)}
						/>
					</div>
					<div className="col-10">
						<div className="card-body">
							<h5 className="card-title">
								<Link
									to={`/show/${show.id}`}
									className="link-dark stretched-link"
								>
									{show.name}
								</Link>
							</h5>
							<p className="card-text mb-2">
								Rating:{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-star-fill"
									viewBox="0 0 16 16"
								>
									<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
								</svg>{" "}
								{show.rating.average}
							</p>
							<p className="card-text card-text-short mb-0">
								{show.summary.replace(/(<([^>]+)>)/gi, "")}
							</p>
							<p className="card-text">
								<small className="text-muted">
									Last updated 3 mins ago
								</small>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserPopularShowCard;
