import React from 'react';

type ValidateMessageProps = React.ComponentPropsWithoutRef<'div'>;

const ValidateMessage = ({ children, className, ...rest }: ValidateMessageProps) => {
  if (!children) return null;
  return <span className={`block my-[0.2rem] font-light text-myRed text-sm italic ${className}`}>{children}</span>;
};

export default ValidateMessage;
