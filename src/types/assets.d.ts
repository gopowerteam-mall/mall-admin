declare module 'virtual:assets' {
    type assetsType = {
        images: {
            login_bg: string
            welcome_bg: string
        }
    }
    export const assets: assetsType
}
