const fs = require('fs');


async function createTree(path) {
    const dir = await fs.promises.opendir(path);
    const tree = [];
    for await (const dirent of dir) {
        let o = {name:dirent.name};
        if (dirent.isDirectory()) {
            o.list = await createTree(`${path}${dirent.name}/`);
            tree.push(o);
        } else
            tree.push(o);
    }
    return tree;
}

createTree('./').then(r=>printTree(r)).catch(console.error);

const de = '─┬';
const le = '└';
const fe = '──';
const nl = '├';
const ll = '│ ';
const ee = '  ';
const dirSuffix = '\\'

function printTree(tree, prefix = '') {
    for (let i = 0; i < tree.length; i++){
        let view = prefix;
        if (isLast(i)) {
            view += le;
        } else {
            view += nl;
        }
        if (isNotEmptyDirectory(i)){
            view += de;
        } else {
            view += fe;
        }
        view += tree[i].name;
        if (isDirectory(i)) {
            view += dirSuffix;
        }
        console.log(view);
        if (isNotEmptyDirectory(i)){
            let pre = prefix;
            if (isLast(i)) {
                pre += ee;
            } else {
                pre += ll;
            }
            printTree(tree[i].list, pre)
        }
    }

    function isLast(i) {
        return i === (tree.length-1)
    }

    function isDirectory(i) {
        return !!tree[i].list
    }
    function isNotEmptyDirectory(i) {
        return !!tree[i].list && !!tree[i].list.length
    }
}