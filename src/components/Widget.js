
import React from 'react';

const Widget = ({ widget, removeWidget }) => {
  return (
    <div className="widget">
      <div className="widget-name">{widget.name}</div>
      <div className="widget-text">{widget.text}</div>
    </div>
  );
};

export default Widget;
