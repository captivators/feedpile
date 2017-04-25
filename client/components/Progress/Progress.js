import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import "./Progress.css"

const Progress = () => (
    <div className="progress">
      {/*<CircularProgress />*/}
      <CircularProgress size={60} thickness={7} />
      {/*<CircularProgress size={80} thickness={5} />*/}
    </div>
);

export default Progress;
