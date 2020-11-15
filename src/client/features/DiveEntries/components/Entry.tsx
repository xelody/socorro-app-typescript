import React from 'react';
import {Divider, ListItem, ListItemText} from '@material-ui/core';

import {DiveEntry} from '../../../../types/DiveEntry';

interface EntryPropTypes {
  entry: DiveEntry;
  last: boolean;
  onSelect: Function;
}

export default function Entry({entry, last, onSelect}: EntryPropTypes) {
  return (
    <>
      <ListItem onClick={() => onSelect(entry)}>
        <ListItemText
          primary={entry?.location?.name || 'Unknown'}
          secondary={
            <React.Fragment>
              {new Date(entry?.update_date || '').toLocaleString()}
            </React.Fragment>
          }
        />
      </ListItem>
      {!last && <Divider component="li" />}
    </>
  );
}
