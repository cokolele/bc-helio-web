const wrapper = path => props => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="1.25rem" width="1.25rem" {...props}>
        {path}
    </svg>
)

export const IconSwapVert = wrapper(
    <path d="M6.75 11V4.875L4.562 7.062 3.5 6l4-4 4 4-1.062 1.062L8.25 4.875V11Zm5.75 7-4-4 1.062-1.062 2.188 2.187V9h1.5v6.125l2.188-2.187L16.5 14Z" />
)

export const IconViewAgenda = wrapper(
    <path d="M4.5 9q-.604 0-1.052-.438Q3 8.125 3 7.5v-3q0-.604.448-1.052Q3.896 3 4.5 3h11q.625 0 1.062.448Q17 3.896 17 4.5v3q0 .625-.438 1.062Q16.125 9 15.5 9Zm0-1.5h11v-3h-11v3Zm0 9.5q-.604 0-1.052-.438Q3 16.125 3 15.5v-3q0-.604.448-1.052Q3.896 11 4.5 11h11q.625 0 1.062.448.438.448.438 1.052v3q0 .625-.438 1.062Q16.125 17 15.5 17Zm0-1.5h11v-3h-11v3Zm0-11v3-3Zm0 8v3-3Z" />
)