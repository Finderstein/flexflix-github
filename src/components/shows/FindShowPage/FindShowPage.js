import { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import useQuery from "../../hooks/useQuery";
import useShowSearch from "../../hooks/useShowSearch";
import SmallShowCard from "../../utilities/Cards/SmallShowCard";
import SelectCountry from "./SubComponents/Selectors/SelectCountry";
import SelectGenre from "./SubComponents/Selectors/SelectGenre";
import SelectLanguage from "./SubComponents/Selectors/SelectLanguage";
import SelectRuntime from "./SubComponents/Selectors/SelectRuntime";
import SelectSort from "./SubComponents/Selectors/SelectSort";
import SelectStatus from "./SubComponents/Selectors/SelectStatus";
import SelectType from "./SubComponents/Selectors/SelectType";

const FindShowPage = () => {
	const query = useQuery();
	const nameRef = useRef();
	const [pageNumber, setPageNumber] = useState(1);
	const [data, setData] = useState({
		status: "",
		type: "",
		genre: "",
		language: "",
		country: "",
		runtime: "",
		sort: "Most popular",
		query: "",
	});
	const { shows, loading, error, setLoading } = useShowSearch(
		data,
		pageNumber,
		setPageNumber
	);

	const observer = useRef();
	const lastBookElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (
					entries[0].isIntersecting &&
					pageNumber < 232 &&
					data.query === ""
				) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		setData(formDataObj);
		setPageNumber(1);
	};

	useEffect(() => {
		const name = query.get("name");
		if (name) {
			setData((prevData) => {
				return { ...prevData, query: name };
			});
			nameRef.current.value = name;
		}

		return () => {
			document.getElementById("navbar-search").value = "";
		};
	}, []);

	return (
		<div className="container mt-3">
			<h2 className="">Find something that you would like to see</h2>
			<Form onSubmit={handleSubmit}>
				<Row className="mb-3">
					<SelectStatus />
					<SelectType />
					<SelectGenre />
					<SelectLanguage />
					<SelectCountry />
				</Row>
				<Row className="mb-3">
					<SelectRuntime />
					<SelectSort />
				</Row>

				<Form.Group as={Col} controlId="formGridZip">
					<Form.Label>Type show name</Form.Label>
					<Form.Control type="text" name="query" ref={nameRef} />
					<Form.Text className="text-muted">
						Because of the problems with API search by show name will return
						maximum 10 shows. That's why you may not find show that you are
						searching for. If you have additional params from selects higher it
						further dimishes your chances to find the target show.
					</Form.Text>
				</Form.Group>

				<Button className="mt-3" variant="primary" type="submit">
					Search
				</Button>
			</Form>
			<div className="row">
				{shows && shows.length !== 0
					? shows.map((show, index) => {
							if (shows.length === index + 1) {
								return (
									<SmallShowCard
										ref={lastBookElementRef}
										key={show.id}
										show={show}
									/>
								);
							} else {
								return <SmallShowCard key={show.id} show={show} />;
							}
					  })
					: !loading && (
							<p className="text-muted mt-3 h3">
								No shows with this paramaterers
							</p>
					  )}
				{loading && (
					<div
						className="spinner-border"
						role="status"
						style={{ display: loading ? "flex" : "none" }}
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				)}
				{error && <p className="text-danger">ERROR...</p>}
			</div>
		</div>
	);
};

export default FindShowPage;
