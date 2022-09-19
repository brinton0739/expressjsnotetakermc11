const path = require('path');
const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));