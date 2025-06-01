import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Styling/CSS
import styled from "styled-components";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#D19EFA",
  inactiveFillColor: "#F5F5F5",
};

const P = styled.p`
  color: #D19EFA;
  font-size: 10px;

  @media (min-width: 600px) {
    font-size: 12px;
  }
`

// End of Styling/CSS

interface IdProps {
  id: number;
}

interface Review {
  id: number;
  game_id: number;
  user_id: number;
  rating: number;
  review_text: string;
  created: string;
  username: string;
}

function AverageRating(props: IdProps) {
  const location = useLocation();
  const [gameReviews, setGameReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/reco/Reviews/" + props.id)
      .then((response) => response.json())
      .then((data) => setGameReviews(data));
  }, [location.key, props.id]);

  function calcAverageRating() {
    if (gameReviews.length > 0) {
      let sumReviews = 0;
      for (let i = 0; i < gameReviews.length; i++) {
        sumReviews += gameReviews[i].rating;
      }

      return Math.trunc((sumReviews / gameReviews.length) * 10) / 10;
    }

    return 0;
  }

  return (
    <>
      {gameReviews ? (
        <div>
          <Rating
            className="rating"
            value={calcAverageRating()}
            itemStyles={myStyles}
            items={10}
            readOnly
          />
          <P>(An average rating of {calcAverageRating()}/10 based on {gameReviews.length} reviews)</P>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default AverageRating;
