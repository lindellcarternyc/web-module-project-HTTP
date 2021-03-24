import React from 'react';

const DeleteMovieModal = (props) => {
  const { style, onCancel, onConfirm } = props

    return (<div id="deleteEmployeeModal" style={style}>
        <div className="modal-dialog">
            <div className="modal-content">
                <form>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Employee</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input  onClick={onCancel} type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                        <input onClick={onConfirm} type="submit" className="btn btn-danger" value="Delete"/>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;