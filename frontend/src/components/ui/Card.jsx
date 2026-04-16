import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`soft-surface rounded-2xl ${className}`}>{children}</div>
  );
};

export default Card;
