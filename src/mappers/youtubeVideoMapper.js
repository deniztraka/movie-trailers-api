'use strict'

/**
 * Video Mapper
 * Responsible for mapping youtube video model to our domain model.
 */
import VideoModel from "../models/videoModel";

export const YoutubeVideoMapper = {
    map(youtubeVideo) {
        var videoModel = new VideoModel();
        videoModel.id = youtubeVideo.id.videoId;
        videoModel.publishedAt = youtubeVideo.snippet.publishedAt;
        videoModel.title = youtubeVideo.snippet.title;
        videoModel.description = youtubeVideo.snippet.description;
        videoModel.thumbnails = youtubeVideo.snippet.thumbnails;
        return videoModel;
    }
};