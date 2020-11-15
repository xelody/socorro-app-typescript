import React, {useState, useEffect} from 'react';
import {Divider, Grid, Paper, CssBaseline, Typography} from '@material-ui/core';

import Item from './components/Item';
import DiveMap from './components/DiveMap';
import DiveCount from './components/DiveCount';
import DeepestDive from './components/DeepestDive';

import UserService from '../../helper/UserService';
import {DiveEntry} from '../../../types/DiveEntry';

import './styles/dashboard.scss';

export default function Dashboard() {
  const userService = new UserService();
  const [diveEntries, setDiveEntries] = useState<DiveEntry[]>([]);

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

  return (
    <div className="feature dashboard">
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        className="title"
      >
        Dashboard
      </Typography>
      <Divider />
      <Grid container spacing={2} className="dashboard">
        <Grid item>
          <CssBaseline />
          <Item height={2} width={2} title="Dive map">
            <Paper className="card">
              <DiveMap dives={diveEntries} />
            </Paper>
          </Item>
        </Grid>
        <Grid item>
          <Item height={1} title="Total dives">
            <Paper className="card">
              <DiveCount dives={diveEntries} />
            </Paper>
          </Item>
        </Grid>
        <Grid item>
          <Item height={1} title="Deepest dive">
            <Paper className="card">
              <DeepestDive dives={diveEntries} />
            </Paper>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
