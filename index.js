const app = require('./app');
const db = require('./database/db');

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    V1SwaggerDocs(app, PORT);
});