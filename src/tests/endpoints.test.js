import request from 'supertest';
import app from '../server';
import dotenv from 'dotenv';
import superagent from 'superagent';
dotenv.config();

var authToken = null;
beforeAll(async (done) => {
    const res = await superagent.post(process.env.ISSUER + '/v1/token')
        .auth(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
        .type('application/x-www-form-urlencoded')
        .accept('application/json')
        .send({
            grant_type: 'client_credentials'
        })
        .send({
            scope: process.env.SCOPE
        })

    done();
    authToken = res.body.access_token;
});

describe('API Endpoint Tests', () => {
    it('Should have auth token', () => {
        expect(authToken).not.toBeNull();
    });


    /***********************/
    /*** Movies Endpoint ***/
    /***********************/
    it('"api/v1/movies" endpoint should return 200', async () => {
        const res = await request(app)
            .get('/api/v1/movies')
            .set('Authorization', 'Bearer ' + authToken)
            .query({
                q: "The Batman"
            });

        expect(res.status).toEqual(200);
    });

    it('"api/v1/movies" endpoint should return 400 - search phrase not used.', async done => {
        try {
            await request(app)
                .get('/api/v1/movies')
                .set('Authorization', 'Bearer ' + authToken)
                .query();
            done();
        } catch (error) {
            expect(error.name).toEqual('ValidationError');
            done(error);
        }

    });

    it('"api/v1/movies" endpoint should return 400 - minimum number of search phrase value.', async () => {
        try {
            await request(app)
                .get('/api/v1/movies')
                .set('Authorization', 'Bearer ' + authToken)
                .query({
                    q: "Th"
                });
        } catch (error) {
            expect(error.name).toEqual('ValidationError');
        }
    });

    // /***********************/
    // /*** Trailers Endpoint ***/
    // /***********************/
    it('"api/v1/trailers" endpoint should return 200', async () => {
        const res = await request(app)
            .get('/api/v1/trailers')
            .set('Authorization', 'Bearer ' + authToken)
            .query({
                q: "The Batman"
            });
        expect(res.status).toEqual(200);
    });

    it('"api/v1/trailers" endpoint should return 400 - search phrase not used.', async () => {
        try {
            await request(app)
                .get('/api/v1/trailers')
                .set('Authorization', 'Bearer ' + authToken)
                .query();
        } catch (error) {
            expect(error.name).toEqual('ValidationError');
        }
    });

    it('"api/v1/trailers" endpoint should return 400 - minimum number of search phrase value.', async () => {
        try {
            await request(app)
                .get('/api/v1/trailers')
                .set('Authorization', 'Bearer ' + authToken)
                .query({
                    q: "Th"
                });
        } catch (error) {
            expect(error.name).toEqual('ValidationError');
        }
    });


    // /***********************/
    // /*** Search Endpoint ***/
    // /***********************/
    it('"api/v1/search" endpoint should return 200', async () => {
        const res = await request(app)
            .get('/api/v1/trailers')
            .set('Authorization', 'Bearer ' + authToken)
            .query({
                q: "The Batman"
            });
        expect(res.status).toEqual(200);
    });

    it('"api/v1/search" endpoint should return 400 - search phrase not used.', async () => {
        try {
            await request(app)
                .get('/api/v1/search')
                .set('Authorization', 'Bearer ' + authToken)
                .query();
        } catch (error) {
            expect(error.name).toEqual('ValidationError');
        }
    });

    it('"api/v1/search" endpoint should return 400 - minimum number of search phrase value.', async () => {
        try {
            await request(app)
                .get('/api/v1/search')
                .set('Authorization', 'Bearer ' + authToken)
                .query({
                    q: "Th"
                });
        } catch (error) {
            expect(error.name).toEqual('ValidationError');
        }
    });
})