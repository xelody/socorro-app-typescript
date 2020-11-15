import React from 'react';
import PropTypes from 'prop-types';

interface DashboardItem {
  title: string;
  width?: number;
  height?: number;
  children: React.ReactChild;
}

export default function Item(props: DashboardItem) {
  const {title, width = 1, height = 1, children} = props;
  return (
    <div className={`item-container item-width-${width} item-height-${height}`}>
      <p className="card-item-title">{title}</p>
      {children}
    </div>
  );
}

Item.prototype = {
  width: PropTypes.number,
  height: PropTypes.number,
};
