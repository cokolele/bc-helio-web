const wrapper = path => props => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="1.25rem" width="1.25rem" {...props}>
        {path}
    </svg>
)

export const IconArrowForwardIos = wrapper(
    <path d="m5.938 18.5-1.771-1.771 6.75-6.75-6.75-6.75 1.771-1.771 8.52 8.521Z" />
)

export const IconCheckCircleStatus = wrapper(
    <>
        <circle fill="var(--color-green-status)" cx="10" cy="10" r="7" />
        <path d="m8.938 13.417 5.416-5.396-1.437-1.438-3.979 3.959L7.125 8.75l-1.437 1.438ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.385.678-1.573 1.865-2.761Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.385.667 1.573.667 2.761 1.854Q17.333 5.042 18 6.615q.667 1.573.667 3.385 0 1.792-.667 3.365-.667 1.573-1.854 2.76-1.188 1.187-2.761 1.865-1.573.677-3.385.677Zm0-2.042q2.771 0 4.698-1.927 1.927-1.927 1.927-4.698 0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.771 0-4.698 1.927Q3.375 7.229 3.375 10q0 2.771 1.927 4.698Q7.229 16.625 10 16.625ZM10 10Z" />
    </>
)

export const IconScheduleStatus = wrapper(
    <>
        <circle fill="var(--color-yellow-status)" cx="10" cy="10" r="7" />
        <path d="m12.667 13.792 1.437-1.438-3.062-3.104V4.917H9v5.208ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.396.678-1.583 1.865-2.76Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.396.667 1.583.667 2.76 1.844Q17.333 5.021 18 6.604q.667 1.584.667 3.396 0 1.792-.667 3.365-.667 1.573-1.844 2.76-1.177 1.187-2.76 1.865-1.584.677-3.396.677ZM10 10Zm0 6.625q2.771 0 4.698-1.937Q16.625 12.75 16.625 10q0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.75 0-4.688 1.927Q3.375 7.229 3.375 10q0 2.75 1.937 4.688Q7.25 16.625 10 16.625Z" />
    </>
)

export const IconHistoryStatus = wrapper(
    <>
        <circle fill="var(--color-yellow-status)" cx="10" cy="10" r="7" />
        <path d="M10.312 17.667q-3.25 0-5.52-2.219Q2.521 13.229 2.562 10h2.084q-.063 2.333 1.604 3.979t4.021 1.646q2.291 0 3.937-1.656 1.646-1.657 1.646-3.969 0-2.292-1.625-3.958-1.625-1.667-3.917-1.667-1.437 0-2.656.615-1.218.614-1.948 1.718h2.438V8.75H2.104V2.708h2.042v2.75q1-1.5 2.625-2.312 1.625-.813 3.541-.813 1.584 0 2.959.605 1.375.604 2.396 1.645 1.021 1.042 1.625 2.438.604 1.396.604 2.979 0 1.583-.604 2.979-.604 1.396-1.625 2.438-1.021 1.041-2.396 1.645-1.375.605-2.959.605Zm1.584-4.417-3.167-3.125V5.667h2.042V9.25l2.562 2.562Z" />
    </>
)

export const IconCancelStatus = wrapper(
    <>
        <circle fill="var(--color-red-status)" cx="10" cy="10" r="7" />
        <path d="M7.021 14.417 10 11.438l2.979 2.979 1.438-1.438L11.438 10l2.979-2.979-1.438-1.438L10 8.562 7.021 5.583 5.583 7.021 8.562 10l-2.979 2.979ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.385.678-1.573 1.865-2.761Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.385.667 1.573.667 2.761 1.854Q17.333 5.042 18 6.615q.667 1.573.667 3.385 0 1.792-.667 3.365-.667 1.573-1.854 2.76-1.188 1.187-2.761 1.865-1.573.677-3.385.677Zm0-2.042q2.771 0 4.698-1.927 1.927-1.927 1.927-4.698 0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.771 0-4.698 1.927Q3.375 7.229 3.375 10q0 2.771 1.927 4.698Q7.229 16.625 10 16.625ZM10 10Z" />
    </>
)

export const IconCheck = wrapper(
    <path d="m8.229 14.521-4.021-4.042 1.417-1.417 2.604 2.584 6.188-6.167 1.416 1.438Z" />
)

export const IconFiberManualRecordStatusGreen = wrapper(
    <>
        <circle fill="var(--color-green-status)" cx="10" cy="10" r="5" />
        <path d="M10 10Zm0 5.625q-2.333 0-3.979-1.646T4.375 10q0-2.333 1.646-3.979T10 4.375q2.333 0 3.979 1.646T15.625 10q0 2.333-1.646 3.979T10 15.625Zm0-2.042q1.5 0 2.542-1.052 1.041-1.052 1.041-2.531 0-1.5-1.052-2.542Q11.479 6.417 10 6.417q-1.5 0-2.542 1.052Q6.417 8.521 6.417 10q0 1.5 1.052 2.542Q8.521 13.583 10 13.583Z" />
    </>
)

export const IconFiberManualRecordStatusYellow = wrapper(
    <>
        <circle fill="var(--color-yellow-status)" cx="10" cy="10" r="5" />
        <path d="M10 10Zm0 5.625q-2.333 0-3.979-1.646T4.375 10q0-2.333 1.646-3.979T10 4.375q2.333 0 3.979 1.646T15.625 10q0 2.333-1.646 3.979T10 15.625Zm0-2.042q1.5 0 2.542-1.052 1.041-1.052 1.041-2.531 0-1.5-1.052-2.542Q11.479 6.417 10 6.417q-1.5 0-2.542 1.052Q6.417 8.521 6.417 10q0 1.5 1.052 2.542Q8.521 13.583 10 13.583Z" />
    </>
)

export const IconFiberManualRecordStatusGrey = wrapper(
    <>
        <circle fill="var(--color-black-primary-disabled)" cx="10" cy="10" r="5" />
        <path d="M10 10Zm0 5.625q-2.333 0-3.979-1.646T4.375 10q0-2.333 1.646-3.979T10 4.375q2.333 0 3.979 1.646T15.625 10q0 2.333-1.646 3.979T10 15.625Zm0-2.042q1.5 0 2.542-1.052 1.041-1.052 1.041-2.531 0-1.5-1.052-2.542Q11.479 6.417 10 6.417q-1.5 0-2.542 1.052Q6.417 8.521 6.417 10q0 1.5 1.052 2.542Q8.521 13.583 10 13.583Z" />
    </>
)

export const IconSearch = wrapper(
    <path d="m16.125 17.542-5.021-5.021q-.625.437-1.469.687-.843.25-1.697.25-2.292 0-3.896-1.604T2.438 7.958q0-2.291 1.604-3.895 1.604-1.605 3.896-1.605 2.291 0 3.895 1.605 1.605 1.604 1.605 3.895 0 .854-.23 1.646-.229.792-.687 1.458l5.041 5.042Zm-8.187-6.125q1.458 0 2.458-1 1-1 1-2.459 0-1.458-1-2.458-1-1-2.458-1-1.459 0-2.459 1t-1 2.458q0 1.459 1 2.459t2.459 1Z" />
)

export const IconExpandMore = wrapper(
    <path d="M10 13.479 4.583 8.062l1.459-1.458L10 10.562l3.958-3.958 1.459 1.458Z" />
)