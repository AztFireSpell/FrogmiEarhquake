import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";

function EarthquakeDetails({ earthquake, totalComments }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`${API_URL}/${earthquake.id}/comments`);
        if (response.ok) {
          const json = await response.json();
          setComments(json.comments);
        } else {
          throw response;
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [earthquake.id]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/features/${earthquake.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            comment: { body: newComment }
          })
        }
      );
      if (response.ok) {
        // Refresh comments after adding a new comment
        fetchComments();
        // Clear the input field
        setNewComment("");
      } else {
        throw response;
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="earthquake-details">
      <button onClick={() => setShowModal(true)}>Ver comentarios ({totalComments})</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Comentarios del Terremoto</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un nuevo comentario"
            ></textarea>
            <button onClick={handleAddComment}>Agregar comentario</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EarthquakeDetails;
