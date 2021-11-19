import { useTodoItems } from './TodoItemsContext';
import { useForm, Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useInputStyles = makeStyles(() => ({
    root: {
        marginBottom: 24,
    },
}));

export default function TodoItemForm() {
    const classes = useInputStyles();
    const { dispatch } = useTodoItems();
    const { control, handleSubmit, reset, watch } = useForm();

    return (
        <form
            onSubmit={handleSubmit((formData) => {
                dispatch({ type: 'add', data: { todoItem: formData } });
                reset({ title: '', details: '', tags: '' });
            })}
        >
            <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="TODO"
                        fullWidth={true}
                        className={classes.root}
                    />
                )}
            />
            <Controller
                name="details"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Details"
                        fullWidth={true}
                        multiline={true}
                        className={classes.root}
                    />
                )}
            />
            <Controller
                name="tags"
                control={control}
                defaultValue=""
                rules={{ required: false }}
                render={({ field }) => (
                    <FormControl fullWidth={true}>
                        <InputLabel>Tag</InputLabel>
                        <Select
                        {...field}
                        label="Tags"
                        >
                            <MenuItem value={'work'}>work</MenuItem>
                            <MenuItem value={'personal'}>personal</MenuItem>
                            <MenuItem value={'else'}>else</MenuItem>
                            <MenuItem value={''}>no tag</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!watch('title')}
            >
                Add
            </Button>
        </form>
    );
}
