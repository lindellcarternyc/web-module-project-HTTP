import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import * as api from '../api'

import DeleteMovieModal from './DeleteMovieModal'

const Movie = (props) => {
    const { addToFavorites, deleteMovie } = props;

    const [movie, setMovie] = useState('');
    const [isDeleting, setIsDeleting] = useState(false)

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(()=>{
        api.fetchMovie(id)
          .then(movie => setMovie(movie))
          .catch(err => console.log(err))
    }, [id]);

    const onClickDelete = (evt) => {
      setIsDeleting(true)
    }

    const onCancelDelete = () => {
      setIsDeleting(false)
    }

    const onConfirmDelete = (evt) => {
      evt.preventDefault()
      api.deleteMovie(id)
        .then(deletedId => {
          setIsDeleting(false)
          deleteMovie(deletedId)
          push('/movies')
        })
        .catch(err => console.log(err))
    }

  return(
    <>
      {isDeleting && <DeleteMovieModal style={{ zIndex: 5 }} onConfirm={onConfirmDelete} onCancel={onCancelDelete} /> }
      <div className="modal-page col">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">						
                    <h4 className="modal-title">{movie.title} Details</h4>
                </div>
                <div className="modal-body">
                    <div className="flexContainer">

                        <section className="movie-details">
                            <div>
                                <label>Title: <strong>{movie.title}</strong></label>
                            </div>
                            <div>
                                <label>Director: <strong>{movie.director}</strong></label>
                            </div>
                            <div>
                                <label>Genre: <strong>{movie.genre}</strong></label>
                            </div>
                            <div>
                                <label>Metascore: <strong>{movie.metascore}</strong></label>
                            </div>
                            <div>
                                <label>Description:</label>
                                <p><strong>{movie.description}</strong></p>
                            </div>
                        </section>
                        
                        <section>
                            <span className="m-2 btn btn-dark">Favorite</span>
                            <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                            <span className="delete" onClick={onClickDelete}><input type="button" className="m-2 btn btn-danger" value="Delete"/></span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>  
  );
}

export default Movie;