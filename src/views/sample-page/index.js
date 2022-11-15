/*eslint-disable*/
// material-ui
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

import DropZoneArea from 'Components/DropZoneArea';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// const axios = require('axios');




// ==============================|| SAMPLE PAGE ||============================== //
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SamplePage = () => {
    const [annotvalue_state, set_annotvalue_state] = useState("");
    const [annotdesc_state, set_annotdesc_state] = useState("");
    const [key_btn, set_key_btn] = useState("Add Keyword")
    const [open, setOpen] = useState(false);
    const [keyword_status, set_keyword_status] = useState('safe');
    const [keyword_name, set_keyword_name] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const redux_safe_keywords = useSelector((state) => state.customization.safe_keywords_store);
    const redux_unsafe_keywords = useSelector((state) => state.customization.unsafe_keywords_store);
    const redux_annotation_value = useSelector((state) => state.customization.annot_value_store);
    const redux_annotation_desc = useSelector((state) => state.customization.annot_desc_store);



    const add_annotations = () => {
        axios.get('http://localhost:8080/setget_annotations/' + annotvalue_state + '/' + annotdesc_state + '/' + 'rahulm/rahulm', { headers: 'Access-Control-Allow-Origin: http://localhost:3000' })
            .then(res => {
                console.log(res.data);
            });

    }


    const annot_value_handlechange = (e) => {
        const annot_Value = document.getElementById("annot_value").value;
        set_annotvalue_state(annot_Value);
        console.log(annot_Value);
        console.log(annotvalue_state);
    }

    const annot_desc_handlechange = (e) => {
        const annot_desc = document.getElementById("annot_desc").value;
        set_annotdesc_state(annot_desc);
        console.log(annot_desc);
        console.log(annot_desc);
    }

    const keyword_modal_fn = (keyword) => {
        setOpen(true);
        set_key_btn(keyword);

    }



    const keyword_add_btn = (keyword_btn) => {
        if (keyword_btn == "Add Keyword") {
            console.log("add_btn")
            axios.get('http://localhost:8080/add_keyword/' + keyword_name + '/' + keyword_status, { headers: 'Access-Control-Allow-Origin: http://localhost:3000' })
                .then(res => {
                    console.log(res.data);
                });
        }
        else {
            console.log("update_btn");
            axios.get('http://localhost:8080/update_keyword/' + keyword_name + '/' + keyword_status, { headers: 'Access-Control-Allow-Origin: http://localhost:3000' })
                .then(res => {
                    console.log(res.data);
                });
        }
    }

    const key_name_handlechange = (event) => {
        set_keyword_name(event.target.value);
        console.log(keyword_name);
    }

    const key_status_handleChange = (event) => {
        set_keyword_status(event.target.value);
        console.log(keyword_status);
    };

    const desc_count=0;

    return (
        <>
            <MainCard title="Sample Card">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MainCard title="License">
                            <TextField fullWidth="true" id="annot" multiline="true" size="medium" variant="outlined" autoFocus="true" label="Licence Name" />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} >
                        <MainCard >
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='h2'>Upload Licence.txt</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <DropZoneArea />

                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>

                    <Grid item xs={6} >
                        <MainCard title="Safe Keywords"></MainCard>
                    </Grid>
                    <Grid item xs={6} >
                        <MainCard title="UnSafe Keywords"></MainCard>
                    </Grid>
                    <Grid item xs={6} >
                        <Button variant="contained" onClick={() => keyword_modal_fn("Add Keyword")}>Add Keyword</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button variant="contained" onClick={() => keyword_modal_fn("Update Keyword")}>Update Keyword</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title="Annotaions">

                            {redux_annotation_value.map((redux_annotation_each,index) =>
                                
                                <>
                                    
                                    <Typography variant='h4'> Value:</Typography>
                                    <Typography variant='h7'>{redux_annotation_each}</Typography><br></br>
                                    <Typography variant='h4'>Description:</Typography>
                                    <Typography variant='h7'>{redux_annotation_desc[index]}</Typography>
                                   
                                </>
                            )
                                
                            }
                             





                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title="Add Annotaions">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField sx={{ width: 700 }} id="annot_value" multiline="true" size="medium" variant="outlined" onChange={annot_value_handlechange} autoFocus="true" label="Annotations Value" />
                                </Grid>
                                <Grid item xs={6} sx={{ marginTop: 10 }}>
                                    <Button variant="contained" onClick={add_annotations}>Add Annotation</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField sx={{ width: 700 }} id="annot_desc" multiline="true" size="medium" variant="outlined" autoFocus="true" onChange={annot_desc_handlechange} label="Annotations Description" />
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard title="Add Comments">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField sx={{ width: 700 }} id="comments" multiline="true" size="medium" variant="outlined" autoFocus="true" label="Comments" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained">Add Comments</Button>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >

                        <SubCard sx={style}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField sx={{ width: 900 }} id="key_name" multiline="true" size="medium" variant="outlined" onChange={key_name_handlechange} autoFocus="true" label="Keyword Name" />
                                </Grid>
                                <Grid item xs={12}>

                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={key_status_handleChange}
                                        >
                                            <FormControlLabel value="safe" control={<Radio />} label="Safe" />
                                            <FormControlLabel value="unsafe" control={<Radio />} label="UnSafe" />
                                            <FormControlLabel
                                                value="disabled"
                                                disabled
                                                control={<Radio />}
                                                label="other"
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={() => keyword_add_btn(key_btn)}>{key_btn}</Button>
                                </Grid>
                            </Grid>
                        </SubCard>

                    </Modal>
                </div>

            </MainCard>

        </>
    )

};

export default SamplePage;
