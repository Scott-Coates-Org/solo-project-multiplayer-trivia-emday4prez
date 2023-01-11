const fs = require('fs');

// File destination.txt will be created or overwritten by default.
fs.copyFile('.env.local.example', '.env.local', fs.constants.COPYFILE_EXCL, (err) => {
    if (err) {
        if (/already exists/i.test(err) === false) {
            throw err;
        }
    } else {
        console.log('ATTENTION! .env.local did not exist so I cloned .env.local.example for you. Make sure you fill in the values.');
    }
});
