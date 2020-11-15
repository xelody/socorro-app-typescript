import React, {useState, useEffect} from 'react';
import {Divider} from '@material-ui/core';

import EntryList from './components/EntryList';
import EntryDisplay from './components/EntryDisplay';

import UserService from '../../helper/UserService';
import {DiveEntry} from '../../../types/DiveEntry';

import './styles/dive-entries.scss';

export default function DiveEntries() {
  const userService = new UserService();
  const [diveEntries, setDiveEntries] = useState<DiveEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiveEntry>();

  useEffect(() => {
    async function getDiveEntries() {
      const response = await userService.getDiveEntiresForUser(
        '5fc3425eaa92bc32bba160b8',
      );
      if (response?.success) {
        setDiveEntries(response?.data?.dives || []);
      }
    }

    getDiveEntries();
    window.addEventListener('DIVE_ENTRIES_UPDATED', getDiveEntries);
    return () =>
      window.removeEventListener('DIVE_ENTRIES_UPDATED', getDiveEntries);
  }, []);

  const handleEntrySelect = (entry: DiveEntry) => {
    setSelectedEntry(entry);
  };

  return (
    <div className="dive-entires">
      <EntryList entries={diveEntries} onSelect={handleEntrySelect} />
      <Divider orientation="vertical" flexItem />
      <EntryDisplay entry={selectedEntry || diveEntries?.[0]} />
    </div>
  );
}
