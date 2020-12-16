import crudModel from '../models/firstCrud.js';

// we create and  our functions we want to run on our model
// we then export them to our routes file



// get request
export const getData = async (req, res) => {
  
    try {
        //run .find() on our model
        const dataPayload = await crudModel.find();
        // return status and send our payload in the response
        res.status(200).json(dataPayload);
    } catch (error) {
        console.log(error)
    }
}

// post request
export const createData = async (req, res) => {
    // our data from the frontend
    const frontEnd = req.body;
    // create a new document on our model
    const newDoc = new crudModel;

    try {
    // run .save() on our model
      const newData = await newDoc.save(frontEnd);
      // return status and send our payload in the response
      res.status(200).json(newData);  
    } catch (error) {
        console.log(error)
        
    }
}