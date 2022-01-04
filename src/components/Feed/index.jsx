import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import getData from '../../api/getData';
import StyledFeed from './StyledFeed';
import Loader from '../../common/Loader';
import ErrorToast from '../../common/ErrorToast';
import Navigation from '../Navigation';

const Feed = function () {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getData('https://tiktok33.p.rapidapi.com/trending/feed')
            .then((data) => setPosts(data))
            .catch(() => setIsError(true));
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
                    src={post.videoUrl}
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

                <p className="post-description">{post.text}</p>

                <Link className="author" to={post.authorMeta?.name || '/'}>
                    <Avatar
                        src={post.authorMeta?.avatar}
                        alt={post.authorMeta?.nickName}
                        sx={{ width: 56, height: 56 }}
                    />
                    <p className="nickname">{post.authorMeta?.nickName}</p>
                </Link>

                <section className="stats">
                    <div className="likes">
                        <FavoriteBorderIcon />
                        <p>{post.diggCount}</p>
                    </div>
                    <div className="comments">
                        <ChatBubbleOutlineIcon />
                        <p>{post.commentCount}</p>
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
