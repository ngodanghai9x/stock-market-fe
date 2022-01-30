import React from 'react';

type TextInoutProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
}

const FCTextInput = ({ label, type, ...rest }: TextInoutProps) => {
  return <div>
    <label htmlFor="">
      {label}
    </label>

    <input type={type} {...rest} />
  </div>;
};

export default FCTextInput;
