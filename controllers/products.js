const Product = require('../models/product')
const { exec, spawnSync } = require('child_process');
const fs = require('fs');
const { setDefaultAutoSelectFamily } = require('net');
const vm = require('vm');



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
// const runJavaScript = async (req, res) => {
//     const { Id } = req.body;
//     const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
//     try {
//         // Assuming the JavaScript code is passed in the request body
//         const { jsCode } = req.body;
//         const inputs = IP[0].Inputs;

//             // Iterate over each inner array in the Inputs field
//             for (let i = 0; i < inputs.length; i++) {
//                 const innerArray = inputs[i];

//                 // console.log(innerArray)
//                 const codeWithInput = `
//                 const input = "${innerArray}";
//                 ${jsCode}
//             `;
//             console.log(eval(codeWithInput))
//                 // Iterate over each value in the inner array
//                 // for (let j = 0; j < innerArray.length; j++) {
//                 //     const value = innerArray[j];
//                 //     console.log(`Value at index ${j}: ${value}`);
//                 // }
//                 // console.log(runResult)

                
//                 // Execution successful
//                 // console.log('Execution successful');
//             }

//         // Execute the JavaScript code using eval
//         // const result = eval(jsCode);

//         // Send the result as JSON response
//         res.status(200).json({ message: 'Execution successful', result });
//     } catch (err) {
//         console.error(`Internal server error: ${err.message}`);
//         res.status(500).json({ error: 'Internal server error', message: err.message });
//     }
// };

// const runJavaScript = async (req, res) => {
//     const { Id, jsCode } = req.body;

//     try {
//         // Fetch the inputs from the database based on the Id
//         const { Inputs } = await Product.findOne({ Id }, { Inputs: 1, _id: 0 });

//         if (!Inputs || !Array.isArray(Inputs)) {
//             throw new Error('Inputs not found or not in the correct format.');
//         }

//         // Array to store the results for each input set
//         const results = [];
//         console.log(Inputs)

//         // Iterate over each inner array in the Inputs field
//         for (let i = 0; i < Inputs.length; i++) {
//             const innerArray = Inputs[i];
//             console.log(innerArray)

//             // Convert the innerArray to a string representation
//             const inputStr = JSON.stringify(innerArray);

//             // Construct the code with input
//             const codeWithInput = `
//                 const input = ${inputStr};
//                 ${jsCode}
//             `;

//             // Execute the JavaScript code using eval
//             const result = eval(codeWithInput);

//             // Log the result for this input set
//             console.log(`Result for input set ${i + 1}:`, result);

//             // Store the result in the results array
//             results.push(result);
//         }

//         // Send the results as JSON response
//         res.status(200).json({ message: 'Execution successful', results });
//     } catch (err) {
//         console.error(`Internal server error: ${err.message}`);
//         res.status(500).json({ error: 'Internal server error', message: err.message });
//     }
// };


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



// const runJavaScript = async (req, res) => {
//     try {
//         const { Id } = req.body;
//         const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });

//         console.log(IP);

//         // Assuming the JavaScript file path is passed in the request body
//         const { jsFilePath } = req.body;

//         // Read the JavaScript code from the file
//         const jsCode = fs.readFileSync("dynamicJsCode.js", 'utf8');

//         const inputs = IP[0].Inputs;

//         // Iterate over each inner array in the Inputs field
//         for (let i = 0; i < inputs.length; i++) {
//             const innerArray = inputs[i];

//             console.log(innerArray);

//             // Create a sandboxed context for executing the JavaScript code
//             // const sandbox = { console };
//             // const context = vm.createContext(sandbox);
//             eval()

//             // Assign the input array to a variable in the sandboxed context
//             context.input = innerArray;

//             // Run the JavaScript code in the sandboxed context
//             vm.runInContext(jsCode, context);

//             // Retrieve the output from the context
//             const { result } = sandbox;

//             console.log(result);
//         }

//         res.status(200).json({ message: 'Execution successful' });
//     } catch (err) {
//         console.error(`Internal server error: ${err.message}`);
//         res.status(500).json({ error: 'Internal server error', message: err.message });
//     }
// };




const compileAndRunJava = async (req, res) => {
    try {
        const { Id, javaCode } = req.body;
        const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });

        // Write the Java code to a file
        fs.writeFileSync('Main.java', javaCode);

        // Compile the Java code using javac
        await new Promise((resolve, reject) => {
            exec('javac Main.java', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Compilation error: ${error.message}`);
                    reject(error.message);
                    return;
                }
                if (stderr) {
                    console.error(`Compilation stderr: ${stderr}`);
                    reject(stderr);
                    return;
                }

                // Compilation successful
                console.log('Compilation successful');
                resolve();
            });
        });

        const inputs = IP[0].Inputs;
        for (let i = 0; i < inputs.length; i++) {
            const innerArray = parseInt(inputs[i]);
            console.log(innerArray);

            // Run the Java program using java
            const inputArgs = `${innerArray}`; // Convert the innerArray to string
            await new Promise((resolve, reject) => {
                const runProcess = exec(`java Main ${inputArgs}`, { stdio: 'pipe' });

                runProcess.stdout.on('data', (data) => {
                    console.log(`Output: ${data}`);
                });

                runProcess.stderr.on('data', (data) => {
                    console.error(`Error: ${data}`);
                });

                runProcess.on('close', (code) => {
                    console.log(`Child process exited with code ${code}`);
                    resolve();
                });
            });
        }

        res.status(200).json({ message: 'Execution successful' });
    } catch (err) {
        console.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};



module.exports = { compileCpp, displayQues,compileAndRunJava }






