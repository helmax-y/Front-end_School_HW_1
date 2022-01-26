import createSuccessfulPromise from '../helpers/createSuccessfulPromise';
import userFeed from '../assets/mockData/userFeed.json';
import userInfo from '../assets/mockData/userInfo.json';

class ResultObject {
    constructor(data) {
        this.data = data;
        this.ok = true;
    }

    json() {
        return createSuccessfulPromise(this.data);
    }
}

const prepareSuitableMock = (url) => {
    if (url.includes('feed')) {
        return new ResultObject(userFeed.itemList);
    }

    if (url.includes('info')) {
        return new ResultObject(userInfo);
    }

    return new ResultObject({});
};

export default prepareSuitableMock;
