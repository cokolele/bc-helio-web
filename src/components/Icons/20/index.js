const wrapper = (path) => (props =>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" height="100%" width="1.25rem" {...props}>
        {path}
    </svg>
)


export const IconSwapVert = wrapper(
    <path d="M324 624V330L219 435l-51-51 192-192 192 192-51 51-105-105v294h-72Zm276 336L408 768l51-51 105 105V528h72v294l105-105 51 51-192 192Z" />
)