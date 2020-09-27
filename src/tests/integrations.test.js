import HttpService from '../services/httpservice';
import dotenv from 'dotenv';
dotenv.config();

const youtubeServiceOptions = {
    uri: encodeURI('https://' + process.env.YOUTUBE_API_HOST + '/youtube/v3/search'),
    json: true,
    method: 'GET',
    qs: {
        key: process.env.YOUTUBE_API_KEY
    }
};

const imdbServiceOptions = {
    uri: encodeURI('https://' + process.env.IMDB_API_HOST + '/title/find'),
    json: true,
    method: 'GET',
    headers: {
        "x-rapidapi-host": process.env.IMDB_API_HOST,
        "x-rapidapi-key": process.env.IMDB_API_KEY,
        "useQueryString": true
    }
};

/**
 * Service Integration Tests
 */
describe('## Service Integration Tests ## ', () => {
    it('Youtube service should return something ', async done => {
        var youtubeService = new HttpService(youtubeServiceOptions, false);
        var response = await youtubeService.sendRequest({
            q: "The Batman"
        });
        expect(response.items.length).toBeGreaterThan(0);
        done();
    });

    it('Imdb service should return something ', async () => {
        var imdbService = new HttpService(imdbServiceOptions, false);
        const response = await imdbService.sendRequest({
            q: "The Batman"
        });        
        expect(response.results.length).toBeGreaterThan(0);
    });
});