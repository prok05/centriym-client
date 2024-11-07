// @ts-ignore
export function createResource(fetchFunction, source) {
    let status = "pending";
    // @ts-ignore
    let result;
    // @ts-ignore
    const suspender = fetchFunction()
        // @ts-ignore
        .then((res) => {
            if (!res.ok) {
                throw new Error("Не удалось загрузить данные");
            }
            return res.json()
        })
        .then(
            // @ts-ignore
            (data) => {
                status = "success";
                result = data;
                console.log(data)
            },
            // @ts-ignore
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
                // @ts-ignore
                throw result;
            }
            // @ts-ignore
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