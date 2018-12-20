import {bluzelle} from 'bluzelle';
import {observable} from 'mobx';


const log = observable();

const url_params = window && new URLSearchParams(window.location.search);


let bz;

module.exports = {

    createClient: config => {

        bz = bluzelle(config);

        return bz;

    },

    hasClient: () => {
        return !!bz;
    },

    getClient: () => {

        if(!bz) {
            throw new Error('trying to get a client that wasn\'t created');
        }

        return bz;

    },

    log

};