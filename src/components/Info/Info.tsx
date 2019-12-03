import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Info.css';

import { IGlobalState } from '../../store';
import { setActiveBuilding } from '../../store/map/actions';

const Info: React.FC = () => {
  const activeBuilding = useSelector((state: IGlobalState) => state.map.activeBuilding);
  const dispatch = useDispatch();
  const onCloseActiveBuilding = useCallback(() => {
    dispatch(setActiveBuilding({ activeBuilding: null }));
  }, [dispatch]);

  return (
    <div className={activeBuilding ? 'info visible' : 'info invisible'}>
      <div className={'inner'}>
        {activeBuilding && (
          <div className={'content'}>
            <p onClick={onCloseActiveBuilding}>Close</p>
            {activeBuilding.name}
            {activeBuilding.address}
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
