export function createResource(fetchFunction) {
    let status = "pending";
    let result;
    const suspender = fetchFunction()
        .then((res) => res.json())
        .then(
            (data) => {
                status = "success";
                result = data;
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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/teacher`)
);

export const chatsResource = createResource(() =>
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chats`)
);