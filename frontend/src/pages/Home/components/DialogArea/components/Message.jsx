import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Status from "../../../../../common/Status";
import { GlassCard } from "../../../../../common/GlassCard";

const Message = ({
  isMe,
  text,
  date,
  messageId,
  isOnline,
  firstName,
  lastName,
  photo,
}) => {
  return (
    <div>
      {isMe ? (
        <ListItem key={messageId} style={{ justifyContent: "flex-end" }}>
          <GlassCard color="deepskyblue">
            <ListItemText
              style={{ padding: "8px" }}
              primary={text}
              secondary={date}
            ></ListItemText>
          </GlassCard>
          <ListItemIcon style={{ justifyContent: "flex-end" }}>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={photo ? photo : "/static/images/avatar/1.jpg"}
            />
          </ListItemIcon>
        </ListItem>
      ) : (
        <ListItem key={messageId} alignItems="flex-start">
          <ListItemIcon>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={photo ? photo : "/static/images/avatar/1.jpg"}
            />
            {isOnline ? <Status /> : false}
          </ListItemIcon>
          <GlassCard>
            <ListItemText
              style={{ padding: "8px" }}
              primary={text}
              secondary={date}
            ></ListItemText>
          </GlassCard>
        </ListItem>
      )}
    </div>
  );
};

export default Message;
