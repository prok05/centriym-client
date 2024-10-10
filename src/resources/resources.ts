export function createResource(fetchFunction, source) {
    let status = "pending";
    let result;
    const suspender = fetchFunction()
        .then((res) => {
            if (!res.ok) {
                throw new Error("Не удалось загрузить данные");
            }
            return res.json()
        })
        .then(
            (data) => {
                status = "success";
                result = data;
                console.log(data)
            },
            (error) => {
                status = "error";
                result = error;
            }
        );

    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            }
            return result;
        },
    };
}

export const teachersResource = createResource(() =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/teachers`, {
        method: "GET",
        credentials: "include"
    })
, "teachers");

// export const chatsResource = createResource(() =>
//     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`, {
//         method: "GET",
//         credentials: "include"
//     })
// , "chats");