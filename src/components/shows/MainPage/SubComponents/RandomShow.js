import { useRef, useState } from "react";
import RandomShowCard from "./RandomShowCard";
import { getRandomShows } from "../../../../api/tvmaze.api";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";
import _ from "lodash";
import "../../shows.css";

const RandomShow = () => {
  const [randomShows, setRandomShows] = useState();
  const [loading, setLoading] = useState(true);
  const tryTextRef = useRef();
  const rndWrapRef = useRef();

  useGetAsyncData(getRandomShows, setRandomShows);

  const tryAgain = async () => {
    setRandomShows(await getRandomShows());
    tryTextRef.current.scrollIntoView();
    rndWrapRef.current.style.display = "none";
  };

  return (
    <div className="col-3">
      <h2 className="mb-4" ref={tryTextRef}>
        Feeling lucky?
      </h2>
      <div
        className="spinner-border"
        role="status"
        style={{ display: loading ? "flex" : "none" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        style={{ visibility: loading ? "hidden" : "visible" }}
        onLoad={() => {
          rndWrapRef.current.style.display = "block";
          setLoading(false);
        }}
        ref={rndWrapRef}
      >
        {randomShows &&
          randomShows.map((show) => {
            if (!show || !show.id) {
              return "";
            }
            return (
              <RandomShowCard
                key={_.uniqueId(`RandomShowCard${show.id}`)}
                {...show}
              />
            );
          })}
        <button
          type="button"
          onClick={tryAgain}
          className="btn btn-warning btn-try-again mt-4"
        >
          Try again?
        </button>
      </div>
    </div>
  );
};

export default RandomShow;
