import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  Avatar,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";

const Thread = ({ thread }) => {
  const truncatedTitle =
    thread.title.length > 20 ? `${thread.title.slice(0, 20)}...` : thread.title;

  const truncatedContent =
    thread.content.length > 20
      ? `${thread.content.slice(0, 20)}...`
      : thread.content;

  const date = new Date(thread.createdAt);

  return (
    <Card className="my-3 p-3 rounded">
      <CardHeader
        avatar={<Avatar/>}
        action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        title={truncatedTitle}
        subheader={date.toDateString()}
      />
      <CardContent>
        <Grid>
          <Grid item xs={8}>
            <Typography variant="body2" color="text.secondary">
              {truncatedContent}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Link
              to={`/thread/${thread._id}`}
              style={{ textDecoration: "none" }}
            >
              read more
            </Link>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <ExpandMoreIcon />
      </CardActions>
    </Card>
  );
};

export default Thread;
