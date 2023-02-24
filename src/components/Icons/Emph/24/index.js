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

export const IconUploadFile = wrapper(
    <path d="M426 886h104V716l59 59 70-70-181-181-181 181 70 70 59-59v170Zm-190 122q-43.725 0-74.863-31.138Q130 945.725 130 902V250q0-43.725 31.137-74.862Q192.275 144 236 144h312l282 281v477q0 43.725-31.138 74.862Q767.725 1008 724 1008H236Zm260-530V250H236v652h488V478H496ZM236 250v228-228 652-652Z" />
)
