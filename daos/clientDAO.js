const database = require('./dbQuery');
const bcrypt = require("bcryptjs");

function find(callback) {
    const selectUsers = "SELECT * from client; ";
    database.getResult(selectUsers, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findBySociety(society, callback) {
    const selectClient = (`SELECT * from client where society like '${society}';`);
    database.getResult(selectClient, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByUsername(username, callback) {
    const selectClient = (`SELECT * from account where username like '${username}';`);
    database.getResult(selectClient, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByNumclient(num_client, callback) {
    const selectClient = (`SELECT * from client where num_client = ${num_client};`);
    database.getResult(selectClient, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function createInitialAccounts(callback) {
    find(function(err, rows) {
        if (err) {
            throw err;
        }
        if (rows.length == 0) {
            console.log("No clients!");
            throw err;
        } else {

            for (var i = 0; i < rows.length; i++) {
                let names = rows[i].contact.split(" ");
                let username = names[names.length - 1];
                createAccount(rows[i].num_client, username, username, function(err, affectedRows, insertNumclient) {
                    console.log(`Account (${affectedRows}) created ${insertNumclient}`);
                });
            }
            callback(null, rows);
        }
    });
}

function cryptPassword(pass, callback) {
    //set the complexity of the salt generation
    const saltRounds = 10;
    //generate random salt (to be added to the password to generate random hash)
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            throw err;
        } else {
            //hash the password using the generated salt
            bcrypt.hash(pass, salt, function(err, hash) {
                if (err) {
                    throw err;
                } else {
                    //console.log(`hash -> ${hash}`);
                    //return the computed hash
                    callback(err, hash);
                }
            });
        }
    });
}

function createAccount(num_client, username, password, callback) {
    cryptPassword(password, function(err, hash) {
        console.log(`Hash(${password}) -> ${hash}`);
        const insertAccount = (`INSERT INTO account(num_client, username, password) VALUES(${num_client}, '${username}', '${hash}');`);
        database.getResult(insertAccount, function(err2, result2) {
            if (!err2) {
                callback(null, result2.affectedRows, num_client);
            } else {
                console.log(err2);
                throw err2;
            }
        });
    });
}

function createClient(client, callback) {
    //insert client
    const insertClient = (`INSERT INTO client(society, contact, addres, zipcode, city, phone, fax, max_outstanding) VALUES('${client.society}', '${client.contact}', '${client.addres}', '${client.zipcode}', '${client.city}', '${client.phone}', '${client.fax}', ${client.max_outstanding});`);
    database.getResult(insertClient, function(err1, result1) {
        if (!err1) {
            //if no error insert their account
            createAccount(result1.insertId, client.username, client.password, callback);
        } else {
            console.log(err1);
            throw err1;
        }
    });
}


function deleteClient(num_client, callback) {
    const deleteClient = (` DELETE from client where num_client = ${num_client};`);
    const deleteAccount = (`DELETE from account where num_client = ${num_client};`);
    //delete account
    database.getResult(deleteAccount, function(err1, result1) {
        if (!err1) {
            //delete client
            database.getResult(deleteClient, function(err, result) {
                if (!err) {
                    console.log("Number of clients deleted: " + result.affectedRows);
                    callback(null, result.affectedRows);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err1);
        }
    });
}



module.exports = {
    find,
    findByUsername,
    findBySociety,
    findByNumclient,
    createClient,
    deleteClient,
    createInitialAccounts
};