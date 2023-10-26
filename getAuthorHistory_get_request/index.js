'use strict';

const fs = require('fs');
const axios = require('axios');
const fetch = require('node-fetch');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'getAuthorHistory' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING author as parameter.
 *
 * Base urls:
 *   https://jsonmock.hackerrank.com/api/article_users?username=
 *   https://jsonmock.hackerrank.com/api/articles?author=
 *
 */

async function getArticlesData(author, page = 1) {
    const articlesRes = await axios.get(`https://jsonmock.hackerrank.com/api/articles?author=${author}&page=${page}`)
    return articlesRes;
}

function getArticleTitles(data) {
    const articleTitles = [];
    for (let i = 0; i < data.length; i ++) {
        const article = data[i];
        const { title, story_title } = article || {};
        if (title || story_title) {
            articleTitles.push(title || story_title);
        }
    }
    return articleTitles;
}

async function getAuthorArticles(author) {
    const articleTitles = [];
    let articlesRes = await getArticlesData(author);
    const { total_pages = 1 } = articlesRes.data;
    for (let i = 1; i <= total_pages; i ++) {
        if (i === 1) {
            const titles = getArticleTitles(articlesRes.data.data);
            articleTitles.push(...titles);
        } else if (total_pages >= i) {    
            articlesRes = await getArticlesData(author, i);
            const titles = getArticleTitles(articlesRes.data.data);
            articleTitles.push(...titles);
        }
    }
    return articleTitles;
}

async function getAuthorHistory(author) {
    const history = [];
    const aboutAuthorRes = await axios.get(`https://jsonmock.hackerrank.com/api/article_users?username=${author}`)
    const { data = [], total = 0 } = aboutAuthorRes.data;
    if (total && data[0]?.about) {
        history.push(data[0].about)
    }
    
    const articles = await getAuthorArticles(author);
    history.push(...articles);
    
    return history;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const author = readLine();

    const result = await getAuthorHistory(author);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
