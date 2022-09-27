const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const url= 'https://www.gazzetta.gr/teams/paok?page=';

app.get('/paokNews', (req, res) => {
        axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const articles = [];
                $('.list-article__info', html).each(function() {
                    const date = $(this).find('time').text();
                    const title = $(this).find('h3').find('a').text();
                    const url = $(this).find('h3').find('a').attr('href');
                    articles.push({
                        date,
                        title,
                        url
                    })
                })
                res.json(articles);
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
