import { useState } from "react";

export const UpdateProfileModal = ({
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
  setNewZipcode
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        {/* <label htmlFor="">First Name:</label> */}
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
        />

        <textarea
          name="bio"
          id=""
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder="Bio"
        >
          Bio
        </textarea>
        <button type="submit">Update</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};
