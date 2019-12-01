import React from 'react';

import './Path.css';

interface IPathProps {
  path: string | null;
}

const Path: React.FC<IPathProps> = ({ path }) => {
  return path ? (
    <polyline
      points={path}
      fill="none"
      stroke="url(#gradient)"
      strokeLinecap="round"
      strokeWidth="3"
      className={'path'}
    >
      {/* <animate attributeName="points" dur="50s" repeatCount="1"
        from={path.split(' ').map((el, i, arr) => arr[0]).join(' ')}
          to={path}
      /> */}
    </polyline>
  ) : null;
};

export default Path;
