import React, { useState, useEffect } from 'react'
import { Paper, Typography, Fab, List, ListItem, ListItemText } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { connect } from 'react-redux'
import useStyles from './Assets/useStyles'
import download from 'downloadjs'

const mapStateToProps = ({ session }) => ({ session })

const FileItem = ({ handleDownload, fileUrl, fileName }) => (
    <ListItem 
        button 
        className={useStyles().file_list_item}
        onClick={() => handleDownload(fileUrl, fileName)}
    >
        <ListItemText primary={fileName} />
    </ListItem>
)

const Drawer = ({ session: { accessToken, userId } }) => {
    const classes = useStyles()
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/app/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept': 'application/json'
                    }
                })
                const data = await response.json()
                console.log(data)
                setFiles(data)
            } catch(err) {
                console.log(err)
            }
        })()
    }, [userId, accessToken])

    const handleUpload = async e => {
        setUploading(true)

        const formData = new FormData()
        formData.append('file', e.target.files[0])

        try {
            const response = await fetch(`/app/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                },
                body: formData
            })
            const data = await response.json()
            if (files.filter(file => file.name === data.name).length === 0) setFiles(prev => prev.concat(data))
        } catch(err) {
            console.log(err)
        }

        setUploading(false)
    }

    const handleDownload = async (url, name) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const blob = await res.blob()
        download(blob, name)
    }

    return (
        <Paper className={classes.paper} square>
            <Typography variant="h4" align="center">
                Place to store your pdfs
            </Typography>

            <List className={classes.file_list}>
                {files.map(file => (
                    <FileItem key={file.name} handleDownload={handleDownload} fileUrl={file.file} fileName={file.name} />
                ))}
            </List>

            <input
                    accept=".pdf"
                    className={classes.input}
                    id="icon-button-file"
                    multiple
                    type="file"
                    onChange={handleUpload}
            />
            <label htmlFor="icon-button-file" className={classes.addButton}>
                <Fab color="primary" aria-label="upload pdf" component="span" disabled={uploading}>
                    <Add />
                </Fab>
            </label>
        </Paper>
    )
}

export default connect(mapStateToProps)(Drawer)