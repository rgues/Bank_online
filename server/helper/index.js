
const  compare = (v1, v2) => {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

const sort = (arr, column, direction) => {
    if (direction === '') {
        return arr;
    } else {
        return [...arr].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

module.exports = {sort};