/*eslint-disable*/
import React from 'react'
import { DropzoneDialog } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SAFE_KEYWORDS,SET_UNSAFE_KEYWORDS, SET_ANNOT_VALUE,SET_ANNOT_DESC} from 'store/actions';



export default function DropZoneArea() {
  const [open, setOpen] = React.useState(false);
  const safe_keywords = [];
  const unsafe_keywords = [];

  const annotation_value=[];
  const annotation_desc=[];
  const dispatch = useDispatch();
  const redux_safe_keywords = useSelector((state) => state.customization.safe_keywords_store);
  const redux_unsafe_keywords = useSelector((state) => state.customization.unsafe_keywords_store);
  const redux_annotation_value = useSelector((state) => state.customization.annot_value_store);
  const redux_annotation_desc = useSelector((state) => state.customization.annot_desc_store);

  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Licence
        </Button>
         <div>{redux_safe_keywords[0]}</div>
        <div>{redux_unsafe_keywords[0]}</div> 
        <DropzoneDialog
          acceptedFiles={['.txt']}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}


          onSave={(files) => {
            console.log('Files:', files);
            console.log('Files_path:', files[0].path);
            const fr = new FileReader();
            fr.onload = function () {
              console.log("Files_Data:", fr.result);
              console.log("String_Contains", fr.result.includes("Rahul"));

              axios.get('http://localhost:8080/keywords', { headers: 'Access-Control-Allow-Origin: http://localhost:3000' })
                .then(res => {
                  const keywords = res.data;
                  console.log(keywords[0].keyword_name);
                  for (let i = 0; i < keywords.length; i++) {
                    if (fr.result.includes(keywords[i].keyword_name)) {
                      if (keywords[i].keyword_status == "safe") {
                        safe_keywords.push(keywords[i].keyword_name);
                      }
                      else {
                        unsafe_keywords.push(keywords[i].keyword_name);
                      }
                    }
                  }
                  console.log(safe_keywords)
                  dispatch({ type: SET_SAFE_KEYWORDS,  safe_keywords:safe_keywords});
                  dispatch({ type: SET_UNSAFE_KEYWORDS,  unsafe_keywords:unsafe_keywords});

                });

                axios.get('http://localhost:8080/annotations', { headers: 'Access-Control-Allow-Origin: http://localhost:3000' })
                .then(res => {
                  const annotations = res.data;
                  console.log(annotations[0].annot_value);
                  for (let i = 0; i < annotations.length; i++) {
                    if (fr.result.includes(annotations[i].annot_value)) {
                        annotation_value.push(annotations[i].annot_value);
                        annotation_desc.push(annotations[i].annot_desc);
                    }
                  }
                  console.log("Annot_value",annotation_desc)
                  console.log("Annot_desc",annotation_desc)
                  dispatch({ type: SET_ANNOT_VALUE,  annot_value:annotation_value});
                  dispatch({ type: SET_ANNOT_DESC,  annot_desc:annotation_desc});

                });
            }
            fr.readAsBinaryString(files[0]);
            
            setOpen(false);
          }}



          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </div>
    </>
  )
}
