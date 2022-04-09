import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Info.css';
import Close from '../../assets/Close.svg';
import { IGlobalState } from '../../store';
import { setActiveBuilding, loadError } from '../../store/map/actions';

const Info: React.FC = () => {
  const dispatch = useDispatch();
  
  const activeBuilding = useSelector((state: IGlobalState) => state.map.activeBuilding);
  const error = useSelector((state: IGlobalState) => state.map.error);

  const onCloseActiveBuilding = useCallback(() => {
    dispatch(setActiveBuilding({ activeBuilding: null }));
  }, [dispatch]);

  const onCloseError = useCallback(() => {
    dispatch(loadError({ error: null }));
  }, [dispatch]);

  return (
    <div className={activeBuilding || error ? 'info visible' : 'info invisible'}>
      <div className={error ? 'errored' : 'inner'}>
        <div className={'content'}>
          {activeBuilding && (
            <>
              <img src={Close} alt="Закрыть" onClick={onCloseActiveBuilding} className={'close'} />
              <p className={'title'}>{activeBuilding.name}</p>
              <p className={'address'}>{activeBuilding.address}</p>
            </>
          )}
          {error && (
            <>
              <img src={Close} alt="Закрыть" onClick={onCloseError} className={'close'} />
              <p className={'title'}>{error.code}</p>
              <p className={'address'}>{error.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
