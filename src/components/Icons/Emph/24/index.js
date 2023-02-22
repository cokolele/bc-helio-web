const wrapper = (path) => (props => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="100%" {...props}>
        {path}
    </svg>
))

export const IconAdd = wrapper(
    <path d="M10.93,19.43v-6.05H4.88v-2.65h6.05V4.68h2.65v6.05h6.05v2.65h-6.05v6.05H10.93z" />
)