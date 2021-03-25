import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as api from '../api'

const EditMovieForm = (props) => {
  const { setMovies } = props
	const { push } = useHistory();
  const { id } = useParams()

	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});

  useEffect(() => {
    api.fetchMovie(id)
      .then(movie => setMovie(movie))
      .catch(err => console.log(err))
  }, [id])
	
	const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      api.editMovie(id, movie)
        .then(updatedMovie => {
          setMovies(currMovies => currMovies.map(curr => {
            if (curr.id === id) {
              return updatedMovie
            }
            return curr
          }))
          push(`/movies/${id}`)
        })
        .catch(err => {
          console.log(err)
        })
	}
	
	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>);
}

export default EditMovieForm;