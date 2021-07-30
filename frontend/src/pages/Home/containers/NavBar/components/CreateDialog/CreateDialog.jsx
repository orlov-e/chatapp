import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider } from "@material-ui/core";
import { fetchFindUsers } from "../../../../../../redux/actions/user";
import { fetchCreateDialog } from "../../../../../../redux/actions/dialogs";

function CreateDialog() {
  const [window, setWindow] = React.useState(false);

  const { foundUsers } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [user, setUser] = React.useState("");
  const [message, setMessage] = React.useState("");
  const loading = open && options.length === 0;
  const timeoutRef = React.useRef(null);

  function submit(value) {
    dispatch(fetchFindUsers(value));
  }

  const createDialog = () => {
    dispatch(fetchCreateDialog(user, message));
    handleClose();
  };

  const onMessageChange = (e) => {
    e.preventDefault();

    setMessage(e.target.value);
  };

  React.useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      return value !== "" ? submit(value) : null;
    }, 300);
  }, [value]);

  React.useEffect(() => {
    setOptions(foundUsers);
  }, [foundUsers]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleClickOpen = () => {
    setWindow(true);
  };

  const handleClose = () => {
    setWindow(false);
  };

  return (
    <div>
      <Button fullWidth onClick={handleClickOpen}>
        Create new dialog
      </Button>
      <div>
          <Dialog
            fullWidth
            maxWidth="xs"
            open={window}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create new dialog</DialogTitle>
            <Divider />
            <DialogContent>
              <br></br>
              <div>
                <Autocomplete
                  id="user-search"
                  fullWidth
                  open={open}
                  onOpen={() => {
                    setOpen(true);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  getOptionSelected={(option, value) => {
                    setUser(`${option._id}`);

                    return (
                      `${option.firstName} ${option.lastName}` ===
                      `${value.firstName} ${value.lastName}`
                    );
                  }}
                  getOptionLabel={(option) => {
                    return `${option.firstName} ${option.lastName}`;
                  }}
                  options={options}
                  loading={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={(e) => setValue(e.target.value)}
                      label="Find user"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                <br></br>
                {user ? (
                  <TextField
                    onChange={onMessageChange}
                    variant="outlined"
                    multiline
                    rows={3}
                    maxRows={15}
                    margin="dense"
                    id="message"
                    placeholder="Enter your first message"
                    type="message"
                    fullWidth
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                disabled={message && user ? false : true}
                onClick={createDialog}
                color="primary"
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    </div>
  );
}

export default CreateDialog;
