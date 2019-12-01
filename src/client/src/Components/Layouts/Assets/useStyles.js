import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    weird_buttons: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    text_field: {
        height: '68px',
        margin: '0',
        marginBottom: theme.spacing(1),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    addButton: {
        alignSelf: 'flex-end'
    },
    input: {
        display: 'none'
    },
    file_list: {
        width: '100%',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    file_list_item: {
        maxWidth: 700,
        textAlign: 'center'
    }
}));