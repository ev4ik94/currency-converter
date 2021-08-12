

export const tableStyle = {
    containerTable: {
        margin: '30px auto',
        width: '70%'
    },
    table: {
        minWidth: 300,
    }
}

export const tableCell = (theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
})


export const tableRaw = (theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
})