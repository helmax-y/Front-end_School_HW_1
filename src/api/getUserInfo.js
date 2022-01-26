const getUserInfo = (fetch, userId) => {
    fetch(`https://tiktok33.p.rapidapi.com/user/feed/${userId}`);
};

export default getUserInfo;
