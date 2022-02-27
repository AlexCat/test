import * as React from "react";

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      {...props}
      style={{
        color: 'green',
        width: 400
      }}
    >
      Click ME PLEASE
    </button>
  )
};

export default Button;
