import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import useFetch from '../../api/useFetch';
import getUserFeed from '../../api/getUserFeed';
import StyledProfile from './StyledProfile';
import VideoGrid from '../../components/VideoGrid';
import ErrorToast from '../../components/common/ErrorToast';

const Profile = function () {
    const { userId } = useParams();

    const {
        request,
        response: { user = {}, stats = {} } = {},
        isError,
        setIsError,
    } = useFetch();

    useEffect(() => {
        getUserFeed(request, userId);
    }, [userId]);

    return (
        <StyledProfile>
            <section className="user-info">
                <Avatar
                    className="avatar"
                    src={user.avatarThumb}
                    alt={user.nickname}
                    sx={{ width: 100, height: 100 }}
                />
                <div className="stats">
                    <div>
                        <p>following</p>
                        <p>{stats.followingCount}</p>
                    </div>
                    <div>
                        <p>followers</p>
                        <p>{stats.followerCount}</p>
                    </div>
                    <div>
                        <p>likes</p>
                        <p>{stats.heartCount}</p>
                    </div>
                </div>
            </section>

            <VideoGrid setIsError={setIsError} />

            <Link className="link" to="/">
                <p>Feed</p>
            </Link>
            <Link className="link-mobile" to="/">
                Feed
            </Link>

            <ErrorToast open={isError} />
        </StyledProfile>
    );
};

export default Profile;
