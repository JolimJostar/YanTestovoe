import { useCallback, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { motion } from "framer-motion";
import { TodoItem, useTodoItems } from "./TodoItemsContext";

const spring = {
  type: "spring",
  damping: 25,
  stiffness: 120,
  duration: 0.25,
};

const useTodoItemListStyles = makeStyles({
  root: {
    listStyle: "none",
    padding: 0,
  },
});

export const TodoItemsList = function () {
  const { todoItems } = useTodoItems();
  const classes = useTodoItemListStyles();

  const [SortedItems, SetSortedItems] = useState<Array<any> | any>([]);
  const [tag, setTag] = useState<string>("");

  const sortedItems = [...todoItems].slice().sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    }

    if (!a.done && b.done) {
      return -1;
    }

    return 0;
  });

  function filterArr(todoItems: any, tag: string) {
    if (tag === "") return todoItems;
    return todoItems.filter((a: any) => a.tags === tag) as any;
  }

  const handleChange = (event: any) => {
    setTag(event.target.value as string);
  };

  useEffect(() => {
    SetSortedItems(filterArr([...sortedItems], tag));
  }, [todoItems, tag]);

  return (
    <div>
      <FormControl fullWidth={true}>
        <InputLabel>Filter tag</InputLabel>
        <Select onChange={handleChange} disableUnderline>
          <MenuItem value={"work"}>work</MenuItem>
          <MenuItem value={"personal"}>personal</MenuItem>
          <MenuItem value={"else"}>else</MenuItem>
          <MenuItem value={""}>no filter</MenuItem>
        </Select>
      </FormControl>
      <ul className={classes.root}>
        {SortedItems.map((item: any) => (
          <motion.li key={item.id} transition={spring} layout={true}>
            <TodoItemCard item={item} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const useTodoItemCardStyles = makeStyles({
  root: {
    marginTop: 24,
    marginBottom: 24,
  },
  doneRoot: {
    textDecoration: "line-through",
    color: "#888888",
  },
});

export const TodoItemCard = function ({ item }: { item: TodoItem }) {
  const classes = useTodoItemCardStyles();
  const { dispatch } = useTodoItems();

  const handleDelete = useCallback(
    () => dispatch({ type: "delete", data: { id: item.id } }),
    [item.id, dispatch]
  );

  const handleToggleDone = useCallback(
    () =>
      dispatch({
        type: "toggleDone",
        data: { id: item.id },
      }),
    [item.id, dispatch]
  );

  return (
    <Card
      className={classnames(classes.root, {
        [classes.doneRoot]: item.done,
      })}
    >
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
        title={
          <FormControlLabel
            control={
              <Checkbox
                checked={item.done}
                onChange={handleToggleDone}
                name={`checked-${item.id}`}
                color="primary"
              />
            }
            label={item.title}
          />
        }
      />
      {item.details ? (
        <CardContent>
          <Typography variant="body2" component="p">
            {item.details}
          </Typography>
        </CardContent>
      ) : null}
      {item.tags}
    </Card>
  );
};
