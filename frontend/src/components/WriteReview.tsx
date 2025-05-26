import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

// Imports Components
import UserContext from "../components/UserContext";

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
                  alert(
                    "Error: Could not post review."
                  );
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
          <div className="input">
            <label>Rating: </label>
            <br />
            <input
              onChange={(event) => {
                const value = Number(event.target.value)
                setRating(value);
              }}
              placeholder="Rating out of 10"
              type="number"
              min="1" max="10"
              value={rating}
              required />
          </div>
          <div className="input">
            <label>Write review: </label>
            <br />
            <input
              onChange={(event) => {
                setText(event.target.value);
              }}
              placeholder="Review text"
              type="text"
              value={text}
              required />
          </div>
          <button type="submit">Publish Review</button>
        </form>
      </div>
      </div>
      <div className="main_div">
      </div>
    </>
  )


}

export default WriteReview