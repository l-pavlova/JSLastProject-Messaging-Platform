
const api = {
    //userControler
    getUser: userId => `/user/${userId}`,
    addUser: () => `/user/register`,
    logginUser: () => `/user/login`,
    getFriend: friendId => `/user/friend/${friendId}`,
    //MessagingControler
    getChat: chatId => `/chat/${chatId}`,
    sendMessage: () => `/chat/sendMessage`,
}

export default api;
