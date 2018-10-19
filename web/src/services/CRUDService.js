import {selectedKey, refreshKeys, tempKey} from '../components/KeyList';
import {getClient} from './BluzelleService'
import {observe} from 'mobx';

export const activeValue = observable(undefined);


// Worry about undoing later
// But this is where we'd do it.

observe(selectedKey, ({newValue, oldValue}) => {

	activeValue.set(undefined);


	if(newValue !== undefined) {

		// We can say that if the value is an object, 
		// wrap in an OMR. See: JSONEditor.js.

		getClient().read(newValue).then(value =>
			activeValue.set(value));

	}

});


export const save = () => 
    getClient().update(selectedKey.get(), activeValue.get());


export const remove = () => new Promise(resolve => {

    const sk = selectedKey.get(); 
    selectedKey.set();

    tempKey.set(sk);

    return removeKey(sk).then(() => {
        reload().then(resolve);
    });

});


export const rename = (oldKey, newKey) => new Promise(resolve => {

    getClient().read(oldKey).then(v => {

        getClient().remove(oldKey).then(() => {

            getClient().update(newKey, v).then(() => {

            	const s = selectedKey;

                if(selectedKey.get() === oldKey) {

                    selectedKey.set(newKey);

                }

                reload().then(resolve);

            });

        });

    }); 

});
    

export const reload = () => new Promise(resolve => {

    refreshKeys().then(keys => {

        const sk = selectedKey.get(); 
        selectedKey.set();

        if(keys.includes(sk)) {

            selectedKey.set(sk);

        }

        resolve();

    });

});