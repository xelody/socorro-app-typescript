import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DvrIcon from '@material-ui/icons/Dvr';
import AddIcon from '@material-ui/icons/Add';

import DiveEntryForm from './DiveEntryForm';

export default function Navigation() {
  const [showAddEntryModal, setShowAddEntryModal] = useState(false);

  const toggleAddModal = () => {
    setShowAddEntryModal(!showAddEntryModal);
  };

  return (
    <>
      <Drawer anchor={'left'} open={true} variant="persistent">
        <RouterLink to="/dashboard">
          <div className="nav-header">
            <Typography>Socorro Dive Logbook</Typography>
          </div>
        </RouterLink>
        <List>
          <RouterLink to="/dashboard">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </RouterLink>
          <RouterLink to="/dives">
            <ListItem button>
              <ListItemIcon>
                <DvrIcon />
              </ListItemIcon>
              <ListItemText primary={'Dive logs'} />
            </ListItem>
          </RouterLink>
          <ListItem button className="sticky-bottom" onClick={toggleAddModal}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'New dive entry'} />
          </ListItem>
        </List>
      </Drawer>
      <Modal open={showAddEntryModal} onClose={toggleAddModal}>
        <Paper elevation={3}>
          <DiveEntryForm displayOnly={false} onClose={toggleAddModal} />
        </Paper>
      </Modal>
    </>
  );
}
