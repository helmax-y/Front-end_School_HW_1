import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StyledVideoGrid from './StyledVideoGrid';
import Loader from '../common/Loader';
import useFetch from '../../api/useFetch';
import getUserInfo from '../../api/getUserInfo';

const VideoGrid = function ({ setIsError }) {
    const { userId } = useParams();

    const {
        request,
        response: videos = [],
        isLoading,
        isError,
    } = useFetch();

    useEffect(() => {
        getUserInfo(request, userId);
    }, []);

    if (isError) {
        setIsError(true);
    }

    return (
        <StyledVideoGrid className="video-grid">
            {videos.map(({ id, video, stats, desc }) => (
                <div key={id} className="flex-item">
                    <img
                        className="image"
                        src={video?.cover}
                        alt={`TikTuk: ${desc}`}
                    />

                    <p className="play-count">{stats?.playCount}</p>
                </div>
            ))}
            {isLoading && <Loader />}
        </StyledVideoGrid>
    );
};

export default VideoGrid;
