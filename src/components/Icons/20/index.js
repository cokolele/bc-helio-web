const wrapper = path => props => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="1.25rem" width="1.25rem" {...props}>
        {path}
    </svg>
)


export const IconSwapVert = wrapper(
    <path d="M6.75 11V4.875L4.562 7.062 3.5 6l4-4 4 4-1.062 1.062L8.25 4.875V11Zm5.75 7-4-4 1.062-1.062 2.188 2.187V9h1.5v6.125l2.188-2.187L16.5 14Z" />
)