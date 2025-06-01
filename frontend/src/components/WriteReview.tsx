import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Imports Components
import UserContext from "../components/UserContext";

// Styling/CSS
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: '#D19EFA',
  inactiveFillColor: '#F5F5F5'
}
// End of Styling/CSS

function WriteReview() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const nav = useNavigate();

  return (
    <>
      <div className="main_div">
        <div className="container">
          <h2>Submit your own review!</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              fetch("/reco/NewReview/" + id, {
                body: JSON.stringify({
                  game_id: id,
                  user_id: user,
                  rating: rating,
                  review_text: text,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              })
                .then((response) => {
                  if (!response.ok) {
                    alert("Error: Could not post review.");
                    return;
                  }

                  setRating(0);
                  setText("");

                  alert("Review posted successfully!");
                  nav("/Games/" + id);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            <h3>Please fill in the following:</h3>
            <div className="rating">
              <label>Rating: {rating} / 10</label>
              <br />
              <Rating
                className="rating"
                isRequired
                value={rating}
                onChange={setRating}
                itemStyles={myStyles} 
                items={10}
                spaceInside="none"
              />
            </div>
            <div className="input">
              <label>Write review: </label>
              <br />
              <textarea
                onChange={(event) => {
                  setText(event.target.value);
                }}
                placeholder="Please write a review..."
                value={text}
                rows={4}
                cols={50}
                required
              />
            </div>
            <button type="submit">Publish Review</button>
          </form>
        </div>
      </div>
      <div className="main_div"></div>
    </>
  );
}

export default WriteReview;
