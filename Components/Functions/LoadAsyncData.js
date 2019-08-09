import { AsyncStorage } from 'react-native';

function loadAsyncDataHelper(key, stateKey) {
    return new Promise (function (resolve, reject) {
        AsyncStorage.getItem(key).then((item) => resolve({[stateKey]: item}));
    });
}

function loadAsyncData(self, UserKeys) {
    const promises = [];
    for (var item in UserKeys) {
        if (UserKeys.hasOwnProperty(item)) {
            promises.push(loadAsyncDataHelper(UserKeys[item]['asyncKey'], UserKeys[item]['stateKey']));
        }
    }
    Promise.all(promises).then((res) => {
        res.forEach((item) => {
            for (key in item) {
                if (item.hasOwnProperty(key)) {
                    self.setState({[key]: item[key]})
                }
            }
        })
    })
}

export default loadAsyncData;