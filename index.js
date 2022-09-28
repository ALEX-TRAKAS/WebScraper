const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const url= 'https://www.gazzetta.gr/teams/';

app.get('/sportNews', (req, res) => {
        axios(url+req.query.team) 
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const articles = [];
                $('article', html).each(function() {
                    const date = $(this).find('time').text();
                    const title = $(this).find('h3').find('a').text();
                    const url = $(this).find('h3').find('a').attr('href');
                    const imgSrc = "https://www.gazzetta.gr/"+$(this).find('picture').find('img').attr('src');
                    articles.push({
                        date,
                        title,
                        url,
                        imgSrc
                    })
                })
                res.json(articles);
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
