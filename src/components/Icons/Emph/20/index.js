const wrapper = (path) => (({ className }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1.25rem" height="100%" className={className}>
        {path}
    </svg>
))

export const IconArrowForwardIos = wrapper(
    <path d="m5.938 18.5-1.771-1.771 6.75-6.75-6.75-6.75 1.771-1.771 8.52 8.521Z" />
)

export const IconCheckCircle = wrapper(
    <path d="m8.938 13.417 5.416-5.396-1.437-1.438-3.979 3.959L7.125 8.75l-1.437 1.438ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.385.678-1.573 1.865-2.761Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.385.667 1.573.667 2.761 1.854Q17.333 5.042 18 6.615q.667 1.573.667 3.385 0 1.792-.667 3.365-.667 1.573-1.854 2.76-1.188 1.187-2.761 1.865-1.573.677-3.385.677Zm0-2.042q2.771 0 4.698-1.927 1.927-1.927 1.927-4.698 0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.771 0-4.698 1.927Q3.375 7.229 3.375 10q0 2.771 1.927 4.698Q7.229 16.625 10 16.625ZM10 10Z" />
)

export const IconCheckCircleStatus = wrapper(
    <>
        <circle fill="var(--color-green-status)" cx="10" cy="10" r="8.7" />
        <path d="m8.938 13.417 5.416-5.396-1.437-1.438-3.979 3.959L7.125 8.75l-1.437 1.438ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.385.678-1.573 1.865-2.761Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.385.667 1.573.667 2.761 1.854Q17.333 5.042 18 6.615q.667 1.573.667 3.385 0 1.792-.667 3.365-.667 1.573-1.854 2.76-1.188 1.187-2.761 1.865-1.573.677-3.385.677Zm0-2.042q2.771 0 4.698-1.927 1.927-1.927 1.927-4.698 0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.771 0-4.698 1.927Q3.375 7.229 3.375 10q0 2.771 1.927 4.698Q7.229 16.625 10 16.625ZM10 10Z" />
    </>
)

export const IconSchedule = wrapper(
    <path d="m12.667 13.792 1.437-1.438-3.062-3.104V4.917H9v5.208ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.396.678-1.583 1.865-2.76Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.396.667 1.583.667 2.76 1.844Q17.333 5.021 18 6.604q.667 1.584.667 3.396 0 1.792-.667 3.365-.667 1.573-1.844 2.76-1.177 1.187-2.76 1.865-1.584.677-3.396.677ZM10 10Zm0 6.625q2.771 0 4.698-1.937Q16.625 12.75 16.625 10q0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.75 0-4.688 1.927Q3.375 7.229 3.375 10q0 2.75 1.937 4.688Q7.25 16.625 10 16.625Z" />
)

export const IconScheduleStatus = wrapper(
    <>
        <circle fill="var(--color-yellow-status)" cx="10" cy="10" r="8.7" />
        <path d="m12.667 13.792 1.437-1.438-3.062-3.104V4.917H9v5.208ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.396.678-1.583 1.865-2.76Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.396.667 1.583.667 2.76 1.844Q17.333 5.021 18 6.604q.667 1.584.667 3.396 0 1.792-.667 3.365-.667 1.573-1.844 2.76-1.177 1.187-2.76 1.865-1.584.677-3.396.677ZM10 10Zm0 6.625q2.771 0 4.698-1.937Q16.625 12.75 16.625 10q0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.75 0-4.688 1.927Q3.375 7.229 3.375 10q0 2.75 1.937 4.688Q7.25 16.625 10 16.625Z" />
    </>
)

export const IconHistory = wrapper(
    <path d="M10.312 17.667q-3.25 0-5.52-2.219Q2.521 13.229 2.562 10h2.084q-.063 2.333 1.604 3.979t4.021 1.646q2.291 0 3.937-1.656 1.646-1.657 1.646-3.969 0-2.292-1.625-3.958-1.625-1.667-3.917-1.667-1.437 0-2.656.615-1.218.614-1.948 1.718h2.438V8.75H2.104V2.708h2.042v2.75q1-1.5 2.625-2.312 1.625-.813 3.541-.813 1.584 0 2.959.605 1.375.604 2.396 1.645 1.021 1.042 1.625 2.438.604 1.396.604 2.979 0 1.583-.604 2.979-.604 1.396-1.625 2.438-1.021 1.041-2.396 1.645-1.375.605-2.959.605Zm1.584-4.417-3.167-3.125V5.667h2.042V9.25l2.562 2.562Z" />
)

export const IconHistoryStatus = wrapper(
    <>
        <circle fill="var(--color-yellow-status)" cx="10" cy="10" r="7.4" />
        <path d="M10.312 17.667q-3.25 0-5.52-2.219Q2.521 13.229 2.562 10h2.084q-.063 2.333 1.604 3.979t4.021 1.646q2.291 0 3.937-1.656 1.646-1.657 1.646-3.969 0-2.292-1.625-3.958-1.625-1.667-3.917-1.667-1.437 0-2.656.615-1.218.614-1.948 1.718h2.438V8.75H2.104V2.708h2.042v2.75q1-1.5 2.625-2.312 1.625-.813 3.541-.813 1.584 0 2.959.605 1.375.604 2.396 1.645 1.021 1.042 1.625 2.438.604 1.396.604 2.979 0 1.583-.604 2.979-.604 1.396-1.625 2.438-1.021 1.041-2.396 1.645-1.375.605-2.959.605Zm1.584-4.417-3.167-3.125V5.667h2.042V9.25l2.562 2.562Z" />
    </>
)

export const IconCancel = wrapper(
    <path d="M7.021 14.417 10 11.438l2.979 2.979 1.438-1.438L11.438 10l2.979-2.979-1.438-1.438L10 8.562 7.021 5.583 5.583 7.021 8.562 10l-2.979 2.979ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.385.678-1.573 1.865-2.761Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.385.667 1.573.667 2.761 1.854Q17.333 5.042 18 6.615q.667 1.573.667 3.385 0 1.792-.667 3.365-.667 1.573-1.854 2.76-1.188 1.187-2.761 1.865-1.573.677-3.385.677Zm0-2.042q2.771 0 4.698-1.927 1.927-1.927 1.927-4.698 0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.771 0-4.698 1.927Q3.375 7.229 3.375 10q0 2.771 1.927 4.698Q7.229 16.625 10 16.625ZM10 10Z" />
)

export const IconCancelStatus = wrapper(
    <>
        <circle fill="var(--color-red-status)" cx="10" cy="10" r="8.7" />
        <path d="M7.021 14.417 10 11.438l2.979 2.979 1.438-1.438L11.438 10l2.979-2.979-1.438-1.438L10 8.562 7.021 5.583 5.583 7.021 8.562 10l-2.979 2.979ZM10 18.667q-1.792 0-3.365-.677-1.573-.678-2.76-1.865-1.187-1.187-1.865-2.76-.677-1.573-.677-3.365 0-1.812.677-3.385.678-1.573 1.865-2.761Q5.062 2.667 6.635 2 8.208 1.333 10 1.333q1.812 0 3.385.667 1.573.667 2.761 1.854Q17.333 5.042 18 6.615q.667 1.573.667 3.385 0 1.792-.667 3.365-.667 1.573-1.854 2.76-1.188 1.187-2.761 1.865-1.573.677-3.385.677Zm0-2.042q2.771 0 4.698-1.927 1.927-1.927 1.927-4.698 0-2.771-1.927-4.698Q12.771 3.375 10 3.375q-2.771 0-4.698 1.927Q3.375 7.229 3.375 10q0 2.771 1.927 4.698Q7.229 16.625 10 16.625ZM10 10Z" />
    </>
)
