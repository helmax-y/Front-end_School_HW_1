import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Navigation from '@helmax-y/tiktuk-navigation';

import useFetch from '../../api/useFetch';
import getTrendingFeed from '../../api/getTrendingFeed';
import StyledFeed from './StyledFeed';
import Loader from '../../components/common/Loader';
import ErrorToast from '../../components/common/ErrorToast';

const Feed = function () {
    const [currentPage, setCurrentPage] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const {
        request,
        response: posts = [],
        isError,
        isLoading,
        setIsLoading,
    } = useFetch();

    useEffect(() => {
        getTrendingFeed(request);
    }, []);

    useEffect(() => {
        setIsPaused(false);
        setIsLoading(true);
    }, [currentPage]);

    const handlePausePlay = ({ target }) => {
        if (target.readyState < 3) {
            return;
        }

        if (target.paused) {
            target.play();
            setIsPaused(false);
        } else {
            target.pause();
            setIsPaused(true);
        }
    };

    const post = posts[currentPage - 1] || {};

    return (
        <StyledFeed>
            <article className="video">
                <video
                    src={post.video?.playAddr}
                    className="player"
                    controls={false}
                    autoPlay
                    loop
                    playsInline
                    onClick={handlePausePlay}
                    onPlaying={() => setIsLoading(false)}
                    onWaiting={() => setIsLoading(true)}
                />

                {isLoading && <Loader />}
                {isPaused && (
                    <PlayArrowIcon className="play-icon" fontSize="large" />
                )}

                <p className="post-description">{post.desc}</p>

                <Link className="author" to={post.author?.uniqueId || '/'}>
                    <Avatar
                        src={post.author?.avatarThumb}
                        alt={post.author?.nickname}
                        sx={{ width: 56, height: 56 }}
                    />
                    <p className="nickname">{post.author?.nickname}</p>
                </Link>

                <section className="stats">
                    <div className="likes">
                        <FavoriteBorderIcon />
                        <p>{post.stats?.diggCount}</p>
                    </div>
                    <div className="comments">
                        <ChatBubbleOutlineIcon />
                        <p>{post.stats?.commentCount}</p>
                    </div>
                </section>
            </article>

            <Navigation
                pagesCount={posts.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <ErrorToast open={isError} />
        </StyledFeed>
    );
};

export default Feed;
