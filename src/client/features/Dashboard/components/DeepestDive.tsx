import React from 'react';
import PropTypes from 'prop-types';

import {DiveEntry} from '../../../../types/DiveEntry';

interface DiveEntriesOptions {
  dives: DiveEntry[];
}

export default function DeepestDive({dives}: DiveEntriesOptions) {
  return (
    <div>
      {dives && dives.length > 0
        ? Math.max.apply(
            Math,
            dives.map((dive) => dive.depth || 0),
          )
        : 'N/A'}
    </div>
  );
}

DeepestDive.prototype = {
  dives: PropTypes.arrayOf(PropTypes.object),
};
