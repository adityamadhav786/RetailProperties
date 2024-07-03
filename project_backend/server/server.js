const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const router = require("./routes/route");

const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/property", router)

// app.use(router);
