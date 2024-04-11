const Product = require('../models/product')
const { exec, spawnSync } = require('child_process');
const fs = require('fs');

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

// const compileCpp = async (req, res) => {
//     try {
//         const { Id } = req.body;
//         const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });

//         console.log(IP)
//         // Assuming the C++ code is passed in the request body
//         const { cppCode } = req.body;


//         // Write the C++ code to a file
//         fs.writeFileSync('main.cpp', cppCode);

//         // Compile the C++ code using g++
//         exec('g++ -o compiled_program main.cpp', (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Compilation error: ${error.message}`);
//                 res.status(500).json({ error: 'Compilation error', message: error.message });
//                 return;
//             }
//             if (stderr) {
//                 console.error(`Compilation stderr: ${stderr}`);
//                 res.status(500).json({ error: 'Compilation error', message: stderr });
//                 return;
//             }

//             // Compilation successful
//             console.log('Compilation successful');

//             const inputs = IP[0].Inputs;

//             // Iterate over each inner array in the Inputs field
//             for (let i = 0; i < inputs.length; i++) {
//                 const innerArray = inputs[i];

//                 console.log(innerArray)
//                 var runResult = spawnSync('compiled_program', innerArray, { stdio: 'inherit' });
//                 // Iterate over each value in the inner array
//                 // for (let j = 0; j < innerArray.length; j++) {
//                 //     const value = innerArray[j];
//                 //     console.log(`Value at index ${j}: ${value}`);
//                 // }
//                 // console.log(runResult)

                
//                 // Execution successful
//                 // console.log('Execution successful');
//             }
//                 res.status(200).json({ message: 'Execution successful', my: runResult });
//         });
//     }
//     catch (err) {
//         console.error(`Internal server error: ${err.message}`);
//         res.status(500).json({ error: 'Internal server error', message: err.message });
//     }
// };


const compileCpp = async (req, res) => {
    try {
      const { Id, cppCode } = req.body;
      const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
  
      console.log(IP);
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
        let output = ''; // Initialize an empty string to store the output
  
        // Iterate over each inner array in the Inputs field
        for (let i = 0; i < inputs.length; i++) {
          const innerArray = inputs[i];
  
          console.log(innerArray);
          const runResult = spawnSync('compiled_program', innerArray, { encoding: 'utf8' });
          output += `Input: ${innerArray.join(' ')}\n${runResult.stdout}\n`; // Append the input and output to the output string
        }
  
        res.status(200).json({ message: 'Execution successful', output });
      });
    } catch (err) {
      console.error(`Internal server error: ${err.message}`);
      res.status(500).json({ error: 'Internal server error', message: err.message });
    }
  };
// const compileAndRunJava = async (req, res) => {
//     try {
//         const { Id, javaCode } = req.body;
//         const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
//         var timestamp = new Date().getTime();

//         // Write the Java code to a file
//         fs.writeFileSync(`./JAVA_CODES/${timestamp}.java`, javaCode);
//         fs.writeFileSync(`./JAVA_CODES/Main.java`, javaCode);

//         // Compile the Java code using javac
//         await new Promise((resolve, reject) => {
//             exec('javac .\\JAVA_CODES\\Main.java', (error, stdout, stderr) => {
//                 if (error) {
//                     console.error(`Compilation error: ${error.message}`);
//                     reject(error.message);
//                     return;
//                 }
//                 if (stderr) {
//                     console.error(`Compilation stderr: ${stderr}`);
//                     reject(stderr);
//                     return;
//                 }

//                 // Compilation successful
//                 console.log('Compilation successful');
//                 resolve();
//             });
//         });

//         const inputs = IP[0].Inputs;
//         for (let i = 0; i < inputs.length; i++) {
//             const innerArray = (inputs[i]);
//             console.log(innerArray);

//             // Run the Java program using java
//             const inputArgs = `${innerArray}`; // Convert the innerArray to string
//             await new Promise((resolve, reject) => {
//                 const runProcess = exec(`java -classpath .\\JAVA_CODES Main ${innerArray}`, { stdio: 'pipe' });

//                 runProcess.stdout.on('data', (data) => {
//                     console.log(`Output: ${data}`);
//                 });

//                 runProcess.stderr.on('data', (data) => {
//                     console.error(`Error: ${data}`);
//                 });

//                 runProcess.on('close', (code) => {
//                     console.log(`Child process exited with code ${code}`);
//                     resolve();
//                 });
//             });
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
      var timestamp = new Date().getTime();
  
      // Write the Java code to a file
      fs.writeFileSync(`./JAVA_CODES/${timestamp}.java`, javaCode);
      fs.writeFileSync(`./JAVA_CODES/Main.java`, javaCode);
  
      // Compile the Java code using javac
      await new Promise((resolve, reject) => {
        exec('javac .\\JAVA_CODES\\Main.java', (error, stdout, stderr) => {
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
        const innerArray = inputs[i];
        console.log(innerArray);
  
        // Run the Java program using java
        const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
        await new Promise((resolve, reject) => {
          const runProcess = exec(`java -classpath .\\JAVA_CODES Main ${inputArgs}`, { stdio: 'pipe' });
  
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
const compileAndRunC = async (req, res) => {
    try {
        const { Id, cCode } = req.body;
        const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
        var timestamp = new Date().getTime();

        // Write the C code to a file
        fs.writeFileSync(`./C_CODES/${timestamp}.c`, cCode);

        // Compile the C code using gcc
        await new Promise((resolve, reject) => {
            exec(`gcc .\\C_CODES\\${timestamp}.c -o .\\C_CODES\\${timestamp}`, (error, stdout, stderr) => {
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
            const innerArray = inputs[i];
            console.log(innerArray);

            // Run the C program using <timestamp>
            const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
            await new Promise((resolve, reject) => {
                const runProcess = exec(`.\\C_CODES\\${timestamp} ${inputArgs}`, { stdio: 'pipe' });

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

const compileAndRunPython = async (req, res) => {
    try {
        const { Id, pythonCode } = req.body;
        const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
        const timestamp = new Date().getTime();

        // Write the Python code to a file
        fs.writeFileSync(`./PYTHON_CODES/${timestamp}.py`, pythonCode);

        const inputs = IP[0].Inputs;
        for (let i = 0; i < inputs.length; i++) {
            const innerArray = inputs[i];
            console.log(innerArray);

            // Run the Python program using python
            const inputArgs = innerArray.join(' '); // Convert the innerArray to space-separated string
            await new Promise((resolve, reject) => {
                const runProcess = exec(`python ./PYTHON_CODES/${timestamp}.py ${inputArgs}`, { stdio: 'pipe' });

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

const compileAndRunJavascript = async (req, res) => {
    try {
        const { Id, jsCode } = req.body;
        const IP = await Product.find({ Id: Id }, { Inputs: 1, _id: 0 });
        const timestamp = new Date().getTime();

        // Write the JavaScript code to a file
        fs.writeFileSync(`./JS_CODES/${timestamp}.js`, jsCode);

        // Execute the JavaScript code using Node.js
        const inputs = IP[0].Inputs;

        for (let i = 0; i < inputs.length; i++) {
            const inputArgs = inputs[i].join(' '); // Convert the innerArray to space-separated string
            
            // Execute the code asynchronously without waiting for the result
            exec(`node ./JS_CODES/${timestamp}.js ${inputArgs}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    return;
                }
                console.log(`Output: ${stdout}`);
            });
        }

        res.status(200).json({ message: 'Execution started' }); // Respond immediately
    } catch (err) {
        console.error(`Internal server error: ${err.message}`);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};




module.exports = { compileCpp, displayQues,compileAndRunJava,compileAndRunC,compileAndRunPython,compileAndRunJavascript }






