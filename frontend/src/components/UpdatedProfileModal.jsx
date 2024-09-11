import React, { useState } from "react";

export default function UpdatedProfileModal({
  onSubmit,
  isOpen,
  onClose,
  newLname,
  setNewLname,
  newFname,
  setNewFname,
  newEmail,
  setNewEmail,
  newBio,
  setNewBio,
  newZipcode,
  setNewZipcode,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleModalClose = () => {
    setErrorMessage("");
    onClose(); // Close modal
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update Profile
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <form action="" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="First name"
                  value={newFname}
                  onChange={(e) => setNewFname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={newLname}
                  onChange={(e) => setNewLname(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Zipcode"
                  value={newZipcode}
                  onChange={(e) => setNewZipcode(e.target.value)}
                  maxLength={5}
                />

                <textarea
                  name="bio"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Bio"
                />

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
