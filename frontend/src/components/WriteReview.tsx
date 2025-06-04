import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// Imports Components
import UserContext from "../components/UserContext";

// Styling/CSS
import styled from "styled-components";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#D19EFA",
  inactiveFillColor: "#F5F5F5",
};

const DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: hsla(274, 26%, 16%, 0.4);
  border: #d19efa solid 1px;
  border-radius: 15px;
  padding: 10px;
  margin: 0 25px 0 25px;
`;

const P = styled.p`
  color: #d19efa;
  flex-basis: 100%;
`;

const LABEL = styled.label`
  padding-top: 10px;
`
// End of Styling/CSS

function WriteReview() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const [isOK, setIsOK] = useState<string | null>("?");

  const nav = useNavigate();

  return (
    <>
      {!isOK ? (
        <DIV>
          <P>
          Could not post review. Have you filled in both a rating and review text? You may have already submitted a review for this game — only one review per user is allowed per game.
          </P>
        </DIV>
      ) : isOK === "OK" ? (
        <DIV>
          <P>
          Your review was posted successfully! Thank you for your input.
          </P>
        </DIV>
      ) : (
        <div></div>
      )}

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
                  if (response.ok) {
                    const result = response.json();
                    setIsOK("OK");
                    return result;
                  } else {
                    setIsOK(null);
                  }
                })
                .then(() => {
                  setRating(0);
                  setText("");
                  nav("/Games/" + id)
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            <h3>Please fill in the following:</h3>
            <div className="rating">
              <br />
              <Rating
                className="rating"
                isRequired
                value={rating}
                onChange={setRating}
                itemStyles={myStyles}
                items={10}
              />
              <LABEL>You rate this game {rating} / 10</LABEL>
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
