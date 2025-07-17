import React from "react";
import { Heart } from "lucide-react";

const LikeButton = ({ liked, onClick }) => {
  return (
    <button onClick={onClick}>
      <Heart
        className={`w-6 h-6 transition duration-200 ease-in-out ${
          liked ? "text-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
};

export default LikeButton;
