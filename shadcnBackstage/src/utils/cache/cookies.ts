const CacheKey = {
    TOKEN: '',
}

export const getToken = () => {
    return localStorage.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
    localStorage.set(CacheKey.TOKEN, token)
}
export const removeToken = () => {
    localStorage.remove(CacheKey.TOKEN)
}