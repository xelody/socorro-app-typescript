import React, {useState} from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import UserService from '../helper/UserService';
import DiveEntriesService from '../helper/DiveEntriesService';

import {DiveEntry} from '../../types/DiveEntry';

import '../styles/entry-form.scss';

interface DiveEntryFormPropTypes {
  displayOnly: boolean;
  entry?: DiveEntry;
  onClose: () => void;
}

export default function DiveEntryForm({
  displayOnly,
  entry,
  onClose,
}: DiveEntryFormPropTypes) {
  const userService = new UserService();
  const diveEntriesService = new DiveEntriesService();

  const {
    depth,
    location,
    bottom_time: bottomTime,
    nitrox,
    summary,
    in_time: inTime,
  } = entry || {};
  const [diveDepth, setDiveDepth] = useState(depth);
  const [diveLocationName, setDiveLocationName] = useState(location?.name);
  const [diveLocationLatitude, setDiveLocationLatitude] = useState(
    location?.coordinates?.[0],
  );
  const [diveLocationLongtitude, setDiveLocationLongtitude] = useState(
    location?.coordinates?.[1],
  );
  const [diveStartTime, setDiveStartTime] = useState(inTime);
  const [diveBottomTimeMinutes, setDiveBottomTimeMinutes] = useState(
    bottomTime?.minutes,
  );
  const [diveBottomTimeSeconds, setDiveBottomTimeSeconds] = useState(
    bottomTime?.seconds,
  );
  const [diveUsedNitrox, setDiveUsedNitrox] = useState(Boolean(nitrox));
  const [diveSummary, setDiveSummary] = useState(summary);

  if (displayOnly) {
    return (
      <div className="entry-form view-mode">
        <Typography variant="h6" gutterBottom>
          Dive location
        </Typography>
        <Typography>
          {`${diveLocationName}(${diveLocationLatitude}, ${diveLocationLongtitude})`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Typography>
          {`Dive started on ${
            diveStartTime && new Date(diveStartTime).toLocaleString()
          }, you have stayed underwater for ${diveBottomTimeMinutes} minutes and ${diveBottomTimeSeconds} seconds. The depth is ${diveDepth} and you have ${
            !diveUsedNitrox && 'not'
          } used nitrox.`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Typography>{diveSummary}</Typography>
      </div>
    );
  }

  const saveDiveRecords = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const entryInDisplay: DiveEntry = {
      update_date: new Date().toUTCString(),
      depth: diveDepth,
      location: {
        name: diveLocationName || 'Unkown',
        type: 'Point',
        coordinates: [diveLocationLatitude || 0, diveLocationLongtitude || 0],
      },
      bottom_time: {
        minutes: diveBottomTimeMinutes || 0,
        seconds: diveBottomTimeSeconds || 0,
      },
      nitrox: diveUsedNitrox,
      summary: diveSummary,
      in_time: diveStartTime,
    };
    if (entry && entry._id) {
      // update
      await diveEntriesService.editEntry(entry._id, entryInDisplay);
    } else {
      // save new
      await userService.createEntriesForUser(
        '5fc3425eaa92bc32bba160b8',
        entryInDisplay,
      );
    }

    onClose();
  };

  return (
    <form className="entry-form edit-mode" onSubmit={saveDiveRecords}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid container xs={12} spacing={1}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="location-name"
              id="location-name"
              label="Where did you dive?"
              value={diveLocationName}
              autoFocus
              onChange={(e) => setDiveLocationName(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={diveUsedNitrox}
                  onChange={(e) => setDiveUsedNitrox(e.target.checked)}
                  name="nitrox"
                  color="primary"
                />
              }
              label="Nitrox"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="location-latitude"
              id="location-latitude"
              label="Latitude"
              value={diveLocationLatitude}
              onChange={(e) => setDiveLocationLatitude(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="locationcoordsx"
              id="location-longitude"
              label="Longitude"
              value={diveLocationLongtitude}
              onChange={(e) =>
                setDiveLocationLongtitude(Number(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="depth"
              id="depth"
              label="Depth"
              value={diveDepth}
              onChange={(e) => setDiveDepth(Number(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item>
            <p>
              Get latitude and longitude from{' '}
              <a
                href="https://www.latlong.net/"
                target="_blank"
                rel="noreferrer"
              >
                latlong.net
              </a>
            </p>
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              type="datetime-local"
              name="star-time"
              id="start-time"
              label="Dive date and time"
              value={diveStartTime}
              onChange={(e) => setDiveStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="bottom-time-minutes"
              id="bottom-time-minutes"
              label="Bottom time(minutes)"
              value={diveBottomTimeMinutes}
              onChange={(e) => setDiveBottomTimeMinutes(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="bottom-time-seconds"
              id="bottom-time-seconds"
              label="Bottom time(seconds)"
              value={diveBottomTimeSeconds}
              onChange={(e) => setDiveBottomTimeSeconds(Number(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              label="Summary"
              rows="6"
              value={diveSummary}
              onChange={(e) => setDiveSummary(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
