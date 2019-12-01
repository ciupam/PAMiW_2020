db.createUser(
    {
        user: "user",
        pwd: "pwd",
        roles: [
            {
                role: "readWrite",
                db: "mydb"
            }
        ]
    }
);