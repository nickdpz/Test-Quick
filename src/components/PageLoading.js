import React from 'react';

import './styles/PageLoading.css';
import './styles/Loader.css';

class Loader extends React.Component {
    render() {
      return (
        <div className="lds-grid">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      );
    }
  }


function PageLoading() {
  return (
    <div className="PageLoading">
      <Loader />
    </div>
  );
}

export default PageLoading;