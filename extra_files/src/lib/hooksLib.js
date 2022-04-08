import { useState } from "react";

//a custom react hook starts w the word use in its name
export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    //this hook takes the inital state of our form fields as an object and saves
    //it as a state variable called fields
    //the initial state in our case is an object where the keys are the ids of the
    //form fields and the values are what the user enters
    fields, 
    function(event) {
      setValues({ //function we get from useState
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}