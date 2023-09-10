export function findItemByAttribute(childElement: any, attr: string) {
    let currentElement = childElement;

    while (currentElement) {
        const dataColumnAttribute = currentElement.getAttribute(attr);
        if (dataColumnAttribute) {
            return dataColumnAttribute;
        }

        currentElement = currentElement.parentNode;
    }

    return null; // Return null if no grandparent with data-column attribute is found
}

export function findColumn(childElement: any) {
    return findItemByAttribute(childElement, 'data-column')
}

export function findTaskIndex(childElement: any) {
    return findItemByAttribute(childElement, 'data-index')
}
