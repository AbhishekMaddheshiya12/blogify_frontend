import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

function DisplayComments({comments}) {

  return (
    <List sx={{height:"80px",overflowY:"scroll","&::-webkit-scrollbar":{display:"none"}}}>
        {
            comments?.map((comment) => {
                return (
                    <ListItem key={comment._id} style={{ borderBottom: "1px solid #ddd" }}>
                      <ListItemText secondary={comment.comment} primary ={comment.user.username} />
                    </ListItem>
                )
            })
        }
    </List>
  )
}

export default DisplayComments