'use strict'

/**
 * Authorization middleware that uses OKTA Auth Service
 */

import OktaJwtVerifier from '@okta/jwt-verifier';
import AuthorizationError from '../error/authorizationError';

module.exports = async (req, res, next) => {
    
    try {
        // this should be out of this scope but it has issues with env variables does not get intialized before start
        var oktaJwtVerifier = new OktaJwtVerifier({
            issuer: process.env.ISSUER,
            clientId: process.env.CLIENT_ID,
            cacheMaxAge: 60 * 60 * 1000, // 1 hour
            jwksRequestsPerMinute: 1000
        });

        //check if request header has authorization header
        const {
            authorization
        } = req.headers
        if (!authorization) throw new AuthorizationError('You must send an Authorization header');

        // check if auth type Bearer
        const [authType, token] = authorization.trim().split(' ');
        if (authType !== 'Bearer') throw new AuthorizationError('Expected a Bearer token');

        // verifying access token
        const {
            claims
        } = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
        if (!claims.scp.includes(process.env.SCOPE)) {
            throw new AuthorizationError('Could not verify the proper scope');
        }
        
        next();
    } catch (error) {       
        next(error)
    }
}