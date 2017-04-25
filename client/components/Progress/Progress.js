import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import "./Progress.css"

const Progress = () => (
    <div>
      {/*<CircularProgress />*/}
      <CircularProgress color="orange" className="progress" size={60} thickness={7} />
      {/*<CircularProgress size={80} thickness={5} />*/}
    </div>
);

export default Progress;
