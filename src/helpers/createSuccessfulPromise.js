const createSuccessfulPromise = (promiseValue) => new Promise(
    (resolve) => {
        resolve(promiseValue);
    }
);

export default createSuccessfulPromise;
