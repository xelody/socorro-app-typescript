import React, {useState} from 'react';
import {Paper} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import DiveEntryForm from '../../DiveEntryForm';

import DiveEntriesService from '../../../helper/DiveEntriesService';
import {DiveEntry} from '../../../../types/DiveEntry';

interface EntryDisplayPropTypes {
  entry?: DiveEntry;
}

export default function EntryDisplay({entry}: EntryDisplayPropTypes) {
  if (!entry) {
    return <React.Fragment />;
  }

  const diveEntriesService = new DiveEntriesService();
  const [editMode, setEditMode] = useState(false);

  const handleDeleteEntry = async () => {
    await diveEntriesService.deleteEntry(entry?._id || '');
    window.dispatchEvent(new CustomEvent('DIVE_ENTRIES_UPDATED'));
  };

  return (
    <div className="entry-view">
      {!editMode && (
        <EditIcon className="button" onClick={() => setEditMode(true)} />
      )}
      {editMode && (
        <DeleteForeverIcon className="button" onClick={handleDeleteEntry} />
      )}
      <Paper elevation={3}>
        <DiveEntryForm
          displayOnly={!editMode}
          entry={entry}
          onClose={() => setEditMode(false)}
        />
      </Paper>
    </div>
  );
}
