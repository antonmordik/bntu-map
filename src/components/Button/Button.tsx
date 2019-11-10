import React, { useMemo, MouseEvent } from 'react';

import './Button.css';

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  disabled = false,
  onClick = undefined,
}) => {
  const classes: string = useMemo(() => (className ? ['mk-btn', className].join(' ') : 'mk-btn'), [
    className,
  ]);

  return (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

export default Button;
