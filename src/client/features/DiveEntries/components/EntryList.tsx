import React from 'react';
import {List} from '@material-ui/core';

import Entry from './Entry';

import {DiveEntry} from '../../../../types/DiveEntry';

interface EntryListProps {
  entries: DiveEntry[];
  onSelect: Function;
}

export default function EntryList({entries, onSelect}: EntryListProps) {
  return (
    <List className="entry-list">
      {entries.map((entry, index) => (
        <Entry
          onSelect={onSelect}
          key={`entry-${index}`}
          entry={entry}
          last={index === entries.length - 1}
        />
      ))}
    </List>
  );
}
