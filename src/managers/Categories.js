export const listCategory = (category) => {
    return fetch("http://localhost:8088/categories", {
    }).then(res => res.json())
}

