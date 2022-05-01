import React from 'react';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
}

const AuthInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <>
    <label htmlFor="username" className="group-focus-within:text-lightBlue-300 font-medium text-gray-300">{props.label}</label>
    <input type={props.type} ref={ref} className="bg-inherit border-b-2 focus:outline-none focus:border-b-lightBlue-300 font-medium" {...props} />
  </>
));
export default AuthInput;
