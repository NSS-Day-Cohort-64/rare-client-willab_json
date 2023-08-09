export const listCategory = (category) => {
    return fetch("http://localhost:8088/categories", {
    }).then(res => res.json())
}

export const newCategory = (category) => {
    return fetch(`http://localhost:8088/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .then(() => {
        })
    }