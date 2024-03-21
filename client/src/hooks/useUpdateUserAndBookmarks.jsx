import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

// selected bookmark is undefined here
const useUpdateUserAndBookmarks = (selectedBookmark) => {
  const { userProfile } = useContext(UserContext);

  const updateUserAndBookmarks = async () => {
    try {
      //GET ID FROM CONTEXT
      const _id = userProfile._id;

      // IF NO ID, THROW ERROR
      if (!_id) {
        throw new Error({ ok: true, message: "no user _id found" });
      }
      let URL = "http://localhost:4004/user/updateUser";

      // SEND BOOKMARK UPDATE TO BACKEND
      console.log(["selected boookmark", selectedBookmark]);
      let updatedUser = await axios.patch(URL, { _id, selectedBookmark });
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return { updateUserAndBookmarks };
};

export default useUpdateUserAndBookmarks;
