const Product = require('../models/product')
const { exec, spawnSync } = require('child_process');
const fs = require('fs');
const { setDefaultAutoSelectFamily } = require('net');



const compileCpp = async (req, res) => {
    try {
        const { Id } = req.body;
        const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });

        console.log(IP)
        // Assuming the C++ code is passed in the request body
        const { cppCode } = req.body;


        // Write the C++ code to a file
        fs.writeFileSync('main.cpp', cppCode);

        // Compile the C++ code using g++
        exec('g++ -o compiled_program main.cpp', (error, stdout, stderr) => {
            if (error) {
                console.error(`Compilation error: ${error.message}`);
                res.status(500).json({ error: 'Compilation error', message: error.message });
                return;
            }
            if (stderr) {
                console.error(`Compilation stderr: ${stderr}`);
                res.status(500).json({ error: 'Compilation error', message: stderr });
                return;
            }

            // Compilation successful
            console.log('Compilation successful');

            const inputs = IP[0].Inputs;

            // Iterate over each inner array in the Inputs field
            for (let i = 0; i < inputs.length; i++) {
                const innerArray = inputs[i];

                console.log(innerArray)
                var runResult = spawnSync('compiled_program', innerArray, { stdio: 'inherit' });
                // Iterate over each value in the inner array
                // for (let j = 0; j < innerArray.length; j++) {
                //     const value = innerArray[j];
                //     console.log(`Value at index ${j}: ${value}`);
                // }
                // console.log(runResult)

                
                // Execution successful
                // console.log('Execution successful');
            }
                res.status(200).json({ message: 'Execution successful', my: runResult });
        });
    }
    catch (err) {
        console.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};
const displayQues = async (req, res) => {
    try {
        // Fetch all questions from the database
        const questions = await Product.find({}, { Name: 1, _id: 0 });
        // console.log(questions) // Assuming your model is named Product
        res.json(questions); // Send the list of questions as JSON response
    } catch (err) {
        console.error('Error fetching questions:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}







module.exports = { compileCpp, displayQues }






