"use strict";
import IMDbService from '../services/imdbService';
import YoutubeService from '../services/youtubeService';

const registry = {
    imdb: new IMDbService(),
    youtube: new YoutubeService()
};

/**
 * Used for getting services registered on this class
 * Stands for service domain that knows every service withing application
 */
export default class LocalServiceRegistry {
    constructor() {
    };

    /**
     * Prepares an HttpService object by getting it from registry
     * 
     * @param {string} service service name
     * @returns {object} HttpService object
     */
    get(service) {
        return registry[service];
    }
}