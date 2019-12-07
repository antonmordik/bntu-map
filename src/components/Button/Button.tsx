import React, { useMemo, MouseEvent, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import './Button.css';

import { IError } from '../../interfaces/IError';
import { loadError, setActiveBuilding } from '../../store/map/actions';

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  disabledError,
  disabled = false,
  onClick = undefined,
}) => {
  const dispatch = useDispatch();
  const [isAnimated, setAnimated] = useState(false);

  const classes: string = useMemo(() => {
    const classList = ['btn'];
    if (className) {
      classList.push(className);
    }
    if (isAnimated) {
      classList.push('animated');
    }
    return classList.join(' ');
  }, [className, isAnimated]);

  const onClickDecorator = useCallback(
    (e) => {
      if (disabled) {
        setAnimated(true);
        if (disabledError) {
          dispatch(setActiveBuilding({ activeBuilding: null }));
          dispatch(loadError({ error: disabledError }));
        }
      } else {
        onClick && onClick(e);
      }
    },
    [disabled, onClick, disabledError, dispatch],
  );

  return (
    <button
      className={classes}
      onClick={onClickDecorator}
      onAnimationEnd={() => setAnimated(false)}
    >
      {children}
    </button>
  );
};

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  disabledError?: IError;
  onClick?: (event: MouseEvent) => void;
}

export default Button;
