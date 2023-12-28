// create submit button component
import React from 'react';

interface IButtonSubmitProps {
  title: string;
  disabled?: boolean;
}

const ButtonSubmit = ({ title, disabled }: IButtonSubmitProps) => {
  return (
    <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={disabled}>
      {title}
    </button>
  );
};

export default ButtonSubmit;