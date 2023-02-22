const wrapper = (path) => (props =>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" height="100%" width="1.5rem" {...props}>
        {path}
    </svg>
)

export const IconAdd = wrapper(
    <path d="M427 870V628H185V522h242V280h106v242h242v106H533v242H427Z" />
)

export const IconExpandMore = wrapper(
    <path d="M480 731 220 471l75-75 185 185 185-185 75 75-260 260Z" />
)