import {BluzelleClient} from 'bluzelle';
import {observable} from 'mobx';


const log = observable();


let bz;

module.exports = {

    createClient: (a1, a2) => {

        bz = new BluzelleClient(a1, a2, (...args) => log.set(args));

        return bz;

    },

    getClient: () => {

        if(!bz) {
            throw new Error('trying to get a client that wasn\'t created');
        }

        return bz;

    },

    log

};