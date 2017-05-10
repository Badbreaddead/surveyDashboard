// import fetch from 'isomorphic-fetch';

export const TEST_ACTION = 'TEST_ACTION';

export default class Actions {

    testAction = (products) => {
        return {
            type: TEST_ACTION,
            payload: products
        };
    };

}
