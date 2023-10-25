module.exports = {
    isArrayOfStrings: function(value) {
        if(!Array.isArray(value)) return false
        for(let i = 0; i < value.length; i++) {
            if(typeof value[i] !== 'string') return false
        }
        return true
    },
    isArrayOfUniqueStrings: function(value) {
        if(!Array.isArray(value)) return false
        for(let j = 0; j < value.length; j++) {
            if(typeof value[j] !== 'string') return false
            for(let i = 0; i < value.length; i++) {
                if(j !== i && value[j] === value[i]) return false
            }
        }
        return true
    },
    isArrayOfNumbers: function(value) {
        if(!Array.isArray(value)) return false
        for(let i = 0; i < value.length; i++) {
            if(typeof value[i] !== 'number') return false
        }
        return true
    },
    isArrayOfUniqueNumbers: function(value) {
        if(!Array.isArray(value)) return false
        for(let j = 0; j < value.length; j++) {
            if(typeof value[j] !== 'number') return false
            for(let i = 0; i < value.length; i++) {
                if(j !== i && value[j] === value[i]) return false
            }
        }
        return true
    },
    isArrayOfIntNumbers: function(value) {
        if(!Array.isArray(value)) return false
        for(let i = 0; i < value.length; i++) {
            if(typeof value[i] !== 'number') return false
            if(!Number.isInteger(value[i])) return false
        }
        return true
    },
    isArrayOfUniqueIntNumbers: function(value) {
        if(!Array.isArray(value)) return false
        for(let j = 0; j < value.length; j++) {
            if(typeof value[j] !== 'number') return false
            if(!Number.isInteger(value[j])) return false
            for(let i = 0; i < value.length; i++) {
                if(j !== i && value[j] === value[i]) return false
            }
        }
        return true
    },
    washObject: async function(obj) {
        for(let key of Object.keys(obj)) {
            switch(obj[key]) {
                case undefined:
                    delete obj[key];
                    break;
                case null:
                    delete obj[key];
                    break;
                case '':
                    delete obj[key];
                    break;
                default:
                    break;
            }
        }
        return obj
    },
    arrayContainSpecifiedString: function(array,string) {
        if(!Array.isArray(array)) return false
        if(typeof string !== 'string') return false
        for (let i = 0 ; i < array.length ; i++) {
            if(typeof array[i] !== 'string') {
                if(array[i].toString() === string) return true
                continue
            }
            if(array[i] === string) return true
        }
        return false
    },
    arrayContainSpecifiedNumber: function(array,number) {
        if(!Array.isArray(array)) return false
        if(typeof number !== 'number') return false
        for (let i = 0 ; i < array.length ; i++) {
            if(array[i] === number) return true
        }
        return false
    }
}