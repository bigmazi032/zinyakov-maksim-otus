function getPath(element) {
    let currentSelectorElement = getSelector(element); // получаем селектор узла
    let parent = element.parentElement; // получаем родительский узел
    let parentSelectorElement = getSelector(parent); // получаем селектор родителя
    if (isNodeNotExclusive(parent, parentSelectorElement, currentSelectorElement)) {// если есть ноды с таким же селектором
        currentSelectorElement = addNumSuffixToSelector(getNodePosition(element), currentSelectorElement); // вычисляем ее место положение
    }
    if (parent.tagName == 'BODY' || parent.tagName == 'HEAD') { //пришли к началу. пора назад
        return parentSelectorElement +'>'+ currentSelectorElement;
    } else { // запускаем следующий круг
        return getPath(parent) +'>'+ currentSelectorElement
    }

    function isNodeNotExclusive(parentElement, parentSelector, currentSelectorElement) {
        return  parentElement.querySelectorAll(parentSelector+'>'+currentSelectorElement).length > 1
    }

    function getNodePosition(node) {
        let i = 1;
        while (node = node.previousElementSibling)
            ++i;
        return i;
    }

    function addNumSuffixToSelector (num, selectorElement) {
        return selectorElement + `:nth-child(${num})`
    }

    function getSelector(element) {
        const classNameStr = element.classList ?  [].reduce.call(element.classList, ((r,s)=>r+'.'+s),'') : '';
        return element.tagName + classNameStr;
    }
}

