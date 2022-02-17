const getUserFeed = (fetch, userId) => {
    fetch(`https://tiktok33.p.rapidapi.com/user/info/${userId}`);
};

export default getUserFeed;
