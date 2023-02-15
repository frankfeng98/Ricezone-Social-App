/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
const articles = require('../src/articles');

const url = path => `http://localhost:3000${path}`;

describe('Validate Registration and Login functionality', () => {
    let cookie;
    it('register new user', (done) => {
        let regUser = {username: 'ff16',
        password: '123',
        email: 'foo@bar.com',
        zipcode: 12345,
        dob: '128999122000'};
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('ff16');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('login user', (done) => {
        let loginUser = {username: 'ff16', password: '123'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            cookie = res.headers.get('set-cookie');
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('ff16');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('Get headline', (done) => {
        fetch(url('/headline/mary?'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie}
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('mary');
            expect(res.headline).toEqual('default');
            done();
        });

        fetch(url('/headline'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie}
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('ff16');
            expect(res.headline).toEqual('default');
            done();
        });
    });

    it('Update headline', (done) => {
        let headline = {headline: "Happy"};
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie},
            body: JSON.stringify(headline)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('ff16');
            expect(res.headline).toEqual('Happy');
            done();
        });
    });

    it('Add article for current user', (done) => {
        let text = {text: "I am happy"};
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie},
            body: JSON.stringify(text)
        }).then(res => res.json()).then(res => {
            expect(res.articles.length).toBeGreaterThan(0);
            expect(res.articles[0].text).toEqual("I am happy");
            done();
        });
    });

    it('Get articles for a particular id', (done) => {
        fetch(url('/articles/4?'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie}
        }).then(res => res.json()).then(res => {
            expect(res.articles.text).toEqual('I am happy');
            done();
        });
    });

    it('Get articles for logged in user', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie}
        }).then(res => res.json()).then(res => {
            let temp = [...res.articles];
            expect(temp[0].text).toEqual('I am happy');
            done();
        });
    });

    it('logout user', (done) => {
        fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie}
        }).then(res => {
            expect(res.status).toBe(200);
            done();
        });
    });
});
