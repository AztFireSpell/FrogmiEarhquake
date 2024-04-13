import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { API_URL } from "../../constants";
import "./coments.css"

function Comments() {
    const [comments, setComent] = useState(null);
    const { id } = useParams();

    const [body, setBody] = useState("");


    useEffect(() => {
        const fetchCommentEarthquake = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}/comments`);
                if (response.ok) {
                    const json = await response.json();
                    setComent(json)
                } else {
                    throw response;
                }
            } catch (error) {
                console.log("Ocurrio un error:", error);
            }
        };
        fetchCommentEarthquake();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = { body }

        const response = await fetch(`${API_URL}/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        })

        if (response.ok) {
            window.location.reload();
        } else {
            console.log("Ocurrio un error al guardar el comentario");
        }

    };

    if (!comments) return <h2>Cargando...</h2>


    return (
        <div>
            <div className="no-comments">
                {comments.length === 0 && (
                    <p>Aún no hay comentarios.</p>
                )}
            </div>


            <div className="comments-container">
                {comments &&
                    comments.map((comment) => (
                        <div key={comment.id} className="comments-id">
                            <div className="comments-body">
                                <h3>{comment.body}</h3>
                            </div>
                        </div>
                    ))}

            </div>

            <div className="form-create-comment">
                <div className="header-form">
                    Crear un nuevo comentario
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        
                        <input
                            id="commentInput"
                            type="text"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            className="textinputcreate"
                        />
                    </div>
                    <div>
                        <button className="submitButtonForm" type="submit">Crear Comentario</button>
                    </div>
                </form>

            </div>
        </div>
    )


}

export default Comments;