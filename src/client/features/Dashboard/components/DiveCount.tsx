import React from 'react';
import PropTypes from 'prop-types';

import {DiveEntry} from '../../../../types/DiveEntry';

interface DiveEntriesOptions {
  dives: DiveEntry[];
}

export default function DeepestDive({dives}: DiveEntriesOptions) {
  return <div>{dives?.length || 0}</div>;
}

DeepestDive.prototype = {
  dives: PropTypes.arrayOf(PropTypes.object),
};
