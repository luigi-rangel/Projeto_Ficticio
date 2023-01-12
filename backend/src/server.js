const app = require('./app');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));