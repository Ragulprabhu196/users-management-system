import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core";
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../student/List";
import axios from "axios";
import { useState } from "react";

const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: "white"
    },
    addStuColor: {
        backgroundColor: green[400],
        color: "white"
    },
});

const Home = () => {
    const classes = useStyles();
    const [student, setStudent] = useState({
        stuname: "",
        email: "",
        phone: "",
    });
    const [status, setStatus] = useState(false);
    const [error, setError] = useState("");

    function onTextFieldChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        // Email validation regex
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(student.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError(""); // Clear previous errors if any
        try {
            await axios.post("https://656b9b6fdac3630cf7284279.mockapi.io/students", student);
            setStatus(true);
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    if (status) {
        return <Home />;
    }

    return (
        <>
            <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
                <Typography variant="h2">USER MANAGEMENT SYSTEM</Typography>
            </Box>
            <Grid container justify="center" spacing={4}>
                <Grid item md={5} xs={12}>
                    <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
                        <Typography variant="h4">Add USERS</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="stuname"
                                    name="stuname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="stuname"
                                    label="Name"
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    error={!!error}
                                    helperText={error}
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="phone"
                                    name="phone"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    onChange={(e) => onTextFieldChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={(e) => onFormSubmit(e)}
                            >
                                Add
                            </Button>
                        </Box>
                    </form>
                </Grid>

                <Grid item md={7} xs={12}>
                    <List />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
