import React from "react";

function MediaOverlay() {
  return (
    <div className="group absolute inset-0 flex items-center justify-center hover:bg-dark-300/50">
      <div className="hidden items-center gap-6 group-hover:flex">
        <div className="flex gap-1">
          <img src="/assets/icons/liked.svg" alt="like-icon" />
          <p>7.135</p>
        </div>
        <div className="flex gap-1">
          <img src="/assets/icons/chat.svg" alt="chat-icon" />
          <p>134</p>
        </div>
      </div>
    </div>
  );
}

export default MediaOverlay;
