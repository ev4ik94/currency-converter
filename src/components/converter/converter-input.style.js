

export const converterStyle = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    circleProgress: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    containerList:{
        position: 'relative',
        '& > li':{
            textAlign: 'left',
            padding: '10px 0px',
            borderBottom: '1px solid #e6e6e6'
        }
    },
    textField: {
        width: '100%'
    }
})