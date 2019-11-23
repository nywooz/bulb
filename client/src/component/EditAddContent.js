import React from "react";

export default function AddEditContent(props) {
  return (
    <div className="card card bg-light mb-3">
      <div className="card-body">
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Title </label>
          <div className="col-sm-10">
            <input
              placeholder="To do title..."
              type="text"
              className="form-control"
              value={props.todo_title}
              onChange={props.onChangeTodotitle}
            />
          </div>

          {props.todo_titleValidatnMsg ? (
            <div className="text-danger">Please enter a title.</div>
          ) : null}
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description </label>
          <div className="col-sm-10">
            <input
              placeholder="Take a note... "
              type="text"
              className="form-control"
              value={props.todo_description}
              onChange={props.onChangeTododescription}
            />
          </div>

          {props.todo_descriptionValidatnMsg ? (
            <div className="text-danger">Please enter a description.</div>
          ) : null}
        </div>

        {props.children}
      </div>
    </div>
  );
}
