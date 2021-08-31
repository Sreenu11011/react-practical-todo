import React, { useState } from "react";
import NavBar from "../NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    margin: "auto",
  },
  textField: {
    width: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editableTask, setEditableTask] = useState({});

  const addHandler = (e) => {
    e.preventDefault();
    if (text) {
      const task = {
        name: text,
        id: uuid(),
      };
      setTasks([...tasks, task]);
      setText("");
    }
  };
  const selectHandler = (id) => {
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((selectedId) => selectedId !== id));
    }
  };
  const deleteHandler = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const deleteSelectedHandler = () => {
    setTasks(tasks.filter((task) => !selected.includes(task.id)));
  };
  const editHandler = (e) => {
    e.preventDefault();
    const modifiedTasks = tasks.map((task) => {
      if (editableTask.id === task.id) {
        task.name = editableTask.name;
      }
      return task;
    });
    setTasks(modifiedTasks);

    setEditableTask({});
  };
  return (
    <div>
      <NavBar />
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <Typography variant="h4" color="inherit">
            To Do List
          </Typography>
        </Grid>
        <Grid item>
          <form onSubmit={addHandler}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={8}>
                <TextField
                  label="New Task"
                  variant="outlined"
                  classes={{ root: classes.textField }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" type="submit">
                  ADD
                </Button>
              </Grid>
            </Grid>
          </form>
          {selected.length > 0 && (
            <Grid item style={{ margin: "15px auto" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={deleteSelectedHandler}
              >
                Delete selected
              </Button>
            </Grid>
          )}
          <Grid item>
            {tasks.map((task) => {
              return (
                <div key={task.id}>
                  <Grid
                    container
                    alignItems="center"
                    style={{ border: "1px solid", margin: "10px auto" }}
                  >
                    <Grid item xs={1}>
                      <Checkbox
                        checked={selected.includes(task.id)}
                        onChange={() => selectHandler(task.id)}
                        color="primary"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      {editableTask.id === task.id ? (
                        <form>
                          <input
                            type="text"
                            value={editableTask.name}
                            onChange={(e) =>
                              setEditableTask({
                                name: e.target.value,
                                id: editableTask.id,
                              })
                            }
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={editHandler}
                            size="small"
                            style={{ marginLeft: "5px" }}
                          >
                            Confirm
                          </Button>
                        </form>
                      ) : (
                        task.name
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      onClick={() => setEditableTask(task)}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      onClick={() => deleteHandler(task.id)}
                      style={{ cursor: "pointer" }}
                    >
                      Delete
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
